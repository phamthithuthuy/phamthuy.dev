// One-off vault importer: second-brain/10-other/ba-handbook/notes → src/content/posts
//
// Run:  node scripts/import-vault.mjs            (dry run: reports, writes nothing)
//       node scripts/import-vault.mjs --write     (performs the import)
//
// - Excludes: every README.md, _conventions.md, note-guidelines.md, glossary.md
// - Generates YAML frontmatter (title from H1, description from 1st paragraph)
// - Strips the leading H1 from the body (title comes from frontmatter)
// - Rewrites [[wikilinks]] -> [Title](/posts/<slug>); strips unresolved ones
// - pubDatetime sourced from git first-commit date (fallback: today), draft: false
// - Logs every wikilink that could not be resolved

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "second-brain/10-other/ba-handbook/notes");
const OUT = path.join(ROOT, "src/content/posts");
const URL_PREFIX = "/posts";
const WRITE = process.argv.includes("--write");

// Date source: a blobless clone of the remote (local .git was removed).
// Falls back to today's date if unavailable.
const GIT_REPO = "/tmp/sb-dates";
const FALLBACK_DATE = new Date().toISOString();

// ---------- helpers ----------

const isExcluded = relPath => {
  const base = path.basename(relPath).toLowerCase();
  return (
    base === "readme.md" ||
    base === "_conventions.md" ||
    base === "note-guidelines.md" ||
    base === "glossary.md"
  );
};

const kebabSegment = seg =>
  seg
    .replace(/^\d+[-_]/, "") // drop leading numeric prefix (01_, 001-)
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

// vault-relative md path (no .md) -> output slug path (kebab segments)
const toSlugPath = relNoExt =>
  relNoExt.split("/").map(kebabSegment).join("/");

const walk = dir => {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
};

const firstCommitDate = relFromRepoRoot => {
  try {
    const iso = execFileSync(
      "git",
      [
        "-C",
        GIT_REPO,
        "log",
        "--diff-filter=A",
        "--follow",
        "--format=%cI",
        "-1",
        "--",
        relFromRepoRoot,
      ],
      { encoding: "utf8" }
    ).trim();
    return iso || FALLBACK_DATE;
  } catch {
    return FALLBACK_DATE;
  }
};

// Extract H1 title and first paragraph description from raw markdown.
const parseDoc = raw => {
  const lines = raw.split(/\r?\n/);
  let title = null;
  let titleIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#\s+(.+?)\s*$/);
    if (m) {
      title = m[1].trim();
      titleIdx = i;
      break;
    }
  }
  // Description: prefer the lead blockquote summary right after the H1 (the
  // handbook template opens with a 1–3 sentence "> ..." abstract). Fall back to
  // the first normal paragraph when there is no lead blockquote.
  let description = "";
  let di = titleIdx + 1;
  while (di < lines.length && !lines[di].trim()) di++;
  if (di < lines.length && lines[di].trim().startsWith(">")) {
    const buf = [];
    while (di < lines.length && lines[di].trim().startsWith(">")) {
      const t = lines[di]
        .trim()
        .replace(/^>+\s?/, "") // strip blockquote markers
        .replace(/^\[![^\]]+\]\s*/, ""); // strip Obsidian callout header
      if (t) buf.push(t);
      di++;
    }
    description = buf.join(" ");
  }
  if (!description) {
    for (let i = titleIdx + 1; i < lines.length; i++) {
      const l = lines[i].trim();
      if (!l) continue;
      if (l.startsWith("#")) continue;
      if (l.startsWith(">")) continue;
      if (l.startsWith("```")) {
        // skip fenced block
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) i++;
        continue;
      }
      if (l.startsWith("|") || l.startsWith("---")) continue;
      description = l;
      break;
    }
  }
  // Strip the H1 line from the body.
  const body =
    titleIdx >= 0
      ? lines.slice(0, titleIdx).concat(lines.slice(titleIdx + 1)).join("\n")
      : raw;
  return { title, description, body: body.replace(/^\n+/, "") };
};

const yamlString = s => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

const truncate = (s, n) => {
  if (!s) return "";
  s = s.replace(/\s+/g, " ").trim();
  // strip markdown emphasis / inline code / links for a clean description
  s = s
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, a, b) => b || a);
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
};

// ---------- pass 1: discover + build resolution map ----------

const allMd = walk(SRC).map(f => path.relative(SRC, f));
const importable = allMd.filter(r => !isExcluded(r));

// map keys -> { url, title }
const byPath = new Map(); // "02_Advanced/.../002-strategy" (no ext) -> entry
const byBase = new Map(); // "002-strategy" -> entry | null(if ambiguous)

