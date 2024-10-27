"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { DataContext } from "@/app/provider";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";

export default function Nav() {
  const {
    username,
    setUsername,
    setFilm,
    setSlug,
    setRating,
    setTrailer,
    setYear,
    setTagline,
    setDesc,
    setPoster,
    setRuntime,
    setBg,
    setLoading,
  } = useContext(DataContext);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setUsername(value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/watchlist?username=${username}`);
        const json = await res.json();
        const result = json.data[Math.floor(Math.random() * json.data.length)];

        const boxdRes = await fetch(`/api/boxd?slug=${result.slug}`);
        const boxdJson = await boxdRes.json();

        const tmdbRes = await fetch(`/api/tmdb?id=${boxdJson.tmdb}`);
        const tmdbJson = await tmdbRes.json();

        setFilm(result.name);
        setSlug(result.slug);
        setRating(boxdJson.rating);
        setTrailer(boxdJson.trailer);
        setYear(tmdbJson.year);
        setTagline(tmdbJson.tagline);
        setDesc(tmdbJson.overview);
        setPoster(tmdbJson.poster);
        setBg(tmdbJson.bg);
        setRuntime(tmdbJson.runtime);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchData();
  }

  return (
    <nav className="flex w-full justify-center bg-slate-950/0 px-4 py-6 sm:px-12">
      <div className="flex w-full items-center justify-between gap-2 lg:w-2/3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            width={300}
            height={300}
            alt="logo"
            className="w-16"
          />
          <p className="hidden text-3xl font-extrabold tracking-tighter text-slate-100 sm:block">
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
