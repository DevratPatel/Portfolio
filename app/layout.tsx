import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devrat Patel",
  description: "Full-Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-editor-bg text-text-primary">{children}</body>
    </html>
  );
}
