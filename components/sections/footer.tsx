import { Container } from "@/components/ui/container";
import { footer } from "@/content/site";

// mt-12 / sm:mt-16 match the space between sections. The bottom padding
// lets the footer scroll clear of the floating nav pill (and the iPhone
// home indicator) at the very end of the page.
export function Footer() {
  return (
    <footer data-dim className="mt-12 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:mt-16">
      <Container>
        <div className="border-t border-border pt-8 text-sm text-muted">
          <p>{footer.credit}</p>
        </div>
      </Container>
    </footer>
  );
}
