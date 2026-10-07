import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { tools } from "@/content/stack";

export function Toolkit() {
  return (
    <Section id="toolkit">
      <Card>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-6">
          {tools.map((tool) => (
            <li
              key={tool.label}
              // max-sm:odd:last:col-span-2: in the 2-column phone grid, a last
              // tile that is alone on its row spans both columns.
              className="flex h-20 items-center justify-center rounded-2xl border border-border bg-inset px-3 text-center font-medium max-sm:odd:last:col-span-2 sm:h-24 sm:text-lg"
              // Inline style because Tailwind can't build classes from data.
              style={{ color: tool.color }}
            >
              {tool.label}
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
