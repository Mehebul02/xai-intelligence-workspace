
import { Stage } from "@/types/global";
import { StageVisual } from "./StageVisual";

interface StageCardProps {
  stage: Stage;
  index: number;
  total: number;
}

export function StageCard({
  stage,
  index,
  total,
}: StageCardProps) {
  return (
    <article
      data-stage
      className="relative grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16"
    >
      {/* Left Content */}
      <div className="relative">
        {/* Vertical Line */}
        <div
          data-flow-line
          className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-primary/70 via-primary/20 to-transparent md:block"
        />

        <div className="md:pl-8">
          {/* Stage Number */}
          <div
            data-num
            className="mono text-xs text-primary"
          >
            {stage.n} / {String(total).padStart(2, "0")}
          </div>

          {/* Kicker */}
          <div className="label mt-6">
            {stage.kicker}
          </div>

          {/* Title */}
          <h3 className="mt-3 text-balance text-2xl font-medium tracking-[-0.02em] sm:text-3xl md:text-4xl">
            {stage.title}
          </h3>

          {/* Description */}
          <p className="mt-4 max-w-md text-muted-foreground">
            {stage.body}
          </p>

          {/* Tokens */}
          <div className="mt-6 flex flex-wrap gap-2">
            {stage.tokens.map((token) => (
              <span
                key={token}
                data-token
                className="mono rounded-md border border-border/70 bg-secondary/40 px-2 py-1 text-[11px] text-foreground/80"
              >
                {token}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Visual */}
      <StageVisual index={index} />
    </article>
  );
}

export default StageCard;