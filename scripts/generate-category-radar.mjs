// scripts/generate-category-radar.mjs
//
// Fetches GH_USERNAME's repos, buckets each one into a category based on its
// topics/name/description, and renders a themed radar (spider) chart SVG
// showing repo count per category.
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
  return repos.filter((r) => !r.fork);
}

// Edit these to match how you actually want your work grouped.
// Matching is done against: repo name + description + topics (all lowercased).
const CATEGORIES = {
  "Computer Vision": ["cv", "vision", "opencv", "pose", "detection", "gesture", "image", "yolo"],
  "RAG & Agentic": ["rag", "agent", "langchain", "langgraph", "llm", "retrieval", "chatbot"],
  "MLOps": ["mlops", "pipeline", "sagemaker", "airflow", "docker", "kubernetes", "deployment", "serverless"],
  "Bioinformatics": ["bio", "genomic", "bioinformatics", "equine", "health"],
  "NLP": ["nlp", "text", "translat", "gpt", "language-model", "prompt"],
};

function categorize(repo) {
  const haystack = [
    repo.name || "",
    repo.description || "",
    ...(repo.topics || []),
  ]
    .join(" ")
    .toLowerCase();

  const matches = [];
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((kw) => haystack.includes(kw))) {
      matches.push(category);
    }
  }
  return matches; // a repo can land in more than one category
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

// SVG is XML — raw &, <, >, ", ' in dynamic text (like "RAG & Agentic")
// produce invalid, unrenderable SVG. Escape before inserting into any text node.
function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderSvg(counts) {
  const bg = "#0d1117";
  const border = "#30363d";
  const gridColor = "#30363d";
  const textMain = "#a5c8ff";
  const fillColor = "rgba(110, 64, 201, 0.35)";
  const strokeColor = "#00d4ff";

  const width = 420;
  const height = 420;
  const cx = width / 2;
  const cy = height / 2 - 10;
  const rMax = 130;

  const labels = Object.keys(counts);
  const values = Object.values(counts);
  const maxValue = Math.max(...values, 1);
  const n = labels.length;
  const angleStep = 360 / n;

  // Grid rings (25%, 50%, 75%, 100%)
  const rings = [0.25, 0.5, 0.75, 1].map((frac) => {
    const points = labels
      .map((_, i) => {
        const p = polarToCartesian(cx, cy, rMax * frac, i * angleStep);
        return `${p.x},${p.y}`;
      })
      .join(" ");
    return `<polygon points="${points}" fill="none" stroke="${gridColor}" stroke-width="1" />`;
  });

  // Axis lines
  const axes = labels
    .map((_, i) => {
      const p = polarToCartesian(cx, cy, rMax, i * angleStep);
      return `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="${gridColor}" stroke-width="1" />`;
    })
    .join("\n");

  // Data polygon
  const dataPoints = labels
    .map((_, i) => {
      const r = (values[i] / maxValue) * rMax;
      const p = polarToCartesian(cx, cy, r, i * angleStep);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  // Data vertex dots
  const dots = labels
    .map((_, i) => {
      const r = (values[i] / maxValue) * rMax;
      const p = polarToCartesian(cx, cy, r, i * angleStep);
      return `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${strokeColor}" />`;
    })
    .join("\n");

  // Labels (category name + count), placed just outside the outer ring
  const labelEls = labels
    .map((label, i) => {
      const p = polarToCartesian(cx, cy, rMax + 28, i * angleStep);
      let anchor = "middle";
      if (p.x > cx + 5) anchor = "start";
      else if (p.x < cx - 5) anchor = "end";
      return `<text x="${p.x}" y="${p.y}" font-size="13" fill="${textMain}" text-anchor="${anchor}" dominant-baseline="middle">${escapeXml(label)} (${values[i]})</text>`;
    })
    .join("\n");

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Helvetica, Arial, sans-serif">
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="${bg}" stroke="${border}"/>
  <text x="24" y="32" font-size="16" font-weight="700" fill="${textMain}">Repos by Focus Area</text>

  <g>
    ${rings.join("\n")}
    ${axes}
  </g>

  <polygon points="${dataPoints}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2" />
  ${dots}

  ${labelEls}
</svg>`.trim();

  return svg;
}

async function main() {
  const repos = await fetchAllRepos();

  const counts = {};
  for (const category of Object.keys(CATEGORIES)) counts[category] = 0;

  for (const repo of repos) {
    const matches = categorize(repo);
    for (const category of matches) counts[category] += 1;
  }

  const svg = renderSvg(counts);

  const fs = await import("node:fs/promises");
  await fs.writeFile("github-category-radar.svg", svg, "utf8");
  console.log("Wrote github-category-radar.svg");
  console.log(counts);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
