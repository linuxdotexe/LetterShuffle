import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

type Movie = {
  image: string;
  "@type": "Movie";
  director: {
    "@type": "Person";
    name: string;
    sameAs: string;
  }[];
  dateModified: string;
  productionCompany: {
    "@type": "Organization";
    name: string;
    sameAs: string;
  }[];
  releasedEvent: {
    "@type": "PublicationEvent";
    startDate: string;
  }[];
  "@context": string;
  url: string;
  actors: {
    "@type": "Person";
    name: string;
    sameAs: string;
  }[];
  dateCreated: string;
  name: string;
  genre: string[];
  "@id": string;
  countryOfOrigin: {
    "@type": "Country";
    name: string;
  }[];
  aggregateRating: {
    bestRating: number;
    reviewCount: number;
    "@type": "aggregateRating";
    ratingValue: number;
    description: string;
    ratingCount: number;
    worstRating: number;
  };
};

function makeJson(data: string) {
  try {
    const obj: Movie = JSON.parse(data);
    return obj;
  } catch (err) {
    throw new Error("Cannot parse data to JSON");
  }
}
function getOpenCloseBraces(scriptTagText: string) {
  var openBrace = -1;
  var closeBrace = -1;
  for (var i = 0; i < scriptTagText.length; i++) {
    if (scriptTagText[i] == "{") {
      openBrace = i;
      break;
    }
  }
  for (var i = scriptTagText.length - 1; i >= 0; i--) {
    if (scriptTagText[i] == "}") {
      closeBrace = i;
      break;
    }
  }
  if (openBrace != -1 && closeBrace != -1) return { openBrace, closeBrace };
  throw new Error("scraping failed. braces issue");
}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // fetching the first page
  const slug = searchParams.get("slug");
  const url = "https://letterboxd.com/film/" + slug;
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      next: { revalidate: 3600 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        "Content-Type": "text/html",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const script = $('script[type="application/ld+json"]').text();
    const tmdb = $('a[data-track-action="TMDb"]').attr("href")?.split("/")[4];
    const trailer = $("a[data-track-category='Trailer']")
      .attr("href")
      ?.split("/")[4]
      .split("?")[0];
    const { openBrace, closeBrace } = getOpenCloseBraces(script);
    const data: Movie = makeJson(script.slice(openBrace, closeBrace + 1));

    return NextResponse.json({
      rating: data.aggregateRating.ratingValue.toString(),
      tmdb: tmdb,
      trailer: trailer,
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching HTML data:", error);
    return NextResponse.json({
      error: "Failed to fetch HTML data",
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
