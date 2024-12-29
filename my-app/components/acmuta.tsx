"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

export function AcmUTA() {
  return (
    <CardContainer className="inter-var p-4">
      <CardBody className="bg-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-white/[0.2] w-auto sm:w-[50rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="75"
          className="w-full mt-4 opacity-70 hover:opacity-100 transition-opacity duration-300"
        >
          <Image
            src="/acmuta.svg"
            height="1000"
            width="1000"
            className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <Link href="https://acmuta.com" target="_new" rel="noopener noreferrer">
          <CardItem as="button" className="text-xl font-medium text-white mt-2">
            acmuta.com
          </CardItem>
        </Link>

        <CardItem
          as="p"
          className="text-neutral-300 font-light text-sm w-auto mt-1"
        >
          <div className="text-white opacity-50">
            A website for UT Arlington&apos;s largest computer science
            organization—uniting students through technology.
          </div>
        </CardItem>
        <div className="flex justify-between items-center mt-2">
          <CardItem
            as="p"
            className="px-4 py-2 rounded-lg bg-[rgba(175.40,175.40,175.40,0.20)] text-xs font-bold"
          >
            <div className="text-white font-extralight">UI/UX Design</div>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
