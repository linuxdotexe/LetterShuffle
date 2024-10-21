"use client";

import Image from "next/image";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { useContext } from "react";
import { DataContext } from "../provider";
import Link from "next/link";

export default function Nav() {
  const { username, setUsername, setFilm } = useContext(DataContext);

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
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchData();
  }

  return (
    <nav className="box-border flex w-full justify-center bg-slate-950 p-6 px-10">
      <div className="flex w-full items-center justify-between gap-2 lg:w-2/3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            width={300}
            height={300}
            alt="logo"
            className="w-16"
          />
          <p className="hidden text-4xl font-bold tracking-tighter text-white sm:block">
            LetterShuffle
          </p>
        </Link>
        <form className="flex items-center gap-0" onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleChange}
            isRequired
          />
          <Button type="submit">
            <Image src="/shuffle.svg" width={24} height={24} alt="Shuffle!" />
          </Button>
        </form>
      </div>
    </nav>
  );
}
