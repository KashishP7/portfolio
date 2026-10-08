import { Fragment } from "react";
import type { RichText } from "@/content/rich-text";

const segmentClasses = {
  accent: "text-accent",
  "accent-italic": "font-serif font-normal italic text-accent",
};

// Renders RichText from the content files: plain segments as text, styled
// ones as spans.
export function StyledText({ value }: { value: RichText }) {
  return (
    <>
      {value.map((segment, index) =>
        segment.style ? (
          <span key={index} className={segmentClasses[segment.style]}>
            {segment.text}
          </span>
        ) : (
          <Fragment key={index}>{segment.text}</Fragment>
        ),
      )}
    </>
  );
}
