import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { education, educationLabel, profile } from "@/content/profile";

export function About() {
  return (
    <Section id="about">
      <Card>
        <p className="max-w-4xl text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
          {profile.aboutStatement}
        </p>

        <div className="mt-8 max-w-[68ch] space-y-5 font-serif text-lg leading-relaxed text-text-soft sm:mt-10 sm:text-xl">
          {profile.aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-8 sm:mt-12">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-faint">
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
