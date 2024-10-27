import Anchor from "@/app/components/ui/link";

export default function Footer() {
  return (
    <footer className="flex w-full justify-center bg-slate-950 px-4 py-6 sm:px-12">
      <div className="flex w-full items-center justify-between lg:w-2/3">
        <div className="text-sm font-medium tracking-tight text-slate-300 md:text-base">
          Made with {"<3"} for the community by{" "}
          <Anchor
            small
            // isExternal
            // ! update when you finally make that portfolio
            href="/"
            className="text-yellow-300 hover:text-yellow-400"
          >
            Sai Nivas Mangu
          </Anchor>
          <br />
          <div className="mt-2 flex flex-col flex-wrap gap-2 md:flex-row md:flex-nowrap">
            <Anchor
              href="https://letterboxd.com/kenough_"
              className="text-green-400 hover:text-green-600"
              small
              isExternal
            >
              Letterboxd
            </Anchor>
            <Anchor
              href="https://instagram.com/aintnobadmovies"
              className="text-pink-400 hover:text-pink-600"
              small
              isExternal
            >
              Instagram
            </Anchor>
            <Anchor
              href="https://github.com/linuxdotexe"
              className="text-violet-400 hover:text-violet-600"
              small
              isExternal
            >
              GitHub
            </Anchor>
            <Anchor
              href="https://linkedin.com/in/sainivasmangu"
              className="text-blue-400 hover:text-blue-600"
              small
              isExternal
            >
              LinkedIn
            </Anchor>
          </div>
        </div>
        <div className="flex gap-2 lg:gap-12">
          <Anchor
            href="https://letterboxd.com"
            className="font-semibold tracking-tight text-slate-300"
            small
            isExternal
          >
            Letterboxd
          </Anchor>
          <Anchor
            href="https://themoviedb.org"
            className="font-semibold tracking-tight text-slate-300"
            small
            isExternal
          >
            TMDB
          </Anchor>
        </div>
      </div>
    </footer>
  );
}
