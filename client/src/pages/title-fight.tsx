import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Trophy, TrendingUp, TrendingDown, Minus, Zap, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

function PointsDelta({ standings }: { standings: any[] }) {
  if (!standings.length) return null;
  const leader = standings[0];
  const chartData = standings.slice(0, 10).map((s) => ({
    name: s.entityName.split(" ").slice(-1)[0],
    fullName: s.entityName,
    points: s.points,
    delta: leader.points - s.points,
    team: s.team,
  }));

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Points Gap to Leader</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 80, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 10% 16%)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "hsl(215 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "hsl(210 20% 92%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={75}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(220 14% 11%)",
                border: "1px solid hsl(220 10% 18%)",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "hsl(210 20% 92%)" }}
              formatter={(value: number, name: string) => {
                if (name === "delta") return [`${value} pts behind`, "Gap"];
                return [value, name];
              }}
            />
            <Bar dataKey="delta" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={index === 0 ? "hsl(145 60% 50%)" : `hsl(0 85% ${52 + index * 3}%)`}
                  opacity={index === 0 ? 0.8 : 0.6 + index * 0.04}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function ManufacturerBattle({ standings }: { standings: any[] }) {
  const maxPts = standings[0]?.points || 1;
  const mfgColors: Record<string, string> = {
    Porsche: "#dc2626",
    Cadillac: "#eab308",
    BMW: "#3b82f6",
    Acura: "#06b6d4",
    "Aston Martin": "#16a34a",
    Lamborghini: "#f59e0b",
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" /> Manufacturer Championship
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={standings} margin={{ left: 10, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 10% 16%)" />
            <XAxis dataKey="entityName" tick={{ fill: "hsl(215 10% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(220 14% 11%)",
                border: "1px solid hsl(220 10% 18%)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="points" radius={[4, 4, 0, 0]}>
              {standings.map((entry: any, index: number) => (
                <Cell key={index} fill={mfgColors[entry.entityName] || "#666"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function TitleContenders({ standings }: { standings: any[] }) {
  const top5 = standings.slice(0, 6);
  const leader = top5[0];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" /> Championship Contenders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {top5.map((s: any, i: number) => {
          const gap = leader.points - s.points;
          return (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold ${
                    i === 0 ? "bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-500/30" :
                    i === 1 ? "bg-gray-400/20 text-gray-300" :
                    i === 2 ? "bg-amber-600/20 text-amber-500" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    P{s.position}
                  </span>
                  <div>
                    <span className="font-semibold text-sm">{s.entityName}</span>
                    <span className="text-xs text-muted-foreground block">{s.team}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold tabular-nums text-sm">{s.points}</span>
                  {gap > 0 && <span className="text-xs text-red-400 block tabular-nums">-{gap}</span>}
                  {gap === 0 && <span className="text-xs text-green-400 block">Leader</span>}
                </div>
              </div>
              <div className="flex gap-2 text-xs">
                <Badge variant="outline" className="text-[9px]">{s.wins}W</Badge>
                <Badge variant="outline" className="text-[9px]">{s.podiums}P</Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default function TitleFight() {
  const [selectedClass, setSelectedClass] = useState("GTP");

  const { data: driverStandings, isLoading } = useQuery({
    queryKey: ["/api/standings", selectedClass, "driver"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/standings/${selectedClass}/driver`);
      return res.json();
    },
  });

  const { data: teamStandings } = useQuery({
    queryKey: ["/api/standings", selectedClass, "team"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/standings/${selectedClass}/team`);
      return res.json();
    },
  });

  const { data: mfgStandings } = useQuery({
    queryKey: ["/api/standings", selectedClass, "manufacturer"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/standings/${selectedClass}/manufacturer`);
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
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
          <h1 className="text-xl font-bold tracking-tight">Title Fight Analysis</h1>
          <p className="text-sm text-muted-foreground">Championship battle breakdown and delta visualization</p>
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-36" data-testid="select-class">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GTP">GTP</SelectItem>
            <SelectItem value="LMP2">LMP2</SelectItem>
            <SelectItem value="GTD_PRO">GTD Pro</SelectItem>
            <SelectItem value="GTD">GTD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Championship narrative */}
      <Card className="border-border/50 racing-stripe pl-4">
        <CardContent className="p-4">
          <h2 className="text-base font-bold mb-2">Season So Far</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {selectedClass === "GTP" ? (
              <>
                The #7 Porsche Penske Motorsport crew of <span className="text-foreground font-medium">Felipe Nasr</span>,{" "}
                <span className="text-foreground font-medium">Julien Andlauer</span>, and{" "}
                <span className="text-foreground font-medium">Laurin Heinrich</span> have swept the opening two rounds —
                winning both the Rolex 24 at Daytona and the 12 Hours of Sebring. They lead the #31 Whelen Cadillac of{" "}
                <span className="text-foreground font-medium">Jack Aitken</span> and{" "}
                <span className="text-foreground font-medium">Earl Bamber</span> by 85 points. The sister #6 Porsche of{" "}
                <span className="text-foreground font-medium">Laurens Vanthoor</span>,{" "}
                <span className="text-foreground font-medium">Kevin Estre</span>, and{" "}
                <span className="text-foreground font-medium">Matt Campbell</span> sits third at 655 points.
                BMW M Team WRT impressed at Daytona with a P3 finish for the #24 car. Next up: the Long Beach street race on April 18.
              </>
            ) : (
              <>Select GTP for the full championship analysis.</>
            )}
          </p>
        </CardContent>
      </Card>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}>
        {driverStandings && <TitleContenders standings={driverStandings} />}
        {driverStandings && <PointsDelta standings={driverStandings} />}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}>
        {mfgStandings && mfgStandings.length > 0 && <ManufacturerBattle standings={mfgStandings} />}

        {/* Team Standings */}
        {teamStandings && teamStandings.length > 0 && (
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Team Championship</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Pos</th>
                    <th className="text-left px-2 py-2 text-xs text-muted-foreground font-medium">Team</th>
                    <th className="text-right px-4 py-2 text-xs text-muted-foreground font-medium">Pts</th>
                    <th className="text-right px-4 py-2 text-xs text-muted-foreground font-medium">W</th>
                  </tr>
                </thead>
                <tbody>
                  {teamStandings.slice(0, 10).map((s: any, i: number) => (
                    <tr key={i} className="border-b border-border/30 hover:bg-accent/30">
                      <td className="px-4 py-2 tabular-nums font-medium text-muted-foreground">{s.position}</td>
                      <td className="px-2 py-2 font-medium text-sm">{s.entityName}</td>
                      <td className="px-4 py-2 text-right tabular-nums font-semibold">{s.points}</td>
                      <td className="px-4 py-2 text-right tabular-nums">{s.wins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}
