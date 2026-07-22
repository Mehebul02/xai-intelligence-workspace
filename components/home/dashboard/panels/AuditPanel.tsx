import { Card } from "../Card";
import { AUDIT_LOG } from "../data";

export function AuditPanel() {
  return (
    <Card>
      <ul className="mono space-y-3 text-[11px]">
        {AUDIT_LOG.map((entry) => (
          <li key={`${entry.action}-${entry.time}`} className="grid grid-cols-[80px_180px_1fr] gap-4">
            <span className="text-muted-foreground">{entry.time}</span>
            <span className="text-primary">{entry.action}</span>
            <span className="text-foreground/80">{entry.detail}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
