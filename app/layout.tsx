import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/Nav";
import { SITE_URL } from "../lib/design";

export const metadata: Metadata = {
  // Without this, Next resolves og:image against localhost at build time.
  metadataBase: new URL(SITE_URL),
  title: "WTF Agents — All the AI. 0% BS.",
  description: "Plain-English guides to the agentic economy. Read every guide free, or take the PDF for $7.",
  alternates: {
    canonical: 'https://www.wtfagents.com',
  },
  // Near-black rounded tile, accent-red W, Montserrat Bold — DESIGN.md §1.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#0A0405",
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
