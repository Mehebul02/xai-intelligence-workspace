export const TABS = ["Overview", "Signals", "Automations", "Audit"] as const;

export type Tab = (typeof TABS)[number];

export type NavItem = {
  label: string;
  title: string;
  eyebrow: string;
  tab: Tab;
  badge?: string;
};

export type NavGroup = {
  section: string;
  items: NavItem[];
};

export type SignalRow = {
  account: string;
  signal: string;
  arrImpact: string;
  confidence: "high" | "med" | "low";
  tenure: string;
};

export type Automation = {
  name: string;
  trigger: string;
  runs: number;
};

export type AuditEntry = {
  time: string;
  action: string;
  detail: string;
};

export type Driver = {
  label: string;
  pct: number;
};

export type Metric = {
  value: string;
  label: string;
  delta: string;
  positive: boolean;
};
