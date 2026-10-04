// One spec line in the Blueprint layer: label is drawn in --bp-ink,
// value in --bp-value.
export type BlueprintDetail = {
  label: string;
  value: string;
  planned?: boolean; // true = designed but not built yet
};

type ProjectBase = {
  name: string;
  summary: string;
  stack: string[];
  blueprint: BlueprintDetail[];
  repoUrl?: string;
  liveUrl?: string;
};

// `status` decides which other fields are allowed. A shipped project must
// have a `shipped` date, and an in-progress one can't have one, so a
// "shipped with no date" project is a type error instead of a bug on screen.
export type Project =
  | (ProjectBase & { status: "in-progress" })
  | (ProjectBase & { status: "shipped"; shipped: string });

const docSearch: Project = {
  name: "DocSearch",
  status: "in-progress",
  summary:
    "A document Q&A platform: upload documents, ask questions in plain language, and get answers that cite the passage they came from.",
  stack: [
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "pgvector",
    "OpenAI API",
  ],
  // Pipeline steps, in order.
  blueprint: [
    { label: "upload", value: "Next.js", planned: true },
    { label: "chunk", value: "FastAPI", planned: true },
    { label: "embed", value: "OpenAI API", planned: true },
    { label: "store", value: "PostgreSQL + pgvector", planned: true },
    { label: "retrieve", value: "similarity search", planned: true },
    { label: "answer", value: "LLM with citations", planned: true },
  ],
  // TODO: add repoUrl / liveUrl if they should be public
};

const connectX: Project = {
  name: "ConnectX",
  status: "shipped",
  shipped: "Apr 2025",
  summary:
    "A social media automation platform that runs keyword-based workflows for Instagram comments and DMs.",
  stack: [
    "Next.js",
    "TypeScript",
    "Node.js",
    "Prisma",
    "React Query",
    "Instagram API",
    "Stripe",
  ],
  blueprint: [
    { label: "trigger", value: "comment matches a keyword" },
    { label: "action", value: "send DM through the Instagram API" },
    { label: "data", value: "Prisma models for workflows" },
    { label: "ui", value: "React Query for fetching and caching" },
    { label: "billing", value: "Stripe" },
    { label: "api", value: "REST API in Node.js" },
  ],
  // TODO: add repoUrl / liveUrl if they should be public
};

const waitingRoom: Project = {
  name: "Waiting room scheduler",
  status: "shipped",
  shipped: "Feb 2024",
  summary:
    "A Java system for clinic appointments that orders patients fairly with a priority queue and saves state between sessions.",
  stack: ["Java", "Data structures"],
  blueprint: [
    {
      label: "queue",
      value: "PriorityQueue<Patient>, ordered by urgency then arrival time",
    },
    { label: "persistence", value: "file-based, saved between sessions" },
    { label: "timing", value: "custom logic to simulate a real day" },
  ],
  // TODO: add repoUrl if it should be public
};

export const currentlyBuilding: Project = docSearch;
export const selectedWork: Project[] = [connectX, waitingRoom];
