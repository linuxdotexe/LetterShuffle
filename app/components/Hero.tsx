"use client";

import { useContext } from "react";
import Image from "next/image";
import { DataContext } from "@/app/provider";
import Anchor from "@/app/components/ui/link";

export default function Hero() {
  const { username, film } = useContext(DataContext);
  return (
    <div className="flex items-center justify-center p-12">
      <div className="flex w-full flex-row-reverse justify-center gap-6 lg:w-2/3">
        <Image
          src="/poster.jpg"
          width={200}
          height={300}
          alt="poster"
          sizes="100vw"
          className="h-1/3 w-1/3 sm:h-1/4 sm:w-1/4 md:basis-1/4"
        />
        <div className="flex w-full flex-col justify-center gap-2 md:basis-3/4">
          <h3 className="text-2xl font-extrabold text-slate-100 lg:text-4xl">
            Lady Bird (2017)
          </h3>
          <p className="text-sm italic text-slate-400 lg:text-base">
            Fly Away Home.
          </p>
          <p className="text-base text-slate-100 md:text-lg">
            Lady Bird McPherson, a strong willed, deeply opinionated, artistic
            17 year old comes of age in Sacramento. Her relationship with her
            mother and her upbringing are questioned and tested as she plans to
            head off to college.
          </p>
          <div className="flex gap-2">
            <p className="my-2 flex w-fit items-center rounded-xl bg-orange-400 px-3 py-1 text-base font-medium text-slate-950 md:text-lg">
              94mins
            </p>
            <p className="my-2 flex w-fit items-center rounded-xl bg-green-400 px-3 py-1 text-base font-medium text-slate-950 md:text-lg">
              3.8/5
            </p>
            <p className="my-2 flex w-fit items-center rounded-xl bg-blue-400 px-3 py-1 text-base font-medium text-slate-950 md:text-lg">
              65K Fans
            </p>
          </div>
          <div className="flex gap-4 text-base md:text-lg">
            <Anchor
              href="/"
              isExternal
              className="text-green-500 hover:text-green-600"
            >
              Letterboxd
            </Anchor>
            <Anchor
              href="/"
              isExternal
              className="text-red-500 hover:text-red-600"
            >
              Trailer
            </Anchor>
          </div>
        </div>
      </div>
    </div>
  );
}
