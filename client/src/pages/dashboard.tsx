import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import {
  Trophy,
  Flag,
  TrendingUp,
  TrendingDown,
  Minus,
  Car,
  Timer,
  Users,
  ChevronRight,
} from "lucide-react";

function KPICard({ title, value, subtitle, icon: Icon, trend }: { title: string; value: string; subtitle: string; icon: any; trend?: string }) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-xl font-bold tabular-nums mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          </div>
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StandingsTable({ standings, title }: { standings: any[]; title: string }) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left px-4 pb-2 text-xs text-muted-foreground font-medium">Pos</th>
              <th className="text-left px-2 pb-2 text-xs text-muted-foreground font-medium">Driver</th>
              <th className="text-right px-4 pb-2 text-xs text-muted-foreground font-medium">Pts</th>
              <th className="text-right px-4 pb-2 text-xs text-muted-foreground font-medium">Wins</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s: any, i: number) => (
              <tr key={i} className="border-b border-border/30 last:border-0 hover:bg-accent/50 transition-colors">
                <td className="px-4 py-2 tabular-nums font-medium text-muted-foreground">{s.position}</td>
                <td className="px-2 py-2">
                  <div>
                    <span className="font-medium text-foreground">{s.entityName}</span>
                    {s.team && <span className="block text-xs text-muted-foreground">{s.team}</span>}
                  </div>
                </td>
                <td className="px-4 py-2 text-right tabular-nums font-semibold">{s.points}</td>
                <td className="px-4 py-2 text-right tabular-nums">{s.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function ManufacturerBattle({ manufacturers }: { manufacturers: any[] }) {
  const maxPts = manufacturers[0]?.points || 1;
  const colors: Record<string, string> = {
    Porsche: "bg-red-500",
    Cadillac: "bg-yellow-500",
    BMW: "bg-blue-500",
    Acura: "bg-cyan-500",
    "Aston Martin": "bg-green-600",
    Lamborghini: "bg-amber-500",
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">GTP Manufacturer Battle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {manufacturers.map((m: any) => (
          <div key={m.entityName} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{m.entityName}</span>
              <span className="tabular-nums text-muted-foreground">{m.points} pts</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${colors[m.entityName] || "bg-primary"}`}
                style={{ width: `${(m.points / maxPts) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RecentRaceCard({ race, results }: { race: any; results: any[] }) {
  const gtpResults = results.filter((r: any) => r.carClass === "GTP").slice(0, 5);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold">{race.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{race.circuit} — {new Date(race.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
          <Link href={`/race-week/${race.id}`}>
            <Badge variant="secondary" className="cursor-pointer hover:bg-accent text-xs">
              Details <ChevronRight className="w-3 h-3 ml-1" />
            </Badge>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {gtpResults.map((r: any, i: number) => {
          const drivers = JSON.parse(r.drivers);
          return (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                i === 0 ? "bg-yellow-500/20 text-yellow-400" :
                i === 1 ? "bg-gray-400/20 text-gray-300" :
                i === 2 ? "bg-amber-600/20 text-amber-500" :
                "bg-muted text-muted-foreground"
              }`}>
                {r.position}
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-medium truncate block">{drivers[0]}</span>
                <span className="text-xs text-muted-foreground">{r.team}</span>
              </div>
              <Badge variant="outline" className="text-[10px] tabular-nums">{r.manufacturer}</Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/dashboard"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/dashboard");
      return res.json();
    },
  });

  const { data: races } = useQuery({
    queryKey: ["/api/races"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/races");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24" />)}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">IMSA WeatherTech 2026</h1>
          <p className="text-sm text-muted-foreground">Season Intelligence Dashboard</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          <Flag className="w-3 h-3 mr-1" />
          {data?.seasonComplete ? `Season Complete — ${data.totalRaces} Rounds` : `Round ${data?.completedRounds || 0} of ${data?.totalRaces || 11}`}
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(() => {
          const leader = data?.gtpDriverStandings?.[0];
          const second = data?.gtpDriverStandings?.find((s: any) => s.position === 2);
          const margin = leader && second ? leader.points - second.points : 0;
          const endurance = races?.filter((r: any) => r.type === "endurance").length || 0;
          const sprint = races?.filter((r: any) => r.type === "sprint").length || 0;
          const mfgList = data?.manufacturerStandings?.map((m: any) => m.entityName).join(", ") || "";
          return (
            <>
              <KPICard
                title={data?.seasonComplete ? "Champion" : "GTP Leader"}
                value={leader ? leader.entityName : "—"}
                subtitle={leader ? `${leader.team} — ${leader.points} pts` : ""}
                icon={Trophy}
              />
              <KPICard
                title={data?.nextRace ? "Next Race" : "Season Races"}
                value={data?.nextRace ? `R${data.nextRace.round}` : String(data?.totalRaces || 11)}
                subtitle={data?.nextRace ? data.nextRace.name : `${endurance} Endurance, ${sprint} Sprint`}
                icon={Flag}
              />
              <KPICard
                title="Manufacturers"
                value={String(data?.manufacturerStandings?.length || 0)}
                subtitle={mfgList}
                icon={Car}
              />
              <KPICard
                title="Title Margin"
                value={`${margin} pts`}
                subtitle={leader && second ? `${leader.entityName.split(" ").pop()} over ${second.entityName.split(" ").pop()}` : ""}
                icon={Timer}
              />
            </>
          );
        })()}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Standings */}
        <div className="lg:col-span-2 space-y-6">
          {data?.gtpDriverStandings && (
            <StandingsTable standings={data.gtpDriverStandings} title="GTP Driver Championship" />
          )}
          {data?.latestRace && data?.latestResults && (
            <RecentRaceCard race={data.latestRace} results={data.latestResults} />
          )}
        </div>

        {/* Sidebar panels */}
        <div className="space-y-6">
          {data?.manufacturerStandings && (
            <ManufacturerBattle manufacturers={data.manufacturerStandings} />
          )}

          {/* Season Calendar */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">2026 Calendar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {races?.map((race: any) => (
                <Link key={race.id} href={`/race-explorer/${race.id}`}>
                  <div className="flex items-center gap-2 text-xs py-1.5 px-2 rounded hover:bg-accent/50 cursor-pointer transition-colors">
                    <span className="w-5 text-center tabular-nums text-muted-foreground font-medium">R{race.round}</span>
                    <span className="flex-1 truncate">{race.name.replace("IMSA ", "")}</span>
                    <Badge variant="outline" className="text-[9px] shrink-0">
                      {race.type === "endurance" ? "END" : "SPR"}
                    </Badge>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
