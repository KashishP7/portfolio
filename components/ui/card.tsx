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

// Every card on the site uses this, so shared card behaviour (like the
// spotlight in M6) can be added in one place.
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
        className={`${classes} block transition-colors hover:border-border-hover hover:bg-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
      >
        {children}
      </a>
    );
  }

  return <div className={classes}>{children}</div>;
}
