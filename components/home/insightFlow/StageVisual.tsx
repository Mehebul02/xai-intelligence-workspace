import ActSVG from "@/components/shared/visuals/ActSVG";
import AnalyzeSVG from "@/components/shared/visuals/AnalyzeSVG";
import IngestSVG from "@/components/shared/visuals/IngestSVG";

interface StageVisualProps {
  index: number;
}

const VISUALS = [
  IngestSVG,
  AnalyzeSVG,
  ActSVG,
];

export function StageVisual({
  index,
}: StageVisualProps) {
  const Visual =
    VISUALS[index] ?? IngestSVG;

  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur">
      {/* Background Grid */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]" />

      {/* Label */}
      <div className="label absolute left-6 top-6">
        stage.visual({index + 1})
      </div>

      {/* SVG */}
      <svg
        viewBox="0 0 400 320"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <Visual />
      </svg>
    </div>
  );
}

export default StageVisual;