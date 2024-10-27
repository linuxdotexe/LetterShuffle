import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const headers = new Headers();
  headers.set("Cookie", "filmFilter=hide-unreleased");
  // fetching the first page
  const username = searchParams.get("username");
  const url = "https://letterboxd.com/" + username + "/watchlist";
  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    // figure out how many pages need to be fetched and set a loop
    const numOfPages: number = Number(
      $("li.paginate-page.unseen-pages")
        .next("li.paginate-page")
        .find("a")
        .text(),
    );
    const data: { name: string; slug: string }[] = [];
    for (let i = 1; i <= numOfPages; i++) {
      const pageHtml = await fetch(`${url}/page/${i}`, {
        next: { revalidate: 3600 },
      }).then((res) => res.text());
      const $$ = cheerio.load(pageHtml);

      $$("div.film-poster").each((index, element) => {
        const name = $$(element).find("img").attr("alt") as string;
        const slug = $$(element).attr("data-film-slug") as string;
        data.push({ name: name, slug: slug }); // Adjust index based on the page number
      });
    }
    // fetch each page and load up data
    $("div.film-poster").each((index, element) => {
      const name = $(element).find("img").attr("alt") as string;
      const slug = $(element).attr("data-film-slug") as string;
      data[index] = { name: name, slug: slug };
    });

    return NextResponse.json({
      data,
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
