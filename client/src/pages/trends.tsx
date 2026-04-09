import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Shield, Zap, Target, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts";

function TrendArrow({ trend }: { trend: string | null }) {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-400" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-400" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
}

function ReliabilityBadge({ score }: { score: number | null }) {
  if (!score) return null;
  const color = score >= 95 ? "text-green-400 bg-green-400/10" : score >= 80 ? "text-yellow-400 bg-yellow-400/10" : "text-red-400 bg-red-400/10";
  return <Badge className={`${color} text-[10px] tabular-nums`}>{score}%</Badge>;
}

function DriverTable({ drivers }: { drivers: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-card z-10">
          <tr className="border-b border-border">
            <th className="text-left px-3 py-2.5 text-xs text-muted-foreground font-medium">Trend</th>
            <th className="text-left px-2 py-2.5 text-xs text-muted-foreground font-medium">Driver</th>
            <th className="text-left px-2 py-2.5 text-xs text-muted-foreground font-medium">Team</th>
            <th className="text-right px-2 py-2.5 text-xs text-muted-foreground font-medium">Pts</th>
            <th className="text-right px-2 py-2.5 text-xs text-muted-foreground font-medium">Avg Fin</th>
            <th className="text-right px-2 py-2.5 text-xs text-muted-foreground font-medium">Avg Qual</th>
            <th className="text-right px-2 py-2.5 text-xs text-muted-foreground font-medium">Best</th>
            <th className="text-right px-2 py-2.5 text-xs text-muted-foreground font-medium">W / P</th>
            <th className="text-right px-2 py-2.5 text-xs text-muted-foreground font-medium">+/- Avg</th>
            <th className="text-right px-3 py-2.5 text-xs text-muted-foreground font-medium">Reliab.</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d: any, i: number) => (
            <tr key={i} className="border-b border-border/30 hover:bg-accent/30 transition-colors">
              <td className="px-3 py-2.5">
                <TrendArrow trend={d.formTrend} />
              </td>
              <td className="px-2 py-2.5">
                <div>
                  <span className="font-semibold">{d.name}</span>
                  <span className="text-xs text-muted-foreground block">#{d.carNumber} — {d.nationality}</span>
                </div>
              </td>
              <td className="px-2 py-2.5 text-xs text-muted-foreground max-w-40 truncate">{d.team}</td>
              <td className="px-2 py-2.5 text-right tabular-nums font-bold">{d.totalPoints}</td>
              <td className="px-2 py-2.5 text-right tabular-nums">{d.avgFinish?.toFixed(1)}</td>
              <td className="px-2 py-2.5 text-right tabular-nums">{d.avgQuali?.toFixed(1)}</td>
              <td className="px-2 py-2.5 text-right tabular-nums">P{d.bestFinish}</td>
              <td className="px-2 py-2.5 text-right tabular-nums">{d.wins} / {d.podiums}</td>
              <td className="px-2 py-2.5 text-right tabular-nums">
                {d.positionsGainedAvg !== null && d.positionsGainedAvg !== undefined ? (
                  <span className={d.positionsGainedAvg > 0 ? "text-green-400" : d.positionsGainedAvg < 0 ? "text-red-400" : "text-muted-foreground"}>
                    {d.positionsGainedAvg > 0 ? "+" : ""}{d.positionsGainedAvg.toFixed(1)}
                  </span>
                ) : "-"}
              </td>
              <td className="px-3 py-2.5 text-right">
                <ReliabilityBadge score={d.reliabilityScore} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComparisonChart({ drivers }: { drivers: any[] }) {
  const chartData = drivers.slice(0, 8).map((d) => ({
    name: d.name.split(" ").pop(),
    avgFinish: d.avgFinish || 0,
    avgQuali: d.avgQuali || 0,
    posGained: Math.abs(d.positionsGainedAvg || 0),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ left: 0, right: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 10% 16%)" />
        <XAxis dataKey="name" tick={{ fill: "hsl(215 10% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: "hsl(215 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "hsl(220 14% 11%)",
            border: "1px solid hsl(220 10% 18%)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="avgFinish" name="Avg Finish" fill="hsl(0 85% 52%)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="avgQuali" name="Avg Quali" fill="hsl(210 90% 55%)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function Trends() {
  const [classFilter, setClassFilter] = useState("GTP");

  const { data: drivers, isLoading } = useQuery({
    queryKey: ["/api/drivers", classFilter],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/drivers?class=${classFilter}`);
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  // Summary stats
  const totalDrivers = drivers?.length || 0;
  const trending_up = drivers?.filter((d: any) => d.formTrend === "up").length || 0;
  const perfect_reliability = drivers?.filter((d: any) => d.reliabilityScore === 100).length || 0;

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Trend Dashboard</h1>
          <p className="text-sm text-muted-foreground">Driver and team performance trends across the season</p>
        </div>
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-36" data-testid="select-class-filter">
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

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <BarChart3 className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Drivers Tracked</p>
              <p className="text-lg font-bold tabular-nums">{totalDrivers}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Trending Up</p>
              <p className="text-lg font-bold tabular-nums">{trending_up}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Shield className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">100% Reliability</p>
              <p className="text-lg font-bold tabular-nums">{perfect_reliability}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Chart */}
      {drivers && drivers.length > 0 && (
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Qualifying vs Race Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ComparisonChart drivers={drivers} />
          </CardContent>
        </Card>
      )}

      {/* Driver Table */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Driver Performance Table</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          {drivers && <DriverTable drivers={drivers} />}
        </CardContent>
      </Card>
    </motion.div>
  );
}
