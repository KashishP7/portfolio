import { Fragment } from "react";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import { footer } from "@/content/site";

// Two columns (name and label / colophon) above a bottom bar.
// Stacks on phones. mt-12 / sm:mt-16 match the space between sections; the
// bottom padding lets the footer scroll clear of the floating nav pill (and
// the iPhone home indicator) at the very end of the page.
export function Footer() {
  return (
    <footer data-dim className="mt-12 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:mt-16">
      <Container>
        <div className="grid gap-12 border-t border-border pt-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          {/* Name and descriptor */}
          <div>
            <p className="text-[clamp(2.5rem,9vw,3.5rem)] leading-none font-bold font-stretch-semi-expanded tracking-tight">
              {profile.name}
            </p>
            <p className="small-label mt-4">
              {footer.descriptor.map((part, index) => (
                <Fragment key={part}>
                  {index > 0 && <span className="text-accent"> / </span>}
                  {part}
                </Fragment>
              ))}
            </p>
          </div>

          {/* Colophon */}
          <div>
            <p className="small-label">{footer.colophonLabel}</p>
            <p className="mt-4 max-w-sm font-serif text-base leading-relaxed text-text-soft">
              {footer.colophon}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {footer.colophonTags.map((tag) => (
                <li
                  key={tag}
                  className="small-label rounded-md border border-(--tag-border) px-2 py-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="small-label">{footer.copyright}</p>
          <p className="small-label">{footer.madeIn}</p>
          <a
            href="#home"
            className="small-label transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {footer.backToTop}
          </a>
        </div>
      </Container>
    </footer>
  );
}
