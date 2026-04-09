# 🏁 IMSA Intel

**Race intelligence dashboard for the 2026 IMSA WeatherTech SportsCar Championship**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-imsa--race--intel.onrender.com-blue?style=for-the-badge&logo=render)](https://imsa-race-intel.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Kitfox35%2Fimsa--race--intel-181717?style=for-the-badge&logo=github)](https://github.com/Kitfox35/imsa-race-intel)

---

## 📖 About

I built this because I wanted a clean way to follow IMSA. It pulls together race results, championship standings, pit strategy breakdowns, and driver trends in one dark-themed dashboard.

Covers all four classes: GTP, LMP2, GTD Pro, and GTD. Currently has the first two rounds of the 2026 season (Daytona and Sebring) with the rest of the calendar ready to go.

---

## ✨ What It Does

### 📊 Dashboard
- GTP leader, next race, title margin, and manufacturer standings at a glance
- Full 11-round calendar with endurance/sprint tags
- Standings table that updates as you add results

### 📰 Race Week Briefing
- Pick any race from the dropdown and get a summary — who won each class, who gained or lost the most positions, full results table
- Class filter so you can look at just GTP, just GTD, whatever

### 🏆 Title Fight
- Shows every championship contender with their points, wins, podiums
- Bar chart of how far behind the leader each driver is
- Written summary of how the season is going so far

### 📈 Trends
- Driver stats table — average finish, average quali, reliability %, form trend arrows
- Quick way to see who's been consistent and who's been falling off

### 🔧 Strategy
- Stint lengths, pit stop durations, tire compound choices
- If you're into the nerdy side of endurance racing this page is for you

### 🔍 Race Explorer
- Browse every round — click into any race and get the full breakdown by class, stint data, pit stop log
- Endurance and sprint races separated

### 🏎️ Teams & Cars
- Every team, their car numbers, and what chassis they run
- Grouped by class with manufacturer color coding
- Cards animate in on load which looks pretty clean

### 🛡️ Race Admin
- Password-locked page where I can add new results after each race
- Paste results in a simple CSV format, see a preview table, hit submit
- Has some fun animations — the shield icon bounces when you enter the right password, shakes when you get it wrong

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 7 |
| Styling | Tailwind CSS 3, shadcn/ui |
| Animations | Framer Motion |
| Charts | Recharts |
| Routing | wouter |
| Data Fetching | TanStack Query v5 |
| Backend | Express 5 |
| Database | SQLite + Drizzle ORM |
| Hosting | Render (free tier) |

---

## 🚀 Setup

### You need
- **Node.js 20+** — grab it from [nodejs.org](https://nodejs.org) or use nvm
- **Git**

### Run it locally

```bash
git clone https://github.com/Kitfox35/imsa-race-intel.git
cd imsa-race-intel
npm install
npm run dev
```

Go to `http://localhost:5000`. The database seeds itself on first run — you don't need to set anything up.

> **Windows:** if `npm run dev` throws a `NODE_ENV` error, do `npm install cross-env` and change the dev script in package.json to `"dev": "cross-env NODE_ENV=development tsx server/index.ts"`

---
## 🗄️ Database

SQLite file (`imsa.db`) gets auto-created when you start the server. Not tracked in git.

| Table | What's in it |
|-------|-------------|
| `races` | All 11 rounds — dates, circuits, lap counts |
| `race_results` | Full finishing order per race per class |
| `standings` | Championship points after each round |
| `driver_profiles` | Stats like avg finish, reliability, form trend |
| `stints` | Lap-by-lap stint data with tire compounds |
| `pit_stops` | Every pit stop — duration, driver in/out, tire change |

**To reset:** delete `imsa.db` and restart. It re-seeds automatically.

---

## 📝 Adding New Results

After a race weekend, go to `/#/admin`, enter the password (`admin`), pick the race and class, and paste the results like this:
1, #7, Nasr / Andlauer / Heinrich, Porsche Penske Motorsport, Porsche 963, 75, Winner, 350
2, #31, Aitken / Bamber / Vesti, Whelen Cadillac Racing, Cadillac V-Series.R, 75, +3.2s, 320
3, #24, Van der Linde / Vanthoor, BMW M Team WRT, BMW M Hybrid V8, 75, +12.9s, 300

text

It shows you a preview table before you submit. Pretty hard to mess up.

---

## 🌐 API

| Method | Endpoint | What it returns |
|--------|----------|----------------|
| GET | `/api/races` | All 11 races |
| GET | `/api/races/:id` | One race |
| GET | `/api/races/:id/results` | Results for a race |
| GET | `/api/standings/:class/:type` | Standings by class |
| GET | `/api/races/:id/stints` | Stint data |
| GET | `/api/races/:id/pitstops` | Pit stop log |
| GET | `/api/drivers` | All driver profiles |
| GET | `/api/dashboard` | Dashboard summary |
| POST | `/api/admin/results` | Submit new results |
| POST | `/api/admin/race-laps` | Mark a race as completed |

---

## 🏁 Current Season Data

**Rounds completed:** 2 of 11

| Rnd | Race | GTP Winner |
|-----|------|-----------|
| 1 | Rolex 24 at Daytona | #7 Porsche Penske — Nasr / Andlauer / Heinrich |
| 2 | 12 Hours of Sebring | #7 Porsche Penske — Nasr / Andlauer / Heinrich |

Porsche Penske's #7 crew has swept both opening rounds. Next up is Long Beach on April 18.

---

## 🚢 Deployment

On Render, free tier. Auto-deploys from GitHub on every push.

| Setting | Value |
|---------|-------|
| Build Command | `npm install --include=dev && chmod +x ./node_modules/.bin/tsx && npx tsx script/build.ts` |
| Start Command | `npm run start` |

> Heads up — free tier sleeps after 15 min of no traffic. First load after that takes ~30 sec.

---

## 👤 Author

Built by **Zayd Mohammad** — [@Kitfox35](https://github.com/Kitfox35)

---

> Not affiliated with IMSA. Data sourced from publicly available race results

