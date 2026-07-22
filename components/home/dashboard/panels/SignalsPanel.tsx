import { Card } from "../Card";
import { SIGNAL_ROWS } from "../data";
import { SignalRow } from "../types";

const CONFIDENCE_STYLES: Record<SignalRow["confidence"], string> = {
  high: "text-primary",
  med: "text-foreground/80",
  low: "text-muted-foreground",
};

export function SignalsPanel() {
  return (
    <Card>
      <table className="w-full text-left text-xs">
        <thead className="label border-b border-border/60 [&_th]:pb-3 [&_th]:font-normal">
          <tr>
            <th>Account</th>
            <th>Signal</th>
            <th>ARR impact</th>
            <th>Confidence</th>
            <th>Tenure</th>
          </tr>
        </thead>
        <tbody className="[&_td]:py-3 [&_tr]:border-b [&_tr]:border-border/40 hover:[&_tr]:bg-secondary/40">
          {SIGNAL_ROWS.map((row) => (
            <SignalTableRow key={row.account} row={row} />
          ))}
        </tbody>
      </table>
    </Card>
  );
}

function SignalTableRow({ row }: { row: SignalRow }) {
  return (
    <tr className="transition-colors">
      <td className="font-medium">{row.account}</td>
      <td>
        <span className="mono rounded border border-border/60 bg-background/60 px-1.5 py-0.5 text-[10px]">
          {row.signal}
        </span>
      </td>
      <td className="mono">{row.arrImpact}</td>
      <td>
        <span className={`mono text-[10px] ${CONFIDENCE_STYLES[row.confidence]}`}>
          ●●● {row.confidence}
        </span>
      </td>
      <td className="mono text-muted-foreground">{row.tenure}</td>
    </tr>
  );
}
