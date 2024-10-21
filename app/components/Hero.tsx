"use client";

import { useContext } from "react";
import { DataContext } from "../provider";

export default function Hero() {
  const { username, film } = useContext(DataContext);
  return (
    <div className="flex w-2/3 justify-center p-8">
      <h1>
        you, {username} should watch {film}
      </h1>
    </div>
  );
}
