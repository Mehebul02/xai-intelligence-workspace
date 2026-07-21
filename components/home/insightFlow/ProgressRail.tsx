import { Stage } from "@/types/global";

interface ProgressRailProps {
  stages: Stage[];
}

export function ProgressRail({
  stages,
}: ProgressRailProps) {
  return (
    <aside className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex">
      {stages.map((stage, index) => (
        <div
          key={stage.n}
          className="flex items-center gap-3"
        >
          <span
            data-dot={index}
            className="mono h-1.5 w-1.5 rounded-full bg-foreground/25 transition-all duration-500 [&.is-active]:h-5 [&.is-active]:bg-primary"
          />

          <span className="label opacity-0 transition-opacity duration-300 [.is-active~&]:opacity-100">
            {stage.kicker}
          </span>
        </div>
      ))}
    </aside>
  );
}

export default ProgressRail;