export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: string[]; // four numbered points
  tags: string[]; // small tool tags under the role details
};

// Newest first.
export const experience: Experience[] = [
  {
    role: "Software Developer Intern",
    company: "Cloud Downunder Pty Ltd",
    location: "Remote (Australia)",
    start: "May 2024",
    end: "Sep 2024",
    highlights: [
      "Developed modular software features from functional requirements, keeping the code maintainable and ready to scale.",
      "Improved performance and stability by debugging and optimizing the existing codebase.",
      "Wrote technical documentation that supported testing, deployment and future development.",
      "Worked in an agile Scrum team, assessing needs and building solutions aligned with technical and business goals.",
    ],
    tags: ["Git", "Jira", "Agile / Scrum", "Debugging", "Technical documentation"],
  },
  {
    role: "Web Developer Intern",
    company: "TrilokN Infotech Pvt Ltd",
    location: "Ahmedabad, India",
    start: "Jun 2023",
    end: "Sep 2023",
    highlights: [
      "Built responsive web interfaces for client projects using HTML, CSS and JavaScript.",
      "Integrated backend services and REST APIs to extend what client websites could do.",
      "Ran cross-browser testing and fixed the UI and performance issues it uncovered.",
      "Maintained site content for usability and accessibility, and delivered projects on deadline.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "REST APIs", "Cross-browser testing"],
  },
];
