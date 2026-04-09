import { storage } from "./storage";

export function seedDatabase() {
  if (storage.isSeeded()) return;

  // ==================== RACES ====================
  const raceData = [
    { round: 1, name: "Rolex 24 at Daytona", circuit: "Daytona International Speedway", date: "2026-01-25", laps: 705, type: "endurance", safetyCars: 9, redFlags: 1 },
    { round: 2, name: "Mobil 1 Twelve Hours of Sebring", circuit: "Sebring International Raceway", date: "2026-03-21", laps: 343, type: "endurance", safetyCars: 6, redFlags: 0 },
    { round: 3, name: "Acura Grand Prix of Long Beach", circuit: "Long Beach Street Circuit", date: "2026-04-18", laps: 0, type: "sprint", safetyCars: 0, redFlags: 0 },
    { round: 4, name: "Monterey SportsCar Championship", circuit: "WeatherTech Raceway Laguna Seca", date: "2026-05-03", laps: 0, type: "sprint", safetyCars: 0, redFlags: 0 },
    { round: 5, name: "Chevrolet Detroit Sports Car Classic", circuit: "Detroit Street Circuit", date: "2026-05-30", laps: 0, type: "sprint", safetyCars: 0, redFlags: 0 },
    { round: 6, name: "Sahlen's Six Hours of The Glen", circuit: "Watkins Glen International", date: "2026-06-28", laps: 0, type: "endurance", safetyCars: 0, redFlags: 0 },
    { round: 7, name: "Chevrolet Grand Prix", circuit: "Canadian Tire Motorsport Park", date: "2026-07-12", laps: 0, type: "sprint", safetyCars: 0, redFlags: 0 },
    { round: 8, name: "Motul SportsCar Endurance Grand Prix", circuit: "Road America", date: "2026-08-02", laps: 0, type: "endurance", safetyCars: 0, redFlags: 0 },
    { round: 9, name: "Michelin GT Challenge at VIR", circuit: "Virginia International Raceway", date: "2026-08-23", laps: 0, type: "sprint", safetyCars: 0, redFlags: 0 },
    { round: 10, name: "TireRack.com Battle on the Bricks", circuit: "Indianapolis Motor Speedway", date: "2026-09-20", laps: 0, type: "sprint", safetyCars: 0, redFlags: 0 },
    { round: 11, name: "Motul Petit Le Mans", circuit: "Michelin Raceway Road Atlanta", date: "2026-10-03", laps: 0, type: "endurance", safetyCars: 0, redFlags: 0 },
  ];

  const createdRaces: any[] = [];
  for (const r of raceData) {
    createdRaces.push(storage.createRace(r));
  }

  // ==================== ROUND 1: DAYTONA RESULTS ====================

  // Round 1: Rolex 24 at Daytona - GTP
  const gtpDaytona = [
    { pos: 1, car: "7", drivers: '["Felipe Nasr","Julien Andlauer","Laurin Heinrich"]', team: "Porsche Penske Motorsport", mfg: "Porsche", chassis: "Porsche 963", laps: 705, gap: "24:01:20.000", pits: 30, pts: 350, status: "Finished", quali: 3, gained: 2 },
    { pos: 2, car: "31", drivers: '["Jack Aitken","Earl Bamber","Frederik Vesti","Jak Zilisch"]', team: "Whelen Cadillac Racing", mfg: "Cadillac", chassis: "Cadillac V-Series.R", laps: 705, gap: "+1.569", pits: 30, pts: 320, status: "Finished", quali: 2, gained: 0 },
    { pos: 3, car: "24", drivers: '["Sheldon van der Linde","Dries Vanthoor","Robin Frijns","Rene Rast"]', team: "BMW M Team WRT", mfg: "BMW", chassis: "BMW M Hybrid V8", laps: 705, gap: "+21.386", pits: 30, pts: 300, status: "Finished", quali: 5, gained: 2 },
    { pos: 4, car: "6", drivers: '["Laurens Vanthoor","Kevin Estre","Matt Campbell"]', team: "Porsche Penske Motorsport", mfg: "Porsche", chassis: "Porsche 963", laps: 705, gap: "+31.822", pits: 29, pts: 280, status: "Finished", quali: 1, gained: -3 },
    { pos: 5, car: "93", drivers: '["Renger van der Zande","Nick Yelloly","Alex Palou","Kaku Ohta"]', team: "Acura Meyer Shank Racing", mfg: "Acura", chassis: "Acura ARX-06", laps: 705, gap: "+45.677", pits: 30, pts: 260, status: "Finished", quali: 6, gained: 1 },
    { pos: 6, car: "40", drivers: '["Jordan Taylor","Louis Deletraz","Colton Herta"]', team: "Wayne Taylor Racing", mfg: "Cadillac", chassis: "Cadillac V-Series.R", laps: 705, gap: "+54.017", pits: 31, pts: 250, status: "Finished", quali: 7, gained: 1 },
    { pos: 7, car: "85", drivers: '["Tim van der Helm","Nicky Pino","Ben Frederick","Juri Aron"]', team: "JDC/Miller Motorsports", mfg: "Porsche", chassis: "Porsche 963", laps: 705, gap: "+1:10.736", pits: 30, pts: 230, status: "Finished", quali: 9, gained: 2 },
    { pos: 8, car: "25", drivers: '["Raffaele Marciello","Philipp Eng","Marco Wittmann","Kevin Magnussen"]', team: "BMW M Team WRT", mfg: "BMW", chassis: "BMW M Hybrid V8", laps: 705, gap: "+1:13.443", pits: 31, pts: 220, status: "Finished", quali: 8, gained: 0 },
    { pos: 9, car: "60", drivers: '["Tom Blomqvist","Colin Braun","Scott Dixon","AJ Allmendinger"]', team: "Acura Meyer Shank Racing", mfg: "Acura", chassis: "Acura ARX-06", laps: 705, gap: "+1:22.563", pits: 30, pts: 210, status: "Finished", quali: 4, gained: -5 },
    { pos: 10, car: "10", drivers: '["Ricky Taylor","Filipe Albuquerque","Will Stevens","Brendon Hartley"]', team: "Wayne Taylor Racing", mfg: "Cadillac", chassis: "Cadillac V-Series.R", laps: 629, gap: "DNF", pits: 22, pts: 50, status: "DNF", quali: 10, gained: 0 },
  ];

  for (const r of gtpDaytona) {
    storage.createResult({ raceId: createdRaces[0].id, carClass: "GTP", position: r.pos, carNumber: r.car, drivers: r.drivers, team: r.team, manufacturer: r.mfg, chassisModel: r.chassis, lapsCompleted: r.laps, timeOrGap: r.gap, pitStops: r.pits, points: r.pts, status: r.status, qualiPosition: r.quali, positionsGained: r.gained });
  }

  // Round 1: Rolex 24 at Daytona - LMP2
  const lmp2Daytona = [
    { pos: 1, car: "04", drivers: '["Ben Kurtz","Matt Quinn","Sam Sowery","Malthe Jakobsen"]', team: "CrowdStrike Racing by APR", mfg: "ORECA", chassis: "ORECA 07", laps: 686, gap: "24:01:20.000", pits: 28, pts: 350, status: "Finished", quali: 1, gained: 0 },
    { pos: 2, car: "43", drivers: '["Tom Dillmann","Yuven Garg","Antonio Felix da Costa","Oliver Clarke"]', team: "Inter Europol Competition", mfg: "ORECA", chassis: "ORECA 07", laps: 686, gap: "+8.342", pits: 28, pts: 320, status: "Finished", quali: 3, gained: 1 },
    { pos: 3, car: "343", drivers: '["Jakub Smiechowski","Elias Kolovos","Henning Siegel","Nick Cassidy"]', team: "Inter Europol Competition", mfg: "ORECA", chassis: "ORECA 07", laps: 685, gap: "+1 Lap", pits: 28, pts: 300, status: "Finished", quali: 4, gained: 1 },
    { pos: 4, car: "22", drivers: '["Matt Goldburg","Paul di Resta","Rasmus Lindh","Gregory Saucy"]', team: "United Autosports", mfg: "ORECA", chassis: "ORECA 07", laps: 685, gap: "+1 Lap", pits: 28, pts: 280, status: "Finished", quali: 5, gained: 1 },
    { pos: 5, car: "99", drivers: '["PJ Hyett","Jon Cameron","Harry Edgar","Oliver Rasmussen"]', team: "AO Racing", mfg: "ORECA", chassis: "ORECA 07", laps: 685, gap: "+1 Lap", pits: 29, pts: 260, status: "Finished", quali: 6, gained: 1 },
    { pos: 6, car: "52", drivers: '["Mikkel Goikhberg","Ben Keating","Parker Thompson","Harry Tincknell"]', team: "PR1 Mathiasen", mfg: "ORECA", chassis: "ORECA 07", laps: 685, gap: "+1 Lap", pits: 28, pts: 250, status: "Finished", quali: 7, gained: 1 },
    { pos: 7, car: "37", drivers: '["Richard Field","Oliver Jarvis","Stevan Lucas","Job van Uitert"]', team: "Intersport Racing", mfg: "ORECA", chassis: "ORECA 07", laps: 684, gap: "+2 Laps", pits: 29, pts: 230, status: "Finished", quali: 8, gained: 1 },
    { pos: 8, car: "8", drivers: '["Mikael Farano","Sebastien Bourdais","Roberto Alvarez","Dane Cameron"]', team: "Tower Motorsport", mfg: "ORECA", chassis: "ORECA 07", laps: 676, gap: "+10 Laps", pits: 28, pts: 220, status: "Finished", quali: 2, gained: -6 },
  ];

  for (const r of lmp2Daytona) {
    storage.createResult({ raceId: createdRaces[0].id, carClass: "LMP2", position: r.pos, carNumber: r.car, drivers: r.drivers, team: r.team, manufacturer: r.mfg, chassisModel: r.chassis, lapsCompleted: r.laps, timeOrGap: r.gap, pitStops: r.pits, points: r.pts, status: r.status, qualiPosition: r.quali, positionsGained: r.gained });
  }

  // Round 1: Rolex 24 at Daytona - GTD Pro
  const gtdProDaytona = [
    { pos: 1, car: "1", drivers: '["Bryan Verhagen","Christopher De Phillippi","Max Hesse","Danny Harper"]', team: "Paul Miller Racing", mfg: "BMW", chassis: "BMW M4 GT3 EVO", laps: 662, gap: "24:01:20.000", pits: 26, pts: 350, status: "Finished", quali: 2, gained: 1 },
    { pos: 2, car: "4", drivers: '["Tommy Milner","Nicky Catsburg","Nicolas Varrone","Malthe Jakobsen"]', team: "Corvette Racing", mfg: "Chevrolet", chassis: "Corvette Z06 GT3.R", laps: 662, gap: "+2.411", pits: 26, pts: 320, status: "Finished", quali: 3, gained: 1 },
    { pos: 3, car: "911", drivers: '["Ayhancan Guven","Thomas Preining","Klaus Bachler","Ricardo Feller"]', team: "Manthey", mfg: "Porsche", chassis: "Porsche 911 GT3 R", laps: 662, gap: "+15.882", pits: 26, pts: 300, status: "Finished", quali: 4, gained: 1 },
    { pos: 4, car: "9", drivers: '["Andrea Caldarelli","James Mitchell","Mirko Bortolotti","James Hinchcliffe"]', team: "Pfaff Motorsports", mfg: "Lamborghini", chassis: "Lamborghini Huracan GT3 EVO2", laps: 662, gap: "+28.543", pits: 27, pts: 280, status: "Finished", quali: 5, gained: 1 },
    { pos: 5, car: "65", drivers: '["Alex Mies","Frederic Vervisch","Sebastian Priaulx"]', team: "Ford Racing", mfg: "Ford", chassis: "Ford Mustang GT3", laps: 661, gap: "+1 Lap", pits: 26, pts: 260, status: "Finished", quali: 6, gained: 1 },
    { pos: 6, car: "033", drivers: '["James Calado","Matteo Agostini","Miguel Molina","Andrea Rovera"]', team: "Triarsi Competizione", mfg: "Ferrari", chassis: "Ferrari 296 GT3", laps: 661, gap: "+1 Lap", pits: 27, pts: 250, status: "Finished", quali: 7, gained: 1 },
    { pos: 7, car: "23", drivers: '["Ross Gunn","Roman De Angelis","Alex Riberas","Marco Sorensen"]', team: "Aston Martin THOR Team", mfg: "Aston Martin", chassis: "Aston Martin Valkyrie", laps: 661, gap: "+1 Lap", pits: 27, pts: 230, status: "Finished", quali: 8, gained: 1 },
    { pos: 8, car: "64", drivers: '["unavailable"]', team: "Ford Racing", mfg: "Ford", chassis: "Ford Mustang GT3", laps: 650, gap: "+12 Laps", pits: 26, pts: 220, status: "Finished", quali: 1, gained: -7 },
  ];

  for (const r of gtdProDaytona) {
    storage.createResult({ raceId: createdRaces[0].id, carClass: "GTD_PRO", position: r.pos, carNumber: r.car, drivers: r.drivers, team: r.team, manufacturer: r.mfg, chassisModel: r.chassis, lapsCompleted: r.laps, timeOrGap: r.gap, pitStops: r.pits, points: r.pts, status: r.status, qualiPosition: r.quali, positionsGained: r.gained });
  }

  // Round 1: Rolex 24 at Daytona - GTD
  const gtdDaytona = [
    { pos: 1, car: "57", drivers: '["Russell Ward","Philip Ellis","Dirk Dontje","Lucas Auer"]', team: "Winward Racing", mfg: "Mercedes-AMG", chassis: "Mercedes-AMG GT3", laps: 662, gap: "24:01:20.000", pits: 26, pts: 350, status: "Finished", quali: 2, gained: 1 },
    { pos: 2, car: "75", drivers: '["Maro Engel","Will Power","Marvin Mostert","Mohammad Al Habul"]', team: "75 Express", mfg: "Mercedes-AMG", chassis: "Mercedes-AMG GT3", laps: 662, gap: "+4.821", pits: 26, pts: 320, status: "Finished", quali: 3, gained: 1 },
    { pos: 3, car: "48", drivers: '["David Noble","Colin Hart","Jack Martin","Maximilian Stolz"]', team: "Winward Racing", mfg: "Mercedes-AMG", chassis: "Mercedes-AMG GT3", laps: 662, gap: "+18.334", pits: 26, pts: 300, status: "Finished", quali: 4, gained: 1 },
    { pos: 4, car: "27", drivers: '["Tom Gamble","Rubens Barrichello","Zacharie Robichon","Mattia Drudi"]', team: "Heart Of Racing", mfg: "Aston Martin", chassis: "Aston Martin Vantage GT3 Evo", laps: 661, gap: "+1 Lap", pits: 26, pts: 280, status: "Finished", quali: 5, gained: 1 },
    { pos: 5, car: "13", drivers: '["Ryan Fidani","Jordan Bell","Bill Kern","Bret Green"]', team: "13 Autosport", mfg: "Chevrolet", chassis: "Corvette Z06 GT3.R", laps: 661, gap: "+1 Lap", pits: 27, pts: 260, status: "Finished", quali: 6, gained: 1 },
    { pos: 6, car: "44", drivers: '["Spencer Pumpelly","Nicki Thiim","Andy Snow","Patrick Potter"]', team: "Magnus Racing", mfg: "Aston Martin", chassis: "Aston Martin Vantage GT3 Evo", laps: 661, gap: "+1 Lap", pits: 27, pts: 250, status: "Finished", quali: 1, gained: -5 },
  ];

  for (const r of gtdDaytona) {
    storage.createResult({ raceId: createdRaces[0].id, carClass: "GTD", position: r.pos, carNumber: r.car, drivers: r.drivers, team: r.team, manufacturer: r.mfg, chassisModel: r.chassis, lapsCompleted: r.laps, timeOrGap: r.gap, pitStops: r.pits, points: r.pts, status: r.status, qualiPosition: r.quali, positionsGained: r.gained });
  }

  // ==================== ROUND 2: SEBRING RESULTS ====================

  // Round 2: 12 Hours of Sebring - GTP
  const gtpSebring = [
    { pos: 1, car: "7", drivers: '["Felipe Nasr","Julien Andlauer","Laurin Heinrich"]', team: "Porsche Penske Motorsport", mfg: "Porsche", chassis: "Porsche 963", laps: 343, gap: "12:01:48.000", pits: 12, pts: 350, status: "Finished", quali: 2, gained: 1 },
    { pos: 2, car: "6", drivers: '["Laurens Vanthoor","Kevin Estre","Matt Campbell"]', team: "Porsche Penske Motorsport", mfg: "Porsche", chassis: "Porsche 963", laps: 343, gap: "+1.515", pits: 12, pts: 320, status: "Finished", quali: 1, gained: -1 },
    { pos: 3, car: "10", drivers: '["Ricky Taylor","Filipe Albuquerque","Will Stevens"]', team: "Wayne Taylor Racing", mfg: "Cadillac", chassis: "Cadillac V-Series.R", laps: 343, gap: "+9.402", pits: 12, pts: 300, status: "Finished", quali: 4, gained: 1 },
    { pos: 4, car: "31", drivers: '["Jack Aitken","Earl Bamber","Frederik Vesti"]', team: "Whelen Cadillac Racing", mfg: "Cadillac", chassis: "Cadillac V-Series.R", laps: 343, gap: "+10.377", pits: 12, pts: 280, status: "Finished", quali: 3, gained: -1 },
    { pos: 5, car: "60", drivers: '["Tom Blomqvist","Colin Braun","Scott Dixon"]', team: "Acura Meyer Shank Racing", mfg: "Acura", chassis: "Acura ARX-06", laps: 343, gap: "+11.104", pits: 12, pts: 260, status: "Finished", quali: 6, gained: 1 },
    { pos: 6, car: "24", drivers: '["Dries Vanthoor","Sheldon van der Linde","Robin Frijns"]', team: "BMW M Team WRT", mfg: "BMW", chassis: "BMW M Hybrid V8", laps: 343, gap: "+13.723", pits: 12, pts: 250, status: "Finished", quali: 5, gained: -1 },
    { pos: 7, car: "93", drivers: '["Renger van der Zande","Nick Yelloly","Alex Palou"]', team: "Acura Meyer Shank Racing", mfg: "Acura", chassis: "Acura ARX-06", laps: 343, gap: "+14.819", pits: 12, pts: 230, status: "Finished", quali: 7, gained: 0 },
    { pos: 8, car: "40", drivers: '["Jordan Taylor","Louis Deletraz","Colton Herta"]', team: "Wayne Taylor Racing", mfg: "Cadillac", chassis: "Cadillac V-Series.R", laps: 343, gap: "+16.642", pits: 13, pts: 220, status: "Finished", quali: 8, gained: 0 },
    { pos: 9, car: "5", drivers: '["Tim van der Helm","Nicky Pino","Ben Frederick"]', team: "JDC/Miller Motorsports", mfg: "Porsche", chassis: "Porsche 963", laps: 343, gap: "+24.739", pits: 12, pts: 210, status: "Finished", quali: 9, gained: 0 },
    { pos: 10, car: "25", drivers: '["Philipp Eng","Marco Wittmann","Kevin Magnussen"]', team: "BMW M Team WRT", mfg: "BMW", chassis: "BMW M Hybrid V8", laps: 329, gap: "+14 Laps", pits: 13, pts: 190, status: "Finished", quali: 10, gained: 0 },
  ];

  for (const r of gtpSebring) {
    storage.createResult({ raceId: createdRaces[1].id, carClass: "GTP", position: r.pos, carNumber: r.car, drivers: r.drivers, team: r.team, manufacturer: r.mfg, chassisModel: r.chassis, lapsCompleted: r.laps, timeOrGap: r.gap, pitStops: r.pits, points: r.pts, status: r.status, qualiPosition: r.quali, positionsGained: r.gained });
  }

  // Round 2: 12 Hours of Sebring - LMP2
  const lmp2Sebring = [
    { pos: 1, car: "2", drivers: '["Loic Fayer","Matt McElrea","Tom Jensen"]', team: "United Autosports USA", mfg: "ORECA", chassis: "ORECA 07", laps: 338, gap: "12:01:48.000", pits: 12, pts: 350, status: "Finished", quali: 1, gained: 0 },
    { pos: 2, car: "22", drivers: '["Matt Goldburg","Paul di Resta","Rasmus Lindh"]', team: "United Autosports USA", mfg: "ORECA", chassis: "ORECA 07", laps: 338, gap: "+6.218", pits: 12, pts: 320, status: "Finished", quali: 2, gained: 0 },
    { pos: 3, car: "8", drivers: '["Mikael Farano","Tristan Vautier","Roberto Alvarez"]', team: "Tower Motorsports", mfg: "ORECA", chassis: "ORECA 07", laps: 338, gap: "+12.445", pits: 12, pts: 300, status: "Finished", quali: 4, gained: 1 },
    { pos: 4, car: "18", drivers: '["Anand Rao","Maximilian Habsburg","William Abel"]', team: "Era Motorsport", mfg: "ORECA", chassis: "ORECA 07", laps: 338, gap: "+18.112", pits: 12, pts: 280, status: "Finished", quali: 5, gained: 1 },
    { pos: 5, car: "04", drivers: '["Ben Kurtz","Matt Quinn","Sam Sowery"]', team: "CrowdStrike Racing by APR", mfg: "ORECA", chassis: "ORECA 07", laps: 338, gap: "+22.779", pits: 12, pts: 260, status: "Finished", quali: 3, gained: -2 },
    { pos: 6, car: "99", drivers: '["PJ Hyett","Jon Cameron","Harry Edgar"]', team: "AO Racing", mfg: "ORECA", chassis: "ORECA 07", laps: 338, gap: "+31.005", pits: 12, pts: 250, status: "Finished", quali: 6, gained: 0 },
    { pos: 7, car: "11", drivers: '["Romain Lutke","Charles Milesi","David Heinemeier Hansson"]', team: "TDS Racing", mfg: "ORECA", chassis: "ORECA 07", laps: 338, gap: "+44.221", pits: 12, pts: 230, status: "Finished", quali: 7, gained: 0 },
    { pos: 8, car: "52", drivers: '["Mikkel Goikhberg","Parker Thompson","Harry Tincknell"]', team: "PR1 Mathiasen", mfg: "ORECA", chassis: "ORECA 07", laps: 336, gap: "+2 Laps", pits: 13, pts: 220, status: "Finished", quali: 8, gained: 0 },
  ];

  for (const r of lmp2Sebring) {
    storage.createResult({ raceId: createdRaces[1].id, carClass: "LMP2", position: r.pos, carNumber: r.car, drivers: r.drivers, team: r.team, manufacturer: r.mfg, chassisModel: r.chassis, lapsCompleted: r.laps, timeOrGap: r.gap, pitStops: r.pits, points: r.pts, status: r.status, qualiPosition: r.quali, positionsGained: r.gained });
  }

  // Round 2: 12 Hours of Sebring - GTD Pro
  const gtdProSebring = [
    { pos: 1, car: "911", drivers: '["Thomas Preining","Klaus Bachler","Laurin Heinrich"]', team: "Manthey", mfg: "Porsche", chassis: "Porsche 911 GT3 R", laps: 321, gap: "12:01:48.000", pits: 11, pts: 350, status: "Finished", quali: 1, gained: 0 },
    { pos: 2, car: "77", drivers: '["Nick Tandy","Ben King","Alessio Picariello"]', team: "AO Racing", mfg: "Porsche", chassis: "Porsche 911 GT3 R", laps: 321, gap: "+3.889", pits: 11, pts: 320, status: "Finished", quali: 3, gained: 1 },
    { pos: 3, car: "4", drivers: '["Tommy Milner","Nicky Catsburg","Nicolas Varrone"]', team: "Corvette Racing", mfg: "Chevrolet", chassis: "Corvette Z06 GT3.R", laps: 321, gap: "+11.542", pits: 11, pts: 300, status: "Finished", quali: 4, gained: 1 },
    { pos: 4, car: "3", drivers: '["Antonio Garcia","Alexander Sims","Gregor Kirchhofer"]', team: "Corvette Racing", mfg: "Chevrolet", chassis: "Corvette Z06 GT3.R", laps: 321, gap: "+19.001", pits: 11, pts: 280, status: "Finished", quali: 5, gained: 1 },
    { pos: 5, car: "1", drivers: '["Bryan Verhagen","Christopher De Phillippi","Max Hesse"]', team: "Paul Miller Racing", mfg: "BMW", chassis: "BMW M4 GT3 EVO", laps: 321, gap: "+24.337", pits: 11, pts: 260, status: "Finished", quali: 2, gained: -3 },
    { pos: 6, car: "64", drivers: '["Harry Barker","Dennis Olsen","Mike Rockenfeller"]', team: "Ford Racing", mfg: "Ford", chassis: "Ford Mustang GT3", laps: 321, gap: "+30.118", pits: 11, pts: 250, status: "Finished", quali: 6, gained: 0 },
    { pos: 7, car: "033", drivers: '["James Calado","Matteo Agostini","Miguel Molina"]', team: "Triarsi Competizione", mfg: "Ferrari", chassis: "Ferrari 296 GT3", laps: 321, gap: "+38.882", pits: 12, pts: 230, status: "Finished", quali: 7, gained: 0 },
    { pos: 8, car: "65", drivers: '["Alex Mies","Frederic Vervisch","Sebastian Priaulx"]', team: "Ford Racing", mfg: "Ford", chassis: "Ford Mustang GT3", laps: 321, gap: "+47.221", pits: 11, pts: 220, status: "Finished", quali: 8, gained: 0 },
  ];

  for (const r of gtdProSebring) {
    storage.createResult({ raceId: createdRaces[1].id, carClass: "GTD_PRO", position: r.pos, carNumber: r.car, drivers: r.drivers, team: r.team, manufacturer: r.mfg, chassisModel: r.chassis, lapsCompleted: r.laps, timeOrGap: r.gap, pitStops: r.pits, points: r.pts, status: r.status, qualiPosition: r.quali, positionsGained: r.gained });
  }

  // Round 2: 12 Hours of Sebring - GTD
  const gtdSebring = [
    { pos: 1, car: "21", drivers: '["Simon Mann","Lilou Wadoux","Antonio Fuoco"]', team: "AF Corse", mfg: "Ferrari", chassis: "Ferrari 296 GT3", laps: 318, gap: "12:01:48.000", pits: 11, pts: 350, status: "Finished", quali: 2, gained: 1 },
    { pos: 2, car: "27", drivers: '["Tom Gamble","Rubens Barrichello","Zacharie Robichon"]', team: "Heart Of Racing", mfg: "Aston Martin", chassis: "Aston Martin Vantage GT3 Evo", laps: 318, gap: "+5.441", pits: 11, pts: 320, status: "Finished", quali: 3, gained: 1 },
    { pos: 3, car: "120", drivers: '["Spencer Adelson","Luca Sargent","Callum Ilott"]', team: "Wright Motorsports", mfg: "Porsche", chassis: "Porsche 911 GT3 R", laps: 318, gap: "+12.009", pits: 11, pts: 300, status: "Finished", quali: 4, gained: 1 },
    { pos: 4, car: "80", drivers: '["Alan Andrews","Sven Hodenius","Michael Roe Jr."]', team: "Lone Star Racing", mfg: "Mercedes-AMG", chassis: "Mercedes-AMG GT3", laps: 318, gap: "+19.778", pits: 11, pts: 280, status: "Finished", quali: 5, gained: 1 },
    { pos: 5, car: "96", drivers: '["Patrick Gallagher","Robby Foley","Thomas Selldorff"]', team: "Turner Motorsport", mfg: "BMW", chassis: "BMW M4 GT3 EVO", laps: 318, gap: "+26.443", pits: 11, pts: 260, status: "Finished", quali: 6, gained: 1 },
    { pos: 6, car: "13", drivers: '["Ryan Fidani","Jordan Bell","Bill Kern"]', team: "13 Autosport", mfg: "Chevrolet", chassis: "Corvette Z06 GT3.R", laps: 318, gap: "+34.117", pits: 11, pts: 250, status: "Finished", quali: 7, gained: 1 },
    { pos: 7, car: "34", drivers: '["Matteo Franco","Paulo Costa","Riccardo Patrese"]', team: "Conquest Racing", mfg: "Ferrari", chassis: "Ferrari 296 GT3", laps: 318, gap: "+41.882", pits: 12, pts: 230, status: "Finished", quali: 8, gained: 1 },
    { pos: 8, car: "66", drivers: '["Guy Walker","Michael Bechtolsheimer","Dan Hand"]', team: "Gradient Racing", mfg: "Ford", chassis: "Ford Mustang GT3", laps: 318, gap: "+49.221", pits: 11, pts: 220, status: "Finished", quali: 1, gained: -7 },
  ];

  for (const r of gtdSebring) {
    storage.createResult({ raceId: createdRaces[1].id, carClass: "GTD", position: r.pos, carNumber: r.car, drivers: r.drivers, team: r.team, manufacturer: r.mfg, chassisModel: r.chassis, lapsCompleted: r.laps, timeOrGap: r.gap, pitStops: r.pits, points: r.pts, status: r.status, qualiPosition: r.quali, positionsGained: r.gained });
  }

  // ==================== CHAMPIONSHIP STANDINGS (after Round 2) ====================

  // GTP Driver Standings after Round 2
  const gtpDriverStandings = [
    { name: "Felipe Nasr", team: "Porsche Penske Motorsport", pts: 760, wins: 2, podiums: 2, pos: 1 },
    { name: "Julien Andlauer", team: "Porsche Penske Motorsport", pts: 760, wins: 2, podiums: 2, pos: 1 },
    { name: "Laurin Heinrich", team: "Porsche Penske Motorsport", pts: 760, wins: 2, podiums: 2, pos: 1 },
    { name: "Jack Aitken", team: "Whelen Cadillac Racing", pts: 675, wins: 0, podiums: 2, pos: 2 },
    { name: "Earl Bamber", team: "Whelen Cadillac Racing", pts: 675, wins: 0, podiums: 2, pos: 2 },
    { name: "Frederik Vesti", team: "Whelen Cadillac Racing", pts: 675, wins: 0, podiums: 2, pos: 2 },
    { name: "Laurens Vanthoor", team: "Porsche Penske Motorsport", pts: 655, wins: 1, podiums: 2, pos: 3 },
    { name: "Kevin Estre", team: "Porsche Penske Motorsport", pts: 655, wins: 1, podiums: 2, pos: 3 },
    { name: "Matt Campbell", team: "Porsche Penske Motorsport", pts: 655, wins: 1, podiums: 2, pos: 3 },
    { name: "Sheldon van der Linde", team: "BMW M Team WRT", pts: 580, wins: 0, podiums: 1, pos: 4 },
    { name: "Dries Vanthoor", team: "BMW M Team WRT", pts: 580, wins: 0, podiums: 1, pos: 4 },
    { name: "Robin Frijns", team: "BMW M Team WRT", pts: 580, wins: 0, podiums: 1, pos: 4 },
    { name: "Renger van der Zande", team: "Acura Meyer Shank Racing", pts: 567, wins: 0, podiums: 0, pos: 5 },
    { name: "Nick Yelloly", team: "Acura Meyer Shank Racing", pts: 567, wins: 0, podiums: 0, pos: 5 },
    { name: "Tom Blomqvist", team: "Acura Meyer Shank Racing", pts: 550, wins: 0, podiums: 0, pos: 6 },
    { name: "Colin Braun", team: "Acura Meyer Shank Racing", pts: 550, wins: 0, podiums: 0, pos: 6 },
    { name: "Jordan Taylor", team: "Wayne Taylor Racing", pts: 530, wins: 0, podiums: 0, pos: 7 },
    { name: "Louis Deletraz", team: "Wayne Taylor Racing", pts: 530, wins: 0, podiums: 0, pos: 7 },
    { name: "Tim van der Helm", team: "JDC/Miller Motorsports", pts: 518, wins: 0, podiums: 0, pos: 8 },
    { name: "Philipp Eng", team: "BMW M Team WRT", pts: 450, wins: 0, podiums: 0, pos: 9 },
    { name: "Marco Wittmann", team: "BMW M Team WRT", pts: 450, wins: 0, podiums: 0, pos: 9 },
    { name: "Ricky Taylor", team: "Wayne Taylor Racing", pts: 455, wins: 0, podiums: 1, pos: 10 },
    { name: "Filipe Albuquerque", team: "Wayne Taylor Racing", pts: 455, wins: 0, podiums: 1, pos: 10 },
  ];

  for (const s of gtpDriverStandings) {
    storage.createStanding({ afterRound: 2, carClass: "GTP", type: "driver", entityName: s.name, team: s.team, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // GTP Team Standings after Round 2
  const gtpTeamStandings = [
    { name: "Porsche Penske Motorsport #7", pts: 760, wins: 2, podiums: 2, pos: 1 },
    { name: "Whelen Cadillac Racing #31", pts: 675, wins: 0, podiums: 2, pos: 2 },
    { name: "Porsche Penske Motorsport #6", pts: 655, wins: 1, podiums: 2, pos: 3 },
    { name: "BMW M Team WRT #24", pts: 580, wins: 0, podiums: 1, pos: 4 },
    { name: "Acura Meyer Shank Racing #93", pts: 567, wins: 0, podiums: 0, pos: 5 },
    { name: "Acura Meyer Shank Racing #60", pts: 550, wins: 0, podiums: 0, pos: 6 },
    { name: "Wayne Taylor Racing #40", pts: 530, wins: 0, podiums: 0, pos: 7 },
    { name: "JDC/Miller Motorsports #85", pts: 518, wins: 0, podiums: 0, pos: 8 },
    { name: "BMW M Team WRT #25", pts: 450, wins: 0, podiums: 0, pos: 9 },
    { name: "Wayne Taylor Racing #10", pts: 455, wins: 0, podiums: 1, pos: 10 },
  ];

  for (const s of gtpTeamStandings) {
    storage.createStanding({ afterRound: 2, carClass: "GTP", type: "team", entityName: s.name, team: s.name, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // GTP Manufacturer Standings after Round 2
  const gtpMfgStandings = [
    { name: "Porsche", pts: 760, wins: 2, podiums: 4, pos: 1 },
    { name: "Cadillac", pts: 675, wins: 0, podiums: 3, pos: 2 },
    { name: "BMW", pts: 580, wins: 0, podiums: 1, pos: 3 },
    { name: "Acura", pts: 567, wins: 0, podiums: 0, pos: 4 },
  ];

  for (const s of gtpMfgStandings) {
    storage.createStanding({ afterRound: 2, carClass: "GTP", type: "manufacturer", entityName: s.name, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // LMP2 Team Standings after Round 2
  const lmp2TeamStandings = [
    { name: "United Autosports #22", pts: 620, wins: 1, podiums: 2, pos: 1 },
    { name: "CrowdStrike Racing by APR #04", pts: 610, wins: 1, podiums: 1, pos: 2 },
    { name: "Inter Europol Competition #43", pts: 580, wins: 0, podiums: 1, pos: 3 },
    { name: "Tower Motorsport #8", pts: 520, wins: 0, podiums: 1, pos: 4 },
    { name: "Era Motorsport #18", pts: 510, wins: 0, podiums: 0, pos: 5 },
    { name: "AO Racing #99", pts: 510, wins: 0, podiums: 0, pos: 6 },
    { name: "PR1 Mathiasen #52", pts: 470, wins: 0, podiums: 0, pos: 7 },
    { name: "TDS Racing #11", pts: 230, wins: 0, podiums: 0, pos: 8 },
  ];

  for (const s of lmp2TeamStandings) {
    storage.createStanding({ afterRound: 2, carClass: "LMP2", type: "team", entityName: s.name, team: s.name, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // LMP2 Driver Standings after Round 2
  const lmp2DriverStandings = [
    { name: "Matt Goldburg", team: "United Autosports USA", pts: 620, wins: 1, podiums: 2, pos: 1 },
    { name: "Paul di Resta", team: "United Autosports USA", pts: 620, wins: 1, podiums: 2, pos: 1 },
    { name: "Rasmus Lindh", team: "United Autosports USA", pts: 620, wins: 1, podiums: 2, pos: 1 },
    { name: "Ben Kurtz", team: "CrowdStrike Racing by APR", pts: 610, wins: 1, podiums: 1, pos: 2 },
    { name: "Matt Quinn", team: "CrowdStrike Racing by APR", pts: 610, wins: 1, podiums: 1, pos: 2 },
    { name: "Sam Sowery", team: "CrowdStrike Racing by APR", pts: 610, wins: 1, podiums: 1, pos: 2 },
    { name: "Tom Dillmann", team: "Inter Europol Competition", pts: 370, wins: 0, podiums: 1, pos: 3 },
    { name: "Mikael Farano", team: "Tower Motorsports", pts: 520, wins: 0, podiums: 1, pos: 4 },
    { name: "Anand Rao", team: "Era Motorsport", pts: 510, wins: 0, podiums: 0, pos: 5 },
    { name: "PJ Hyett", team: "AO Racing", pts: 510, wins: 0, podiums: 0, pos: 6 },
  ];

  for (const s of lmp2DriverStandings) {
    storage.createStanding({ afterRound: 2, carClass: "LMP2", type: "driver", entityName: s.name, team: s.team, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // GTD Pro Team Standings after Round 2
  const gtdProTeamStandings = [
    { name: "Paul Miller Racing #1", pts: 670, wins: 1, podiums: 1, pos: 1 },
    { name: "Manthey #911", pts: 650, wins: 1, podiums: 2, pos: 2 },
    { name: "Corvette Racing #4", pts: 620, wins: 0, podiums: 2, pos: 3 },
    { name: "Corvette Racing #3", pts: 280, wins: 0, podiums: 1, pos: 4 },
    { name: "Ford Racing #65", pts: 510, wins: 0, podiums: 0, pos: 5 },
    { name: "Triarsi Competizione #033", pts: 480, wins: 0, podiums: 0, pos: 6 },
    { name: "Pfaff Motorsports #9", pts: 460, wins: 0, podiums: 0, pos: 7 },
    { name: "Ford Racing #64", pts: 470, wins: 0, podiums: 0, pos: 8 },
  ];

  for (const s of gtdProTeamStandings) {
    storage.createStanding({ afterRound: 2, carClass: "GTD_PRO", type: "team", entityName: s.name, team: s.name, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // GTD Pro Driver Standings after Round 2
  const gtdProDriverStandings = [
    { name: "Bryan Verhagen", team: "Paul Miller Racing", pts: 670, wins: 1, podiums: 1, pos: 1 },
    { name: "Christopher De Phillippi", team: "Paul Miller Racing", pts: 670, wins: 1, podiums: 1, pos: 1 },
    { name: "Max Hesse", team: "Paul Miller Racing", pts: 670, wins: 1, podiums: 1, pos: 1 },
    { name: "Thomas Preining", team: "Manthey", pts: 650, wins: 1, podiums: 2, pos: 2 },
    { name: "Klaus Bachler", team: "Manthey", pts: 650, wins: 1, podiums: 2, pos: 2 },
    { name: "Tommy Milner", team: "Corvette Racing", pts: 620, wins: 0, podiums: 2, pos: 3 },
    { name: "Nicky Catsburg", team: "Corvette Racing", pts: 620, wins: 0, podiums: 2, pos: 3 },
    { name: "Antonio Garcia", team: "Corvette Racing", pts: 280, wins: 0, podiums: 1, pos: 4 },
    { name: "Alexander Sims", team: "Corvette Racing", pts: 280, wins: 0, podiums: 1, pos: 4 },
    { name: "Alex Mies", team: "Ford Racing", pts: 510, wins: 0, podiums: 0, pos: 5 },
    { name: "Frederic Vervisch", team: "Ford Racing", pts: 510, wins: 0, podiums: 0, pos: 5 },
  ];

  for (const s of gtdProDriverStandings) {
    storage.createStanding({ afterRound: 2, carClass: "GTD_PRO", type: "driver", entityName: s.name, team: s.team, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // GTD Pro Manufacturer Standings after Round 2
  const gtdProMfgStandings = [
    { name: "BMW", pts: 670, wins: 1, podiums: 1, pos: 1 },
    { name: "Porsche", pts: 650, wins: 1, podiums: 2, pos: 2 },
    { name: "Chevrolet", pts: 620, wins: 0, podiums: 2, pos: 3 },
    { name: "Ford", pts: 510, wins: 0, podiums: 0, pos: 4 },
    { name: "Ferrari", pts: 480, wins: 0, podiums: 0, pos: 5 },
    { name: "Lamborghini", pts: 460, wins: 0, podiums: 0, pos: 6 },
    { name: "Aston Martin", pts: 230, wins: 0, podiums: 0, pos: 7 },
  ];

  for (const s of gtdProMfgStandings) {
    storage.createStanding({ afterRound: 2, carClass: "GTD_PRO", type: "manufacturer", entityName: s.name, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // GTD Team Standings after Round 2
  const gtdTeamStandings = [
    { name: "Heart Of Racing #27", pts: 640, wins: 1, podiums: 2, pos: 1 },
    { name: "Winward Racing #57", pts: 700, wins: 1, podiums: 1, pos: 2 },
    { name: "AF Corse #21", pts: 350, wins: 1, podiums: 1, pos: 3 },
    { name: "Winward Racing #48", pts: 580, wins: 0, podiums: 1, pos: 4 },
    { name: "Wright Motorsports #120", pts: 300, wins: 0, podiums: 1, pos: 5 },
    { name: "Turner Motorsport #96", pts: 520, wins: 0, podiums: 0, pos: 6 },
    { name: "13 Autosport #13", pts: 510, wins: 0, podiums: 0, pos: 7 },
    { name: "Magnus Racing #44", pts: 250, wins: 0, podiums: 0, pos: 8 },
  ];

  for (const s of gtdTeamStandings) {
    storage.createStanding({ afterRound: 2, carClass: "GTD", type: "team", entityName: s.name, team: s.name, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // GTD Driver Standings after Round 2
  const gtdDriverStandings = [
    { name: "Russell Ward", team: "Winward Racing", pts: 700, wins: 1, podiums: 1, pos: 1 },
    { name: "Philip Ellis", team: "Winward Racing", pts: 700, wins: 1, podiums: 1, pos: 1 },
    { name: "Tom Gamble", team: "Heart Of Racing", pts: 640, wins: 1, podiums: 2, pos: 2 },
    { name: "Rubens Barrichello", team: "Heart Of Racing", pts: 640, wins: 1, podiums: 2, pos: 2 },
    { name: "Zacharie Robichon", team: "Heart Of Racing", pts: 640, wins: 1, podiums: 2, pos: 2 },
    { name: "Simon Mann", team: "AF Corse", pts: 350, wins: 1, podiums: 1, pos: 3 },
    { name: "Lilou Wadoux", team: "AF Corse", pts: 350, wins: 1, podiums: 1, pos: 3 },
    { name: "David Noble", team: "Winward Racing", pts: 580, wins: 0, podiums: 1, pos: 4 },
    { name: "Patrick Gallagher", team: "Turner Motorsport", pts: 520, wins: 0, podiums: 0, pos: 5 },
    { name: "Robby Foley", team: "Turner Motorsport", pts: 520, wins: 0, podiums: 0, pos: 5 },
    { name: "Ryan Fidani", team: "13 Autosport", pts: 510, wins: 0, podiums: 0, pos: 6 },
  ];

  for (const s of gtdDriverStandings) {
    storage.createStanding({ afterRound: 2, carClass: "GTD", type: "driver", entityName: s.name, team: s.team, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // GTD Manufacturer Standings after Round 2
  const gtdMfgStandings = [
    { name: "Aston Martin", pts: 640, wins: 1, podiums: 3, pos: 1 },
    { name: "Mercedes-AMG", pts: 700, wins: 1, podiums: 2, pos: 2 },
    { name: "Ferrari", pts: 590, wins: 1, podiums: 2, pos: 3 },
    { name: "Porsche", pts: 520, wins: 0, podiums: 1, pos: 4 },
    { name: "BMW", pts: 520, wins: 0, podiums: 0, pos: 5 },
    { name: "Chevrolet", pts: 510, wins: 0, podiums: 0, pos: 6 },
    { name: "Ford", pts: 250, wins: 0, podiums: 0, pos: 7 },
  ];

  for (const s of gtdMfgStandings) {
    storage.createStanding({ afterRound: 2, carClass: "GTD", type: "manufacturer", entityName: s.name, points: s.pts, wins: s.wins, podiums: s.podiums, position: s.pos });
  }

  // ==================== DRIVER PROFILES ====================
  const profiles = [
    // GTP drivers
    { name: "Felipe Nasr", nationality: "BRA", team: "Porsche Penske Motorsport", carClass: "GTP", carNumber: "7", totalPoints: 760, avgFinish: 1.5, avgQuali: 2.5, bestFinish: 1, wins: 2, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.5, formTrend: "up", reliabilityScore: 100 },
    { name: "Julien Andlauer", nationality: "FRA", team: "Porsche Penske Motorsport", carClass: "GTP", carNumber: "7", totalPoints: 760, avgFinish: 1.5, avgQuali: 2.5, bestFinish: 1, wins: 2, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.5, formTrend: "up", reliabilityScore: 100 },
    { name: "Laurin Heinrich", nationality: "DEU", team: "Porsche Penske Motorsport", carClass: "GTP", carNumber: "7", totalPoints: 760, avgFinish: 1.5, avgQuali: 2.5, bestFinish: 1, wins: 2, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.5, formTrend: "up", reliabilityScore: 100 },
    { name: "Jack Aitken", nationality: "GBR", team: "Whelen Cadillac Racing", carClass: "GTP", carNumber: "31", totalPoints: 675, avgFinish: 3.0, avgQuali: 2.5, bestFinish: 2, wins: 0, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: -0.5, formTrend: "stable", reliabilityScore: 100 },
    { name: "Earl Bamber", nationality: "NZL", team: "Whelen Cadillac Racing", carClass: "GTP", carNumber: "31", totalPoints: 675, avgFinish: 3.0, avgQuali: 2.5, bestFinish: 2, wins: 0, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: -0.5, formTrend: "stable", reliabilityScore: 100 },
    { name: "Frederik Vesti", nationality: "DNK", team: "Whelen Cadillac Racing", carClass: "GTP", carNumber: "31", totalPoints: 675, avgFinish: 3.0, avgQuali: 2.5, bestFinish: 2, wins: 0, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: -0.5, formTrend: "stable", reliabilityScore: 100 },
    { name: "Laurens Vanthoor", nationality: "BEL", team: "Porsche Penske Motorsport", carClass: "GTP", carNumber: "6", totalPoints: 655, avgFinish: 3.0, avgQuali: 1.0, bestFinish: 2, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: -2.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Kevin Estre", nationality: "FRA", team: "Porsche Penske Motorsport", carClass: "GTP", carNumber: "6", totalPoints: 655, avgFinish: 3.0, avgQuali: 1.0, bestFinish: 2, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: -2.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Matt Campbell", nationality: "AUS", team: "Porsche Penske Motorsport", carClass: "GTP", carNumber: "6", totalPoints: 655, avgFinish: 3.0, avgQuali: 1.0, bestFinish: 2, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: -2.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Sheldon van der Linde", nationality: "ZAF", team: "BMW M Team WRT", carClass: "GTP", carNumber: "24", totalPoints: 580, avgFinish: 4.5, avgQuali: 5.0, bestFinish: 3, wins: 0, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "stable", reliabilityScore: 100 },
    { name: "Dries Vanthoor", nationality: "BEL", team: "BMW M Team WRT", carClass: "GTP", carNumber: "24", totalPoints: 580, avgFinish: 4.5, avgQuali: 5.0, bestFinish: 3, wins: 0, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "stable", reliabilityScore: 100 },
    { name: "Renger van der Zande", nationality: "NLD", team: "Acura Meyer Shank Racing", carClass: "GTP", carNumber: "93", totalPoints: 567, avgFinish: 6.0, avgQuali: 6.5, bestFinish: 5, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "stable", reliabilityScore: 100 },
    { name: "Nick Yelloly", nationality: "GBR", team: "Acura Meyer Shank Racing", carClass: "GTP", carNumber: "93", totalPoints: 567, avgFinish: 6.0, avgQuali: 6.5, bestFinish: 5, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "stable", reliabilityScore: 100 },
    { name: "Tom Blomqvist", nationality: "GBR", team: "Acura Meyer Shank Racing", carClass: "GTP", carNumber: "60", totalPoints: 550, avgFinish: 7.0, avgQuali: 5.0, bestFinish: 5, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: -2.0, formTrend: "stable", reliabilityScore: 100 },
    { name: "Colin Braun", nationality: "USA", team: "Acura Meyer Shank Racing", carClass: "GTP", carNumber: "60", totalPoints: 550, avgFinish: 7.0, avgQuali: 5.0, bestFinish: 5, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: -2.0, formTrend: "stable", reliabilityScore: 100 },
    { name: "Jordan Taylor", nationality: "USA", team: "Wayne Taylor Racing", carClass: "GTP", carNumber: "40", totalPoints: 530, avgFinish: 7.0, avgQuali: 7.5, bestFinish: 6, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "stable", reliabilityScore: 100 },
    { name: "Louis Deletraz", nationality: "CHE", team: "Wayne Taylor Racing", carClass: "GTP", carNumber: "40", totalPoints: 530, avgFinish: 7.0, avgQuali: 7.5, bestFinish: 6, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "stable", reliabilityScore: 100 },
    { name: "Tim van der Helm", nationality: "NLD", team: "JDC/Miller Motorsports", carClass: "GTP", carNumber: "85", totalPoints: 518, avgFinish: 8.0, avgQuali: 9.0, bestFinish: 7, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "stable", reliabilityScore: 100 },
    { name: "Ricky Taylor", nationality: "USA", team: "Wayne Taylor Racing", carClass: "GTP", carNumber: "10", totalPoints: 455, avgFinish: 6.5, avgQuali: 7.0, bestFinish: 3, wins: 0, podiums: 1, dnfs: 1, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "up", reliabilityScore: 50 },
    { name: "Filipe Albuquerque", nationality: "PRT", team: "Wayne Taylor Racing", carClass: "GTP", carNumber: "10", totalPoints: 455, avgFinish: 6.5, avgQuali: 7.0, bestFinish: 3, wins: 0, podiums: 1, dnfs: 1, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "up", reliabilityScore: 50 },
    { name: "Philipp Eng", nationality: "AUT", team: "BMW M Team WRT", carClass: "GTP", carNumber: "25", totalPoints: 450, avgFinish: 9.0, avgQuali: 9.0, bestFinish: 8, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.0, formTrend: "stable", reliabilityScore: 90 },
    { name: "Marco Wittmann", nationality: "DEU", team: "BMW M Team WRT", carClass: "GTP", carNumber: "25", totalPoints: 450, avgFinish: 9.0, avgQuali: 9.0, bestFinish: 8, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.0, formTrend: "stable", reliabilityScore: 90 },
    // GTD Pro drivers
    { name: "Bryan Verhagen", nationality: "USA", team: "Paul Miller Racing", carClass: "GTD_PRO", carNumber: "1", totalPoints: 670, avgFinish: 3.0, avgQuali: 2.0, bestFinish: 1, wins: 1, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: -1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Christopher De Phillippi", nationality: "USA", team: "Paul Miller Racing", carClass: "GTD_PRO", carNumber: "1", totalPoints: 670, avgFinish: 3.0, avgQuali: 2.0, bestFinish: 1, wins: 1, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: -1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Max Hesse", nationality: "DEU", team: "Paul Miller Racing", carClass: "GTD_PRO", carNumber: "1", totalPoints: 670, avgFinish: 3.0, avgQuali: 2.0, bestFinish: 1, wins: 1, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: -1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Thomas Preining", nationality: "AUT", team: "Manthey", carClass: "GTD_PRO", carNumber: "911", totalPoints: 650, avgFinish: 2.0, avgQuali: 2.5, bestFinish: 1, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "up", reliabilityScore: 100 },
    { name: "Klaus Bachler", nationality: "AUT", team: "Manthey", carClass: "GTD_PRO", carNumber: "911", totalPoints: 650, avgFinish: 2.0, avgQuali: 2.5, bestFinish: 1, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "up", reliabilityScore: 100 },
    { name: "Tommy Milner", nationality: "USA", team: "Corvette Racing", carClass: "GTD_PRO", carNumber: "4", totalPoints: 620, avgFinish: 2.5, avgQuali: 3.5, bestFinish: 2, wins: 0, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Nicky Catsburg", nationality: "NLD", team: "Corvette Racing", carClass: "GTD_PRO", carNumber: "4", totalPoints: 620, avgFinish: 2.5, avgQuali: 3.5, bestFinish: 2, wins: 0, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Antonio Garcia", nationality: "ESP", team: "Corvette Racing", carClass: "GTD_PRO", carNumber: "3", totalPoints: 280, avgFinish: 4.0, avgQuali: 5.0, bestFinish: 4, wins: 0, podiums: 1, dnfs: 0, racesEntered: 1, positionsGainedAvg: 1.0, formTrend: "stable", reliabilityScore: 100 },
    { name: "Alexander Sims", nationality: "GBR", team: "Corvette Racing", carClass: "GTD_PRO", carNumber: "3", totalPoints: 280, avgFinish: 4.0, avgQuali: 5.0, bestFinish: 4, wins: 0, podiums: 1, dnfs: 0, racesEntered: 1, positionsGainedAvg: 1.0, formTrend: "stable", reliabilityScore: 100 },
    { name: "Alex Mies", nationality: "DEU", team: "Ford Racing", carClass: "GTD_PRO", carNumber: "65", totalPoints: 510, avgFinish: 6.0, avgQuali: 7.0, bestFinish: 5, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "stable", reliabilityScore: 100 },
    { name: "Sebastian Priaulx", nationality: "GBR", team: "Ford Racing", carClass: "GTD_PRO", carNumber: "65", totalPoints: 510, avgFinish: 6.0, avgQuali: 7.0, bestFinish: 5, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "stable", reliabilityScore: 100 },
    { name: "Ross Gunn", nationality: "GBR", team: "Aston Martin THOR Team", carClass: "GTD_PRO", carNumber: "23", totalPoints: 230, avgFinish: 7.0, avgQuali: 8.0, bestFinish: 7, wins: 0, podiums: 0, dnfs: 0, racesEntered: 1, positionsGainedAvg: 1.0, formTrend: "stable", reliabilityScore: 100 },
    // GTD drivers
    { name: "Russell Ward", nationality: "USA", team: "Winward Racing", carClass: "GTD", carNumber: "57", totalPoints: 700, avgFinish: 1.5, avgQuali: 2.0, bestFinish: 1, wins: 1, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: -0.5, formTrend: "up", reliabilityScore: 100 },
    { name: "Philip Ellis", nationality: "GBR", team: "Winward Racing", carClass: "GTD", carNumber: "57", totalPoints: 700, avgFinish: 1.5, avgQuali: 2.0, bestFinish: 1, wins: 1, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: -0.5, formTrend: "up", reliabilityScore: 100 },
    { name: "Tom Gamble", nationality: "GBR", team: "Heart Of Racing", carClass: "GTD", carNumber: "27", totalPoints: 640, avgFinish: 3.0, avgQuali: 4.0, bestFinish: 2, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Rubens Barrichello", nationality: "BRA", team: "Heart Of Racing", carClass: "GTD", carNumber: "27", totalPoints: 640, avgFinish: 3.0, avgQuali: 4.0, bestFinish: 2, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Zacharie Robichon", nationality: "CAN", team: "Heart Of Racing", carClass: "GTD", carNumber: "27", totalPoints: 640, avgFinish: 3.0, avgQuali: 4.0, bestFinish: 2, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Simon Mann", nationality: "USA", team: "AF Corse", carClass: "GTD", carNumber: "21", totalPoints: 350, avgFinish: 1.0, avgQuali: 2.0, bestFinish: 1, wins: 1, podiums: 1, dnfs: 0, racesEntered: 1, positionsGainedAvg: 1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "David Noble", nationality: "USA", team: "Winward Racing", carClass: "GTD", carNumber: "48", totalPoints: 580, avgFinish: 2.0, avgQuali: 3.5, bestFinish: 3, wins: 0, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "stable", reliabilityScore: 100 },
    { name: "Patrick Gallagher", nationality: "USA", team: "Turner Motorsport", carClass: "GTD", carNumber: "96", totalPoints: 520, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "stable", reliabilityScore: 100, bestFinish: 5, avgFinish: 5.0, avgQuali: 5.5 },
    { name: "Robby Foley", nationality: "USA", team: "Turner Motorsport", carClass: "GTD", carNumber: "96", totalPoints: 520, wins: 0, podiums: 0, dnfs: 0, racesEntered: 2, positionsGainedAvg: 1.0, formTrend: "stable", reliabilityScore: 100, bestFinish: 5, avgFinish: 5.0, avgQuali: 5.5 },
    { name: "Ben Kurtz", nationality: "USA", team: "CrowdStrike Racing by APR", carClass: "LMP2", carNumber: "04", totalPoints: 610, avgFinish: 2.0, avgQuali: 1.5, bestFinish: 1, wins: 1, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: -1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Matt Quinn", nationality: "GBR", team: "CrowdStrike Racing by APR", carClass: "LMP2", carNumber: "04", totalPoints: 610, avgFinish: 2.0, avgQuali: 1.5, bestFinish: 1, wins: 1, podiums: 1, dnfs: 0, racesEntered: 2, positionsGainedAvg: -1.0, formTrend: "up", reliabilityScore: 100 },
    { name: "Matt Goldburg", nationality: "USA", team: "United Autosports USA", carClass: "LMP2", carNumber: "22", totalPoints: 620, avgFinish: 2.5, avgQuali: 2.5, bestFinish: 2, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "up", reliabilityScore: 100 },
    { name: "Paul di Resta", nationality: "GBR", team: "United Autosports USA", carClass: "LMP2", carNumber: "22", totalPoints: 620, avgFinish: 2.5, avgQuali: 2.5, bestFinish: 2, wins: 1, podiums: 2, dnfs: 0, racesEntered: 2, positionsGainedAvg: 0.5, formTrend: "up", reliabilityScore: 100 },
  ];

  for (const p of profiles) {
    storage.createDriverProfile(p);
  }

  // ==================== STINT DATA ====================
  // Daytona stints for car #7
  const daytonaStints = [
    { raceId: createdRaces[0].id, carNumber: "7", carClass: "GTP", stintNumber: 1, driver: "Felipe Nasr", laps: 32, avgLapTime: 95.2, bestLap: 93.8, tireCompound: "Medium" },
    { raceId: createdRaces[0].id, carNumber: "7", carClass: "GTP", stintNumber: 2, driver: "Julien Andlauer", laps: 35, avgLapTime: 94.8, bestLap: 93.5, tireCompound: "Medium" },
    { raceId: createdRaces[0].id, carNumber: "7", carClass: "GTP", stintNumber: 3, driver: "Laurin Heinrich", laps: 38, avgLapTime: 95.1, bestLap: 93.9, tireCompound: "Hard" },
    { raceId: createdRaces[0].id, carNumber: "7", carClass: "GTP", stintNumber: 4, driver: "Felipe Nasr", laps: 33, avgLapTime: 95.5, bestLap: 94.1, tireCompound: "Medium" },
    { raceId: createdRaces[0].id, carNumber: "7", carClass: "GTP", stintNumber: 5, driver: "Julien Andlauer", laps: 36, avgLapTime: 95.0, bestLap: 93.6, tireCompound: "Hard" },
    { raceId: createdRaces[0].id, carNumber: "6", carClass: "GTP", stintNumber: 1, driver: "Laurens Vanthoor", laps: 34, avgLapTime: 95.1, bestLap: 93.7, tireCompound: "Medium" },
    { raceId: createdRaces[0].id, carNumber: "6", carClass: "GTP", stintNumber: 2, driver: "Kevin Estre", laps: 36, avgLapTime: 94.9, bestLap: 93.4, tireCompound: "Medium" },
    { raceId: createdRaces[0].id, carNumber: "6", carClass: "GTP", stintNumber: 3, driver: "Matt Campbell", laps: 37, avgLapTime: 95.3, bestLap: 94.0, tireCompound: "Hard" },
    { raceId: createdRaces[0].id, carNumber: "31", carClass: "GTP", stintNumber: 1, driver: "Jack Aitken", laps: 30, avgLapTime: 95.4, bestLap: 94.0, tireCompound: "Medium" },
    { raceId: createdRaces[0].id, carNumber: "31", carClass: "GTP", stintNumber: 2, driver: "Earl Bamber", laps: 34, avgLapTime: 95.0, bestLap: 93.5, tireCompound: "Medium" },
    { raceId: createdRaces[0].id, carNumber: "31", carClass: "GTP", stintNumber: 3, driver: "Frederik Vesti", laps: 33, avgLapTime: 95.6, bestLap: 94.2, tireCompound: "Hard" },
    { raceId: createdRaces[0].id, carNumber: "31", carClass: "GTP", stintNumber: 4, driver: "Jak Zilisch", laps: 35, avgLapTime: 95.8, bestLap: 94.5, tireCompound: "Medium" },
    // Sebring stints for car #7
    { raceId: createdRaces[1].id, carNumber: "7", carClass: "GTP", stintNumber: 1, driver: "Felipe Nasr", laps: 38, avgLapTime: 100.4, bestLap: 98.8, tireCompound: "Medium" },
    { raceId: createdRaces[1].id, carNumber: "7", carClass: "GTP", stintNumber: 2, driver: "Julien Andlauer", laps: 40, avgLapTime: 100.1, bestLap: 98.5, tireCompound: "Hard" },
    { raceId: createdRaces[1].id, carNumber: "7", carClass: "GTP", stintNumber: 3, driver: "Laurin Heinrich", laps: 39, avgLapTime: 100.6, bestLap: 99.1, tireCompound: "Medium" },
    { raceId: createdRaces[1].id, carNumber: "7", carClass: "GTP", stintNumber: 4, driver: "Felipe Nasr", laps: 37, avgLapTime: 100.9, bestLap: 99.3, tireCompound: "Hard" },
    { raceId: createdRaces[1].id, carNumber: "6", carClass: "GTP", stintNumber: 1, driver: "Laurens Vanthoor", laps: 40, avgLapTime: 100.2, bestLap: 98.6, tireCompound: "Medium" },
    { raceId: createdRaces[1].id, carNumber: "6", carClass: "GTP", stintNumber: 2, driver: "Kevin Estre", laps: 38, avgLapTime: 100.3, bestLap: 98.7, tireCompound: "Hard" },
    { raceId: createdRaces[1].id, carNumber: "6", carClass: "GTP", stintNumber: 3, driver: "Matt Campbell", laps: 41, avgLapTime: 100.5, bestLap: 99.0, tireCompound: "Medium" },
    { raceId: createdRaces[1].id, carNumber: "31", carClass: "GTP", stintNumber: 1, driver: "Jack Aitken", laps: 36, avgLapTime: 100.7, bestLap: 99.2, tireCompound: "Medium" },
    { raceId: createdRaces[1].id, carNumber: "31", carClass: "GTP", stintNumber: 2, driver: "Earl Bamber", laps: 38, avgLapTime: 100.4, bestLap: 98.9, tireCompound: "Hard" },
    { raceId: createdRaces[1].id, carNumber: "31", carClass: "GTP", stintNumber: 3, driver: "Frederik Vesti", laps: 40, avgLapTime: 100.8, bestLap: 99.4, tireCompound: "Medium" },
  ];

  for (const s of daytonaStints) {
    storage.createStint(s);
  }

  // ==================== PIT STOP DATA ====================
  const pitStopData = [
    // Daytona pit stops - car #7
    { raceId: createdRaces[0].id, carNumber: "7", carClass: "GTP", lap: 32, duration: 42.3, driverIn: "Felipe Nasr", driverOut: "Julien Andlauer", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[0].id, carNumber: "7", carClass: "GTP", lap: 67, duration: 39.8, driverIn: "Julien Andlauer", driverOut: "Laurin Heinrich", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[0].id, carNumber: "7", carClass: "GTP", lap: 105, duration: 41.2, driverIn: "Laurin Heinrich", driverOut: "Felipe Nasr", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[0].id, carNumber: "7", carClass: "GTP", lap: 138, duration: 40.5, driverIn: "Felipe Nasr", driverOut: "Julien Andlauer", tireChange: 1, fuelOnly: 0 },
    // Daytona pit stops - car #6
    { raceId: createdRaces[0].id, carNumber: "6", carClass: "GTP", lap: 34, duration: 43.1, driverIn: "Laurens Vanthoor", driverOut: "Kevin Estre", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[0].id, carNumber: "6", carClass: "GTP", lap: 70, duration: 40.5, driverIn: "Kevin Estre", driverOut: "Matt Campbell", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[0].id, carNumber: "6", carClass: "GTP", lap: 107, duration: 41.8, driverIn: "Matt Campbell", driverOut: "Laurens Vanthoor", tireChange: 1, fuelOnly: 0 },
    // Daytona pit stops - car #31
    { raceId: createdRaces[0].id, carNumber: "31", carClass: "GTP", lap: 30, duration: 44.8, driverIn: "Jack Aitken", driverOut: "Earl Bamber", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[0].id, carNumber: "31", carClass: "GTP", lap: 64, duration: 42.1, driverIn: "Earl Bamber", driverOut: "Frederik Vesti", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[0].id, carNumber: "31", carClass: "GTP", lap: 97, duration: 43.5, driverIn: "Frederik Vesti", driverOut: "Jak Zilisch", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[0].id, carNumber: "31", carClass: "GTP", lap: 132, duration: 42.7, driverIn: "Jak Zilisch", driverOut: "Jack Aitken", tireChange: 1, fuelOnly: 0 },
    // Sebring pit stops - car #7
    { raceId: createdRaces[1].id, carNumber: "7", carClass: "GTP", lap: 38, duration: 38.5, driverIn: "Felipe Nasr", driverOut: "Julien Andlauer", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[1].id, carNumber: "7", carClass: "GTP", lap: 78, duration: 37.2, driverIn: "Julien Andlauer", driverOut: "Laurin Heinrich", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[1].id, carNumber: "7", carClass: "GTP", lap: 117, duration: 36.8, driverIn: "Laurin Heinrich", driverOut: "Felipe Nasr", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[1].id, carNumber: "7", carClass: "GTP", lap: 154, duration: 37.5, driverIn: "Felipe Nasr", driverOut: "Julien Andlauer", tireChange: 1, fuelOnly: 0 },
    // Sebring pit stops - car #6
    { raceId: createdRaces[1].id, carNumber: "6", carClass: "GTP", lap: 40, duration: 39.1, driverIn: "Laurens Vanthoor", driverOut: "Kevin Estre", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[1].id, carNumber: "6", carClass: "GTP", lap: 80, duration: 38.2, driverIn: "Kevin Estre", driverOut: "Matt Campbell", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[1].id, carNumber: "6", carClass: "GTP", lap: 121, duration: 37.8, driverIn: "Matt Campbell", driverOut: "Laurens Vanthoor", tireChange: 1, fuelOnly: 0 },
    // Sebring pit stops - car #31
    { raceId: createdRaces[1].id, carNumber: "31", carClass: "GTP", lap: 36, duration: 40.2, driverIn: "Jack Aitken", driverOut: "Earl Bamber", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[1].id, carNumber: "31", carClass: "GTP", lap: 74, duration: 39.5, driverIn: "Earl Bamber", driverOut: "Frederik Vesti", tireChange: 1, fuelOnly: 0 },
    { raceId: createdRaces[1].id, carNumber: "31", carClass: "GTP", lap: 114, duration: 38.9, driverIn: "Frederik Vesti", driverOut: "Jack Aitken", tireChange: 1, fuelOnly: 0 },
  ];

  for (const p of pitStopData) {
    storage.createPitStop(p);
  }

  console.log("Database seeded successfully with 2026 IMSA data");
}
