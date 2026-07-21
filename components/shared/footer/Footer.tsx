import React from 'react';

const Footer = () => {
    return (
        <footer className="relative border-t border-border/60 px-6 pb-10 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 4l7 8-7 8M20 4l-7 8 7 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="12" cy="12" r="1.6" fill="var(--primary)" />
              </svg>
              <span className="font-medium">Xai</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The intelligence workspace. From raw data to shipped decision, on one
              continuous surface.
            </p>
            <div className="mono mt-6 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              all systems operational · 99.98% uptime
            </div>
          </div>
          {[
            ["Product", ["Overview", "Workspace", "Automations", "Changelog"]],
            ["Company", ["About", "Careers", "Press", "Security"]],
            ["Resources", ["Docs", "Cookbook", "API", "Status"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <div className="label mb-4">{title as string}</div>
              <ul className="space-y-2 text-sm">
                {(items as string[]).map((i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© 2026 Xai Labs. All rights reserved.</div>
          <div className="mono">designed & built · prototype v0.9</div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;