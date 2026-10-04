export type Link = {
  kind: "email" | "linkedin" | "github"; // lets a component choose the right icon
  label: string; // visible text, e.g. "GitHub"
  href: string; // mailto: or https://
};

export type Education = {
  degree: string;
  school: string;
  location: string;
  start: string;
  end: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  about: string;
  priorities: string[];
  email: string;
  links: Link[];
};

export const profile: Profile = {
  name: "Kashish Patel",
  role: "Full-Stack Software Developer",
  location: "Toronto, Canada",
  tagline:
    "I build apps for people: software that solves real problems, from the interface to the systems behind it.",
  about:
    "I love building apps for people. Give me a real problem and I'll turn it into a product that makes someone's work easier. I'm drawn to SaaS: products people rely on every day to get their work done. Long term, I want to build one of my own.",
  priorities: [
    "The user's problem",
    "Maintainability",
    "Performance",
    "Clean code",
  ],
  email: "kkashishpatel@gmail.com",
  links: [
    {
      kind: "email",
      label: "Email",
      href: "mailto:kkashishpatel@gmail.com",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kashish-patel-962b58267",
    },
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/KashishP7",
    },
  ],
};

export const education: Education[] = [
  {
    degree: "Bachelor of Science (Honours) in Computer Science",
    school: "Brock University",
    location: "St. Catharines, ON",
    start: "Jan 2022",
    end: "Apr 2025",
  },
];
