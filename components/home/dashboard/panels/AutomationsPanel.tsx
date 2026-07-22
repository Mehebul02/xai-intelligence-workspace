import { Card } from "../Card";
import { AUTOMATIONS } from "../data";
import { Automation } from "../types";

export function AutomationsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {AUTOMATIONS.map((automation) => (
        <AutomationCard key={automation.name} automation={automation} />
      ))}
    </div>
  );
}

function AutomationCard({ automation }: { automation: Automation }) {
  return (
    <Card className="group cursor-pointer transition-colors hover:border-primary/50">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-foreground">{automation.name}</div>
          <div className="mono mt-1 text-[11px] text-muted-foreground">{automation.trigger}</div>
        </div>
        <span className="h-2 w-2 translate-y-1 rounded-full bg-primary shadow-[0_0_12px] shadow-primary/60" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="mono text-[11px] text-muted-foreground">
          {automation.runs} runs · 100% healthy
        </div>
        <div className="mono text-[11px] text-foreground/80 opacity-0 transition-opacity group-hover:opacity-100">
          open →
        </div>
      </div>
    </Card>
  );
}
