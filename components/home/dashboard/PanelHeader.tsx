import { AnimatePresence, motion } from "framer-motion";
import { NavItem } from "./types";

type PanelHeaderProps = {
  current: NavItem;
};

export function PanelHeader({ current }: PanelHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="label">{current.eyebrow}</div>
        <AnimatePresence mode="wait">
          <motion.h3
            key={current.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 text-xl font-medium tracking-tight"
          >
            {current.title}
          </motion.h3>
        </AnimatePresence>
      </div>
      <QuickActions />
    </div>
  );
}

function QuickActions() {
  return (
    <div className="flex items-center gap-2">
      <button type="button" className="mono rounded-md border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground">
        last 30d
      </button>
      <button type="button" className="mono rounded-md border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground">
        refresh
      </button>
      <button type="button" className="mono rounded-md bg-primary px-2.5 py-1 text-[11px] text-primary-foreground">
        ship
      </button>
    </div>
  );
}
