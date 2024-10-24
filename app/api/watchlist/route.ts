import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
    const data: string[] = [];
    for (let i = 1; i <= numOfPages; i++) {
      const pageHtml = await fetch(`${url}/page/${i}`, {
        next: { revalidate: 3600 },
      }).then((res) => res.text());
      const $$ = cheerio.load(pageHtml);

      $$(".poster").each((index, element) => {
        const slug = $$(element).find("img").attr("alt") as string;
        data.push(slug); // Adjust index based on the page number
      });
    }
    // fetch each page and load up data
    $("div.poster").each((index, element) => {
      const slug = $(element).find("img").attr("alt") as string;
      data[index] = slug;
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching HTML data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch HTML data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
