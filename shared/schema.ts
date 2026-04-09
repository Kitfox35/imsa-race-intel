import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Races table
export const races = sqliteTable("races", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  round: integer("round").notNull(),
  name: text("name").notNull(),
  circuit: text("circuit").notNull(),
  date: text("date").notNull(),
  laps: integer("laps"),
  type: text("type").notNull(), // "sprint" | "endurance"
  safetyCars: integer("safety_cars").default(0),
  redFlags: integer("red_flags").default(0),
});

// Race Results
export const raceResults = sqliteTable("race_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  raceId: integer("race_id").notNull(),
  carClass: text("car_class").notNull(), // GTP, LMP2, GTD_PRO, GTD
  position: integer("position").notNull(),
  carNumber: text("car_number").notNull(),
  drivers: text("drivers").notNull(), // JSON array of driver names
  team: text("team").notNull(),
  manufacturer: text("manufacturer").notNull(),
  chassisModel: text("chassis_model").notNull(),
  lapsCompleted: integer("laps_completed").notNull(),
  timeOrGap: text("time_or_gap"),
  pitStops: integer("pit_stops"),
  points: integer("points").default(0),
  status: text("status").default("Finished"), // Finished, DNF, DNS, DSQ
  qualiPosition: integer("quali_position"),
  positionsGained: integer("positions_gained"),
});

// Championship Standings (precomputed per round)
export const standings = sqliteTable("standings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  afterRound: integer("after_round").notNull(),
  carClass: text("car_class").notNull(),
  type: text("type").notNull(), // "driver" | "team" | "manufacturer"
  entityName: text("entity_name").notNull(),
  team: text("team"),
  points: integer("points").notNull(),
  wins: integer("wins").default(0),
  podiums: integer("podiums").default(0),
  position: integer("position").notNull(),
});

// Stint Data
export const stints = sqliteTable("stints", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  raceId: integer("race_id").notNull(),
  carNumber: text("car_number").notNull(),
  carClass: text("car_class").notNull(),
  stintNumber: integer("stint_number").notNull(),
  driver: text("driver").notNull(),
  laps: integer("laps").notNull(),
  avgLapTime: real("avg_lap_time"), // seconds
  bestLap: real("best_lap"),
  tireCompound: text("tire_compound"),
});

// Pit Stops
export const pitStops = sqliteTable("pit_stops", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  raceId: integer("race_id").notNull(),
  carNumber: text("car_number").notNull(),
  carClass: text("car_class").notNull(),
  lap: integer("lap").notNull(),
  duration: real("duration").notNull(), // seconds
  driverIn: text("driver_in"),
  driverOut: text("driver_out"),
  tireChange: integer("tire_change").default(1), // boolean
  fuelOnly: integer("fuel_only").default(0),
});

// Driver Profiles (aggregated stats)
export const driverProfiles = sqliteTable("driver_profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  nationality: text("nationality"),
  team: text("team").notNull(),
  carClass: text("car_class").notNull(),
  carNumber: text("car_number").notNull(),
  totalPoints: integer("total_points").default(0),
  avgFinish: real("avg_finish"),
  avgQuali: real("avg_quali"),
  bestFinish: integer("best_finish"),
  wins: integer("wins").default(0),
  podiums: integer("podiums").default(0),
  dnfs: integer("dnfs").default(0),
  racesEntered: integer("races_entered").default(0),
  positionsGainedAvg: real("positions_gained_avg"),
  formTrend: text("form_trend"), // "up" | "down" | "stable"
  reliabilityScore: real("reliability_score"), // 0-100
});

export const insertRaceSchema = createInsertSchema(races).omit({ id: true });
export const insertRaceResultSchema = createInsertSchema(raceResults).omit({ id: true });
export const insertStandingSchema = createInsertSchema(standings).omit({ id: true });
export const insertStintSchema = createInsertSchema(stints).omit({ id: true });
export const insertPitStopSchema = createInsertSchema(pitStops).omit({ id: true });
export const insertDriverProfileSchema = createInsertSchema(driverProfiles).omit({ id: true });

export type Race = typeof races.$inferSelect;
export type InsertRace = z.infer<typeof insertRaceSchema>;
export type RaceResult = typeof raceResults.$inferSelect;
export type InsertRaceResult = z.infer<typeof insertRaceResultSchema>;
export type Standing = typeof standings.$inferSelect;
export type InsertStanding = z.infer<typeof insertStandingSchema>;
export type Stint = typeof stints.$inferSelect;
export type InsertStint = z.infer<typeof insertStintSchema>;
export type PitStop = typeof pitStops.$inferSelect;
export type InsertPitStop = z.infer<typeof insertPitStopSchema>;
export type DriverProfile = typeof driverProfiles.$inferSelect;
export type InsertDriverProfile = z.infer<typeof insertDriverProfileSchema>;
