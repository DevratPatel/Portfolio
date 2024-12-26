import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";

export function GridBackgroundHero() {
  return (
    <div className="h-[50rem] w-full dark:bg-white bg-black dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center">
      {/* Add navbar at the top */}
      <div className="absolute top-0 w-full flex justify-center p-6 z-30">
        <div className="flex gap-4">
          <HoverBorderGradient>
            <div className="flex items-center gap-4">
              <img
                src="/dp logo.svg"
                alt="dp logo"
                className="w-5 ml-2 mr-14 my-2"
              />
              <Link href="/" className="ml-14 text-white">
                Home
              </Link>
              <Link
                href="/about"
                target="new"
                className="mx-2 text-white opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out"
              >
                About
              </Link>
              <Link
                href="/DP"
                target="new"
                className="mr-2 text-white opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out"
              >
                Resume
              </Link>
            </div>
          </HoverBorderGradient>
        </div>
      </div>

      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-white bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>

      <div className="absolute inset-0 w-full h-full group/items">
        <img
          src="/Gradient Mesh.svg"
          alt="Gradient Mesh"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/items:scale-105"
        />
      </div>
      <div className="relative z-20 flex flex-col items-left transition-transform duration-500 hover:translate-x-2">
        <p className="font-dm-sans text-4xl sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500">
          Devrat
        </p>
        <div className="group relative">
          {/* Original content - hidden on hover */}
          <div className="text-white/70 text-[22px] font-light font-['DM Sans']">
            /dev: vrat/
          </div>
          <div className="group-hover:opacity-0 transition-opacity duration-300">
            <div className="text-white/50 text-[22px] font-light italic font-['DM Sans'] mt-3 mb-0">
              noun
            </div>
            <div className="text-white/80 text-[22px] font-light font-['DM Sans']">
              President of ACM at UTA
            </div>
            <div className="text-white/50 text-[22px] font-light italic font-['DM Sans'] mt-3 mb-0">
              verb
            </div>
            <div className="text-white/80 text-[22px] font-light font-['DM Sans']">
              1. Create and innovate <br />
              2. Influence and inspire
            </div>
            <div className="text-white/50 text-[22px] font-light italic font-['DM Sans'] mt-3 mb-0">
              adjective
            </div>
            <div className="text-white/80 text-[22px] font-light font-['DM Sans']">
              1. Persistent, detail-oriented
            </div>
          </div>

          {/* New content - shown on hover */}
          <div className="absolute top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white/80 text-[40px] font-light font-['DM Sans']">
              Nothing defines me. LOL
            </div>
          </div>
        </div>
        <div
          style={{
            width: "118px",
            height: "32px",
            background: "rgba(175.40, 175.40, 175.40, 0.20)",
            borderRadius: 23,
            backdropFilter: "blur(2.50px)",
            textAlign: "center",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "DM Sans",
              fontWeight: "200",
              wordWrap: "break-word",
              marginTop: "2px",
            }}
          >
            Actually...
          </div>
        </div>
      </div>
      <div className="absolute inset-0 w-full h-full flex items-end justify-center pb-8">
        <img
          src="/Down Arrow.svg"
          alt="Down Arrow"
          className="w-12 h-12 opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
export function GridBackground() {
  return (
    <div className="h-[50rem] w-full dark:bg-white bg-black  dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-white bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
    </div>
  );
}

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
