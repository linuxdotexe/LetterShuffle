import Hero from "@/app/components/Hero";

export default function Home() {
  return (
    <main className="">
      <div
        className="fade-to-transparent absolute inset-0 -z-10 mx-auto h-80 w-full bg-cover bg-no-repeat lg:w-3/4"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundPosition: "top",
        }}
      ></div>
      <Hero />
    </main>
  );
}
