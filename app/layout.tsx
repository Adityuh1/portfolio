import type { Metadata } from "next";
import "./globals.css";
import { portfolio } from "@/lib/data";

export const metadata: Metadata = {
  title: portfolio.seo.title,
  description: portfolio.seo.description,
  keywords: [
    "Aditya Singh Jadaon",
    "Adityuh1",
    "Software Engineer",
    "Generative AI",
    "Backend Developer",
    "Vadodara",
    "Full-Stack",
    "Python",
    "TypeScript",
    "MERN",
    "LangChain",
    "RAG",
  ],
  authors: [{ name: portfolio.identity.name, url: portfolio.links.github }],
  creator: portfolio.identity.name,
  openGraph: {
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#FAFAFA" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#12110F" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
