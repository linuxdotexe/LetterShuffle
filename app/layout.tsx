import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/app/components/Nav";
import DataProvider from "./provider";

export const metadata: Metadata = {
  title: "LetterShuffle",
  description: "Picks a random film out of your insanely huge watchlist.",
  icons: "/icon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DataProvider>
          <Nav />
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
