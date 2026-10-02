import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05080e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Rishikesh Das — Full-Stack & AI/ML Engineer | Portfolio",
  description:
    "Portfolio of Rishikesh Das — Full Stack Web Developer & AI/ML Engineer from Asansol, West Bengal. B.Tech ECE, building web platforms, NLP retrieval agents, and embedded IoT systems.",
  keywords: [
    "Rishikesh Das",
    "Full Stack Developer",
    "AI/ML Engineer",
    "FastAPI",
    "React.js",
    "Next.js",
    "Spring Boot",
    "Edge AI",
    "Raspberry Pi",
    "ESP32",
    "MQTT",
    "Asansol",
  ],
  authors: [{ name: "Rishikesh Das", url: "https://rishikeshdas.dev" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="bg-[#05080e] text-slate-100 antialiased selection:bg-amber-500/30 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
