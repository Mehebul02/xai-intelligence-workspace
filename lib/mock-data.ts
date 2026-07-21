import { Stage } from "@/types/global";

export const STAGES: Stage[] = [
  {
    n: "01",
    kicker: "Ingest",
    title: "Every signal, one graph.",
    body:
      "Streams, warehouses, docs, tickets, calls. Xai normalizes them into a typed entity graph the moment they land.",
    tokens: [
      "postgres",
      "s3.parquet",
      "gmail",
      "hubspot",
      "slack",
      "notion",
      "sentry",
      "stripe",
    ],
  },
  {
    n: "02",
    kicker: "Analyze",
    title: "Reasoning, on your data.",
    body:
      "Domain-tuned models run structured plans over the graph — grounded, cited, and reproducible on every question.",
    tokens: [
      "plan →",
      "resolve.entity",
      "join.window(7d)",
      "rank.by(impact)",
      "explain",
    ],
  },
  {
    n: "03",
    kicker: "Act",
    title: "Insight becomes automation.",
    body:
      "Ship the answer as a live view, a Slack digest, or a triggered workflow — versioned like code, monitored like infra.",
    tokens: [
      "→ dashboard",
      "→ webhook",
      "→ digest",
      "→ workflow",
    ],
  },
];