import { Switch, Route, Router, Link, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Trophy,
  TrendingUp,
  Gauge,
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  ShieldCheck,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import Dashboard from "./pages/dashboard";
import RaceWeek from "./pages/race-week";
import TitleFight from "./pages/title-fight";
import Trends from "./pages/trends";
import Strategy from "./pages/strategy";
import RaceExplorer from "./pages/race-explorer";
import Teams from "./pages/teams";
import Admin from "./pages/admin";
import NotFound from "./pages/not-found";

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

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  function toggle() {
    setAnimating(true);
    setTimeout(() => {
      setDark(!dark);
      setTimeout(() => setAnimating(false), 300);
    }, 150);
  }

  return (
    <button
      onClick={toggle}
      className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors overflow-hidden"
      data-testid="theme-toggle"
    >
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          transform: animating
            ? "scale(0) rotate(180deg)"
            : "scale(1) rotate(0deg)",
          opacity: animating ? 0 : 1,
        }}
      >
        {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </div>
    </button>
  );
}

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/race-week", label: "Race Week", icon: Newspaper },
  { path: "/title-fight", label: "Title Fight", icon: Trophy },
  { path: "/trends", label: "Trends", icon: TrendingUp },
  { path: "/strategy", label: "Strategy", icon: Gauge },
  { path: "/race-explorer", label: "Race Explorer", icon: Search },
  { path: "/teams", label: "Teams & Cars", icon: Users },
  { path: "/admin", label: "Race Admin", icon: ShieldCheck },
];

function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const [location] = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50 flex flex-col border-r border-border bg-sidebar transition-all duration-200
          ${collapsed ? "w-16" : "w-56"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border">
          <div className="flex items-center gap-3">
            <AppLogo />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-foreground">IMSA INTEL</span>
                <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">Race Intelligence</span>
              </div>
            )}
          </div>
          <button
            className="md:hidden p-1 rounded text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
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

        <div className="border-t border-border p-2 hidden md:flex items-center justify-between">
          <ThemeToggle />
          <button
            data-testid="toggle-sidebar"
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}

function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-14 border-b border-border bg-sidebar flex items-center justify-between px-4 md:hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          data-testid="mobile-menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <AppLogo />
        <span className="text-sm font-bold tracking-tight">IMSA INTEL</span>
      </div>
      <ThemeToggle />
    </header>
  );
}

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader onMenuClick={() => setMobileOpen(true)} />
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main
        className={`transition-all duration-200 pt-14 md:pt-0 ${
          collapsed ? "md:ml-16" : "md:ml-56"
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
            <Route path="/teams" component={Teams} />
            <Route path="/admin" component={Admin} />
            <Route component={NotFound} />
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