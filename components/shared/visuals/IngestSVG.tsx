const SOURCES = Array.from({ length: 7 }, (_, index) => ({
  id: index,
  x: 40,
  y: 60 + index * 32,
}));

export function IngestSVG() {
  return (
    <>
      {SOURCES.map((source) => (
        <g key={source.id}>
          {/* Source */}
          <rect
            x={source.x}
            y={source.y - 8}
            width="70"
            height="16"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.35}
          />

          {/* Connection */}
          <path
            data-draw
            d={`M${source.x + 72} ${source.y} C 180 ${source.y}, 240 160, 320 160`}
            fill="none"
            stroke="var(--primary)"
            strokeOpacity={0.55}
            strokeWidth={1}
          />
        </g>
      ))}

      {/* Entity Graph */}
      <circle
        cx="320"
        cy="160"
        r="34"
        fill="none"
        stroke="var(--primary)"
        strokeOpacity={0.7}
      />

      <circle
        cx="320"
        cy="160"
        r="6"
        fill="var(--primary)"
      />

      <text
        x="320"
        y="215"
        textAnchor="middle"
        fontSize="10"
        fontFamily="JetBrains Mono"
        fill="currentColor"
        opacity={0.55}
      >
        entity.graph
      </text>
    </>
  );
}

export default IngestSVG;