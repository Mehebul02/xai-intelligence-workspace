// "use client"
// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// const STAGES = [
//   {
//     n: "01",
//     kicker: "Ingest",
//     title: "Every signal, one graph.",
//     body:
//       "Streams, warehouses, docs, tickets, calls. Xai normalizes them into a typed entity graph the moment they land.",
//     tokens: ["postgres", "s3.parquet", "gmail", "hubspot", "slack", "notion", "sentry", "stripe"],
//   },
//   {
//     n: "02",
//     kicker: "Analyze",
//     title: "Reasoning, on your data.",
//     body:
//       "Domain-tuned models run structured plans over the graph — grounded, cited, and reproducible on every question.",
//     tokens: ["plan → ", "resolve.entity", "join.window(7d)", "rank.by(impact)", "explain"],
//   },
//   {
//     n: "03",
//     kicker: "Act",
//     title: "Insight becomes automation.",
//     body:
//       "Ship the answer as a live view, a Slack digest, or a triggered workflow — versioned like code, monitored like infra.",
//     tokens: ["→ dashboard", "→ webhook", "→ digest", "→ workflow"],
//   },
// ];

// export function InsightFlow() {
//   const root = useRef<HTMLElement>(null);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     let ctx: gsap.Context | undefined;
//     let cleanup: (() => void) | undefined;

//     (async () => {
//       const { ScrollTrigger } = await import("gsap/ScrollTrigger");
//       gsap.registerPlugin(ScrollTrigger);
//       if (!root.current) return;

//       ctx = gsap.context(() => {
//         const cards = gsap.utils.toArray<HTMLElement>("[data-stage]");

//         cards.forEach((card, i) => {
//           gsap.from(card, {
//             opacity: 0,
//             y: 60,
//             duration: 0.9,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: card,
//               start: "top 82%",
//               end: "bottom 60%",
//               toggleActions: "play none none reverse",
//             },
//           });

//           const line = card.querySelector<HTMLElement>("[data-flow-line]");
//           if (line) {
//             gsap.fromTo(
//               line,
//               { scaleY: 0, transformOrigin: "top" },
//               {
//                 scaleY: 1,
//                 duration: 1.2,
//                 ease: "power2.inOut",
//                 scrollTrigger: {
//                   trigger: card,
//                   start: "top 70%",
//                   end: "bottom 40%",
//                   scrub: 0.6,
//                 },
//               },
//             );
//           }

//           const tokens = card.querySelectorAll<HTMLElement>("[data-token]");
//           gsap.from(tokens, {
//             opacity: 0,
//             y: 8,
//             stagger: 0.04,
//             duration: 0.5,
//             ease: "power2.out",
//             scrollTrigger: { trigger: card, start: "top 70%" },
//           });

//           const num = card.querySelector<HTMLElement>("[data-num]");
//           if (num) {
//             gsap.from(num, {
//               letterSpacing: "0.6em",
//               opacity: 0,
//               duration: 1,
//               ease: "power3.out",
//               scrollTrigger: { trigger: card, start: "top 78%" },
//             });
//           }

//           // Draw the connecting mask on the SVG visual
//           const draw = card.querySelector<SVGPathElement>("[data-draw]");
//           if (draw) {
//             const len = draw.getTotalLength();
//             gsap.set(draw, { strokeDasharray: len, strokeDashoffset: len });
//             gsap.to(draw, {
//               strokeDashoffset: 0,
//               ease: "none",
//               scrollTrigger: {
//                 trigger: card,
//                 start: "top 75%",
//                 end: "bottom 40%",
//                 scrub: 0.8,
//               },
//             });
//           }

//           // Section-index indicator
//           ScrollTrigger.create({
//             trigger: card,
//             start: "top 50%",
//             end: "bottom 50%",
//             onToggle: (self) => {
//               const dot = document.querySelector(`[data-dot="${i}"]`);
//               if (dot) dot.classList.toggle("is-active", self.isActive);
//             },
//           });
//         });
//       }, root);

//       cleanup = () => ctx?.revert();
//     })();

//     return () => cleanup?.();
//   }, []);

