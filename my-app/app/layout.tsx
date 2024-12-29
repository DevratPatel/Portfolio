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
  openGraph: {
    title: "Devrat Patel",
    description: "Design is thinking made visual. And I Design.",
    images: [
      {
        url: "/devratmeta.svg",
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
