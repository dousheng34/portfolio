import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

// Since Clash Display isn't on Google Fonts, we'll use a placeholder variable 
// and fallback to a system font, but in a real app you'd load the local font.
// For this demo, let's use Oswald as a Google Font alternative to Clash Display.
import { Oswald } from "next/font/google";
const displayFont = Oswald({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "AETHER | AI Creative Strategist",
  description: "Turning noise into meaning. Orchestrating the chaos of neural networks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} ${displayFont.variable} font-mono bg-[#0a0a0a] text-[#ededed] antialiased selection:bg-white selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
