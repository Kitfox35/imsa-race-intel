import { Switch, Route, Router, Link, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Trophy,
  TrendingUp,
  Gauge,
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  Flag,
  icons,
} from "lucide-react";

import Dashboard from "./pages/dashboard";
import RaceWeek from "./pages/race-week";
import TitleFight from "./pages/title-fight";
import Trends from "./pages/trends";
import Strategy from "./pages/strategy";
import RaceExplorer from "./pages/race-explorer";
import NotFound from "./pages/not-found";
import Teams from "./pages/teams";
import { Label } from "recharts";

function AppLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="IMSA Intel">
      <rect width="32" height="32" rx="6" fill="hsl(0 85% 52%)" />
      <path d="M8 8h3v16H8V8z" fill="white" />
      <path d="M14 8h3l4 10-4 6h-3l4-6-4-10z" fill="white" opacity="0.9" />
      <path d="M21 8h3v16h-3V8z" fill="white" opacity="0.8" />
    </svg>
  );
}

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/race-week", label: "Race Week", icon: Newspaper },
  { path: "/title-fight", label: "Title Fight", icon: Trophy },
  { path: "/trends", label: "Trends", icon: TrendingUp },
  { path: "/strategy", label: "Strategy", icon: Gauge },
  { path: "/race-explorer", label: "Race Explorer", icon: Search },
  { path: "/teams", label: "Teams & Cars", icon: Users},
];

function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const [location] = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-30 flex flex-col border-r border-border bg-sidebar transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border">
        <AppLogo />
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground">IMSA INTEL</span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">Race Intelligence</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <div
                data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-2">
        <button
          data-testid="toggle-sidebar"
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={`transition-all duration-200 ${
          collapsed ? "ml-16" : "ml-56"
        }`}
      >
        <div className="min-h-screen">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/race-week" component={RaceWeek} />
            <Route path="/race-week/:id" component={RaceWeek} />
            <Route path="/title-fight" component={TitleFight} />
            <Route path="/trends" component={Trends} />
            <Route path="/strategy" component={Strategy} />
            <Route path="/race-explorer" component={RaceExplorer} />
            <Route path="/race-explorer/:id" component={RaceExplorer} />
            <Route component={NotFound} />
            <Route path="/teams" component={Teams} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router hook={useHashLocation}>
        <AppLayout />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
