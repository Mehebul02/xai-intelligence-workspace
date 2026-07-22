export function WindowChrome() {
  return (
    <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
      <div className="mx-auto mono flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        xai.workspace / acme-inc / q4-revenue-signals
      </div>
      <span className="mono text-[11px] text-muted-foreground">⌘K</span>
    </div>
  );
}
