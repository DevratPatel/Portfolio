"use client";

import { Navbar } from "@/components/ui/navbar";
import { DefinitionHover } from "@/components/ui/definition";
import { ActuallyBtn } from "@/components/ui/actuallybutton";
import { Mavgrades } from "../mavgradescard";
import { AcmUTA } from "../acmuta";
import { CodeWithMOBI } from "../codewithmobi";

export function GridBackgroundHero() {
  return (
    <div>
      <Navbar />
      <div className="h-[50rem] w-auto dark:bg-white bg-black dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center">
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
          <p className="font-dm-sans text-5xl sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500">
            Devrat
          </p>
          <div className="text-white/70 text-[22px] font-light font-['DM Sans']">
            /dev: vrat/
          </div>
          <div className="group/actually relative inline-bloc hidden sm:block">
            <DefinitionHover />
            <ActuallyBtn />
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full flex items-end justify-center pb-8">
          <img
            src="/Down Arrow.svg"
            alt="Down Arrow"
            className="floating w-12 h-12 opacity-70 hover:opacity-100 transition-opacity duration-300"
            onClick={() => {
              const nextSection = document.getElementById("project-one");
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-8px);
              }
            }
            .floating {
              animation: float 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export function ProjectOne() {
  return (
    <div
      id="project-one"
      className="h-[50rem] w-screen dark:bg-white bg-black dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-white bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <div className="absolute inset-0 w-full h-full group/items">
        <img
          src="/Gradient Mesh.svg"
          alt="Gradient Mesh"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/items:scale-110"
        />
      </div>
      <div className="flex-col gap-0 justify-center items-start">
        <Mavgrades />
      </div>
    </div>
  );
}
export function ProjectTwo() {
  return (
    <div className="h-[50rem] w-screen dark:bg-white bg-black dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center overflow-hidden">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-white bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <div className="absolute inset-0 w-full h-full group/items">
        <img
          src="/Gradient Mesh.svg"
          alt="Gradient Mesh"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/items:scale-110"
        />
      </div>
      <div className="flex-col gap-0 justify-center items-start">
        <AcmUTA />
      </div>
    </div>
  );
}
export function ProjectThree() {
  return (
    <div className="h-[50rem] w-screen dark:bg-white bg-black dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center overflow-hidden">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-white bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <div className="absolute inset-0 w-full h-full group/items">
        <img
          src="/Gradient Mesh.svg"
          alt="Gradient Mesh"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/items:scale-110"
        />
      </div>
      <div className="flex-col gap-0 justify-center items-start">
        <CodeWithMOBI />
      </div>
    </div>
  );
}
