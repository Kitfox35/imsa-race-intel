import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { seedDatabase } from "./seed";

export async function registerRoutes(server: Server, app: Express) {
  // Seed database on startup
  seedDatabase();

  // Races
  app.get("/api/races", (_req, res) => {
    const races = storage.getRaces();
    res.json(races);
  });

  app.get("/api/races/:id", (req, res) => {
    const race = storage.getRace(parseInt(req.params.id));
    if (!race) return res.status(404).json({ error: "Race not found" });
    res.json(race);
  });

  // Results
  app.get("/api/races/:id/results", (req, res) => {
    const results = storage.getResultsByRace(parseInt(req.params.id));
    res.json(results);
  });

  app.get("/api/races/:id/results/:carClass", (req, res) => {
    const results = storage.getResultsByClass(parseInt(req.params.id), req.params.carClass);
    res.json(results);
  });

  // Standings
  app.get("/api/standings/:carClass/:type", (req, res) => {
    const round = req.query.round ? parseInt(req.query.round as string) : undefined;
    let standingsData;
    if (round) {
      standingsData = storage.getStandings(round, req.params.carClass, req.params.type);
    } else {
      standingsData = storage.getLatestStandings(req.params.carClass, req.params.type);
    }
    res.json(standingsData);
  });

  // Stints
  app.get("/api/races/:id/stints", (req, res) => {
    const stintData = storage.getStintsByRace(parseInt(req.params.id));
    res.json(stintData);
  });

  // Pit Stops
  app.get("/api/races/:id/pitstops", (req, res) => {
    const pitStopData = storage.getPitStopsByRace(parseInt(req.params.id));
    res.json(pitStopData);
  });

  // Driver Profiles
  app.get("/api/drivers", (req, res) => {
    const carClass = req.query.class as string | undefined;
    const drivers = storage.getDriverProfiles(carClass);
    res.json(drivers);
  });

  app.get("/api/drivers/:name", (req, res) => {
    const driver = storage.getDriverProfile(decodeURIComponent(req.params.name));
    if (!driver) return res.status(404).json({ error: "Driver not found" });
    res.json(driver);
  });

  // Dashboard summary
  app.get("/api/dashboard", (_req, res) => {
    const races = storage.getRaces();
    // Find latest race that has results (laps > 0)
    const completedRaces = races.filter((r: any) => r.laps > 0);
    const latestRace = completedRaces.length > 0 ? completedRaces[completedRaces.length - 1] : races[0];
    const latestResults = latestRace ? storage.getResultsByRace(latestRace.id) : [];
    const gtpStandings = storage.getLatestStandings("GTP", "driver");
    const gtpTeams = storage.getLatestStandings("GTP", "team");
    const mfgStandings = storage.getLatestStandings("GTP", "manufacturer");
    // Find next upcoming race
    const upcomingRaces = races.filter((r: any) => r.laps === 0);
    const nextRace = upcomingRaces.length > 0 ? upcomingRaces[0] : null;
    
    res.json({
      totalRaces: races.length,
      completedRounds: completedRaces.length,
      latestRace,
      nextRace,
      latestResults,
      gtpDriverStandings: gtpStandings.slice(0, 10),
      gtpTeamStandings: gtpTeams.slice(0, 10),
      manufacturerStandings: mfgStandings,
      seasonComplete: completedRaces.length === races.length,
    });
  });
}
