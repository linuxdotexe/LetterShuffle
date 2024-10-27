"use client";

import { createContext, useEffect, useState } from "react";

interface DataContextType {
  username: string;
  film: string;
  slug: string;
  rating: string;
  tmdb: string;
  trailer: string;
  year: string;
  tagline: string;
  desc: string;
  poster: string;
  bg: string;
  runtime: string;
  loading: boolean;
  setUsername: (value: string) => void;
  setFilm: (value: string) => void;
  setSlug: (value: string) => void;
  setRating: (value: string) => void;
  setTmdb: (value: string) => void;
  setTrailer: (value: string) => void;
  setYear: (value: string) => void;
  setTagline: (value: string) => void;
  setDesc: (value: string) => void;
  setPoster: (value: string) => void;
  setBg: (value: string) => void;
  setRuntime: (value: string) => void;
  setLoading: (value: boolean) => void;
}

export const DataContext = createContext<DataContextType>({
  username: "",
  film: "",
  slug: "",
  rating: "",
  tmdb: "",
  trailer: "",
  year: "",
  tagline: "",
  desc: "",
  poster: "",
  bg: "",
  runtime: "",
  loading: true, // Initial loading state
  setUsername: () => {},
  setFilm: () => {},
  setSlug: () => {},
  setRating: () => {},
  setTmdb: () => {},
  setTrailer: () => {},
  setYear: () => {},
  setTagline: () => {},
  setDesc: () => {},
  setPoster: () => {},
  setBg: () => {},
  setRuntime: () => {},
  setLoading: () => {},
});

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState<string>("");
  const [film, setFilm] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [tmdb, setTmdb] = useState<string>("");
  const [trailer, setTrailer] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [tagline, setTagline] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [poster, setPoster] = useState<string>("");
  const [runtime, setRuntime] = useState<string>("");
  const [bg, setBg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Retrieve values from localStorage on initial render
  useEffect(() => {
    const fetchData = async () => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) setUsername(storedUsername);

      const storedFilm = localStorage.getItem("film");
      if (storedFilm) setFilm(storedFilm);

      const storedSlug = localStorage.getItem("slug");
      if (storedSlug) setSlug(storedSlug);

      const storedRating = localStorage.getItem("rating");
      if (storedRating) setRating(storedRating);

      const storedTmdb = localStorage.getItem("tmdb");
      if (storedTmdb) setTmdb(storedTmdb);

      const storedTrailer = localStorage.getItem("trailer");
      if (storedTrailer) setTrailer(storedTrailer);

      const storedYear = localStorage.getItem("year");
      if (storedYear) setYear(storedYear);

      const storedTagline = localStorage.getItem("tagline");
      if (storedTagline) setTagline(storedTagline);

      const storedDesc = localStorage.getItem("desc");
      if (storedDesc) setDesc(storedDesc);

      const storedPoster = localStorage.getItem("poster");
      if (storedPoster) setPoster(storedPoster);

      const storedRuntime = localStorage.getItem("runtime");
      if (storedRuntime) setRuntime(storedRuntime);

      const storedBg = localStorage.getItem("bg");
      if (storedBg) setBg(storedBg);

      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, []);

  // Update localStorage when dependencies change
  useEffect(() => {
    if (username) localStorage.setItem("username", username);
    if (film) localStorage.setItem("film", film);
    if (slug) localStorage.setItem("slug", slug);
    if (rating) localStorage.setItem("rating", rating);
    if (tmdb) localStorage.setItem("tmdb", tmdb);
    if (trailer) localStorage.setItem("trailer", trailer);
    if (year) localStorage.setItem("year", year);
    if (tagline) localStorage.setItem("tagline", tagline);
    if (desc) localStorage.setItem("desc", desc);
    if (poster) localStorage.setItem("poster", poster);
    if (runtime) localStorage.setItem("runtime", runtime);
    if (bg) localStorage.setItem("bg", bg);
  }, [
    username,
    film,
    slug,
    rating,
    tmdb,
    trailer,
    year,
    tagline,
    desc,
    poster,
    runtime,
    bg,
  ]);

  return (
    <DataContext.Provider
      value={{
        username,
        film,
        slug,
        rating,
        tmdb,
        trailer,
        year,
        tagline,
        desc,
        poster,
        runtime,
        bg,
        loading,
        setUsername,
        setFilm,
        setSlug,
        setRating,
        setTmdb,
        setTrailer,
        setYear,
        setTagline,
        setDesc,
        setPoster,
        setRuntime,
        setBg,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
