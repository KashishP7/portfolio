type CardPadding = "large" | "compact" | "none";

const paddingClasses: Record<CardPadding, string> = {
  large: "px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12", // full content cards
  compact: "p-4 sm:p-6 lg:p-8", // cards that hold a grid of tiles
  none: "", // the card sets its own padding through className
};

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: CardPadding;
  href?: string; // makes the whole card a link
  external?: boolean; // open the link in a new tab
};

// Every card on the site uses this. data-spotlight opts it into the
// spotlight effect (hover/focus styles are in globals.css).
export function Card({
  children,
  className = "",
  padding = "large",
  href,
  external = false,
}: CardProps) {
  const classes = `rounded-3xl border border-border bg-card ${paddingClasses[padding]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        // noopener noreferrer: the new tab gets no access back to this page.
        rel={external ? "noopener noreferrer" : undefined}
        data-spotlight
        className={`${classes} block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
      >
        {children}
      </a>
    );
  }

  return (
    <div data-spotlight className={classes}>
      {children}
    </div>
  );
}
