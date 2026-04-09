import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Car, Users } from "lucide-react";

const teamsData = {
  GTP: [
    { team: "Porsche Penske Motorsport", cars: ["#7", "#6"], chassis: "Porsche 963", mfg: "Porsche", color: "bg-red-500" },
    { team: "Whelen Cadillac Racing", cars: ["#31"], chassis: "Cadillac V-Series.R", mfg: "Cadillac", color: "bg-yellow-500" },
    { team: "Wayne Taylor Racing", cars: ["#10", "#40"], chassis: "Cadillac V-Series.R", mfg: "Cadillac", color: "bg-yellow-500" },
    { team: "BMW M Team WRT", cars: ["#24", "#25"], chassis: "BMW M Hybrid V8", mfg: "BMW", color: "bg-blue-500" },
    { team: "Acura Meyer Shank Racing", cars: ["#93", "#60"], chassis: "Acura ARX-06", mfg: "Acura", color: "bg-cyan-500" },
    { team: "JDC/Miller Motorsports", cars: ["#85"], chassis: "Porsche 963", mfg: "Porsche", color: "bg-red-500" },
    { team: "Aston Martin THOR Team", cars: ["#23"], chassis: "Aston Martin Valkyrie", mfg: "Aston Martin", color: "bg-green-600" },
  ],
  "GTD Pro": [
    { team: "Paul Miller Racing", cars: ["#1"], chassis: "BMW M4 GT3 EVO", mfg: "BMW", color: "bg-blue-500" },
    { team: "Corvette Racing", cars: ["#3", "#4"], chassis: "Corvette Z06 GT3.R", mfg: "Chevrolet", color: "bg-yellow-400" },
    { team: "Manthey Racing", cars: ["#911"], chassis: "Porsche 911 GT3 R", mfg: "Porsche", color: "bg-red-500" },
    { team: "AO Racing", cars: ["#77"], chassis: "Porsche 911 GT3 R", mfg: "Porsche", color: "bg-red-500" },
    { team: "Ford Racing", cars: ["#64", "#65"], chassis: "Ford Mustang GT3", mfg: "Ford", color: "bg-blue-600" },
    { team: "Triarsi Competizione", cars: ["#033"], chassis: "Ferrari 296 GT3", mfg: "Ferrari", color: "bg-red-600" },
    { team: "Pfaff Motorsports", cars: ["#9"], chassis: "Lamborghini Temerario GT3", mfg: "Lamborghini", color: "bg-amber-500" },
    { team: "Vasser Sullivan Racing", cars: ["#14"], chassis: "Lexus RC F GT3", mfg: "Lexus", color: "bg-gray-400" },
    { team: "RLL Team McLaren", cars: ["#59"], chassis: "McLaren 720S GT3 EVO", mfg: "McLaren", color: "bg-orange-500" },
  ],
  GTD: [
    { team: "Winward Racing", cars: ["#57", "#48"], chassis: "Mercedes-AMG GT3", mfg: "Mercedes", color: "bg-teal-400" },
    { team: "Heart Of Racing", cars: ["#27"], chassis: "Aston Martin Vantage GT3 Evo", mfg: "Aston Martin", color: "bg-green-600" },
    { team: "AF Corse", cars: ["#21"], chassis: "Ferrari 296 GT3", mfg: "Ferrari", color: "bg-red-600" },
    { team: "Wright Motorsports", cars: ["#120"], chassis: "Porsche 911 GT3 R", mfg: "Porsche", color: "bg-red-500" },
    { team: "Turner Motorsport", cars: ["#96"], chassis: "BMW M4 GT3 EVO", mfg: "BMW", color: "bg-blue-500" },
    { team: "Conquest Racing", cars: ["#34"], chassis: "Ferrari 296 GT3", mfg: "Ferrari", color: "bg-red-600" },
    { team: "Gradient Racing", cars: ["#66"], chassis: "Ford Mustang GT3", mfg: "Ford", color: "bg-blue-600" },
    { team: "Lone Star Racing", cars: ["#80"], chassis: "Mercedes-AMG GT3", mfg: "Mercedes", color: "bg-teal-400" },
    { team: "DXDT Racing", cars: ["#36"], chassis: "Corvette Z06 GT3.R", mfg: "Chevrolet", color: "bg-yellow-400" },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Teams() {
  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-xl font-bold tracking-tight">Teams & Cars</h1>
        <p className="text-sm text-muted-foreground">2026 IMSA WeatherTech full team and chassis lineup</p>
      </motion.div>

      {Object.entries(teamsData).map(([className, teams], classIndex) => (
        <div key={className} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: classIndex * 0.15 }}
            className="flex items-center gap-2"
          >
            <div className="h-5 w-1 bg-primary rounded-full" />
            <h2 className="text-base font-bold tracking-tight">{className}</h2>
            <Badge variant="outline" className="text-[10px]">{teams.length} teams</Badge>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {teams.map((team) => (
              <motion.div key={team.team} variants={item}>
                <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${team.color} shrink-0`} />
                          <span className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                            {team.team}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-4 mb-2">
                          {team.cars.map((car) => (
                            <Badge key={car} variant="secondary" className="text-[10px] tabular-nums font-mono">
                              {car}
                            </Badge>
                          ))}
                        </div>
                        <div className="ml-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Car className="w-3 h-3" />
                          <span className="font-medium text-foreground/80">{team.chassis}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[9px] shrink-0 mt-0.5">
                        {team.mfg}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}