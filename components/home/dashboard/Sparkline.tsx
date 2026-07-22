import { motion } from "framer-motion";
import { SPARKLINE_SERIES } from "./data";


type SparklineProps = {
  data?: number[];
};

export function Sparkline({ data = SPARKLINE_SERIES }: SparklineProps) {
  const max = Math.max(...data);
  const points = data
    .map((value, i) => `${(i / (data.length - 1)) * 100},${40 - (value / max) * 36}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 40" className="mt-4 h-10 w-full">
      <motion.polyline
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        points={points}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
