import { Card } from "@/components/ui/card";
import { TagList } from "@/components/ui/tag-list";
import { projectLabels, type Project } from "@/content/projects";
import { FlipCard } from "./flip-card";
import { Illustration } from "./project-illustration";

type ProjectCardProps = {
  project: Project;
  featured?: boolean; // full-width card with the illustration beside the text
};

// Both faces are built here on the server; FlipCard (the only client part)
// just stacks them and handles the flip. Labels go in as plain strings so
// the project data isn't shipped to the browser as JavaScript.
export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <FlipCard
      className={featured ? "md:col-span-2" : ""}
      projectName={project.name}
      flipLabel={projectLabels.flip}
      flipBackLabel={projectLabels.flipBack}
      front={<ProjectFront project={project} featured={featured} />}
      back={<ProjectBack project={project} featured={featured} />}
    />
  );
}

function ProjectFront({ project, featured }: Required<ProjectCardProps>) {
  return (
    <Card className="flex h-full flex-col">
      {/* The back usually needs more height, which sets the card's size.
          So the front fills it: the wide card centers its content; the two
          side-by-side cards keep the illustration at the top (lined up
          with each other) and the text at the bottom. */}
      <div
        className={
          featured
            ? "grid flex-1 content-center gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
            : "flex flex-1 flex-col justify-between gap-8"
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
          {project.tags && <TagList tags={project.tags} className="mt-4" />}
        </div>
      </div>

      <CornerSpace />
    </Card>
  );
}

function ProjectBack({ project, featured }: Required<ProjectCardProps>) {
  const { notes, keyFeatures, builtWith } = project.details;

  return (
    <Card className="flex h-full flex-col">
      <h3 className="text-xl font-bold font-stretch-semi-expanded tracking-tight sm:text-2xl">
        {project.name}
      </h3>

      {/* The wide DocSearch card uses two columns from 1024px:
          notes on the left, features and tools on the right. */}
      <div
        className={
          featured
            ? "mt-6 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12"
            : "mt-6 flex flex-col gap-6"
        }
      >
        <dl className="space-y-4">
          {notes.map((note) => (
            <div key={note.label}>
              <dt className={labelClasses}>{note.label}</dt>
              <dd className="mt-1 font-serif text-base leading-relaxed text-text-soft">
                {note.text}
              </dd>
            </div>
          ))}
        </dl>

        <div className="space-y-6">
          {keyFeatures && (
            <div>
              <h4 className={labelClasses}>{projectLabels.keyFeatures}</h4>
              <ul className="mt-2 space-y-1.5 font-serif text-base text-text-soft">
                {keyFeatures.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1 shrink-0 rounded-full bg-muted"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className={labelClasses}>{projectLabels.builtWith}</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {builtWith.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-border bg-inset px-3 py-1 text-xs text-text-soft"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <CornerSpace />
    </Card>
  );
}

// Small sentence-case labels on the back ("What it does", "Built with").
const labelClasses = "text-sm font-medium text-muted";

// Keeps the content clear of the folded corner, which FlipCard places in
// the bottom-right of each face. mt-auto pushes it to the bottom.
function CornerSpace() {
  return <div aria-hidden="true" className="mt-auto h-8 shrink-0" />;
}

function ProjectStatus({ project }: { project: Project }) {
  // Checking `status` narrows the union: in the second branch TypeScript
  // knows `completedLabel` exists.
  if (project.status === "in-progress") {
    // TODO: day counter once `startedOn` is set (needs a client component,
    // since a pre-rendered page would freeze the count at build time).
    return (
      <p className="small-label flex items-center gap-2">
        <span className="size-2 rounded-full bg-live" aria-hidden="true" />
        {projectLabels.currentlyBuilding}
      </p>
    );
  }

  return <p className="small-label">{project.completedLabel}</p>;
}
