// One labelled paragraph on the back of a card, e.g. "What it does".
export type DetailNote = {
  label: string;
  text: string;
};

// Everything on the back of a flip card, shown in this order.
export type ProjectDetails = {
  notes: DetailNote[];
  keyFeatures?: string[];
  builtWith: string[];
};

type ProjectBase = {
  id: "docsearch" | "connectx" | "waiting-room"; // picks the front illustration
  name: string;
  summary: string;
  details: ProjectDetails;
  repoUrl?: string;
  liveUrl?: string;
};

// `status` decides which other fields are allowed. A complete project must
// have a `completedLabel`, and an in-progress one can't have one, so a
// "complete with no date" project is a type error instead of a bug on screen.
export type Project =
  | (ProjectBase & { status: "in-progress"; startedOn?: string }) // "YYYY-MM-DD"
  | (ProjectBase & { status: "complete"; completedLabel: string });

const docSearch: Project = {
  id: "docsearch",
  name: "DocSearch",
  status: "in-progress",
  // TODO: add startedOn ("YYYY-MM-DD") to show the day counter
  summary:
    "A document Q&A platform: upload documents, ask questions in plain language, and get answers that cite the passage they came from.",
  details: {
    notes: [
      {
        label: "What it does",
        text: "Turns a set of documents into something you can question in plain language, with a source for every answer.",
      },
      {
        label: "How it works",
        text: "Documents are split into passages and stored as vectors. A question finds the closest passages, and the answer is written from them.",
      },
      {
        label: "Why citations",
        text: "Showing the exact passage behind each answer makes it traceable and cuts down on unsupported responses.",
      },
    ],
    keyFeatures: [
      "Document upload",
      "Plain-language questions",
      "Answers with source citations",
    ],
    builtWith: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL with pgvector",
      "OpenAI API",
    ],
  },
  // TODO: add repoUrl / liveUrl if they should be public
};

const connectX: Project = {
  id: "connectx",
  name: "ConnectX",
  status: "complete",
  completedLabel: "Shipped April 2025",
  summary:
    "A social media automation platform that runs keyword-based workflows for Instagram comments and DMs.",
  details: {
    notes: [
      {
        label: "What it does",
        text: "Replies to Instagram comments and DMs automatically whenever they match keywords the user sets up.",
      },
      {
        label: "My role",
        text: "Designed the REST APIs and workflow logic, built the database schema with Prisma, and tuned frontend data fetching, working in a small agile team.",
      },
    ],
    keyFeatures: [
      "Configurable keyword workflows",
      "Automated comment and DM replies",
      "Stripe payments",
    ],
    builtWith: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Prisma",
      "React Query",
      "Instagram API",
      "Stripe",
    ],
  },
  // TODO: add repoUrl / liveUrl if they should be public
};

const waitingRoom: Project = {
  id: "waiting-room",
  name: "Waiting room scheduler",
  status: "complete",
  completedLabel: "Built February 2024",
  summary:
    "A Java system for clinic appointments that orders patients fairly with a priority queue and saves state between sessions.",
  details: {
    notes: [
      {
        label: "What it does",
        text: "Manages patient appointments and decides who is seen next: urgent cases first, then by arrival time.",
      },
      {
        label: "How it works",
        text: "A priority queue keeps scheduling fair, custom timing logic simulates a real clinic day, and file persistence saves state between sessions.",
      },
      {
        label: "My role",
        text: "Designed and implemented the whole system.",
      },
    ],
    builtWith: ["Java", "priority queues", "file handling"],
  },
  // TODO: add repoUrl if it should be public
};

export const currentlyBuilding: Project = docSearch;
export const selectedWork: Project[] = [connectX, waitingRoom];
