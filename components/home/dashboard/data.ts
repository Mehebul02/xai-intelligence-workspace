import type {
  AuditEntry,
  Automation,
  Driver,
  Metric,
  NavGroup,
  SignalRow,
} from "./types";

export const NAV_GROUPS: NavGroup[] = [
  {
    section: "Workspace",
    items: [
      { label: "Home", title: "Today — what changed while you were away", eyebrow: "Briefing", tab: "Overview" },
      { label: "Inbox", title: "Signals waiting for a decision", eyebrow: "Queue", tab: "Signals", badge: "12" },
      { label: "Insights", title: "Q4 revenue signals — anomalies & drivers", eyebrow: "Insight", tab: "Overview", badge: "7" },
      { label: "Automations", title: "Live automations across the workspace", eyebrow: "Runtime", tab: "Automations" },
    ],
  },
  {
    section: "Data",
    items: [
      { label: "Sources", title: "Connected sources — freshness & health", eyebrow: "Data", tab: "Overview" },
      { label: "Entities", title: "Resolved entities across your stack", eyebrow: "Graph", tab: "Signals" },
      { label: "Schemas", title: "Schema drift & contract checks", eyebrow: "Contracts", tab: "Audit" },
      { label: "Runs", title: "Pipeline runs — last 24h", eyebrow: "Runtime", tab: "Audit" },
    ],
  },
  {
    section: "Team",
    items: [
      { label: "Members", title: "Members & seat activity", eyebrow: "Team", tab: "Overview" },
      { label: "Policies", title: "Access policies & guardrails", eyebrow: "Governance", tab: "Automations" },
      { label: "Audit log", title: "Full workspace audit trail", eyebrow: "Governance", tab: "Audit" },
    ],
  },
];

export const DEFAULT_NAV_LABEL = "Insights";

export const SPARKLINE_SERIES: number[] = [
  12, 18, 14, 22, 28, 24, 32, 30, 38, 36, 44, 40, 52, 48, 60,
];

export const OVERVIEW_METRICS: Metric[] = [
  { value: "$4.28M", label: "attributed pipeline", delta: "+18.2%", positive: true },
  { value: "312", label: "at-risk accounts", delta: "-6.1%", positive: true },
  { value: "94ms", label: "median latency", delta: "p95 210ms", positive: false },
];

export const REVENUE_DRIVERS: Driver[] = [
  { label: "Enterprise expansion", pct: 62 },
  { label: "Self-serve upgrades", pct: 41 },
  { label: "Reactivation", pct: 28 },
  { label: "Partner sourced", pct: 19 },
];

export const SIGNAL_ROWS: SignalRow[] = [
  { account: "Acme Corp", signal: "expansion", arrImpact: "$182K", confidence: "high", tenure: "12m" },
  { account: "Northwind", signal: "churn-risk", arrImpact: "$54K", confidence: "med", tenure: "18m" },
  { account: "Contoso", signal: "upgrade", arrImpact: "$96K", confidence: "high", tenure: "3m" },
  { account: "Initech", signal: "reactivation", arrImpact: "$21K", confidence: "low", tenure: "1m" },
  { account: "Umbrella", signal: "expansion", arrImpact: "$310K", confidence: "high", tenure: "22m" },
  { account: "Massive Dynamic", signal: "churn-risk", arrImpact: "$78K", confidence: "med", tenure: "9m" },
];

export const AUTOMATIONS: Automation[] = [
  { name: "Churn-risk → CSM digest", trigger: "when confidence > 0.8", runs: 214 },
  { name: "Expansion → CRM task", trigger: "when arr_delta > $50K", runs: 128 },
  { name: "Anomaly → Slack #revops", trigger: "on p95 breach", runs: 47 },
  { name: "Signal → Notion doc", trigger: "daily 09:00 PT", runs: 30 },
];

export const AUDIT_LOG: AuditEntry[] = [
  { time: "09:42:11", action: "plan.compile", detail: "q4-revenue-signals@v14" },
  { time: "09:42:11", action: "resolve.entity", detail: "acme-inc → 1 match" },
  { time: "09:42:12", action: "join.window(7d)", detail: "orders × signals" },
  { time: "09:42:12", action: "rank.by(impact)", detail: "6 rows" },
  { time: "09:42:12", action: "explain", detail: "cited 4 sources" },
  { time: "09:42:13", action: "ship", detail: "→ slack #revops" },
];
