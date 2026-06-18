import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

// Build-time only: renders ```plantuml fenced blocks to cached SVGs.
// Jar resolved from PLANTUML_JAR, defaulting to <project root>/plantuml.jar.
const JAR = process.env.PLANTUML_JAR || path.resolve(process.cwd(), "plantuml.jar");
const OUT_DIR = path.resolve(process.cwd(), "public/diagrams");
const PUBLIC_PREFIX = "/diagrams";
// Enlarge generated diagrams so small ones are readable. Scales the SVG's
// intrinsic size only (viewBox is untouched, so it stays crisp); CSS
// `max-width:100%` still caps wide diagrams to the content column.
const SCALE = Number(process.env.PLANTUML_SCALE) || 1.6;
// Default font for diagram text (must be installed for the JVM/fontconfig so
// PlantUML can measure glyphs). Empty string disables injection.
const FONT = process.env.PLANTUML_FONT ?? "Inter";

function escapeAttr(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Multiply the root <svg> width/height (attributes + inline style px) by SCALE.
function enlargeSvg(svg, factor) {
  if (!(factor > 1)) return svg;
  const px = n => `${Math.round(Number(n) * factor)}px`;
  return svg.replace(/<svg\b[^>]*>/, tag =>
    tag
      .replace(/\bwidth="(\d+(?:\.\d+)?)px"/, (_, n) => `width="${px(n)}"`)
      .replace(/\bheight="(\d+(?:\.\d+)?)px"/, (_, n) => `height="${px(n)}"`)
      .replace(/width:(\d+(?:\.\d+)?)px/g, (_, n) => `width:${px(n)}`)
      .replace(/height:(\d+(?:\.\d+)?)px/g, (_, n) => `height:${px(n)}`)
  );
}

// Inject a default font so diagram text matches the site. Inserted right after
// the @start... line; a diagram that sets its own skinparam still wins.
function withFont(source) {
  if (!FONT) return source;
  const line = `skinparam defaultFontName ${FONT}\n`;
  const m = source.match(/@start\w+[^\n]*\n/);
  if (!m) return line + source;
  const at = m.index + m[0].length;
  return source.slice(0, at) + line + source.slice(at);
}

function renderSvg(source) {
  const svg = execFileSync(
    "java",
    ["-jar", JAR, "-tsvg", "-pipe", "-charset", "UTF-8"],
    { input: withFont(source), maxBuffer: 32 * 1024 * 1024, encoding: "utf8" }
  );
  return enlargeSvg(svg, SCALE);
}

// Read intrinsic pixel size from the root <svg> so the <img> can reserve space
// (prevents layout shift / CLS). Returns null when not determinable.
function svgPixelSize(svg) {
  const tag = svg.match(/<svg\b[^>]*>/)?.[0];
  if (!tag) return null;
  const w = tag.match(/\bwidth="(\d+(?:\.\d+)?)px"/)?.[1];
  const h = tag.match(/\bheight="(\d+(?:\.\d+)?)px"/)?.[1];
  if (w && h) return { w: Math.round(Number(w)), h: Math.round(Number(h)) };
  return null;
}

export default function remarkPlantuml() {
  return tree => {
    const jobs = [];

    visit(tree, "code", node => {
      if (node.lang !== "plantuml") return;
      jobs.push(node);
    });

    if (jobs.length === 0) return;

    if (!existsSync(JAR)) {
      throw new Error(
        `[remark-plantuml] PlantUML jar not found at "${JAR}". ` +
          `Set PLANTUML_JAR or place plantuml.jar at the project root.`
      );
    }

    mkdirSync(OUT_DIR, { recursive: true });

    for (const node of jobs) {
      const source = node.value;
      // Hash includes render options so changing font/scale busts the cache.
      const hash = createHash("sha256")
        .update(`${FONT}|${SCALE}|${source}`)
        .digest("hex")
        .slice(0, 16);
      const fileName = `${hash}.svg`;
      const outPath = path.join(OUT_DIR, fileName);

      // Idempotent cache: skip generation when the hashed SVG already exists.
      let svg;
      if (!existsSync(outPath)) {
        try {
          svg = renderSvg(source);
        } catch (err) {
          throw new Error(
            `[remark-plantuml] Failed to render diagram ${fileName}: ${err.message}`
          );
        }
        writeFileSync(outPath, svg);
      } else {
        svg = readFileSync(outPath, "utf8");
      }

      const alt = escapeAttr((node.meta || "PlantUML diagram").trim());
      const size = svgPixelSize(svg);
      const dims = size ? ` width="${size.w}" height="${size.h}"` : "";

      node.type = "html";
      node.value =
        `<figure class="diagram diagram-plantuml">` +
        `<img src="${PUBLIC_PREFIX}/${fileName}" alt="${alt}"${dims} loading="lazy" decoding="async" />` +
        `</figure>`;
      delete node.lang;
      delete node.meta;
    }
  };
}
