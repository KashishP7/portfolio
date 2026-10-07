import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { contact } from "@/content/contact";
import { profile } from "@/content/profile";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <Section id="contact">
      <Card>
        {/* Phones: heading, then the form below. Wide screens: side by side. */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-3xl font-bold font-stretch-semi-expanded tracking-tight sm:text-4xl lg:text-5xl">
              {contact.heading}
            </h3>
            <p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-text-soft sm:text-xl">
              {contact.line}
            </p>
          </div>
          <ContactForm />
        </div>
      </Card>

      <ul className="mt-6 grid gap-6 md:grid-cols-3">
        {profile.links.map((link) => (
          <li key={link.kind}>
            <Card
              href={link.href}
              external={link.kind !== "email"}
              padded={false}
              className="relative px-6 py-8 sm:px-8"
            >
              <span
                aria-hidden="true"
                className="absolute top-6 right-6 text-xl text-muted sm:right-8"
              >
                ↗
              </span>
              <span className="block text-2xl font-bold font-stretch-semi-expanded tracking-tight">
                {link.label}
              </span>
              <span className="mt-2 block break-words text-sm text-muted">
                {link.handle}
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
