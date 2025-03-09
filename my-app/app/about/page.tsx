"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/ui/navbar"; // Adjust the path as necessary
import "./About.css"; // Add your styles here
import Image from "next/image"; // Import Next.js Image component

const About: React.FC = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`about-container ${
        scrolling ? "scrolling" : ""
      } relative flex items-center justify-center`}
    >
      <Navbar />
      <div className="about-content p-12 flex flex-col items-center justify-center gap-10">
        <div className="about-image">
          <Image
            src="/devrat_about.png"
            alt="Devrat Patel"
            width={200}
            height={200}
          />
        </div>
        <div className="about-text">
          <p className="text-2xl my-2">
            Hi, I'm{" "}
            <span className="animated-gradient-text">Devrat Patel </span>
            (Dev).
          </p>
          <p>I'm a CS Sophomore at UT Arlington and President of ACM at UTA.</p>
          <p>
            I love to design. I like badminton and music. I enjoy challenging my
            creativity to build cool things!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
