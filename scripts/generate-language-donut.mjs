// scripts/generate-language-donut.mjs
//
// Fetches per-repository language byte counts for GH_USERNAME via GitHub's
// REST API, aggregates them, and renders a themed donut chart SVG.
//
// Required env vars:
//   GH_TOKEN     - a token with read access to the user's public repos
//   GH_USERNAME  - the GitHub username to query

const TOKEN = process.env.GH_TOKEN;
const USERNAME = process.env.GH_USERNAME;

if (!TOKEN || !USERNAME) {
  console.error("Missing GH_TOKEN or GH_USERNAME env vars.");
  process.exit(1);
}

const API = "https://api.github.com";
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function get(path) {
  const res = await fetch(`${API}${path}`, { headers: HEADERS });
  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${path} -> ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function fetchAllRepos() {
  const repos = [];
  let page = 1;
  while (true) {
    const batch = await get(`/users/${USERNAME}/repos?per_page=100&page=${page}&type=owner`);
    repos.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }
  // Skip forks — they inflate language stats with code that isn't really yours.
  return repos.filter((r) => !r.fork);
}

async function aggregateLanguages(repos) {
  const totals = new Map();
  for (const repo of repos) {
    let langs;
    try {
      langs = await get(`/repos/${USERNAME}/${repo.name}/languages`);
    } catch (err) {
      console.warn(`Skipping ${repo.name}: ${err.message}`);
      continue;
    }
    for (const [lang, bytes] of Object.entries(langs)) {
      totals.set(lang, (totals.get(lang) || 0) + bytes);
    }
  }
  return totals;
}

// A fixed, readable palette in the profile's theme family (purples/cyans/blues)
// plus a few complementary accents so slices stay distinguishable up to ~8 languages.
const PALETTE = [
  "#00d4ff", "#6e40c9", "#5eead4", "#a5c8ff",
  "#f778ba", "#ffb86b", "#7ee787", "#d2a8ff",
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

// SVG is XML — raw &, <, >, ", ' in dynamic text produce invalid,
// unrenderable SVG. Escape before inserting into any text node.
function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function arcPath(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

function renderSvg(totals) {
  const bg = "#0d1117";
  const border = "#30363d";
  const textMain = "#a5c8ff";
  const textSub = "#5eead4";

  const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const TOP_N = 7;
  const top = sorted.slice(0, TOP_N);
  const rest = sorted.slice(TOP_N);
  const restTotal = rest.reduce((sum, [, bytes]) => sum + bytes, 0);
  const slices = restTotal > 0 ? [...top, ["Other", restTotal]] : top;

  const grandTotal = slices.reduce((sum, [, bytes]) => sum + bytes, 0);

  const width = 480;
  const height = 300;
  const cx = 150;
  const cy = 150;
  const rOuter = 100;
  const rInner = 55;

  let angle = 0;
  const arcs = [];
  slices.forEach(([lang, bytes], i) => {
    const pct = bytes / grandTotal;
    const sweep = pct * 360;
    const color = PALETTE[i % PALETTE.length];
    const outerPath = arcPath(cx, cy, rOuter, angle, angle + sweep);
    arcs.push(`<path d="${outerPath}" fill="${color}" />`);
    angle += sweep;
  });

  // Donut hole (cuts the pie into a ring) — drawn as a circle on top.
  const hole = `<circle cx="${cx}" cy="${cy}" r="${rInner}" fill="${bg}" />`;

  const legendX = 300;
  const legendStartY = 55;
  const legendLineHeight = 26;
  const legend = slices
    .map(([lang, bytes], i) => {
      const pct = ((bytes / grandTotal) * 100).toFixed(1);
      const y = legendStartY + i * legendLineHeight;
      const color = PALETTE[i % PALETTE.length];
      return `
        <rect x="${legendX}" y="${y - 11}" width="12" height="12" rx="2" fill="${color}" />
        <text x="${legendX + 20}" y="${y - 1}" font-size="13" fill="${textMain}">${escapeXml(lang)}</text>
        <text x="${width - 20}" y="${y - 1}" font-size="13" fill="${textSub}" text-anchor="end">${pct}%</text>
      `;
    })
    .join("\n");

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Helvetica, Arial, sans-serif">
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="${bg}" stroke="${border}"/>
  <text x="24" y="32" font-size="16" font-weight="700" fill="${textMain}">Language &amp; Framework Usage</text>

  <g>
    ${arcs.join("\n")}
    ${hole}
  </g>

  <g>
    ${legend}
  </g>
</svg>`.trim();

  return svg;
}

async function main() {
  const repos = await fetchAllRepos();
  const totals = await aggregateLanguages(repos);
  if (totals.size === 0) {
    throw new Error("No language data found — check GH_USERNAME and token permissions.");
  }
  const svg = renderSvg(totals);

  const fs = await import("node:fs/promises");
  await fs.writeFile("github-language-donut.svg", svg, "utf8");
  console.log("Wrote github-language-donut.svg");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
