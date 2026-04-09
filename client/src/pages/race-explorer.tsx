import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { Calendar, MapPin, Flag, Clock, AlertTriangle, ChevronRight, Car } from "lucide-react";

function RaceCard({ race }: { race: any }) {
  return (
    <Link href={`/race-explorer/${race.id}`}>
      <Card className="border-border/50 hover:border-primary/30 transition-all cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant={race.type === "endurance" ? "default" : "secondary"} className="text-[10px]">
                  {race.type === "endurance" ? "Endurance" : "Sprint"}
                </Badge>
                <span className="text-xs text-muted-foreground">Round {race.round}</span>
              </div>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{race.name}</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {race.circuit}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(race.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {race.laps && <span className="text-xs text-muted-foreground tabular-nums">{race.laps} laps</span>}
              <div className="flex gap-1.5">
                {race.safetyCars > 0 && (
                  <Badge className="bg-yellow-500/15 text-yellow-400 text-[9px]">{race.safetyCars} SC</Badge>
                )}
                {race.redFlags > 0 && (
                  <Badge className="bg-red-500/15 text-red-400 text-[9px]">{race.redFlags} RF</Badge>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function RaceDetailView({ raceId }: { raceId: string }) {
  const { data: race, isLoading: raceLoading } = useQuery({
    queryKey: ["/api/races", raceId],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/races/${raceId}`);
      return res.json();
    },
  });

  const { data: results, isLoading: resultsLoading } = useQuery({
    queryKey: ["/api/races", raceId, "results"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/races/${raceId}/results`);
      return res.json();
    },
  });

  const { data: stintData } = useQuery({
    queryKey: ["/api/races", raceId, "stints"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/races/${raceId}/stints`);
      return res.json();
    },
  });

  const { data: pitStopData } = useQuery({
    queryKey: ["/api/races", raceId, "pitstops"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/races/${raceId}/pitstops`);
      return res.json();
    },
  });

  if (raceLoading || resultsLoading) {
    return <div className="space-y-4"><Skeleton className="h-32" /><Skeleton className="h-64" /></div>;
  }

  const classes = [...new Set(results?.map((r: any) => r.carClass) || [])] as string[];

  return (
    <div className="space-y-6">
      {/* Race Header */}
      {race && (
        <Card className="border-border/50 racing-stripe pl-4">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">Round {race.round}</Badge>
                  <Badge variant={race.type === "endurance" ? "default" : "secondary"} className="text-[10px]">
                    {race.type === "endurance" ? "Endurance" : "Sprint"}
                  </Badge>
                </div>
                <h2 className="text-lg font-bold">{race.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {race.circuit}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(race.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
                  {race.laps && <span className="flex items-center gap-1"><Flag className="w-3.5 h-3.5" /> {race.laps} laps</span>}
                </div>
              </div>
              <div className="flex gap-2">
                {race.safetyCars > 0 && (
                  <Badge className="bg-yellow-500/15 text-yellow-400 text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" /> {race.safetyCars} Safety Cars
                  </Badge>
                )}
                {race.redFlags > 0 && (
                  <Badge className="bg-red-500/15 text-red-400 text-xs">
                    {race.redFlags} Red Flags
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Data */}
      <Tabs defaultValue={classes[0] as string || "GTP"} className="space-y-4">
        <TabsList>
          {classes.map((cls: string) => (
            <TabsTrigger key={cls} value={cls} data-testid={`tab-class-${cls}`}>
              {cls.replace("_", " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        {classes.map((cls) => {
          const classResults = results?.filter((r: any) => r.carClass === cls) || [];
          return (
            <TabsContent key={cls} value={cls}>
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">{cls.replace("_", " ")} Classification</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Pos</th>
                        <th className="text-left px-2 py-2 text-xs text-muted-foreground font-medium">#</th>
                        <th className="text-left px-2 py-2 text-xs text-muted-foreground font-medium">Drivers</th>
                        <th className="text-left px-2 py-2 text-xs text-muted-foreground font-medium">Team</th>
                        <th className="text-left px-2 py-2 text-xs text-muted-foreground font-medium">Car</th>
                        <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Laps</th>
                        <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Gap</th>
                        <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Pits</th>
                        <th className="text-right px-3 py-2 text-xs text-muted-foreground font-medium">Pts</th>
                        <th className="text-center px-2 py-2 text-xs text-muted-foreground font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classResults.map((r: any, i: number) => {
                        const drivers = JSON.parse(r.drivers);
                        return (
                          <tr key={i} className="border-b border-border/30 hover:bg-accent/30 transition-colors">
                            <td className="px-4 py-2.5 tabular-nums font-bold">
                              <span className={r.position <= 3 ? "text-yellow-400" : ""}>{r.position}</span>
                            </td>
                            <td className="px-2 py-2.5 tabular-nums font-medium">#{r.carNumber}</td>
                            <td className="px-2 py-2.5">
                              <span className="font-medium">{drivers[0]}</span>
                              {drivers.length > 1 && (
                                <span className="text-muted-foreground text-xs block">{drivers.slice(1).join(", ")}</span>
                              )}
                            </td>
                            <td className="px-2 py-2.5 text-xs text-muted-foreground max-w-40 truncate">{r.team}</td>
                            <td className="px-2 py-2.5 text-xs text-muted-foreground">{r.manufacturer}</td>
                            <td className="px-2 py-2.5 text-right tabular-nums">{r.lapsCompleted}</td>
                            <td className="px-2 py-2.5 text-right tabular-nums text-xs text-muted-foreground">
                              {r.position === 1 ? "Winner" : r.timeOrGap}
                            </td>
                            <td className="px-2 py-2.5 text-right tabular-nums">{r.pitStops || "-"}</td>
                            <td className="px-3 py-2.5 text-right tabular-nums font-semibold">{r.points}</td>
                            <td className="px-2 py-2.5 text-center">
                              {r.status === "DNF" ? (
                                <Badge className="bg-red-500/15 text-red-400 text-[9px]">DNF</Badge>
                              ) : (
                                <Badge className="bg-green-500/15 text-green-400 text-[9px]">FIN</Badge>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Stint Data if available */}
      {stintData && stintData.length > 0 && (
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Stint Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card">
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Car</th>
                    <th className="text-left px-2 py-2 text-xs text-muted-foreground font-medium">Driver</th>
                    <th className="text-center px-2 py-2 text-xs text-muted-foreground font-medium">Stint</th>
                    <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Laps</th>
                    <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Avg Lap</th>
                    <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Best Lap</th>
                    <th className="text-center px-4 py-2 text-xs text-muted-foreground font-medium">Tire</th>
                  </tr>
                </thead>
                <tbody>
                  {stintData.map((s: any, i: number) => (
                    <tr key={i} className="border-b border-border/30 hover:bg-accent/30">
                      <td className="px-4 py-1.5 tabular-nums font-medium">#{s.carNumber}</td>
                      <td className="px-2 py-1.5 text-xs">{s.driver}</td>
                      <td className="px-2 py-1.5 text-center tabular-nums text-muted-foreground">S{s.stintNumber}</td>
                      <td className="px-2 py-1.5 text-right tabular-nums">{s.laps}</td>
                      <td className="px-2 py-1.5 text-right tabular-nums text-xs">{s.avgLapTime?.toFixed(1)}s</td>
                      <td className="px-2 py-1.5 text-right tabular-nums text-xs text-green-400">{s.bestLap?.toFixed(1)}s</td>
                      <td className="px-4 py-1.5 text-center">
                        <Badge variant="outline" className="text-[9px]">{s.tireCompound || "N/A"}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pit Stops */}
      {pitStopData && pitStopData.length > 0 && (
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Pit Stop Log</CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2 text-xs text-muted-foreground font-medium">Car</th>
                  <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Lap</th>
                  <th className="text-right px-2 py-2 text-xs text-muted-foreground font-medium">Duration</th>
                  <th className="text-left px-2 py-2 text-xs text-muted-foreground font-medium">Driver In</th>
                  <th className="text-left px-2 py-2 text-xs text-muted-foreground font-medium">Driver Out</th>
                  <th className="text-center px-4 py-2 text-xs text-muted-foreground font-medium">Tires</th>
                </tr>
              </thead>
              <tbody>
                {pitStopData.map((p: any, i: number) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-accent/30">
                    <td className="px-4 py-1.5 tabular-nums font-medium">#{p.carNumber}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{p.lap}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums font-medium">{p.duration.toFixed(1)}s</td>
                    <td className="px-2 py-1.5 text-xs">{p.driverIn || "-"}</td>
                    <td className="px-2 py-1.5 text-xs">{p.driverOut || "-"}</td>
                    <td className="px-4 py-1.5 text-center">
                      {p.tireChange ? (
                        <Badge className="bg-blue-500/15 text-blue-400 text-[9px]">Changed</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px]">Fuel Only</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function RaceExplorer({ params }: { params?: { id?: string } }) {
  const { data: races, isLoading } = useQuery({
    queryKey: ["/api/races"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/races");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Race Explorer</h1>
        <p className="text-sm text-muted-foreground">Browse all 2026 season sessions and results</p>
      </div>

      {params?.id ? (
        <RaceDetailView raceId={params.id} />
      ) : (
        <>
          {/* Endurance Races */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Endurance Races
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {races?.filter((r: any) => r.type === "endurance").map((race: any) => (
                <RaceCard key={race.id} race={race} />
              ))}
            </div>
          </div>

          {/* Sprint Races */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Car className="w-3.5 h-3.5" /> Sprint Races
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {races?.filter((r: any) => r.type === "sprint").map((race: any) => (
                <RaceCard key={race.id} race={race} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
