import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, AlertCircle } from "lucide-react";

const CLASS_OPTIONS = ["GTP", "LMP2", "GTD_PRO", "GTD"];

const EXAMPLE = `1, #7, Nasr / Andlauer / Heinrich, Porsche Penske Motorsport, Porsche 963, 75, Winner, 350
2, #31, Aitken / Bamber / Vesti, Whelen Cadillac Racing, Cadillac V-Series.R, 75, +3.2s, 320
3, #24, Van der Linde / Vanthoor, BMW M Team WRT, BMW M Hybrid V8, 75, +12.9s, 300`;

function parseResults(text: string) {
  const lines = text.trim().split("\n").filter(l => l.trim());
  return lines.map(line => {
    const parts = line.split(",").map(s => s.trim());
    const position = parseInt(parts[0]) || 0;
    const carNumber = (parts[1] || "").replace("#", "").trim();
    const driverStr = parts[2] || "";
    const drivers = driverStr.split("/").map(d => d.trim()).filter(Boolean);
    const team = parts[3] || "";
    const chassis = parts[4] || "";
    const laps = parseInt(parts[5]) || 0;
    const gap = parts[6] || "";
    const points = parseInt(parts[7]) || 0;
    const manufacturer = chassis.split(" ")[0] || "";

    return {
      position,
      carNumber,
      drivers,
      team,
      chassis,
      manufacturer,
      laps,
      gap,
      points,
      status: gap.toLowerCase().includes("dnf") ? "DNF" : "Finished",
      pits: 0,
      quali: 0,
      gained: 0,
    };
  });
}

