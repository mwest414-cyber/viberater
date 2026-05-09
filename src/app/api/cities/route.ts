import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return Response.json({ suggestions: [] });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return Response.json({ suggestions: [] }, { status: 500 });
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/autocomplete/json");
  url.searchParams.set("input", q);
  url.searchParams.set("types", "(cities)");
  url.searchParams.set("components", "country:us");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());

  if (!res.ok) {
    return Response.json({ suggestions: [] }, { status: res.status });
  }

  const data = await res.json();

  const suggestions: string[] = (data.predictions ?? []).map(
    (p: { structured_formatting?: { main_text?: string; secondary_text?: string } }) => {
      const main = p.structured_formatting?.main_text ?? "";
      const secondary = p.structured_formatting?.secondary_text?.replace(", USA", "") ?? "";
      return secondary ? `${main}, ${secondary}` : main;
    }
  );

  return Response.json({ suggestions });
}
