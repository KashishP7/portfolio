import { navItems } from "@/content/site";

export function BottomNav() {
  return (
    // The <nav> spans the full width, so it ignores clicks (pointer-events-none)
    // and only the pill itself is clickable.
    <nav className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <ul className="pointer-events-auto flex w-full justify-between gap-1 rounded-2xl border border-border bg-card/80 p-1.5 backdrop-blur-md sm:w-auto">
        {navItems.map((item) => (
          <li key={item.target}>
            <a
              href={`#${item.target}`}
              className="block rounded-xl border border-transparent px-2.5 py-2 text-xs font-medium text-muted transition-colors hover:border-border-hover hover:bg-card-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-sm"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
