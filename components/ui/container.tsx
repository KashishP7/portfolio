type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// Centers page content. 1312px max width minus the 32px desktop padding on
// each side leaves exactly 1248px for the content itself.
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1312px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
