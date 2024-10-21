"use client";

import { createContext, useState } from "react";

interface DataContextType {
  username: string;
  film: string;
  setUsername: (value: string) => void;
  setFilm: (value: string) => void;
}

export const DataContext = createContext<DataContextType>({
  username: "",
  film: "",
  setUsername: () => {},
  setFilm: () => {},
});

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState<string>("");
  const [film, setFilm] = useState<string>("");

  return (
    <DataContext.Provider
      value={{
        username: username,
        film: film,
        setUsername: setUsername,
        setFilm: setFilm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
