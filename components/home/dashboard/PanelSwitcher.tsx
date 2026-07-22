import { AnimatePresence, motion } from "framer-motion";
import { OverviewPanel } from "./panels/OverviewPanel";
import { SignalsPanel } from "./panels/SignalsPanel";
import { AutomationsPanel } from "./panels/AutomationsPanel";
import { AuditPanel } from "./panels/AuditPanel";
import { Tab } from "./types";

const PANELS: Record<Tab, React.ComponentType> = {
  Overview: OverviewPanel,
  Signals: SignalsPanel,
  Automations: AutomationsPanel,
  Audit: AuditPanel,
};

type PanelSwitcherProps = {
  tab: Tab;
};

export function PanelSwitcher({ tab }: PanelSwitcherProps) {
  const ActivePanel = PANELS[tab];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6"
      >
        <ActivePanel />
      </motion.div>
    </AnimatePresence>
  );
}
