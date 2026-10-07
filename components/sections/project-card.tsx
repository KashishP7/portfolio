import { Card } from "@/components/ui/card";
import { projectLabels, type Project } from "@/content/projects";
import { Illustration } from "./project-illustration";

type ProjectCardProps = {
  project: Project;
  featured?: boolean; // full-width card with the illustration beside the text
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card className={`relative flex flex-col ${featured ? "md:col-span-2" : ""}`}>
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

      {/* Keeps the summary clear of the folded corner below it. */}
      <div aria-hidden="true" className="h-8 shrink-0" />

      <FlipCorner projectName={project.name} />
    </Card>
  );
}

// The fold: the bottom-right half of the square is the page background (the
// corner looks cut away), a thin line marks the crease, and the top-left
// half is the folded-back flap.
const foldBackground =
  "linear-gradient(to top left, var(--bg) 49%, var(--border-hover) 49% 51%, var(--card-hover) 51%)";

// Does nothing yet; the flip to the card's back comes in M5.
function FlipCorner({ projectName }: { projectName: string }) {
  return (
    <button
      type="button"
      // The label repeats the visible text and adds the project, so screen
      // reader users can tell the three buttons apart.
      aria-label={`${projectLabels.flip}: ${projectName}`}
      // -right-px/-bottom-px: sits over the card's border so the cut-away
      // corner hides it. pr-18 leaves room for the fold beside the text.
      className="group absolute -right-px -bottom-px rounded-br-3xl py-4 pr-18 pl-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="text-xs font-medium text-muted transition-colors group-hover:text-text">
        {projectLabels.flip}
      </span>
      {/* Grows from 56px to 64px on hover, like the page lifting a little. */}
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-0 size-14 rounded-tl-xl transition-[width,height] duration-200 group-hover:size-16"
        style={{ background: foldBackground }}
      />
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
