import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HoverBorderGradient } from "./hover-border-gradient";

export function Navbar() {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link: string, href: string) => {
    setActiveLink(link);
    window.location.href = href;
  };

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
              className="ml-2 mr-28 my-2"
            />
            <div
              className={`mx-2 text-white ${
                activeLink === "home" ? "opacity-100" : "opacity-50"
              } hover:opacity-100 transition-all duration-300 ease-in-out`}
              onClick={() => handleLinkClick("home", "/")}
            >
              Home
            </div>
            <div
              className={`mx-2 text-white ${
                activeLink === "about" ? "opacity-100" : "opacity-50"
              } hover:opacity-100 transition-all duration-300 ease-in-out`}
              onClick={() => handleLinkClick("about", "/about")}
            >
              About
            </div>
            <div
              className={`mr-2 text-white ${
                activeLink === "resume" ? "opacity-100" : "opacity-50"
              } hover:opacity-100 transition-all duration-300 ease-in-out`}
              onClick={() => handleLinkClick("resume", "/DP CR.pdf")}
            >
              Resume
            </div>
          </div>
        </HoverBorderGradient>
      </div>
    </div>
  );
}
