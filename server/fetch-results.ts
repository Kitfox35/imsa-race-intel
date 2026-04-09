import Database from "better-sqlite3";
import * as cheerio from "cheerio";

const WIKI_API = "https://en.wikipedia.org/w/api.php";
const PAGE_TITLE = "2026_IMSA_SportsCar_Championship";

async function fetchWikiPage(): Promise<string> {
  const params = new URLSearchParams({
    action: "parse",
    page: PAGE_TITLE,
    format: "json",
    prop: "text",
  });
  const res = await fetch(`${WIKI_API}?${params}`);
  const data = await res.json();
  return data.parse.text["*"];
}

function parseStandingsTable($: cheerio.CheerioAPI): any[] {
  const standings: any[] = [];

  $("table.wikitable").each((_, table) => {
    const prevHeading = $(table).prevAll("h3, h4").first().text().trim();
    if (!prevHeading.toLowerCase().includes("standing")) return;

    const headers: string[] = [];
    $(table).find("tr:first-child th").each((_, th) => {
      headers.push($(th).text().trim().toLowerCase());
    });

    const hasPosCol = headers.some(h => h.includes("pos"));
    const hasPointsCol = headers.some(h => h.includes("pts") || h.includes("points"));

    if (hasPosCol && hasPointsCol) {
      const posIdx = headers.findIndex(h => h.includes("pos"));
      const ptsIdx = headers.findIndex(h => h.includes("pts") || h.includes("points"));
      const driverIdx = headers.findIndex(h => h.includes("driver") || h.includes("team") || h.includes("name"));

      $(table).find("tbody tr, tr").each((rowIndex, row) => {
        if (rowIndex === 0) return;
        const cells: string[] = [];
        $(row).find("td").each((_, td) => {
          cells.push($(td).text().trim());
        });

        if (cells.length > Math.max(posIdx, ptsIdx)) {
          standings.push({
            position: parseInt(cells[posIdx]) || rowIndex,
            name: cells[driverIdx >= 0 ? driverIdx : 1] || "",
            points: parseInt(cells[ptsIdx]?.replace(/,/g, "")) || 0,
          });
        }
      });
    }
  });

  return standings;
}

async function updateDatabase() {
  console.log("Fetching Wikipedia page for 2026 IMSA season...");
  const html = await fetchWikiPage();
  const $ = cheerio.load(html);

  // Parse race winners
  const raceWinners: any[] = [];
  $("table.wikitable").each((_, table) => {
    const headers: string[] = [];
    $(table).find("tr:first-child th").each((_, th) => {
      headers.push($(th).text().trim().toLowerCase());
    });
    if (headers.some(h => h.includes("gtp")) && headers.some(h => h.includes("gtd"))) {
      $(table).find("tr").each((rowIndex, row) => {
        if (rowIndex === 0) return;
        const cells: string[] = [];
        $(row).find("td").each((_, td) => {
          cells.push($(td).text().trim());
        });
        if (cells.length >= 2) raceWinners.push(cells);
      });
    }
  });

  // Parse GTP standings
  console.log("Parsing championship standings...");
  const gtpStandings = parseStandingsTable($);

  console.log(`Found ${raceWinners.length} race winner entries`);
  console.log(`Found ${gtpStandings.length} GTP standing entries`);

  if (gtpStandings.length > 0) {
    console.log("\nTop 5 GTP standings from Wikipedia:");
    gtpStandings.slice(0, 5).forEach((s: any) => {
      console.log(`  P${s.position}: ${s.name} - ${s.points} pts`);
    });
  }

  if (process.argv.includes("--apply") && gtpStandings.length > 0) {
    const db = new Database("imsa.db");
    console.log("\nApplying standings updates...");

    db.prepare("DELETE FROM standings WHERE car_class = 'GTP' AND type = 'driver'").run();

    const insertStanding = db.prepare(
      `INSERT INTO standings (after_round, car_class, type, entity_name, team, points, wins, podiums, position)
       VALUES (?, 'GTP', 'driver', ?, ?, ?, 0, 0, ?)`
    );

    const latestRound = db.prepare("SELECT MAX(round) as maxRound FROM races WHERE laps > 0").get() as any;
    const round = latestRound?.maxRound || 2;

    for (const s of gtpStandings) {
      insertStanding.run(round, s.name, null, s.points, s.position);
    }

    console.log(`Updated ${gtpStandings.length} GTP driver standings for round ${round}`);
    db.close();
  } else {
    console.log("\nDry run complete. To apply changes, run:");
    console.log("  npm run update-results -- --apply");
  }

  console.log("Done!");
}

updateDatabase().catch(console.error);