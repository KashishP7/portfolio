export type SectionId =
  | "home"
  | "about"
  | "toolkit"
  | "projects"
  | "experience"
  | "contact";

// Visible heading for every section except the hero.
export const sectionHeadings: Record<Exclude<SectionId, "home">, string> = {
  about: "About",
  toolkit: "Toolkit",
  projects: "Projects",
  experience: "Experience",
  contact: "Contact",
};

export type NavItem = {
  label: string;
  target: SectionId; // the section this link scrolls to
};

export const navItems: NavItem[] = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Projects", target: "projects" },
  { label: "Toolkit", target: "toolkit" },
  { label: "Experience", target: "experience" },
  { label: "Contact", target: "contact" },
];

// The sections below the hero, in page order (app/page.tsx follows this).
// The floating nav shows one dot per section.
export const sectionOrder: Exclude<SectionId, "home">[] = [
  "about",
  "projects",
  "toolkit",
  "experience",
  "contact",
];

// "01", "02", ... from the page order; used by the section headings and
// the footer index.
export function sectionNumber(id: Exclude<SectionId, "home">): string {
  return String(sectionOrder.indexOf(id) + 1).padStart(2, "0");
}

// The small pill that appears once the hero's nav has scrolled away.
export const floatingNav = {
  label: "Sections", // names the <nav> for screen readers
  hint: "show all sections", // added to the button's label after the section name
};

// First Tab stop on the page, hidden until focused. Jumps past the nav.
export const skipLink = {
  label: "Skip to content",
  target: "about" satisfies SectionId,
};

export const footer = {
  // Under the large name; joined with an accent " / ".
  descriptor: ["Toronto, Canada", "Web, SaaS and AI"],
  colophonLabel: "Colophon",
  colophon:
    "Built with Next.js, TypeScript and Tailwind CSS. Set in Archivo and Newsreader. Deployed on Vercel.",
  colophonTags: ["Next.js", "TypeScript", "Tailwind"], // shown uppercase
  copyright: "© 2026 Kashish Patel",
  madeIn: "Made in Toronto",
  backToTop: "Back to top ↑",
};
