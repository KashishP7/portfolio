import { Container } from "@/components/ui/container";
import { footer } from "@/content/site";

// mt-12 / sm:mt-16 match the space between sections.
export function Footer() {
  return (
    <footer data-dim className="mt-12 pb-10 sm:mt-16">
      <Container>
        <div className="border-t border-border pt-8 text-sm text-muted">
          <p>{footer.credit}</p>
        </div>
      </Container>
    </footer>
  );
}
