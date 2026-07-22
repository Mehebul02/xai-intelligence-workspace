export function SectionIntro() {
  return (
    <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <div className="label mb-4">03 — The workspace</div>
        <h2 className="text-balance text-3xl font-medium tracking-[-0.02em] sm:text-4xl md:text-5xl">
          One surface for the questions{" "}
          <span className="serif italic text-muted-foreground">your team already asks.</span>
        </h2>
      </div>
      <p className="max-w-sm text-sm text-muted-foreground">
        Preview of the analyst view. Every panel is grounded — click into a metric to
        see the plan, the sources, and the exact rows behind it.
      </p>
    </div>
  );
}
