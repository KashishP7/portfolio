import { Card } from "@/components/ui/card";
import { projectLabels, type Project } from "@/content/projects";
import { Illustration } from "./project-illustration";

type ProjectCardProps = {
  project: Project;
  featured?: boolean; // full-width card with the illustration beside the text
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card className={`flex flex-col ${featured ? "md:col-span-2" : ""}`}>
      <div
        className={
          featured
            ? "grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
            : "flex flex-col gap-8"
        }
      >
        {/* First in the markup so it sits on top on phones; on wide screens
            the featured card moves it to the right with lg:order-2. */}
        <div className={featured ? "lg:order-2" : ""}>
          <Illustration illustration={project.illustration} />
        </div>

        <div>
          <ProjectStatus project={project} />
          <h3 className="mt-3 text-2xl font-bold font-stretch-semi-expanded tracking-tight sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 font-serif text-lg leading-relaxed text-text-soft">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Does nothing yet. The flip to the card's back comes in M5.
          mt-auto pushes it to the bottom, so side-by-side cards line up;
          pt-8 keeps a minimum gap above it. */}
      <div className="mt-auto flex justify-end pt-8">
        <DetailsButton />
      </div>
    </Card>
  );
}

function DetailsButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-full border border-border bg-inset px-4 py-2 text-sm font-medium text-text-soft transition-colors hover:border-border-hover hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {projectLabels.details}
      <FoldedCorner />
    </button>
  );
}

function ProjectStatus({ project }: { project: Project }) {
  // Checking `status` narrows the union: in the second branch TypeScript
  // knows `completedLabel` exists.
  if (project.status === "in-progress") {
    // TODO: day counter once `startedOn` is set (needs a client component,
    // since a pre-rendered page would freeze the count at build time).
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-text-soft">
        <span className="size-2 rounded-full bg-live" aria-hidden="true" />
        {projectLabels.currentlyBuilding}
      </p>
    );
  }

  return <p className="text-sm text-muted">{project.completedLabel}</p>;
}

// A tiny page with its top-right corner folded down: a square whose corner
// is cut off by a diagonal gradient, plus a small triangle for the fold.
function FoldedCorner() {
  return (
    <span aria-hidden="true" className="relative size-3.5">
      <span className="absolute inset-0 rounded-[2px] bg-[linear-gradient(225deg,transparent_32%,currentColor_32%)] opacity-60" />
      <span className="absolute top-0 right-0 size-[45%] rounded-bl-[2px] bg-[linear-gradient(225deg,transparent_50%,currentColor_50%)]" />
    </span>
  );
}
