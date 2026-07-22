"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { NAV_GROUPS, DEFAULT_NAV_LABEL } from "./data";
import type { NavItem, Tab } from "./types";
import { SectionIntro } from "./SectionIntro";
import { WindowChrome } from "./WindowChrome";
import { Sidebar } from "./Sidebar";
import { PanelHeader } from "./PanelHeader";
import { TabStrip } from "./TabStrip";
import { PanelSwitcher } from "./PanelSwitcher";


const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);
const FALLBACK_NAV_ITEM = ALL_NAV_ITEMS[0];

export function Dashboard() {
  const [activeNavLabel, setActiveNavLabel] = useState<string>(DEFAULT_NAV_LABEL);
  const [tab, setTab] = useState<Tab>("Overview");

  const currentNavItem = useMemo(
    () => ALL_NAV_ITEMS.find((item) => item.label === activeNavLabel) ?? FALLBACK_NAV_ITEM,
    [activeNavLabel],
  );

  function handleNavigate(item: NavItem) {
    setActiveNavLabel(item.label);
    setTab(item.tab);
  }

  return (
    <section id="dashboard" className="relative mx-auto max-w-7xl px-6 py-32 md:py-40">
      <SectionIntro/>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur"
      >
        <WindowChrome />

        <div className="grid grid-cols-[220px_1fr]">
          <Sidebar activeNavLabel={activeNavLabel} onNavigate={handleNavigate} />

          <div className="p-6">
            <PanelHeader current={currentNavItem} />
            <TabStrip active={tab} onChange={setTab} />
            <PanelSwitcher tab={tab} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
