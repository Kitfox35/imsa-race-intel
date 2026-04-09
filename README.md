# 🏁 IMSA Intel

**Real-time IMSA WeatherTech SportsCar Championship race intelligence dashboard**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-imsa--race--intel.onrender.com-blue?style=for-the-badge&logo=render)](https://imsa-race-intel.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Kitfox35%2Fimsa--race--intel-181717?style=for-the-badge&logo=github)](https://github.com/Kitfox35/imsa-race-intel)

---

## 📖 About

IMSA Intel tracks the full 2026 IMSA WeatherTech SportsCar Championship season — results, standings, strategy data, and trend analysis across all four classes: GTP, LMP2, GTD Pro, and GTD. Dark motorsport-themed UI with animated transitions, built as a portfolio project.

---

## ✨ Features

### 📊 Dashboard
- **Season KPIs** — current GTP leader, next race, manufacturer count, title margin
- **Live standings table** — full GTP driver championship with points and wins
- **Manufacturer battle** — color-coded progress bars for Porsche, Cadillac, BMW, Acura
- **11-round calendar** with endurance/sprint labels

### 📰 Race Week Briefing
- **Auto-generated race summary** for the latest completed round
- **Class winners** across GTP, LMP2, GTD Pro, GTD
- **Over/underperformers** — biggest position gainers and losers
- **Full results table** with class filter tabs

### 🏆 Title Fight Analysis
- **Championship contenders** with points, wins, podiums per driver
- **Points gap to leader** — horizontal bar chart visualization
- **Season narrative** — auto-generated championship storyline
- **Manufacturer and team standings**

### 📈 Trend Dashboard
- **Driver performance table** with form trend arrows (up/down/stable)
- **Reliability scores** per driver
- **Qualifying vs race position** comparison chart

### 🔧 Strategy Dashboard
- **Stint length analysis** per car
- **Pit stop efficiency comparison** across teams
- **Tire compound usage breakdown**
- **Full stint detail table** with lap times

### 🔍 Race Explorer
- **Browse all 11 rounds** — separated into endurance and sprint categories
- **Detailed race view** — class tabs, full classification, stint breakdown, pit stop log
- **Safety car and red flag indicators**

### 🏎️ Teams & Cars
- **Full 2026 lineup** — every team, car number, and chassis across all classes
- **Manufacturer color coding** — Porsche red, Cadillac yellow, BMW blue, etc.
- **Staggered card animations** on page load

### 🛡️ Race Admin (Password Protected)
- **Step-by-step form** — select race, select class, paste results
- **Live preview table** — parsed results shown before submission
- **CSV-style input** — one line per car, simple format
- **Race info fields** — total laps, safety cars, red flags
- **Animated lock screen** — shield wiggle, shake on wrong password, green bounce on success
- **Success flash** — spinning checkmark animation on save

### ⚡ Animations
- **Page transitions** — fade-in on every route change via Framer Motion
- **Staggered card entry** on Teams & Cars page
- **Admin micro-interactions** — input shake, shield bounce, spring physics on checkmark
- **Hover effects** throughout — cards, nav items, table rows

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 7 |
| Styling | Tailwind CSS 3, shadcn/ui (Radix UI) |
| Animations | Framer Motion |
| Charts | Recharts |
| Routing | wouter (hash-based) |
| Data Fetching | TanStack Query v5 |
| Backend | Express 5 |
| Database | SQLite (better-sqlite3) + Drizzle ORM |
| Hosting | Render (free tier) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 20+** — install via [nvm](https://github.com/nvm-sh/nvm) or [nodejs.org](https://nodejs.org)
- **Git** — [git-scm.com](https://git-scm.com)

### Local Setup

**1. Clone the repo**
```bash
git clone https://github.com/Kitfox35/imsa-race-intel.git
cd imsa-race-intel
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the dev server**
```bash
npm run dev
```

The app will be available at `http://localhost:5000`. The SQLite database is created and seeded automatically on first run with 2026 season data.

> **Windows users:** If you get a `NODE_ENV` error, run `npm install cross-env` and change the dev script in `package.json` to `"dev": "cross-env NODE_ENV=development tsx server/index.ts"`

---

## 📁 Project Structure
imsa-race-intel/
├── client/src/
│ ├── App.tsx # Routing & sidebar navigation
│ ├── index.css # Dark motorsport theme
│ └── pages/
│ ├── dashboard.tsx # Main dashboard
│ ├── race-week.tsx # Race briefing
│ ├── title-fight.tsx # Championship battle
│ ├── trends.tsx # Driver performance
│ ├── strategy.tsx # Pit/stint analysis
│ ├── race-explorer.tsx# Browse all races
│ ├── teams.tsx # Teams & cars lineup
│ └── admin.tsx # Password-protected admin
├── server/
│ ├── routes.ts # API endpoints
│ ├── storage.ts # Database queries (Drizzle)
│ ├── seed.ts # 2026 season data
│ └── fetch-results.ts # Wikipedia data fetcher (experimental)
├── shared/
│ └── schema.ts # Database schema (6 tables)
└── package.json

text

---

## 🗄️ Database

SQLite with Drizzle ORM. The `imsa.db` file is auto-created on first run — not tracked in git.

| Table | Description |
|-------|-------------|
| `races` | 11-round schedule with dates, circuits, lap counts |
| `race_results` | Full classification per race per class |
| `standings` | Championship points after each round |
| `driver_profiles` | Driver stats, form trend, reliability |
| `stints` | Stint-level data (laps, lap times, tire compound) |
| `pit_stops` | Individual pit stop log (duration, driver changes) |

**Reset the database:**
```bash
del imsa.db          # Windows
rm imsa.db           # macOS/Linux
npm run dev          # re-seeds automatically
```

---

## 📝 Adding Race Results

### Option 1: Admin Page (Recommended)

1. Navigate to `/#/admin`
2. Enter password: `admin`
3. Select race and class
4. Paste results — one line per car:
1, #7, Nasr / Andlauer / Heinrich, Porsche Penske Motorsport, Porsche 963, 75, Winner, 350
2, #31, Aitken / Bamber / Vesti, Whelen Cadillac Racing, Cadillac V-Series.R, 75, +3.2s, 320
3, #24, Van der Linde / Vanthoor, BMW M Team WRT, BMW M Hybrid V8, 75, +12.9s, 300

text
5. Preview the parsed table and click **Submit**

### Option 2: Edit Seed Data

1. Edit `server/seed.ts`
2. Delete `imsa.db`
3. Restart the server

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/races` | All 11 races |
| GET | `/api/races/:id` | Single race details |
| GET | `/api/races/:id/results` | Race results (all classes) |
| GET | `/api/races/:id/results/:class` | Results filtered by class |
| GET | `/api/standings/:class/:type` | Standings (driver/team/manufacturer) |
| GET | `/api/races/:id/stints` | Stint data for a race |
| GET | `/api/races/:id/pitstops` | Pit stop log for a race |
| GET | `/api/drivers` | All driver profiles |
| GET | `/api/dashboard` | Dashboard summary |
| POST | `/api/admin/results` | Add race results |
| POST | `/api/admin/race-laps` | Update race completion data |

---

## 🏁 2026 Season Data

### Completed Rounds

| Rnd | Race | GTP Winner |
|-----|------|-----------|
| 1 | Rolex 24 at Daytona | #7 Porsche Penske — Nasr / Andlauer / Heinrich |
| 2 | 12 Hours of Sebring | #7 Porsche Penske — Nasr / Andlauer / Heinrich |

### Championship Leaders (after Round 2)

| Class | Leader | Points |
|-------|--------|--------|
| GTP | #7 Porsche Penske Motorsport | 760 |
| LMP2 | #22 United Autosports | — |
| GTD Pro | #1 Paul Miller Racing (BMW) | — |
| GTD | #27 Heart of Racing (Aston Martin) | — |

---

## 🚢 Deployment

Hosted on **Render** (free tier) with auto-deploy from GitHub.

| Setting | Value |
|---------|-------|
| Build Command | `npm install --include=dev && chmod +x ./node_modules/.bin/tsx && npx tsx script/build.ts` |
| Start Command | `npm run start` |
| Instance Type | Free |

Push to `main` and Render deploys automatically.

> Free tier spins down after 15 min of inactivity — first visit after idle takes ~30s to wake up.

---

## 👤 Author

Built by **Zayd Mohammad** — [Kitfox35 on GitHub](https://github.com/Kitfox35)

---

> IMSA Intel is not affiliated with or endorsed by IMSA. Race data is sourced from publicly available results.
