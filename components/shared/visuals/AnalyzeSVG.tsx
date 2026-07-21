export function AnalyzeSVG() {
  const nodes = [
    [80, 90],
    [160, 60],
    [240, 100],
    [320, 70],
    [110, 180],
    [200, 160],
    [290, 200],
    [360, 170],
    [140, 260],
    [230, 240],
    [320, 270],
  ];

  return (
    <>
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) => {
          const distance = Math.hypot(
            a[0] - b[0],
            a[1] - b[1]
          );

          if (distance > 130) return null;

          return (
            <line
              key={`${i}-${j}`}
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
          );
        })
      )}

      <path
        data-draw
        d="M 80 90 L 160 60 L 240 100 L 200 160 L 290 200 L 320 70"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
      />

      {nodes.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={index % 3 === 0 ? 4 : 2.5}
          fill={
            index % 3 === 0
              ? "var(--primary)"
              : "currentColor"
          }
          opacity={index % 3 === 0 ? 1 : 0.6}
        />
      ))}
    </>
  );
}

export default AnalyzeSVG;