import { NAV_GROUPS } from "./data";
import { NavItem } from "./types";

type SidebarProps = {
  activeNavLabel: string;
  onNavigate: (item: NavItem) => void;
};

export function Sidebar({ activeNavLabel, onNavigate }: SidebarProps) {
  return (
    <aside className="border-r border-border/60 bg-sidebar/60 p-4">
      <WorkspaceSwitcher />

      {NAV_GROUPS.map((group) => (
        <nav key={group.section} className="mb-5" aria-label={group.section}>
          <div className="label mb-2 px-2 text-[10px]">{group.section}</div>
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <NavRow
                key={item.label}
                item={item}
                active={activeNavLabel === item.label}
                onSelect={() => onNavigate(item)}
              />
            ))}
          </ul>
        </nav>
      ))}
    </aside>
  );
}

function WorkspaceSwitcher() {
  return (
    <div className="mb-6 flex items-center gap-2 rounded-md border border-border/60 bg-background/50 px-2 py-1.5">
      <div className="h-5 w-5 rounded bg-primary/80" />
      <div className="text-xs">Acme, Inc.</div>
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        className="ml-auto text-muted-foreground"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

function NavRow({
  item,
  active,
  onSelect,
}: {
  item: NavItem;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={active ? "page" : undefined}
        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
          active
            ? "bg-primary/10 text-foreground"
            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
        }`}
      >
        <span className={`h-1 w-1 rounded-full ${active ? "bg-primary" : "bg-foreground/25"}`} />
        {item.label}
        {item.badge && (
          <span className={`mono ml-auto text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
            {item.badge}
          </span>
        )}
      </button>
    </li>
  );
}
