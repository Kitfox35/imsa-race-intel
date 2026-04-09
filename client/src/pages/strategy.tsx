import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Fuel, Timer, Wrench, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, ScatterChart, Scatter, ZAxis } from "recharts";
import { motion } from "framer-motion";

function StintLengthChart({ stints }: { stints: any[] }) {
  // Group stints by car number
  const carStints: Record<string, { carNumber: string; avgLaps: number; stintCount: number }> = {};
  stints.forEach((s) => {
    if (!carStints[s.carNumber]) {
      carStints[s.carNumber] = { carNumber: `#${s.carNumber}`, avgLaps: 0, stintCount: 0 };
    }
    carStints[s.carNumber].avgLaps += s.laps;
    carStints[s.carNumber].stintCount += 1;
  });

  const chartData = Object.values(carStints).map((c) => ({
    ...c,
    avgLaps: Math.round(c.avgLaps / c.stintCount),
  })).sort((a, b) => b.avgLaps - a.avgLaps);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ left: 10, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 10% 16%)" />
        <XAxis dataKey="carNumber" tick={{ fill: "hsl(215 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "hsl(215 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "Avg Laps/Stint", angle: -90, position: "insideLeft", style: { fill: "hsl(215 10% 55%)", fontSize: 10 } }} />
        <Tooltip
          contentStyle={{
            background: "hsl(220 14% 11%)",
            border: "1px solid hsl(220 10% 18%)",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={(value: number) => [`${value} laps`, "Avg Stint Length"]}
        />
        <Bar dataKey="avgLaps" radius={[4, 4, 0, 0]} fill="hsl(210 90% 55%)">
          {chartData.map((_, index) => (
            <Cell key={index} fill={`hsl(${210 + index * 15} 70% ${55 - index * 2}%)`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function PitStopComparison({ pitStops }: { pitStops: any[] }) {
  const carPits: Record<string, { carNumber: string; avgDuration: number; count: number; best: number }> = {};
  pitStops.forEach((p) => {
    if (!carPits[p.carNumber]) {
      carPits[p.carNumber] = { carNumber: `#${p.carNumber}`, avgDuration: 0, count: 0, best: Infinity };
    }
    carPits[p.carNumber].avgDuration += p.duration;
    carPits[p.carNumber].count += 1;
    if (p.duration < carPits[p.carNumber].best) {
      carPits[p.carNumber].best = p.duration;
    }
  });

  const chartData = Object.values(carPits).map((c) => ({
    ...c,
    avgDuration: +(c.avgDuration / c.count).toFixed(1),
    best: +c.best.toFixed(1),
  })).sort((a, b) => a.avgDuration - b.avgDuration);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 50, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 10% 16%)" horizontal={false} />
        <XAxis type="number" tick={{ fill: "hsl(215 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} unit="s" />
        <YAxis type="category" dataKey="carNumber" tick={{ fill: "hsl(210 20% 92%)", fontSize: 11 }} axisLine={false} tickLine={false} width={45} />
        <Tooltip
          contentStyle={{
            background: "hsl(220 14% 11%)",
            border: "1px solid hsl(220 10% 18%)",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={(value: number, name: string) => [`${value}s`, name === "avgDuration" ? "Avg Pit Time" : "Best Pit Time"]}
        />
        <Bar dataKey="avgDuration" name="Avg Pit Time" fill="hsl(0 85% 52%)" radius={[0, 4, 4, 0]} barSize={16} />
        <Bar dataKey="best" name="Best Pit Time" fill="hsl(145 60% 50%)" radius={[0, 4, 4, 0]} barSize={16} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function TireStrategyBreakdown({ stints }: { stints: any[] }) {
  const compoundCounts: Record<string, number> = {};
  stints.forEach((s) => {
    const compound = s.tireCompound || "Unknown";
    compoundCounts[compound] = (compoundCounts[compound] || 0) + 1;
  });

  const total = Object.values(compoundCounts).reduce((a, b) => a + b, 0);
  const compoundColors: Record<string, string> = {
    Soft: "bg-red-500",
    Medium: "bg-yellow-500",
    Hard: "bg-blue-400",
    Unknown: "bg-gray-500",
  };

  return (
    <div className="space-y-3">
      {Object.entries(compoundCounts).map(([compound, count]) => (
        <div key={compound} className="space-y-1">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${compoundColors[compound] || "bg-gray-500"}`} />
              <span className="font-medium">{compound}</span>
            </div>
            <span className="tabular-nums text-muted-foreground">{count} stints ({Math.round((count / total) * 100)}%)</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${compoundColors[compound] || "bg-gray-500"}`}
              style={{ width: `${(count / total) * 100}%`, opacity: 0.7 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Strategy() {
  const [selectedRace, setSelectedRace] = useState<string>("");

  const { data: races, isLoading: racesLoading } = useQuery({
    queryKey: ["/api/races"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/races");
      return res.json();
    },
  });

  const effectiveRaceId = selectedRace || (races ? String(races[0]?.id) : "");

  const { data: stintData, isLoading: stintsLoading } = useQuery({
    queryKey: ["/api/races", effectiveRaceId, "stints"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/races/${effectiveRaceId}/stints`);
      return res.json();
    },
    enabled: !!effectiveRaceId,
  });

  const { data: pitStopData } = useQuery({
    queryKey: ["/api/races", effectiveRaceId, "pitstops"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/races/${effectiveRaceId}/pitstops`);
      return res.json();
    },
    enabled: !!effectiveRaceId,
  });

  const { data: race } = useQuery({
    queryKey: ["/api/races", effectiveRaceId],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/races/${effectiveRaceId}`);
      return res.json();
    },
    enabled: !!effectiveRaceId,
  });

  if (racesLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Strategy Dashboard</h1>
          <p className="text-sm text-muted-foreground">Stint lengths, pit stop analysis, and tire strategy</p>
        </div>
        <Select value={effectiveRaceId} onValueChange={setSelectedRace}>
          <SelectTrigger className="w-64" data-testid="select-race-strategy">
            <SelectValue placeholder="Select Race" />
          </SelectTrigger>
          <SelectContent>
            {races?.map((r: any) => (
              <SelectItem key={r.id} value={String(r.id)}>
                R{r.round} — {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Race info */}
      {race && (
        <div className="flex items-center gap-4 text-sm">
          <Badge variant="outline" className="text-xs">{race.name}</Badge>
          <span className="text-muted-foreground">{race.circuit}</span>
          {race.safetyCars > 0 && (
            <Badge className="bg-yellow-500/15 text-yellow-400 text-[10px]">
              <AlertTriangle className="w-3 h-3 mr-1" /> {race.safetyCars} Safety Cars
            </Badge>
          )}
        </div>
      )}

      {stintData && stintData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stint Length Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Fuel className="w-4 h-4 text-blue-400" /> Average Stint Length by Car
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StintLengthChart stints={stintData} />
            </CardContent>
          </Card>

          {/* Pit Stop Comparison */}
          {pitStopData && pitStopData.length > 0 && (
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Timer className="w-4 h-4 text-red-400" /> Pit Stop Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PitStopComparison pitStops={pitStopData} />
              </CardContent>
            </Card>
          )}

          {/* Tire Strategy */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Wrench className="w-4 h-4 text-yellow-400" /> Tire Compound Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TireStrategyBreakdown stints={stintData} />
            </CardContent>
          </Card>

          {/* Stint Detail Table */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Stint Detail</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-card">
                    <tr className="border-b border-border">
                      <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Car</th>
                      <th className="text-left px-2 py-2 text-xs text-muted-foreground font-medium">Driver</th>
                      <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Stint</th>
                      <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Laps</th>
                      <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Avg Lap</th>
                      <th className="text-right px-4 py-2 text-xs text-muted-foreground font-medium">Best</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stintData.map((s: any, i: number) => (
                      <tr key={i} className="border-b border-border/30 hover:bg-accent/30">
                        <td className="px-4 py-1.5 tabular-nums font-medium">#{s.carNumber}</td>
                        <td className="px-2 py-1.5 text-xs">{s.driver}</td>
                        <td className="px-2 py-1.5 text-right tabular-nums text-muted-foreground">S{s.stintNumber}</td>
                        <td className="px-2 py-1.5 text-right tabular-nums">{s.laps}</td>
                        <td className="px-2 py-1.5 text-right tabular-nums text-xs">{s.avgLapTime?.toFixed(1)}s</td>
                        <td className="px-4 py-1.5 text-right tabular-nums text-xs text-green-400">{s.bestLap?.toFixed(1)}s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center text-muted-foreground">
            <Fuel className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No stint/strategy data available for this race.</p>
            <p className="text-xs mt-1">Try selecting an endurance race (Daytona, Sebring, Indianapolis, Petit Le Mans).</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
