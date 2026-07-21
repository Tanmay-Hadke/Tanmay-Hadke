// scripts/generate-streak-svg.mjs
//
// Fetches contribution-calendar data for GH_USERNAME via GitHub's GraphQL API,
// computes total contributions / current streak / longest streak, and renders
// a themed SVG card (no external hosting required — runs entirely inside CI).
//
// Required env vars:
//   GH_TOKEN     - a token with read access to the user's contributions
//                  (the default GITHUB_TOKEN works for a user's own public data)
//   GH_USERNAME  - the GitHub username to query

const TOKEN = process.env.GH_TOKEN;
const USERNAME = process.env.GH_USERNAME;

if (!TOKEN || !USERNAME) {
  console.error("Missing GH_TOKEN or GH_USERNAME env vars.");
  process.exit(1);
}

const GRAPHQL_URL = "https://api.github.com/graphql";

async function graphql(query, variables) {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

// GitHub's contributionsCollection only allows windows of <= 1 year, so we
// walk backward year-by-year from "now" until we pass the account's creation date.
async function fetchAllContributionDays() {
  const userQuery = `
    query($login: String!) {
      user(login: $login) {
        createdAt
      }
    }
  `;
  const { user } = await graphql(userQuery, { login: USERNAME });
  const createdAt = new Date(user.createdAt);

  const calendarQuery = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const allDays = [];
  let windowEnd = new Date();
  // GitHub's contributionsCollection rejects any from/to span over 365 days.
  // Using calendar-based setFullYear() can land on exactly 366 days across a
  // leap day, so we use fixed millisecond math and stay a day under the cap.
  const MAX_WINDOW_MS = 364 * 24 * 60 * 60 * 1000;

  while (windowEnd > createdAt) {
    const windowStart = new Date(windowEnd.getTime() - MAX_WINDOW_MS);
    const from = windowStart < createdAt ? createdAt : windowStart;

    const data = await graphql(calendarQuery, {
      login: USERNAME,
      from: from.toISOString(),
      to: windowEnd.toISOString(),
    });

    const weeks = data.user.contributionsCollection.contributionCalendar.weeks;
    for (const week of weeks) {
      for (const day of week.contributionDays) {
        allDays.push(day);
      }
    }

    windowEnd = new Date(from.getTime() - 24 * 60 * 60 * 1000);
  }

  // De-dupe (windows can overlap by a day at the edges) and sort ascending.
  const seen = new Map();
  for (const d of allDays) seen.set(d.date, d.contributionCount);
  const sortedDates = [...seen.keys()].sort();
  return sortedDates.map((date) => ({ date, count: seen.get(date) }));
}

function computeStats(days) {
  let totalContributions = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let longestStart = null;
  let longestEnd = null;
  let runStart = null;

  for (const { date, count } of days) {
    totalContributions += count;
    if (count > 0) {
      if (currentStreak === 0) runStart = date;
      currentStreak += 1;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
        longestStart = runStart;
        longestEnd = date;
      }
    } else {
      currentStreak = 0;
    }
  }

  const firstDate = days[0]?.date;
  const lastDate = days[days.length - 1]?.date;
  const currentStreakStart = currentStreak > 0 ? days[days.length - currentStreak].date : null;

  return {
    totalContributions,
    currentStreak,
    currentStreakStart,
    longestStreak,
    longestStart,
    longestEnd,
    firstDate,
    lastDate,
  };
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function formatDateWithYear(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function renderSvg(stats, username) {
  const {
    totalContributions,
    currentStreak,
    currentStreakStart,
    longestStreak,
    longestStart,
    longestEnd,
    firstDate,
  } = stats;

  const bg = "#0d1117";
  const purple = "#6e40c9";
  const cyan = "#00d4ff";
  const textMain = "#a5c8ff";
  const textSub = "#5eead4";
  const border = "#30363d";

  const width = 780;
  const height = 200;
  const colW = width / 3;

  const rangeLabel = `${formatDateWithYear(firstDate)} - Present`;
  const currentLabel = currentStreak > 0
    ? `${formatDate(currentStreakStart)} - ${formatDate(new Date().toISOString().slice(0, 10))}`
    : formatDate(new Date().toISOString().slice(0, 10));
  const longestLabel = longestStreak > 0
    ? `${formatDate(longestStart)} - ${formatDate(longestEnd)}`
    : "—";

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="'Segoe UI', Helvetica, Arial, sans-serif">
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="${bg}" stroke="${border}"/>

  <!-- divider lines -->
  <line x1="${colW}" y1="40" x2="${colW}" y2="${height - 40}" stroke="${border}" stroke-width="1"/>
  <line x1="${colW * 2}" y1="40" x2="${colW * 2}" y2="${height - 40}" stroke="${border}" stroke-width="1"/>

  <!-- Total Contributions -->
  <text x="${colW / 2}" y="78" text-anchor="middle" font-size="40" font-weight="700" fill="${textMain}">${totalContributions}</text>
  <text x="${colW / 2}" y="108" text-anchor="middle" font-size="15" fill="${textMain}">Total Contributions</text>
  <text x="${colW / 2}" y="130" text-anchor="middle" font-size="12" fill="${textSub}">${rangeLabel}</text>

  <!-- Current Streak -->
  <circle cx="${colW * 1.5}" cy="70" r="34" fill="none" stroke="${purple}" stroke-width="4"/>
  <text x="${colW * 1.5}" y="60" text-anchor="middle" font-size="18">🔥</text>
  <text x="${colW * 1.5}" y="82" text-anchor="middle" font-size="26" font-weight="700" fill="${purple}">${currentStreak}</text>
  <text x="${colW * 1.5}" y="122" text-anchor="middle" font-size="15" font-weight="700" fill="${purple}">Current Streak</text>
  <text x="${colW * 1.5}" y="142" text-anchor="middle" font-size="12" fill="${textSub}">${currentLabel}</text>

  <!-- Longest Streak -->
  <text x="${colW * 2.5}" y="78" text-anchor="middle" font-size="40" font-weight="700" fill="${textMain}">${longestStreak}</text>
  <text x="${colW * 2.5}" y="108" text-anchor="middle" font-size="15" fill="${textMain}">Longest Streak</text>
  <text x="${colW * 2.5}" y="130" text-anchor="middle" font-size="12" fill="${textSub}">${longestLabel}</text>
</svg>`.trim();

  return svg;
}

async function main() {
  const days = await fetchAllContributionDays();
  const stats = computeStats(days);
  const svg = renderSvg(stats, USERNAME);

  const fs = await import("node:fs/promises");
  await fs.writeFile("github-streak-stats.svg", svg, "utf8");
  console.log("Wrote github-streak-stats.svg");
  console.log(stats);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
