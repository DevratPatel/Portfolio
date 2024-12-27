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
  description: "Personal portfolio website of Devrat Patel",
  icons: {
    icon: "/favicon.ico",
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
