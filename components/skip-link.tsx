import { skipLink } from "@/content/site";

// The first Tab stop. Hidden (sr-only) until it receives keyboard focus,
// then shown in the top-left corner. Following it moves focus past the
// nav to the first section.
export function SkipLink() {
  return (
    <a
      href={`#${skipLink.target}`}
      className="sr-only rounded-xl bg-text px-4 py-2 text-sm font-semibold text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {skipLink.label}
    </a>
  );
}
