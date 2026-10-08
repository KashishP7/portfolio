import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { education, educationLabel, profile } from "@/content/profile";

export function About() {
  return (
    <Section id="about">
      <Card>
        {/* Stacked until 1024px; then the statement takes the left 5/12 and
            the paragraphs the right 7/12. */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <p className="text-[1.375rem] font-semibold leading-snug tracking-tight sm:text-[1.625rem] lg:text-[1.875rem]">
            {profile.aboutStatement}
          </p>

          <div className="max-w-[68ch] space-y-4 font-serif text-[1.0625rem] leading-relaxed text-text-soft sm:text-lg">
            {profile.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 sm:mt-10 sm:pt-8">
          <h3 className="text-xs font-semibold text-faint">
            {educationLabel}
          </h3>
          {education.map((entry) => (
            <div
              key={entry.degree}
              className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="text-lg font-semibold">{entry.degree}</p>
                <p className="text-muted">
                  {entry.school}, {entry.location}
                </p>
              </div>
              <p className="shrink-0 text-sm text-faint tabular-nums">
                {entry.start} – {entry.end}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
