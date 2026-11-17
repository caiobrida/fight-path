import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FightPath",
  description: "Practice fighting game inputs with clear feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