//   return (
//     <section
//       id="flow"
//       ref={root}
//       className="relative mx-auto max-w-6xl px-6 py-32 md:py-40"
//     >
//       <div className="mb-20 max-w-2xl">
//         <div className="label mb-4">02 — The transformation</div>
//         <h2 className="text-balance text-3xl font-medium tracking-[-0.02em] sm:text-4xl md:text-5xl">
//           Three moves,{" "}
//           <span className="serif italic text-muted-foreground">one</span>{" "}
//           continuous system.
//         </h2>
//         <p className="mt-5 max-w-lg text-muted-foreground">
//           Xai collapses the trip from raw data to shipped decision. No swivel-chair,
//           no glue code, no dashboards nobody opens.
//         </p>
//       </div>

//       {/* left rail with progress dots */}
//       <aside className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex">
//         {STAGES.map((s, i) => (
//           <div key={s.n} className="flex items-center gap-3">
//             <span
//               data-dot={i}
//               className="mono h-1.5 w-1.5 rounded-full bg-foreground/25 transition-all duration-500 [&.is-active]:h-5 [&.is-active]:bg-primary"
//             />
//             <span className="label opacity-0 transition-opacity duration-300 [.is-active~&]:opacity-100">
//               {s.kicker}
//             </span>
//           </div>
//         ))}
//       </aside>

//       <div className="space-y-24 md:space-y-40">
//         {STAGES.map((s, i) => (
//           <article
//             key={s.n}
//             data-stage
//             className="relative grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16"
//           >
//             <div className="relative">
//               <div
//                 data-flow-line
//                 className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-primary/70 via-primary/20 to-transparent md:block"
//               />
//               <div className="md:pl-8">
//                 <div
//                   data-num
//                   className="mono text-xs text-primary"
//                 >
//                   {s.n} / {String(STAGES.length).padStart(2, "0")}
//                 </div>
//                 <div className="label mt-6">{s.kicker}</div>
//                 <h3 className="mt-3 text-balance text-2xl font-medium tracking-[-0.02em] sm:text-3xl md:text-4xl">
//                   {s.title}
//                 </h3>
//                 <p className="mt-4 max-w-md text-muted-foreground">{s.body}</p>
//                 <div className="mt-6 flex flex-wrap gap-2">
//                   {s.tokens.map((t) => (
//                     <span
//                       key={t}
//                       data-token
//                       className="mono rounded-md border border-border/70 bg-secondary/40 px-2 py-1 text-[11px] text-foreground/80"
//                     >
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <StageVisual index={i} />
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// function StageVisual({ index }: { index: number }) {
//   return (
//     <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur">
//       <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)]" />
//       <div className="label absolute left-6 top-6">stage.visual({index + 1})</div>

//       <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full">
//         {index === 0 && <IngestSVG />}
//         {index === 1 && <AnalyzeSVG />}
//         {index === 2 && <ActSVG />}
//       </svg>
//     </div>
//   );
// }

// function IngestSVG() {
//   const sources = Array.from({ length: 7 }, (_, i) => ({
//     x: 40,
//     y: 60 + i * 32,
//   }));
//   return (
//     <>
//       {sources.map((s, i) => (
//         <g key={i}>
//           <rect
//             x={s.x}
//             y={s.y - 8}
//             width="70"
//             height="16"
//             rx="3"
//             fill="none"
//             stroke="currentColor"
//             strokeOpacity="0.35"
//           />
//           <path
//             data-draw
//             d={`M${s.x + 72} ${s.y} C 180 ${s.y}, 240 160, 320 160`}
//             fill="none"
//             stroke="var(--primary)"
//             strokeOpacity="0.55"
//             strokeWidth="1"
//           />
//         </g>
//       ))}
//       <circle cx="320" cy="160" r="34" fill="none" stroke="var(--primary)" strokeOpacity="0.7" />
//       <circle cx="320" cy="160" r="6" fill="var(--primary)" />
//       <text
//         x="320"
//         y="215"
//         textAnchor="middle"
//         fontSize="10"
//         fontFamily="JetBrains Mono"
//         fill="currentColor"
//         opacity="0.55"
//       >
//         entity.graph
//       </text>
//     </>
//   );
// }

