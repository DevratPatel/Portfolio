import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devrat Patel",
  description:
    "Full Stack Developer & UI/UX Designer. Interactive portfolio with AI-powered terminal experience.",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Devrat",
    "Patel",
    "Devrat Patel",
    "Developer",
    "Full Stack",
    "Software",
    "Software Engineer",
    "ACM",
    "ACM UTA",
  ],
  authors: [{ name: "Devrat Patel" }],
  openGraph: {
    title: "Devrat Patel",
    description: `Full Stack Developer & UI/UX Designer. Interactive portfolio with AI-powered terminal experience.`,
    url: "https://www.devratpatel.com",
    type: "website",
    images: [
      {
        url: "../public/devratmeta.png",
        width: 1200,
        height: 630,
        alt: "Devrat Patel",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-editor-bg text-text-primary">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
