export type Link = {
  kind: "email" | "linkedin" | "github"; // lets a component choose the right icon
  label: string; // visible text, e.g. "GitHub"
  handle: string; // short text shown under the label, e.g. "KashishP7"
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
  availability: string;
  tagline: string; // the one-line intro in the hero
  aboutStatement: string;
  aboutParagraphs: string[];
  email: string;
  links: Link[];
};

export const profile: Profile = {
  name: "Kashish Patel",
  role: "Full-Stack Software Developer",
  location: "Toronto, Canada",
  availability: "Open to software engineering roles",
  tagline:
    "I build apps for people: software that solves real problems, from the interface to the systems behind it.",
  aboutStatement:
    "I love building apps for people. Give me a real problem and I'll turn it into a product that makes someone's work easier.",
  aboutParagraphs: [
    "I'm a full-stack developer based in Toronto. I studied Computer Science at Brock University, and I've worked on software in two very different settings: building client websites in Ahmedabad, India, and shipping features remotely with a team in Australia.",
    "What I enjoy most is the whole life of a product: understanding the problem, designing something people actually want to use, and building the systems that make it work. I care about clean, maintainable code and software that feels fast.",
    "I'm especially drawn to SaaS, the tools people rely on every day to get their work done. Long term, I want to build a product of my own.",
  ],
  email: "kkashishpatel@gmail.com",
  // In display order (the social cards in the Contact section).
  links: [
    {
      kind: "github",
      label: "GitHub",
      handle: "KashishP7",
      href: "https://github.com/KashishP7",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      handle: "Kashish Patel",
      href: "https://www.linkedin.com/in/kashish-patel-962b58267",
    },
    {
      kind: "email",
      label: "Email",
      handle: "kkashishpatel@gmail.com",
      href: "mailto:kkashishpatel@gmail.com",
    },
  ],
};

// Small heading above the education entry in the About card.
export const educationLabel = "Education";

export const education: Education[] = [
  {
    degree: "Bachelor of Science (Honours) in Computer Science",
    school: "Brock University",
    location: "St. Catharines, ON",
    start: "Jan 2022",
    end: "Apr 2025",
  },
];