// function AnalyzeSVG() {
//   const nodes = [
//     [80, 90], [160, 60], [240, 100], [320, 70],
//     [110, 180], [200, 160], [290, 200], [360, 170],
//     [140, 260], [230, 240], [320, 270],
//   ];
//   return (
//     <>
//       {nodes.map((a, i) =>
//         nodes.slice(i + 1).map((b, j) => {
//           const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
//           if (d > 130) return null;
//           return (
//             <line
//               key={`${i}-${j}`}
//               x1={a[0]}
//               y1={a[1]}
//               x2={b[0]}
//               y2={b[1]}
//               stroke="currentColor"
//               strokeOpacity="0.15"
//               strokeWidth="1"
//             />
//           );
//         }),
//       )}
//       <path
//         data-draw
//         d="M 80 90 L 160 60 L 240 100 L 200 160 L 290 200 L 320 70"
//         fill="none"
//         stroke="var(--primary)"
//         strokeWidth="1.5"
//       />
//       {nodes.map(([x, y], i) => (
//         <circle
//           key={i}
//           cx={x}
//           cy={y}
//           r={i % 3 === 0 ? 4 : 2.5}
//           fill={i % 3 === 0 ? "var(--primary)" : "currentColor"}
//           opacity={i % 3 === 0 ? 1 : 0.6}
//         />
//       ))}
//     </>
//   );
// }

// function ActSVG() {
//   return (
//     <>
//       <circle cx="80" cy="160" r="8" fill="var(--primary)" />
//       <path
//         data-draw
//         d="M 90 160 C 160 160, 180 60, 320 60 M 90 160 C 160 160, 180 160, 320 160 M 90 160 C 160 160, 180 260, 320 260"
//         fill="none"
//         stroke="var(--primary)"
//         strokeOpacity="0.8"
//         strokeWidth="1.4"
//       />
//       {[
//         [320, 60, "dashboard.live"],
//         [320, 160, "digest.slack"],
//         [320, 260, "workflow.run"],
//       ].map(([x, y, label]) => (
//         <g key={label as string}>
//           <rect
//             x={(x as number) - 4}
//             y={(y as number) - 14}
//             width="80"
//             height="28"
//             rx="4"
//             fill="none"
//             stroke="currentColor"
//             strokeOpacity="0.35"
//           />
//           <text
//             x={(x as number) + 36}
//             y={(y as number) + 4}
//             textAnchor="middle"
//             fontSize="10"
//             fontFamily="JetBrains Mono"
//             fill="currentColor"
//             opacity="0.75"
//           >
//             {label as string}
//           </text>
//         </g>
//       ))}
//     </>
//   );
// }


"use client";

import { useEffect, useRef } from "react";

import { StageCard } from "./StageCard";
import { initInsightAnimation } from "./animations";
import ProgressRail from "./ProgressRail";
import { STAGES } from "@/lib/mock-data";


export function InsightFlow() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const cleanup = initInsightAnimation(root);

    return () => cleanup?.();
  }, []);

  return (
    <section
      id="flow"
      ref={root}
      className="relative mx-auto max-w-6xl px-6 py-32 md:py-40"
    >
      {/* Heading */}
      <div className="mb-20 max-w-2xl">
        <div className="label mb-4">
          02 — The transformation
        </div>

        <h2 className="text-balance text-3xl font-medium tracking-[-0.02em] sm:text-4xl md:text-5xl">
          Three moves,{" "}
          <span className="serif italic text-muted-foreground">
            one
          </span>{" "}
          continuous system.
        </h2>

        <p className="mt-5 max-w-lg text-muted-foreground">
          Xai collapses the trip from raw data to shipped
          decision. No swivel-chair, no glue code,
          no dashboards nobody opens.
        </p>
      </div>

      {/* Progress Rail */}
      <ProgressRail stages={STAGES} />

      {/* Stage Cards */}
      <div className="space-y-24 md:space-y-40">
        {STAGES.map((stage, index) => (
          <StageCard
            key={stage.n}
            stage={stage}
            index={index}
            total={STAGES.length}
          />
        ))}
      </div>
    </section>
  );
}

export default InsightFlow;