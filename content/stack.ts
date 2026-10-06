export type Tool = {
  label: string;
  color: string; // soft pastel version of the brand color, used for the name text
};

// Tools shown in the Toolkit section, in display order.
export const tools: Tool[] = [
  { label: "Python", color: "#8fb8e0" },
  { label: "JavaScript", color: "#f2e58c" },
  { label: "TypeScript", color: "#8db3e8" },
  { label: "Java", color: "#f0b07a" },
  { label: "React", color: "#9be7f8" },
  { label: "Next.js", color: "#eceae4" },
  { label: "Tailwind CSS", color: "#8fd8ec" },
  { label: "Node.js", color: "#a8d49a" },
  { label: "Express", color: "#c9cccf" },
  { label: "FastAPI", color: "#7fd1c4" },
  { label: "Django", color: "#94d8b8" },
  { label: "PostgreSQL", color: "#9db2f0" },
  { label: "Prisma", color: "#c3cddb" },
  { label: "Docker", color: "#8cc8f5" },
  { label: "OpenAI API", color: "#b8e0d2" },
];
