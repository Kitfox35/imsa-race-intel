import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Flag, Trophy, AlertTriangle, TrendingUp, TrendingDown, Clock } from "lucide-react";

function RaceSummaryBrief({ race, results }: { race: any; results: any[] }) {
  const gtpResults = results.filter((r) => r.carClass === "GTP");
  const winner = gtpResults[0];
  const dnfs = results.filter((r) => r.status === "DNF");
  const bigGainers = results.filter((r) => r.positionsGained && r.positionsGained >= 3).sort((a, b) => (b.positionsGained || 0) - (a.positionsGained || 0));
  const bigLosers = results.filter((r) => r.positionsGained && r.positionsGained <= -3).sort((a, b) => (a.positionsGained || 0) - (b.positionsGained || 0));

  return (
    <div className="space-y-4">
      {/* Headline Summary */}
      <Card className="border-border/50 racing-stripe pl-4">
        <CardContent className="p-4">
          <h2 className="text-base font-bold mb-2">Race Summary</h2>
          {winner && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">{JSON.parse(winner.drivers)[0]}</span> and{" "}
              <span className="text-foreground font-semibold">{race.type === "endurance" ? "co-drivers" : JSON.parse(winner.drivers)[1]}</span>{" "}
              took victory for <span className="text-foreground font-medium">{winner.team}</span> at the{" "}
              <span className="text-foreground font-medium">{race.name}</span>, completing {winner.lapsCompleted} laps at {race.circuit}.
              {race.safetyCars > 0 && ` The race saw ${race.safetyCars} safety car periods.`}
              {race.redFlags > 0 && ` ${race.redFlags} red flag(s) disrupted the race.`}
              {dnfs.length > 0 && ` ${dnfs.length} car(s) retired from the race.`}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Key Winners */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-3 h-3 text-yellow-500" /> Class Winners
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["GTP", "LMP2", "GTD_PRO", "GTD"].map((cls) => {
              const classWinner = results.filter((r) => r.carClass === cls)[0];
              if (!classWinner) return null;
              return (
                <div key={cls} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="text-[9px] shrink-0 mt-0.5">{cls.replace("_", " ")}</Badge>
                  <div>
                    <span className="font-medium">{JSON.parse(classWinner.drivers)[0]}</span>
                    <span className="text-xs text-muted-foreground block">{classWinner.team}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Overperformers */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-green-500" /> Overperformers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {bigGainers.slice(0, 4).map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium">{JSON.parse(r.drivers)[0]}</span>
                  <span className="text-xs text-muted-foreground block">{r.team}</span>
                </div>
                <Badge className="bg-green-500/15 text-green-400 text-[10px]">
                  +{r.positionsGained} pos
                </Badge>
              </div>
            ))}
            {bigGainers.length === 0 && <p className="text-xs text-muted-foreground">No major position gains</p>}
          </CardContent>
        </Card>

        {/* Underperformers */}
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-3 h-3 text-red-500" /> Underperformers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {bigLosers.slice(0, 4).map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium">{JSON.parse(r.drivers)[0]}</span>
                  <span className="text-xs text-muted-foreground block">{r.team}</span>
                </div>
                <Badge className="bg-red-500/15 text-red-400 text-[10px]">
                  {r.positionsGained} pos
                </Badge>
              </div>
            ))}
            {bigLosers.length === 0 && <p className="text-xs text-muted-foreground">No major position losses</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ResultsTable({ results, classFilter }: { results: any[]; classFilter: string }) {
  const filtered = classFilter === "ALL" ? results : results.filter((r) => r.carClass === classFilter);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-card z-10">
          <tr className="border-b border-border">
            <th className="text-left px-3 py-2.5 text-xs text-muted-foreground font-medium">Pos</th>
            <th className="text-left px-2 py-2.5 text-xs text-muted-foreground font-medium">Class</th>
            <th className="text-left px-2 py-2.5 text-xs text-muted-foreground font-medium">#</th>
            <th className="text-left px-2 py-2.5 text-xs text-muted-foreground font-medium">Drivers</th>
            <th className="text-left px-2 py-2.5 text-xs text-muted-foreground font-medium">Team</th>
            <th className="text-right px-2 py-2.5 text-xs text-muted-foreground font-medium">Laps</th>
            <th className="text-right px-2 py-2.5 text-xs text-muted-foreground font-medium">Gap</th>
            <th className="text-right px-2 py-2.5 text-xs text-muted-foreground font-medium">Pits</th>
            <th className="text-right px-3 py-2.5 text-xs text-muted-foreground font-medium">Pts</th>
            <th className="text-right px-3 py-2.5 text-xs text-muted-foreground font-medium">+/-</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r: any, i: number) => {
            const drivers = JSON.parse(r.drivers);
            const gained = r.positionsGained || 0;
            return (
              <tr key={i} className="border-b border-border/30 hover:bg-accent/30 transition-colors">
                <td className="px-3 py-2 tabular-nums font-bold text-sm">
                  {r.status === "DNF" ? (
                    <span className="text-red-400">DNF</span>
                  ) : (
                    <span className={r.position <= 3 ? "text-yellow-400" : ""}>{r.position}</span>
                  )}
                </td>
                <td className="px-2 py-2">
                  <Badge variant="outline" className="text-[9px]">{r.carClass.replace("_", " ")}</Badge>
                </td>
                <td className="px-2 py-2 tabular-nums font-medium">#{r.carNumber}</td>
                <td className="px-2 py-2">
                  <span className="font-medium">{drivers[0]}</span>
                  {drivers.length > 1 && <span className="text-muted-foreground text-xs"> / {drivers.slice(1).join(", ")}</span>}
                </td>
                <td className="px-2 py-2 text-xs text-muted-foreground max-w-48 truncate">{r.team}</td>
                <td className="px-2 py-2 text-right tabular-nums">{r.lapsCompleted}</td>
                <td className="px-2 py-2 text-right tabular-nums text-xs text-muted-foreground">{r.position === 1 ? "Winner" : r.timeOrGap}</td>
                <td className="px-2 py-2 text-right tabular-nums">{r.pitStops || "-"}</td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold">{r.points}</td>
                <td className="px-3 py-2 text-right tabular-nums text-xs">
                  {gained > 0 ? (
                    <span className="text-green-400">+{gained}</span>
                  ) : gained < 0 ? (
                    <span className="text-red-400">{gained}</span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function RaceWeek() {
  const [selectedRace, setSelectedRace] = useState<string>("");
  const [classFilter, setClassFilter] = useState("ALL");

  const { data: races, isLoading: racesLoading } = useQuery({
    queryKey: ["/api/races"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/races");
      return res.json();
    },
  });

  // Select latest completed race by default (one with laps > 0)
  const latestCompletedRace = races ? [...races].reverse().find((r: any) => r.laps > 0) : null;
  const effectiveRaceId = selectedRace || (latestCompletedRace ? String(latestCompletedRace.id) : (races ? String(races[0]?.id) : ""));

  const { data: results, isLoading: resultsLoading } = useQuery({
    queryKey: ["/api/races", effectiveRaceId, "results"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/races/${effectiveRaceId}/results`);
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Race Week Briefing</h1>
          <p className="text-sm text-muted-foreground">Post-race analysis and key takeaways</p>
        </div>
        <div className="flex gap-3">
          <Select value={effectiveRaceId} onValueChange={setSelectedRace}>
            <SelectTrigger className="w-64" data-testid="select-race">
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
      </div>

      {/* Race info bar */}
      {race && (
        <div className="flex items-center gap-4 text-sm">
          <Badge variant="outline" className="text-xs">
            <Flag className="w-3 h-3 mr-1" /> Round {race.round}
          </Badge>
          <span className="text-muted-foreground">{race.circuit}</span>
          <span className="text-muted-foreground">{new Date(race.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
          <Badge variant={race.type === "endurance" ? "default" : "secondary"} className="text-[10px]">
            {race.type === "endurance" ? "Endurance" : "Sprint"}
          </Badge>
          {race.safetyCars > 0 && (
            <span className="text-yellow-400 text-xs flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> {race.safetyCars} SC
            </span>
          )}
        </div>
      )}

      {/* Content */}
      {race && results && results.length > 0 ? (
        <Tabs defaultValue="briefing" className="space-y-4">
          <TabsList>
            <TabsTrigger value="briefing" data-testid="tab-briefing">Briefing</TabsTrigger>
            <TabsTrigger value="results" data-testid="tab-results">Full Results</TabsTrigger>
          </TabsList>

          <TabsContent value="briefing">
            <RaceSummaryBrief race={race} results={results} />
          </TabsContent>

          <TabsContent value="results">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Race Classification</CardTitle>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-32" data-testid="filter-class">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Classes</SelectItem>
                      <SelectItem value="GTP">GTP</SelectItem>
                      <SelectItem value="LMP2">LMP2</SelectItem>
                      <SelectItem value="GTD_PRO">GTD Pro</SelectItem>
                      <SelectItem value="GTD">GTD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <ResultsTable results={results} classFilter={classFilter} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No results available for this race yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
