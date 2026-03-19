import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentagous — The Agentic Economy, Mapped Live",
  description: "Every company being built and run by AI agents — tracked, categorised, and indexed in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
