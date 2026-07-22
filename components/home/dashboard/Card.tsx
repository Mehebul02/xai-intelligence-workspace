import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border/60 bg-background/40 p-5 transition-colors ${className}`}
    >
      {children}
    </div>
  );
}
