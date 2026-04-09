import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, and, desc, asc } from "drizzle-orm";
import {
  races, raceResults, standings, stints, pitStops, driverProfiles,
  type Race, type InsertRace,
  type RaceResult, type InsertRaceResult,
  type Standing, type InsertStanding,
  type Stint, type InsertStint,
  type PitStop, type InsertPitStop,
  type DriverProfile, type InsertDriverProfile,
} from "@shared/schema";

const sqlite = new Database("imsa.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite);

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS races (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    round INTEGER NOT NULL,
    name TEXT NOT NULL,
    circuit TEXT NOT NULL,
    date TEXT NOT NULL,
    laps INTEGER,
    type TEXT NOT NULL,
    safety_cars INTEGER DEFAULT 0,
    red_flags INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS race_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race_id INTEGER NOT NULL,
    car_class TEXT NOT NULL,
    position INTEGER NOT NULL,
    car_number TEXT NOT NULL,
    drivers TEXT NOT NULL,
    team TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    chassis_model TEXT NOT NULL,
    laps_completed INTEGER NOT NULL,
    time_or_gap TEXT,
    pit_stops INTEGER,
    points INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Finished',
    quali_position INTEGER,
    positions_gained INTEGER
  );
  CREATE TABLE IF NOT EXISTS standings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    after_round INTEGER NOT NULL,
    car_class TEXT NOT NULL,
    type TEXT NOT NULL,
    entity_name TEXT NOT NULL,
    team TEXT,
    points INTEGER NOT NULL,
    wins INTEGER DEFAULT 0,
    podiums INTEGER DEFAULT 0,
    position INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS stints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race_id INTEGER NOT NULL,
    car_number TEXT NOT NULL,
    car_class TEXT NOT NULL,
    stint_number INTEGER NOT NULL,
    driver TEXT NOT NULL,
    laps INTEGER NOT NULL,
    avg_lap_time REAL,
    best_lap REAL,
    tire_compound TEXT
  );
  CREATE TABLE IF NOT EXISTS pit_stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race_id INTEGER NOT NULL,
    car_number TEXT NOT NULL,
    car_class TEXT NOT NULL,
    lap INTEGER NOT NULL,
    duration REAL NOT NULL,
    driver_in TEXT,
    driver_out TEXT,
    tire_change INTEGER DEFAULT 1,
    fuel_only INTEGER DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS driver_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    nationality TEXT,
    team TEXT NOT NULL,
    car_class TEXT NOT NULL,
    car_number TEXT NOT NULL,
    total_points INTEGER DEFAULT 0,
    avg_finish REAL,
    avg_quali REAL,
    best_finish INTEGER,
    wins INTEGER DEFAULT 0,
    podiums INTEGER DEFAULT 0,
    dnfs INTEGER DEFAULT 0,
    races_entered INTEGER DEFAULT 0,
    positions_gained_avg REAL,
    form_trend TEXT,
    reliability_score REAL
  );
`);

export interface IStorage {
  // Races
  getRaces(): Race[];
  getRace(id: number): Race | undefined;
  createRace(data: InsertRace): Race;

  // Results
  getResultsByRace(raceId: number): RaceResult[];
  getResultsByClass(raceId: number, carClass: string): RaceResult[];
  createResult(data: InsertRaceResult): RaceResult;

  // Standings
  getStandings(afterRound: number, carClass: string, type: string): Standing[];
  getLatestStandings(carClass: string, type: string): Standing[];
  createStanding(data: InsertStanding): Standing;

  // Stints
  getStintsByRace(raceId: number): Stint[];
  createStint(data: InsertStint): Stint;

  // Pit Stops
  getPitStopsByRace(raceId: number): PitStop[];
  createPitStop(data: InsertPitStop): PitStop;

  // Driver Profiles
  getDriverProfiles(carClass?: string): DriverProfile[];
  getDriverProfile(name: string): DriverProfile | undefined;
  createDriverProfile(data: InsertDriverProfile): DriverProfile;
  
  // Seed check
  isSeeded(): boolean;
}

export class DatabaseStorage implements IStorage {
  getRaces(): Race[] {
    return db.select().from(races).orderBy(asc(races.round)).all();
  }

  getRace(id: number): Race | undefined {
    return db.select().from(races).where(eq(races.id, id)).get();
  }

  createRace(data: InsertRace): Race {
    return db.insert(races).values(data).returning().get();
  }

  getResultsByRace(raceId: number): RaceResult[] {
    return db.select().from(raceResults).where(eq(raceResults.raceId, raceId)).orderBy(asc(raceResults.position)).all();
  }

  getResultsByClass(raceId: number, carClass: string): RaceResult[] {
    return db.select().from(raceResults)
      .where(and(eq(raceResults.raceId, raceId), eq(raceResults.carClass, carClass)))
      .orderBy(asc(raceResults.position))
      .all();
  }

  createResult(data: InsertRaceResult): RaceResult {
    return db.insert(raceResults).values(data).returning().get();
  }

  getStandings(afterRound: number, carClass: string, type: string): Standing[] {
    return db.select().from(standings)
      .where(and(eq(standings.afterRound, afterRound), eq(standings.carClass, carClass), eq(standings.type, type)))
      .orderBy(asc(standings.position))
      .all();
  }

  getLatestStandings(carClass: string, type: string): Standing[] {
    const maxRound = db.select().from(standings).orderBy(desc(standings.afterRound)).get();
    if (!maxRound) return [];
    return this.getStandings(maxRound.afterRound, carClass, type);
  }

  createStanding(data: InsertStanding): Standing {
    return db.insert(standings).values(data).returning().get();
  }

  getStintsByRace(raceId: number): Stint[] {
    return db.select().from(stints).where(eq(stints.raceId, raceId)).orderBy(asc(stints.stintNumber)).all();
  }

  createStint(data: InsertStint): Stint {
    return db.insert(stints).values(data).returning().get();
  }

  getPitStopsByRace(raceId: number): PitStop[] {
    return db.select().from(pitStops).where(eq(pitStops.raceId, raceId)).orderBy(asc(pitStops.lap)).all();
  }

  createPitStop(data: InsertPitStop): PitStop {
    return db.insert(pitStops).values(data).returning().get();
  }

  getDriverProfiles(carClass?: string): DriverProfile[] {
    if (carClass) {
      return db.select().from(driverProfiles).where(eq(driverProfiles.carClass, carClass)).orderBy(desc(driverProfiles.totalPoints)).all();
    }
    return db.select().from(driverProfiles).orderBy(desc(driverProfiles.totalPoints)).all();
  }

  getDriverProfile(name: string): DriverProfile | undefined {
    return db.select().from(driverProfiles).where(eq(driverProfiles.name, name)).get();
  }

  createDriverProfile(data: InsertDriverProfile): DriverProfile {
    return db.insert(driverProfiles).values(data).returning().get();
  }

  isSeeded(): boolean {
    const count = db.select().from(races).all();
    return count.length > 0;
  }
}

export const storage = new DatabaseStorage();
