import { navItems } from "@/content/site";

// Sits at the bottom of the hero and scrolls away with the page.
export function BottomNav() {
  return (
    <nav className="flex justify-center">
      {/* Phones: six links don't fit on one row, so they sit in a neat
          3 × 2 grid inside the full-width pill. From 640px: one row. */}
      <ul className="grid w-full grid-cols-3 gap-0.5 rounded-2xl border border-border bg-card p-1 sm:flex sm:w-auto sm:gap-1 sm:p-1.5">
        {navItems.map((item) => (
          <li key={item.target}>
            <a
              href={`#${item.target}`}
              data-spotlight
              className="block rounded-xl px-2 py-2 text-center text-xs font-medium text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-sm"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
