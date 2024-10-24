"use client";

import { createContext, useEffect, useState } from "react";

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

  // Load username and film from localStorage when component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Update localStorage when username changes
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

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
