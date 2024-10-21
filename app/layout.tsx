import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/app/components/Nav";

export const metadata: Metadata = {
  title: "lbx-shuffle",
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
        <Nav />
        {children}
      </body>
    </html>
  );
}
