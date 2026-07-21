"use client"
import { motion } from "framer-motion";
import LogoMark from "../LogoMark";

const Header = () => {
    return (
        <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="flex w-full max-w-6xl items-center justify-between rounded-full border border-border/60 bg-background/60 px-4 py-2 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-sm font-medium tracking-tight">Xai</span>
          <span className="label ml-2 hidden sm:inline">Intelligence Workspace</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {[
            ["Product", "#flow"],
            ["Workspace", "#dashboard"],
            ["Signature", "#signature"],
            ["Docs", "#"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </a>
          <a
            href="#"
            className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Request access
          </a>
        </div>
      </nav>
    </motion.header>
    );
};

export default Header;



