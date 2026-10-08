import { Section } from "@/components/ui/section";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience">
      {/* Full-width rows divided by thin lines, not cards. The <li> draws the
          line; the inner div is the spotlight target, which gets a rounded
          highlight on hover. Its negative margin lets the highlight extend
          a little past the text without moving the text. */}
      <ul>
        {experience.map((job) => (
          <li key={job.company} className="border-t border-border py-2 last:border-b">
            <div
              data-spotlight
              data-reveal
              className="-mx-3 grid gap-6 rounded-2xl border border-transparent px-3 py-6 sm:-mx-5 sm:px-5 sm:py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
            >
              <div>
                <h3 className="text-xl font-bold font-stretch-semi-expanded tracking-tight sm:text-2xl">
                  {job.company}
                </h3>
                <p className="mt-1 text-text-soft">{job.role}</p>
                <p className="small-label mt-3 tabular-nums">
                  {job.start} – {job.end}
                </p>
                <p className="mt-1 text-sm text-muted">{job.location}</p>
              </div>

              <ol className="space-y-4">
                {job.highlights.map((point, index) => (
                  <li key={point} className="flex gap-4">
                    {/* The <ol> already tells screen readers the order, so the
                        visible "01" is hidden from them. */}
                    <span
                      aria-hidden="true"
                      className="pt-1 text-sm font-medium text-accent tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-serif text-lg leading-relaxed text-text-soft">
                      {point}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
