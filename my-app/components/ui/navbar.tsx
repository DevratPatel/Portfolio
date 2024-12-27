import React from "react";
import { HoverBorderGradient } from "./hover-border-gradient";

export function Navbar() {
  return (
    <div className="absolute top-0 w-full flex justify-center p-6 z-30">
      <div className="flex gap-4">
        <HoverBorderGradient>
          <div className="flex items-center gap-4">
            <img
              src="/dp logo.svg"
              alt="dp logo"
              className="w-5 ml-2 mr-14 my-2"
            />
            <a href="/" className="ml-14 text-white">
              Home
            </a>
            <a
              href="/about"
              target="new"
              className="mx-2 text-white opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out"
            >
              About
            </a>
            <a
              href="/DP"
              target="new"
              className="mr-2 text-white opacity-50 hover:opacity-100 transition-all duration-300 ease-in-out"
            >
              Resume
            </a>
          </div>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
