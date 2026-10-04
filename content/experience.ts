export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
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
      "Developed modular software features based on functional needs, improving maintainability and supporting scalable applications",
      "Improved system performance and stability by debugging and optimizing existing codebases",
      "Created technical documentation for testing, deployment and future development",
      "Worked in an agile Scrum team",
      "Assessed needs and built solutions aligned with technical and business goals",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "TrilokN Infotech Pvt Ltd",
    location: "Ahmedabad, India",
    start: "Jun 2023",
    end: "Sep 2023",
    highlights: [
      "Developed responsive web interfaces with HTML, CSS and JavaScript",
      "Integrated backend services and REST APIs",
      "Ran cross-browser testing and fixed UI and performance issues",
      "Maintained and optimized website content for usability and accessibility",
      "Delivered client projects within deadlines",
    ],
  },
];
