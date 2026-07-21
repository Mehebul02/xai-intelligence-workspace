export function ActSVG() {
  const outputs = [
    [320, 60, "dashboard.live"],
    [320, 160, "digest.slack"],
    [320, 260, "workflow.run"],
  ] as const;

  return (
    <>
      <circle
        cx="80"
        cy="160"
        r="8"
        fill="var(--primary)"
      />

      <path
        data-draw
        d="M 90 160 C 160 160, 180 60, 320 60
           M 90 160 C 160 160, 180 160, 320 160
           M 90 160 C 160 160, 180 260, 320 260"
        fill="none"
        stroke="var(--primary)"
        strokeOpacity="0.8"
        strokeWidth="1.4"
      />

      {outputs.map(([x, y, label]) => (
        <g key={label}>
          <rect
            x={x - 4}
            y={y - 14}
            width="80"
            height="28"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.35"
          />

          <text
            x={x + 36}
            y={y + 4}
            textAnchor="middle"
            fontSize="10"
            fontFamily="JetBrains Mono"
            fill="currentColor"
            opacity="0.75"
          >
            {label}
          </text>
        </g>
      ))}
    </>
  );
}

export default ActSVG;