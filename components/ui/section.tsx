import { Container } from "@/components/ui/container";
import { sectionHeadings, type SectionId } from "@/content/site";

type SectionProps = {
  id: Exclude<SectionId, "home">; // the hero has no heading, so it isn't a Section
  children: React.ReactNode;
};

// A page section with its heading. The heading text comes from
// content/site.ts, so only the section's id is needed here.
export function Section({ id, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    // Top padding only: the space between sections is the next one's pt.
    <section id={id} aria-labelledby={headingId} className="pt-12 sm:pt-16">
      <Container>
        <h2
          id={headingId}
          className="mb-6 text-3xl font-bold font-stretch-semi-expanded tracking-tight sm:mb-8 sm:text-[2.75rem] sm:leading-tight"
        >
          {sectionHeadings[id]}
        </h2>
        {children}
      </Container>
    </section>
  );
}
