import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

// Headings, names, labels and UI. Omitting `weight` loads the variable font,
// which is required to also load the extra width ("wdth") axis.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

// All reading text. The optical size ("opsz") axis lets the browser adjust
// letter shapes to the text size automatically.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
