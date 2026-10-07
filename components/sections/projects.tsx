import { Section } from "@/components/ui/section";
import { currentlyBuilding, selectedWork } from "@/content/projects";
import { ProjectCard } from "./project-card";

export function Projects() {
  return (
    <Section id="projects">
      {/* One column on phones; from md up, two columns with the featured
          card spanning both. */}
      <div className="grid gap-6 md:grid-cols-2">
        <ProjectCard project={currentlyBuilding} featured />
        {selectedWork.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
