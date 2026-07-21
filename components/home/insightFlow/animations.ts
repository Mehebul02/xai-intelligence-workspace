/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject } from "react";
import gsap from "gsap";

export function initInsightAnimation(
  root: RefObject<HTMLElement | null>
) {
  if (typeof window === "undefined") return;

  let ctx: gsap.Context | undefined;

  (async () => {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");

    gsap.registerPlugin(ScrollTrigger);

    if (!root.current) return;

    ctx = gsap.context(() => {
      const cards =
        gsap.utils.toArray<HTMLElement>("[data-stage]");

      cards.forEach((card, index) => {
        animateCard(card);
        animateFlowLine(card);
        animateTokens(card);
        animateNumber(card);
        animateSVG(card);
        animateProgress(card, index, ScrollTrigger);
      });
    }, root);
  })();

  return () => {
    ctx?.revert();
  };
}

/* ------------------------------
   Card Animation
--------------------------------*/
function animateCard(card: HTMLElement) {
  gsap.from(card, {
    opacity: 0,
    y: 60,
    duration: 0.9,
    ease: "power3.out",

    scrollTrigger: {
      trigger: card,
      start: "top 82%",
      end: "bottom 60%",
      toggleActions: "play none none reverse",
    },
  });
}

/* ------------------------------
   Vertical Line
--------------------------------*/
function animateFlowLine(card: HTMLElement) {
  const line =
    card.querySelector<HTMLElement>(
      "[data-flow-line]"
    );

  if (!line) return;

  gsap.fromTo(
    line,
    {
      scaleY: 0,
      transformOrigin: "top",
    },
    {
      scaleY: 1,
      duration: 1.2,
      ease: "power2.inOut",

      scrollTrigger: {
        trigger: card,
        start: "top 70%",
        end: "bottom 40%",
        scrub: 0.6,
      },
    }
  );
}

/* ------------------------------
   Tokens
--------------------------------*/
function animateTokens(card: HTMLElement) {
  const tokens =
    card.querySelectorAll<HTMLElement>(
      "[data-token]"
    );

  if (!tokens.length) return;

  gsap.from(tokens, {
    opacity: 0,
    y: 8,
    stagger: 0.04,
    duration: 0.5,
    ease: "power2.out",

    scrollTrigger: {
      trigger: card,
      start: "top 70%",
    },
  });
}

/* ------------------------------
   Number
--------------------------------*/
function animateNumber(card: HTMLElement) {
  const num =
    card.querySelector<HTMLElement>(
      "[data-num]"
    );

  if (!num) return;

  gsap.from(num, {
    letterSpacing: "0.6em",
    opacity: 0,
    duration: 1,
    ease: "power3.out",

    scrollTrigger: {
      trigger: card,
      start: "top 78%",
    },
  });
}

/* ------------------------------
   SVG Draw
--------------------------------*/
function animateSVG(card: HTMLElement) {
  const draw =
    card.querySelector<SVGPathElement>(
      "[data-draw]"
    );

  if (!draw) return;

  const length = draw.getTotalLength();

  gsap.set(draw, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  gsap.to(draw, {
    strokeDashoffset: 0,
    ease: "none",

    scrollTrigger: {
      trigger: card,
      start: "top 75%",
      end: "bottom 40%",
      scrub: 0.8,
    },
  });
}

/* ------------------------------
   Progress Rail
--------------------------------*/
function animateProgress(
  card: HTMLElement,
  index: number,
  ScrollTrigger: any
) {
  ScrollTrigger.create({
    trigger: card,
    start: "top 50%",
    end: "bottom 50%",

    onToggle(self: any) {
      const dot = document.querySelector(
        `[data-dot="${index}"]`
      );

      if (dot) {
        dot.classList.toggle(
          "is-active",
          self.isActive
        );
      }
    },
  });
}