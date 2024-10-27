"use client";

import { useContext } from "react";

import Hero from "@/app/components/Hero";
import { DataContext } from "@/app/provider";

export default function Home() {
  const { bg } = useContext(DataContext);
  return (
    <main className="">
      <div
        className="fade-to-transparent absolute inset-0 -z-10 mx-auto h-80 w-full bg-cover bg-no-repeat lg:w-3/4"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: "top",
        }}
      ></div>
      <Hero />
    </main>
  );
}
