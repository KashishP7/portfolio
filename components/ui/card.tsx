type CardProps = {
  children: React.ReactNode;
  className?: string;
  padded?: boolean; // large padding for full content cards (the default)
  href?: string; // makes the whole card a link
  external?: boolean; // open the link in a new tab
};

// Every card on the site uses this, so shared card behaviour (like the
// spotlight in M6) can be added in one place.
export function Card({
  children,
  className = "",
  padded = true,
  href,
  external = false,
}: CardProps) {
  const padding = padded ? "px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-14" : "";
  const classes = `rounded-3xl border border-border bg-card ${padding} ${className}`;

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
