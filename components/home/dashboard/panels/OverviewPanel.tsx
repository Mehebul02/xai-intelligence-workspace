import { motion } from "framer-motion";
import { Card } from "../Card";
import { Sparkline } from "../Sparkline";
import { BigChart } from "../BigChart";
import { OVERVIEW_METRICS, REVENUE_DRIVERS } from "../data";
import { Driver, Metric } from "../types";


export function OverviewPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {OVERVIEW_METRICS.map((metric) => (
        <MetricCard key={metric.label} metric={metric} />
      ))}

      <Card className="md:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="label">Signal timeline</div>
            <div className="mt-1 text-sm text-foreground">Anomalies detected in ARR pace</div>
          </div>
          <ChartLegend />
        </div>
        <BigChart />
      </Card>

      <Card>
        <div className="label">Top drivers</div>
        <ul className="mt-4 space-y-3">
          {REVENUE_DRIVERS.map((driver) => (
            <DriverRow key={driver.label} driver={driver} />
          ))}
        </ul>
      </Card>
    </div>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="label">{metric.label}</div>
        <span className={`mono text-[10px] ${metric.positive ? "text-primary" : "text-muted-foreground"}`}>
          {metric.delta}
        </span>
      </div>
      <div className="mono mt-6 text-3xl text-foreground">{metric.value}</div>
      <Sparkline />
    </Card>
  );
}

function ChartLegend() {
  return (
    <div className="mono flex gap-3 text-[10px] text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" /> observed
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" /> baseline
      </span>
    </div>
  );
}

function DriverRow({ driver }: { driver: Driver }) {
  return (
    <li className="text-xs">
      <div className="flex items-center justify-between">
        <span className="text-foreground/90">{driver.label}</span>
        <span className="mono text-muted-foreground">{driver.pct}%</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${driver.pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-primary/80"
        />
      </div>
    </li>
  );
}
