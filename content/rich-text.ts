// Text with a few styled words, stored as plain data (no HTML strings).
// components/ui/styled-text.tsx turns it into spans.
//   accent         the word(s) in --accent
//   accent-italic  Newsreader italic (regular weight) in --accent
export type TextSegment = {
  text: string;
  style?: "accent" | "accent-italic";
};

export type RichText = TextSegment[];

// The same text without styling, e.g. for the page's meta description.
export function plainText(rich: RichText): string {
  return rich.map((segment) => segment.text).join("");
}
