import { motion } from "framer-motion";
import { Tab, TABS } from "./types";

type TabStripProps = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

export function TabStrip({ active, onChange }: TabStripProps) {
  return (
    <div className="mt-6 flex items-center gap-6 border-b border-border/60" role="tablist">
      {TABS.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className="relative py-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className={isActive ? "text-foreground" : ""}>{tab}</span>
            {isActive && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-0 -bottom-px h-px bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
