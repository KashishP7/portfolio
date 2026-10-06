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
