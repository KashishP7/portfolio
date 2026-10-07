type CardProps = {
  children: React.ReactNode;
  className?: string;
  padded?: boolean; // large padding for full content cards (the default)
};

// Every card on the site uses this, so shared card behaviour (like the
// spotlight in M6) can be added in one place.
export function Card({ children, className = "", padded = true }: CardProps) {
  const padding = padded ? "px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-14" : "";

  return (
    <div className={`rounded-3xl border border-border bg-card ${padding} ${className}`}>
      {children}
    </div>
  );
}
