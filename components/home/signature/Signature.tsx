"use client"
import { motion } from "framer-motion";
import { useRef, useState } from "react";

import { SignatureScene, type Formation } from "./SignatureScene";
import { ClientOnly } from "../hero/ClientOnly";

const OPTIONS: { id: Formation; label: string; desc: string }[] = [
  { id: "sphere", label: "Ambient", desc: "unstructured signal, before resolution" },
  { id: "helix", label: "Sequenced", desc: "temporal windows across an entity" },
  { id: "cube", label: "Indexed", desc: "typed lattice, queryable in ms" },
  { id: "disc", label: "Surfaced", desc: "collapsed to the answer you asked for" },
];

export function Signature() {
  const [formation, setFormation] = useState<Formation>("sphere");
  const hovering = useRef({ x: 0, y: 0, active: 0 });

  return (
    <section
      id="signature"
      className="relative mx-auto max-w-6xl px-6 py-32 md:py-40"
    >
      <div className="mb-16 max-w-2xl">
        <div className="label mb-4">04 — Signature</div>
        <h2 className="text-balance text-3xl font-medium tracking-[-0.02em] sm:text-4xl md:text-5xl">
          The same data,{" "}
          <span className="serif italic text-muted-foreground">reorganized</span>{" "}
          for the question you&rsquo;re asking.
        </h2>
        <p className="mt-5 max-w-lg text-muted-foreground">
          A cluster of 900 signals rearranges itself in real time. Hover to
          disturb it. Choose a view — the geometry follows the intent.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        <div
          className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            hovering.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
            hovering.current.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
            hovering.current.active = 1;
          }}
          onPointerLeave={() => {
            hovering.current.active = 0;
            hovering.current.x = 0;
            hovering.current.y = 0;
          }}
        >
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_50%,var(--background)_100%)]" />
          <ClientOnly>
            <SignatureScene formation={formation} hovering={hovering} />
          </ClientOnly>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <div className="label rounded-full border border-border/70 bg-background/60 px-3 py-1 backdrop-blur">
              formation · {formation}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {OPTIONS.map((o, i) => {
            const active = o.id === formation;
            return (
              <motion.button
                key={o.id}
                onClick={() => setFormation(o.id)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
                className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-colors ${
                  active
                    ? "border-primary/60 bg-primary/5"
                    : "border-border/70 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="mono text-[11px] text-muted-foreground">
                    0{i + 1}
                  </div>
                  {active && (
                    <motion.span
                      layoutId="sig-dot"
                      className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px] shadow-primary/60"
                    />
                  )}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">
                  {o.label}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{o.desc}</div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}