"use client"
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";
import { ClientOnly } from "./ClientOnly";
import { HeroScene } from "./HeroScene";

const Hero = () => {
     const progress = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = Math.min(1, v * 1.6);
  });
    return (
         <section
      id="top"
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_85%)]" />

      <div className="absolute inset-0">
        <ClientOnly>
          <HeroScene progress={progress} />
        </ClientOnly>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 pt-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 rounded-full border border-border/70 bg-background/40 px-3 py-1 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="label !tracking-[0.18em]">Now in private beta · v0.9</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-4xl text-balance text-5xl font-medium tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl"
        >
          The intelligence workspace{" "}
          <span className="serif italic text-muted-foreground">between</span>{" "}
          raw data and decisions.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Xai ingests unstructured signal, resolves it into a queryable graph,
          and lets your team act on it — with automations that ship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10 flex items-center gap-3"
        >
          <a
            href="#flow"
            className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            See how it works
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm text-foreground/90 transition-colors hover:bg-secondary"
          >
            Open workspace preview
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-6 border-t border-border/50 pt-6"
        >
          {[
            ["12.4B", "signals indexed / week"],
            ["94ms", "median query latency"],
            ["3→1", "tools your team replaces"],
          ].map(([k, v]) => (
            <div key={v} className="text-left">
              <div className="mono text-2xl text-foreground">{k}</div>
              <div className="mt-1 text-xs text-muted-foreground">{v}</div>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <div className="label flex items-center gap-2">
          <span className="h-px w-8 bg-foreground/30" />
          scroll to transform
          <span className="h-px w-8 bg-foreground/30" />
        </div>
      </motion.div>
    </section>
    );
};

export default Hero;