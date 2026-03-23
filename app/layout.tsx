import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "WTF Agents — The Agentic Economy, Mapped Live",
  description: "Every company being built and run by AI agents — tracked, categorised, and indexed in real time.",
  alternates: {
    canonical: 'https://www.wtfagents.com',
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L3XHFTHTJB"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L3XHFTHTJB');
        ` }} />
      </head>
      <body className="bg-zinc-950 text-white">
        <Nav />
        {children}
      </body>
    </html>
  );
}
