import type { Metadata } from "next";
import "@/app/globals.css";
import Nav from "@/app/components/Nav";
import DataProvider from "@/app/provider";
import Footer from "@/app/components/Footer";

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
      <DataProvider>
        <body className="flex h-screen flex-col justify-between tracking-tight antialiased">
          <Nav />
          {children}
          <Footer />
        </body>
      </DataProvider>
    </html>
  );
}
