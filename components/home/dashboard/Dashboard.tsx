"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TABS = ["Overview", "Signals", "Automations", "Audit"] as const;
type Tab = (typeof TABS)[number];

const NAV = [
  { section: "Workspace", items: ["Home", "Inbox", "Insights", "Automations"] },
  { section: "Data", items: ["Sources", "Entities", "Schemas", "Runs"] },
  { section: "Team", items: ["Members", "Policies", "Audit log"] },
];

const SPARK = [12, 18, 14, 22, 28, 24, 32, 30, 38, 36, 44, 40, 52, 48, 60];

export function Dashboard() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <section
      id="dashboard"
      className="relative mx-auto max-w-7xl px-6 py-32 md:py-40"
    >
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="label mb-4">03 — The workspace</div>
          <h2 className="text-balance text-3xl font-medium tracking-[-0.02em] sm:text-4xl md:text-5xl">
            One surface for the questions{" "}
            <span className="serif italic text-muted-foreground">your team already asks.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          Preview of the analyst view. Every panel is grounded — click into a metric to
          see the plan, the sources, and the exact rows behind it.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur"
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <div className="mx-auto mono flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            xai.workspace / acme-inc / q4-revenue-signals
          </div>
          <span className="mono text-[11px] text-muted-foreground">⌘K</span>
        </div>

        <div className="grid grid-cols-[220px_1fr]">
          {/* sidebar */}
          <aside className="border-r border-border/60 bg-sidebar/60 p-4">
            <div className="mb-6 flex items-center gap-2 rounded-md border border-border/60 bg-background/50 px-2 py-1.5">
              <div className="h-5 w-5 rounded bg-primary/80" />
              <div className="text-xs">Acme, Inc.</div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="ml-auto text-muted-foreground">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            {NAV.map((group) => (
              <div key={group.section} className="mb-5">
                <div className="label mb-2 px-2 text-[10px]">{group.section}</div>
                <ul className="space-y-0.5">
                  {group.items.map((it, i) => {
                    const active = group.section === "Workspace" && i === 2;
                    return (
                      <li key={it}>
                        <button
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                            active
                              ? "bg-primary/10 text-foreground"
                              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`h-1 w-1 rounded-full ${
                              active ? "bg-primary" : "bg-foreground/25"
                            }`}
                          />
                          {it}
                          {active && (
                            <span className="mono ml-auto text-[10px] text-primary">7</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </aside>

          {/* main */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="label">Insight</div>
                <h3 className="mt-1 text-xl font-medium tracking-tight">
                  Q4 revenue signals — anomalies & drivers
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="mono rounded-md border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground">
                  last 30d
                </button>
                <button className="mono rounded-md border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground">
                  refresh
                </button>
                <button className="mono rounded-md bg-primary px-2.5 py-1 text-[11px] text-primary-foreground">
                  ship
                </button>
              </div>
            </div>

            {/* tabs */}
            <div className="mt-6 flex items-center gap-6 border-b border-border/60">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="relative py-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className={tab === t ? "text-foreground" : ""}>{t}</span>
                  {tab === t && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute inset-x-0 -bottom-px h-px bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6"
              >
                {tab === "Overview" && <OverviewPanel />}
                {tab === "Signals" && <SignalsPanel />}
                {tab === "Automations" && <AutomationsPanel />}
                {tab === "Audit" && <AuditPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function OverviewPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        { k: "$4.28M", label: "attributed pipeline", d: "+18.2%", up: true },
        { k: "312", label: "at-risk accounts", d: "-6.1%", up: true },
        { k: "94ms", label: "median latency", d: "p95 210ms", up: false },
      ].map((m) => (
        <Card key={m.label}>
          <div className="flex items-start justify-between">
            <div className="label">{m.label}</div>
            <span
              className={`mono text-[10px] ${
                m.up ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {m.d}
            </span>
          </div>
          <div className="mono mt-6 text-3xl text-foreground">{m.k}</div>
          <Sparkline />
        </Card>
      ))}

      <Card className="md:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="label">Signal timeline</div>
            <div className="mt-1 text-sm text-foreground">Anomalies detected in ARR pace</div>
          </div>
          <div className="mono flex gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> observed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" /> baseline
            </span>
          </div>
        </div>
        <BigChart />
      </Card>

      <Card>
        <div className="label">Top drivers</div>
        <ul className="mt-4 space-y-3">
          {[
            ["Enterprise expansion", 62],
            ["Self-serve upgrades", 41],
            ["Reactivation", 28],
            ["Partner sourced", 19],
          ].map(([label, pct]) => (
            <li key={label as string} className="text-xs">
              <div className="flex items-center justify-between">
                <span className="text-foreground/90">{label}</span>
                <span className="mono text-muted-foreground">{pct}%</span>
              </div>
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-primary/80"
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function SignalsPanel() {
  const rows = [
    ["Acme Corp", "expansion", "$182K", "high", "12m"],
    ["Northwind", "churn-risk", "$54K", "med", "18m"],
    ["Contoso", "upgrade", "$96K", "high", "3m"],
    ["Initech", "reactivation", "$21K", "low", "1m"],
    ["Umbrella", "expansion", "$310K", "high", "22m"],
    ["Massive Dynamic", "churn-risk", "$78K", "med", "9m"],
  ];
  return (
    <Card>
      <table className="w-full text-left text-xs">
        <thead className="label border-b border-border/60 [&_th]:pb-3 [&_th]:font-normal">
          <tr>
            <th>Account</th>
            <th>Signal</th>
            <th>ARR impact</th>
            <th>Confidence</th>
            <th>Tenure</th>
          </tr>
        </thead>
        <tbody className="[&_td]:py-3 [&_tr]:border-b [&_tr]:border-border/40 hover:[&_tr]:bg-secondary/40">
          {rows.map((r) => (
            <tr key={r[0]} className="transition-colors">
              <td className="font-medium">{r[0]}</td>
              <td>
                <span className="mono rounded border border-border/60 bg-background/60 px-1.5 py-0.5 text-[10px]">
                  {r[1]}
                </span>
              </td>
              <td className="mono">{r[2]}</td>
              <td>
                <span
                  className={`mono text-[10px] ${
                    r[3] === "high"
                      ? "text-primary"
                      : r[3] === "med"
                        ? "text-foreground/80"
                        : "text-muted-foreground"
                  }`}
                >
                  ●●● {r[3]}
                </span>
              </td>
              <td className="mono text-muted-foreground">{r[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function AutomationsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        { name: "Churn-risk → CSM digest", trigger: "when confidence > 0.8", runs: 214 },
        { name: "Expansion → CRM task", trigger: "when arr_delta > $50K", runs: 128 },
        { name: "Anomaly → Slack #revops", trigger: "on p95 breach", runs: 47 },
        { name: "Signal → Notion doc", trigger: "daily 09:00 PT", runs: 30 },
      ].map((a) => (
        <Card key={a.name} className="group cursor-pointer transition-colors hover:border-primary/50">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-foreground">{a.name}</div>
              <div className="mono mt-1 text-[11px] text-muted-foreground">{a.trigger}</div>
            </div>
            <span className="h-2 w-2 translate-y-1 rounded-full bg-primary shadow-[0_0_12px] shadow-primary/60" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="mono text-[11px] text-muted-foreground">
              {a.runs} runs · 100% healthy
            </div>
            <div className="mono text-[11px] text-foreground/80 opacity-0 transition-opacity group-hover:opacity-100">
              open →
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function AuditPanel() {
  return (
    <Card>
      <ul className="mono space-y-3 text-[11px]">
        {[
          ["09:42:11", "plan.compile", "q4-revenue-signals@v14"],
          ["09:42:11", "resolve.entity", "acme-inc → 1 match"],
          ["09:42:12", "join.window(7d)", "orders × signals"],
          ["09:42:12", "rank.by(impact)", "6 rows"],
          ["09:42:12", "explain", "cited 4 sources"],
          ["09:42:13", "ship", "→ slack #revops"],
        ].map((r) => (
          <li key={r[1] + r[0]} className="grid grid-cols-[80px_180px_1fr] gap-4">
            <span className="text-muted-foreground">{r[0]}</span>
            <span className="text-primary">{r[1]}</span>
            <span className="text-foreground/80">{r[2]}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-border/60 bg-background/40 p-5 transition-colors ${className}`}
    >
      {children}
    </div>
  );
}

function Sparkline() {
  const max = Math.max(...SPARK);
  const pts = SPARK.map((v, i) => `${(i / (SPARK.length - 1)) * 100},${40 - (v / max) * 36}`).join(" ");
  return (
    <svg viewBox="0 0 100 40" className="mt-4 h-10 w-full">
      <motion.polyline
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        points={pts}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function BigChart() {
  const observed = Array.from({ length: 40 }, (_, i) => {
    const base = 40 + Math.sin(i * 0.4) * 10 + i * 0.6;
    const noise = Math.sin(i * 1.7) * 5 + (i > 26 ? 12 : 0);
    return Math.max(10, base + noise);
  });
  const baseline = observed.map((_, i) => 40 + i * 0.6);
  const toPath = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (arr.length - 1)) * 100},${80 - (v / 90) * 70}`).join(" ");

  return (
    <div className="relative">
      <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="h-48 w-full">
        {[0, 20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.3" />
        ))}
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          d={toPath(baseline)}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="1.5,1.5"
          strokeWidth="0.6"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
          d={toPath(observed)}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
        />
        <motion.circle
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4 }}
          cx={(32 / 39) * 100}
          cy={80 - (observed[32] / 90) * 70}
          r="1.6"
          fill="var(--primary)"
        />
      </svg>
      <div className="mono absolute right-2 top-2 rounded border border-primary/40 bg-background/70 px-1.5 py-0.5 text-[10px] text-primary">
        anomaly · +18.2σ
      </div>
    </div>
  );
}