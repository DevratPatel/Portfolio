import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import React from "react";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Devrat Patel",
  description: "Design is thinking made visual. And I Design.",
  icons: {
    icon: "/favicon.ico",
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
    description: `Design is thinking made visual. And I Design.`,
    url: "https://www.devratpatel.com",
    type: "website",
    images: [
      {
        url: "../public/devrat_about.svg",
        width: 1200,
        height: 630,
        alt: "Devrat Patel",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
