"use client";

import Image from "next/image";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { useState } from "react";

export default function Nav() {
  const [username, setUsername] = useState<string>("");
  const [film, setFilm] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setUsername(value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/watchlist?username=${username}`);
        const json = await res.json();
        const finalList = json.filter((value: string) => value !== null);
        const result = finalList[Math.floor(Math.random() * finalList.length)];
        setFilm(result);
        console.log(film);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchData();
  }

  return (
    <nav className="flex w-full justify-center bg-slate-950 p-6 px-10">
      <div className="flex w-2/3 items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            width={300}
            height={300}
            alt="logo"
            className="w-16"
          />
          <p className="text-4xl font-bold tracking-tighter text-white">
            LetterShuffle
          </p>
        </div>
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleChange}
            isRequired
          />
          <Button type="submit">Shuffle!</Button>
        </form>
      </div>
    </nav>
  );
}