const entries = [];
for (const rel of importable) {
  const relNoExt = rel.replace(/\.md$/, "");
  const slugPath = toSlugPath(relNoExt);
  const url = `${URL_PREFIX}/${slugPath}`;
  const raw = readFileSync(path.join(SRC, rel), "utf8");
  const { title, description, body } = parseDoc(raw);
  const entry = {
    rel,
    relNoExt,
    slugPath,
    url,
    title: title || path.basename(relNoExt),
    description,
    body,
  };
  entries.push(entry);
  byPath.set(relNoExt.toLowerCase(), entry);
  const base = path.basename(relNoExt).toLowerCase();
  byBase.set(base, byBase.has(base) ? null : entry); // null marks ambiguity
}

// Resolve a wikilink target (no alias/anchor in this vault) to an entry, or null.
const resolveTarget = (target, fromRel) => {
  let t = target.trim().replace(/\.md$/i, "");
  // Rooted vault paths: ".../ba-handbook/notes/<rest>"
  const rootMatch = t.match(/(?:^|\/)ba-handbook\/notes\/(.+)$/i);
  if (rootMatch) t = rootMatch[1];

  if (t.includes("/")) {
    // path form: resolve relative to the source file's directory
    const fromDir = path.dirname(fromRel);
    const resolved = path
      .normalize(path.join(fromDir, t))
      .replace(/\\/g, "/")
      .replace(/^\.\//, "");
    const hit = byPath.get(resolved.toLowerCase());
    if (hit) return hit;
    // fall through to basename attempt
  }
  const base = path.basename(t).toLowerCase();
  const hit = byBase.get(base);
  return hit || null; // null = ambiguous or missing
};

// ---------- pass 2: transform + (optionally) write ----------

const WIKILINK = /\[\[([^\]]+)\]\]/g;
const unresolved = [];
let linkRewrites = 0;
let linkStrips = 0;

for (const entry of entries) {
  const fromRel = entry.rel;
  const body = entry.body.replace(WIKILINK, (_full, inner) => {
    // Split target|alias. Inside markdown tables the pipe is escaped as "\|",
    // leaking a trailing backslash into the target — strip it so the link resolves.
    const [lhsRaw, aliasRaw] = inner.split("|");
    const alias = (aliasRaw ?? "").trim();
    const target = lhsRaw.replace(/\\+$/, "").split("#")[0].trim();
    const hit = resolveTarget(target, fromRel);
    if (hit && hit.rel !== fromRel) {
      linkRewrites++;
      const text = alias || hit.title;
      return `[${text}](${hit.url})`;
    }
    // unresolved -> strip to plain text, log it
    linkStrips++;
    unresolved.push({ from: fromRel, target: inner });
    return alias || path.basename(target);
  });

  const relFromRepoRoot = `10-other/ba-handbook/notes/${entry.rel}`;
  const pub = firstCommitDate(relFromRepoRoot);

  const segs = entry.rel.split("/");
  // Tag = the top-level taxonomy folder (e.g. 00-foundations -> foundations).
  const topic = kebabSegment(segs[0]);
  const fm = [
    "---",
    `title: ${yamlString(entry.title)}`,
    `pubDatetime: ${pub}`,
    `description: ${yamlString(truncate(entry.description || entry.title, 160))}`,
    `tags: ["ba"${topic ? `, ${yamlString(topic)}` : ""}]`,
    "draft: false",
    "---",
    "",
  ].join("\n");

  const outFile = path.join(OUT, `${entry.slugPath}.md`);
  if (WRITE) {
    mkdirSync(path.dirname(outFile), { recursive: true });
    writeFileSync(outFile, fm + body.replace(/^\n+/, "") + "\n");
  }
}

// ---------- report ----------

console.log(`Source notes (all .md):     ${allMd.length}`);
console.log(`Excluded:                   ${allMd.length - importable.length}`);
console.log(`Importable notes:           ${entries.length}`);
console.log(`Wikilinks rewritten:        ${linkRewrites}`);
console.log(`Wikilinks stripped (dead):  ${linkStrips}`);
console.log(`Mode:                       ${WRITE ? "WRITE" : "DRY RUN (use --write)"}`);
console.log(`Output dir:                 ${path.relative(ROOT, OUT)}`);

if (unresolved.length) {
  console.log(`\nUnresolved wikilinks (${unresolved.length}) — stripped to plain text:`);
  const grouped = new Map();
  for (const u of unresolved) {
    if (!grouped.has(u.target)) grouped.set(u.target, []);
    grouped.get(u.target).push(u.from);
  }
  for (const [target, froms] of [...grouped.entries()].sort()) {
    console.log(`  [[${target}]]  (${froms.length}×)  e.g. ${froms[0]}`);
  }
}
