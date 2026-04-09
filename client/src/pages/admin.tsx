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
      // Submit results
      const res = await apiRequest("POST", "/api/admin/results", {
        raceId: selectedRace,
        carClass: selectedClass,
        results: parsed,
      });
      const data = await res.json();

      // Update race laps if provided
      if (raceLaps) {
        await apiRequest("POST", "/api/admin/race-laps", {
          raceId: parseInt(selectedRace),
          laps: parseInt(raceLaps),
          safetyCars: parseInt(safetyCars) || 0,
          redFlags: parseInt(redFlags) || 0,
        });
      }

      // Invalidate all queries so the site refreshes
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

  return (
    <motion.div
      className="p-6 space-y-6 max-w-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
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
            <div>
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
            </div>
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
          <div className={`flex items-center gap-1.5 text-sm ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
            {status.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {status.message}
          </div>
        )}
      </div>
    </motion.div>
  );
}