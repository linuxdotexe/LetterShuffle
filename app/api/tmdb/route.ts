import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const img = "https://image.tmdb.org/t/p/original";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from TMDB API: ${errorText}`);
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      title: data.title,
      year: data.release_date.split("-")[0],
      tagline: data.tagline,
      overview: data.overview,
      poster: `${img}${data.poster_path}`,
      bg: `${img}${data.backdrop_path}`,
      runtime: `${data.runtime}mins`,
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching TMDB data:", error); // Improved error log
    return NextResponse.json({
      error: "Failed to fetch data",
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
