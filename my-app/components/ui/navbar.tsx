import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HoverBorderGradient } from "./hover-border-gradient";

export function Navbar() {
  return (
    <div className="absolute top-0 w-full flex justify-center p-6 z-30">
      <div className="flex gap-4">
        <HoverBorderGradient>
          <div className="flex items-center gap-4">
            <Image
              src="/dp logo.svg"
              alt="dp logo"
              width={20}
              height={20}
              className="ml-2 mr-14 my-2"
            />
            <Link href="/" className="ml-14 text-white">
              Home
            </Link>
            <Link
              href="/about"
              target="_blank"
              className="mx-2 text-white opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out"
            >
              About
            </Link>
            <Link
              href="/DP CR.pdf"
              target="_blank"
              className="mr-2 text-white opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out"
            >
              Resume
            </Link>
          </div>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
