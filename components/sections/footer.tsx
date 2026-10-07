import { Container } from "@/components/ui/container";
import { footer } from "@/content/site";

// The space below the footer (so the nav never covers it) comes from the
// body's padding-bottom in globals.css.
export function Footer() {
  return (
    <footer className="mt-16 sm:mt-24">
      <Container>
        <div className="flex flex-col gap-2 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:justify-between">
          <p>{footer.credit}</p>
          <p>{footer.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
