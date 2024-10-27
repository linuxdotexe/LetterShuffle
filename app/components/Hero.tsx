"use client";

import { useContext } from "react";
import Image from "next/image";
import { DataContext } from "@/app/provider";
import Anchor from "@/app/components/ui/link";

export default function Hero() {
  const { film, slug, rating, trailer, year, tagline, desc, runtime, poster } =
    useContext(DataContext);
  return (
    <div className="flex items-center justify-center p-12">
      <div className="flex w-full flex-row-reverse justify-center gap-6 lg:w-2/3">
        <Image
          src={poster}
          width={200}
          height={300}
          alt="poster"
          sizes="100vw"
          className="h-1/3 w-1/3 sm:h-1/4 sm:w-1/4 md:basis-1/4"
        />
        <div className="flex w-full flex-col justify-center gap-2 md:mt-16 md:basis-3/4 lg:mt-8">
          <h3 className="text-2xl font-extrabold text-slate-100 lg:text-4xl">
            {film} ({year})
          </h3>
          <p className="text-sm italic text-slate-400 lg:text-base">
            {tagline}
          </p>
          <p className="text-base text-slate-100 md:text-lg">{desc}</p>
          <div className="flex gap-2">
            <p className="my-2 flex w-fit items-center rounded-xl bg-orange-400 px-3 py-1 text-base font-medium text-slate-950 md:text-lg">
              {runtime}
            </p>
            <p className="my-2 flex w-fit items-center rounded-xl bg-green-400 px-3 py-1 text-base font-medium text-slate-950 md:text-lg">
              {rating}/5
            </p>
          </div>
          <div className="flex gap-4 text-base md:text-lg">
            <Anchor
              href={`https://letterboxd.com/film/${slug}`}
              isExternal
              className="text-green-500 hover:text-green-600"
            >
              Letterboxd
            </Anchor>
            <Anchor
              href={trailer ? `https://youtube.com/watch?v=${trailer}` : ""}
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
