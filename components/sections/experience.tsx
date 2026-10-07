import { Section } from "@/components/ui/section";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience">
      {/* Full-width rows divided by thin lines, not cards. */}
      <ul className="border-b border-border">
        {experience.map((job) => (
          <li
            key={job.company}
            className="grid gap-6 border-t border-border py-8 sm:py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
          >
            <div>
              <h3 className="text-xl font-bold font-stretch-semi-expanded tracking-tight sm:text-2xl">
                {job.company}
              </h3>
              <p className="mt-1 text-text-soft">{job.role}</p>
              <p className="mt-3 text-sm text-muted tabular-nums">
                {job.start} – {job.end}
              </p>
              <p className="text-sm text-muted">{job.location}</p>
            </div>

            <ol className="space-y-4">
              {job.highlights.map((point, index) => (
                <li key={point} className="flex gap-4">
                  {/* The <ol> already tells screen readers the order, so the
                      visible "01" is hidden from them. */}
                  <span
                    aria-hidden="true"
                    className="pt-1 text-sm font-medium text-faint tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-lg leading-relaxed text-text-soft">
                    {point}
                  </p>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </Section>
  );
}
