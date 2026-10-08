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
  { label: "Experience", target: "experience" },
  { label: "Contact", target: "contact" },
];

// First Tab stop on the page, hidden until focused. Jumps past the nav.
export const skipLink = {
  label: "Skip to content",
  target: "about" satisfies SectionId,
};

export const footer = {
  credit: "Kashish Patel, Toronto",
};
