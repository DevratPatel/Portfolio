import { Navbar } from "@/components/ui/navbar";
import { DefinitionHover } from "@/components/ui/definition";
import { ActuallyBtn } from "@/components/ui/actuallybutton";
import { Mavgrades } from "../mavgradescard";
import { AcmUTA } from "../acmuta";
import { CodeWithMOBI } from "../codewithmobi";

export function GridBackgroundHero() {
  return (
    <div className="h-[50rem] w-full dark:bg-white bg-black dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center">
      <Navbar />
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
        <div className="group/actually relative inline-block">
          <DefinitionHover />
          <ActuallyBtn />
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

export function ProjectOne() {
  return (
    <div className="h-[50rem] w-full dark:bg-white bg-black  dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center">
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
    <div className="h-[50rem] w-full dark:bg-white bg-black  dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center">
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
    <div className="h-[50rem] max-w-screen-2xl dark:bg-white bg-black  dark:bg-grid-white/[0.1] bg-grid-white/[0.1] relative flex items-center justify-center">
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