export default function Admin() {
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [resultsText, setResultsText] = useState("");
  const [raceLaps, setRaceLaps] = useState("");
  const [safetyCars, setSafetyCars] = useState("");
  const [redFlags, setRedFlags] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const { data: races } = useQuery({
    queryKey: ["/api/races"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/races");
      return res.json();
    },
  });

  const parsed = resultsText.trim() ? parseResults(resultsText) : [];

  async function handleSubmit() {
    if (!selectedRace || !selectedClass || parsed.length === 0) {
      setStatus({ type: "error", message: "Select a race, class, and enter results." });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await apiRequest("POST", "/api/admin/results", {
        raceId: selectedRace,
        carClass: selectedClass,
        results: parsed,
      });
      const data = await res.json();

      if (raceLaps) {
        await apiRequest("POST", "/api/admin/race-laps", {
          raceId: parseInt(selectedRace),
          laps: parseInt(raceLaps),
          safetyCars: parseInt(safetyCars) || 0,
          redFlags: parseInt(redFlags) || 0,
        });
      }

      queryClient.invalidateQueries();

      setStatus({ type: "success", message: `Added ${data.added} results for ${selectedClass}.` });
      setResultsText("");
      setRaceLaps("");
      setSafetyCars("");
      setRedFlags("");
    } catch (e: any) {
      setStatus({ type: "error", message: e.message || "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  }

  const selectedRaceData = races?.find((r: any) => String(r.id) === selectedRace);

  // Password lock screen
  if (!unlocked) {
    return (
      <motion.div
        className="p-6 flex items-center justify-center min-h-[60vh]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-border/50 w-full max-w-sm">
            <CardContent className="p-6 space-y-4">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <motion.div
                  animate={
                    password === "admin"
                      ? { rotate: [0, -10, 10, 0], scale: [1, 1.3, 1], y: [0, -8, 0] }
                      : { rotate: [0, -10, 10, -5, 5, 0] }
                  }
                  transition={
                    password === "admin"
                      ? { duration: 0.5 }
                      : { duration: 0.6, delay: 0.5 }
                  }
                >
                  <ShieldCheck className={`w-8 h-8 mx-auto mb-2 transition-colors duration-300 ${password === "admin" ? "text-green-400" : "text-primary"}`} />
                </motion.div>
                <h2 className="text-base font-bold">Race Admin</h2>
                <p className="text-xs text-muted-foreground mt-1">Enter password to continue</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="space-y-4"
              >
                <motion.div
                  animate={passwordError ? { x: [0, -12, 12, -8, 8, -4, 4, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setPasswordError(false); }}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        if (password === "admin") {
                          setPasswordError(false);
                          setTimeout(() => setUnlocked(true), 600);
                        } else {
                          setPasswordError(true);
                        }
                      }
                    }}
                    placeholder="Password"
                    className={`w-full rounded-md border bg-background px-3 py-2 text-sm text-center transition-colors duration-300 ${passwordError ? "border-red-500" : "border-border"}`}
                    data-testid="input-password"
                  />
                </motion.div>
                {passwordError && (
                  <motion.p
                    className="text-xs text-red-400 text-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: [0, -5, 5, -3, 3, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    Wrong password
                  </motion.p>
                )}
                <button
                  onClick={() => {
                    if (password === "admin") {
                      setPasswordError(false);
                      setTimeout(() => setUnlocked(true), 600);
                    } else {
                      setPasswordError(true);
                    }
                  }}
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                  data-testid="button-unlock"
                >
                  Unlock
                </button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  // Main admin form
  return (
    <motion.div
      className="p-6 space-y-6 max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" /> Race Admin
        </h1>
        <p className="text-sm text-muted-foreground">Add race results to the database</p>
      </div>

      {/* Step 1: Pick race */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Step 1 — Select Race</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={selectedRace} onValueChange={setSelectedRace}>
            <SelectTrigger data-testid="select-race">
              <SelectValue placeholder="Pick a race..." />
            </SelectTrigger>
            <SelectContent>
              {races?.map((r: any) => (
                <SelectItem key={r.id} value={String(r.id)}>
                  R{r.round} — {r.name} {r.laps > 0 ? "✓" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedRaceData && (
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span>{selectedRaceData.circuit}</span>
              <span>·</span>
              <span>{new Date(selectedRaceData.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              <span>·</span>
              <Badge variant={selectedRaceData.laps > 0 ? "default" : "outline"} className="text-[9px]">
                {selectedRaceData.laps > 0 ? "Has results" : "No results yet"}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Pick class */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Step 2 — Select Class</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger data-testid="select-class">
              <SelectValue placeholder="Pick a class..." />
            </SelectTrigger>
            <SelectContent>
              {CLASS_OPTIONS.map(c => (
                <SelectItem key={c} value={c}>{c.replace("_", " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Step 3: Race info */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Step 3 — Race Info (optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Total Laps</label>
              <input
                type="number"
                value={raceLaps}
                onChange={e => setRaceLaps(e.target.value)}
                placeholder="e.g. 75"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                data-testid="input-laps"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Safety Cars</label>
              <input
                type="number"
                value={safetyCars}
                onChange={e => setSafetyCars(e.target.value)}
                placeholder="0"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                data-testid="input-sc"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Red Flags</label>
              <input
                type="number"
                value={redFlags}
                onChange={e => setRedFlags(e.target.value)}
                placeholder="0"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                data-testid="input-rf"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Paste results */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Step 4 — Paste Results</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            One line per car: position, #car, drivers (separated by /), team, chassis, laps, gap, points
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <textarea
            value={resultsText}
            onChange={e => setResultsText(e.target.value)}
            placeholder={EXAMPLE}
            rows={8}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm font-mono leading-relaxed resize-y"
            data-testid="textarea-results"
          />

          {/* Preview */}
          {parsed.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs font-semibold text-muted-foreground mb-2">Preview ({parsed.length} entries):</p>
              <div className="max-h-48 overflow-y-auto rounded border border-border/50">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-2 py-1.5">P</th>
                      <th className="text-left px-2 py-1.5">#</th>
                      <th className="text-left px-2 py-1.5">Drivers</th>
                      <th className="text-left px-2 py-1.5">Team</th>
                      <th className="text-left px-2 py-1.5">Car</th>
                      <th className="text-right px-2 py-1.5">Laps</th>
                      <th className="text-right px-2 py-1.5">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsed.map((r, i) => (
                      <tr key={i} className="border-b border-border/30">
                        <td className="px-2 py-1 font-bold">{r.position}</td>
                        <td className="px-2 py-1">#{r.carNumber}</td>
                        <td className="px-2 py-1">{r.drivers.join(", ")}</td>
                        <td className="px-2 py-1 text-muted-foreground">{r.team}</td>
                        <td className="px-2 py-1 text-muted-foreground">{r.chassis}</td>
                        <td className="px-2 py-1 text-right">{r.laps}</td>
                        <td className="px-2 py-1 text-right">{r.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={submitting || !selectedRace || !selectedClass || parsed.length === 0}
          className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          data-testid="button-submit"
        >
          {submitting ? "Submitting..." : `Add ${parsed.length} Results`}
        </button>

        {status && (
          <motion.div
            className={`flex items-center gap-1.5 text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          >
            {status.type === "success" ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-5 h-5" />
              </motion.div>
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {status.message}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
