"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const POINT_COUNT = 40;
const ANOMALY_INDEX = 32;

/** Synthetic observed series */
function buildObservedSeries(length: number): number[] {
  return Array.from({ length }, (_, i) => {
    const trend = 40 + Math.sin(i * 0.4) * 10 + i * 0.6;
    const noise = Math.sin(i * 1.7) * 5 + (i > 26 ? 12 : 0);
    return Math.max(10, trend + noise);
  });
}

/** Baseline series */
function buildBaselineSeries(observed: number[]): number[] {
  return observed.map((_, i) => 40 + i * 0.6);
}

/** Convert values to SVG path */
function toPath(values: number[]): string {
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 80 - (v / 90) * 70;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

export function BigChart() {
  const observed = useMemo(
    () => buildObservedSeries(POINT_COUNT),
    []
  );

  const baseline = useMemo(
    () => buildBaselineSeries(observed),
    [observed]
  );

  const observedPath = useMemo(
    () => toPath(observed),
    [observed]
  );

  const baselinePath = useMemo(
    () => toPath(baseline),
    [baseline]
  );

  const anomalyX = (ANOMALY_INDEX / (POINT_COUNT - 1)) * 100;
  const anomalyY = 80 - (observed[ANOMALY_INDEX] / 90) * 70;

  return (
    <div className="relative">
      <svg
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        className="h-48 w-full"
      >
        {[0, 20, 40, 60, 80].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth="0.3"
          />
        ))}

        {/* Baseline */}
        <motion.path
          d={baselinePath}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="1.5,1.5"
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.4,
            ease: "easeOut",
          }}
        />

        {/* Observed */}
        <motion.path
          d={observedPath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.6,
            ease: "easeOut",
            delay: 0.2,
          }}
        />

        {/* Anomaly Point */}
        <motion.circle
          cx={anomalyX}
          cy={anomalyY}
          r="1.6"
          fill="var(--primary)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 1.4,
            duration: 0.35,
          }}
        />
      </svg>

      <div className="mono absolute right-2 top-2 rounded border border-primary/40 bg-background/70 px-1.5 py-0.5 text-[10px] text-primary">
        anomaly · +18.2σ
      </div>
    </div>
  );
}