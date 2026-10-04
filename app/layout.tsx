import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

// Display + body font. Omitting `weight` loads the variable font, which is
// required to also load the extra width ("wdth") axis.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Monospace font for the Blueprint layer.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
