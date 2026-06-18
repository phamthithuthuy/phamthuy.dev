// One-off: add descriptive alt text to ```plantuml fences across posts.
//
// Run:  node scripts/add-diagram-alt.mjs            (dry run: prints samples)
//       node scripts/add-diagram-alt.mjs --write     (writes the alt into .md)
//
// alt = post title + nearest preceding heading (author's own words).
// - Only touches the fence opening line (```plantuml <alt>); body untouched.
// - Skips fences that already carry a caption (idempotent, respects manual alt).

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const POSTS = path.join(ROOT, "src/content/posts");
const WRITE = process.argv.includes("--write");

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function frontmatterTitle(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return "";
  const t = m[1].match(/^title:\s*(.+)$/m);
  if (!t) return "";
  return t[1].trim().replace(/^["']|["']$/g, "").trim();
}

// Strip markdown noise so the caption reads cleanly.
function clean(s) {
  return s
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*?([^*]*)\*\*?/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_]/g, "")
    .replace(/"/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

const norm = s => clean(s).toLowerCase();

// Structural/recurring headings that describe nothing about the diagram —
// when the nearest heading is one of these, the post title alone is better.
const GENERIC = new Set([
  "how it actually works",
  "how it works",
  "the mental model",
  "mental model",
  "mental models",
  "overview",
  "tổng quan",
  "cách hoạt động",
  "ví dụ",
  "example",
  "examples",
  "diagram",
  "diagrams",
  "sơ đồ",
  "minh hoạ",
  "illustration",
  "flow",
  "luồng",
  "luồng xử lý",
  "code",
  "summary",
  "tóm tắt",
]);

function buildAlt(title, heading, idx, total) {
  const h = heading ? clean(heading) : "";
  const t = clean(title);
  const useHeading =
    h &&
    !GENERIC.has(norm(h)) &&
    norm(h) !== norm(t) &&
    !norm(t).includes(norm(h)) &&
    !norm(h).includes(norm(t));
  let base = useHeading ? `${t} — ${h}` : t;
  if (total > 1) base += ` (sơ đồ ${idx})`;
  return clean(base);
}

let filesChanged = 0;
let fencesCaptioned = 0;
let fencesSkipped = 0;
const samples = [];

for (const file of walk(POSTS)) {
  const text = readFileSync(file, "utf8");
  if (!text.includes("```plantuml")) continue;
  const title = frontmatterTitle(file && text);
  const lines = text.split("\n");

  // Pass 1: locate plantuml openers + their nearest preceding heading.
  let inFence = false;
  let lastHeading = "";
  const fences = []; // { line, heading, hasMeta }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fenceOpen = !inFence && /^```(\w*)\s*(.*)$/.exec(line);
    if (fenceOpen) {
      inFence = true;
      if (fenceOpen[1] === "plantuml") {
        fences.push({ line: i, heading: lastHeading, hasMeta: fenceOpen[2].trim().length > 0 });
      }
      continue;
    }
    if (inFence) {
      if (/^```\s*$/.test(line)) inFence = false;
      continue;
    }
    const h = /^#{1,6}\s+(.+?)\s*#*$/.exec(line);
    if (h) lastHeading = h[1];
  }

  const total = fences.length;
  let changed = false;
  fences.forEach((f, idx) => {
    if (f.hasMeta) {
      fencesSkipped++;
      return;
    }
    const alt = buildAlt(title, f.heading, idx + 1, total);
    lines[f.line] = "```plantuml " + alt;
    fencesCaptioned++;
    changed = true;
    if (samples.length < 12)
      samples.push(`${path.relative(ROOT, file)}\n    → ${alt}`);
  });

  if (changed) {
    filesChanged++;
    if (WRITE) writeFileSync(file, lines.join("\n"));
  }
}

console.log("Mode:               " + (WRITE ? "WRITE" : "DRY RUN (use --write)"));
console.log("Files với plantuml: " + filesChanged + " sẽ đổi");
console.log("Fences được caption: " + fencesCaptioned);
console.log("Fences bỏ qua (đã có caption): " + fencesSkipped);
console.log("\nMẫu alt:");
for (const s of samples) console.log("  " + s);
