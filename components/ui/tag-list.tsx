// A row of small outlined tags (DocSearch stack, Experience tools):
// 28px tall, 8px corners, --tag-border border, 13px muted text.
export function TagList({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="flex h-7 items-center rounded-lg border border-(--tag-border) px-2.5 text-[13px] text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
