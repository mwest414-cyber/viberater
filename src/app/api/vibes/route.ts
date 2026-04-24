import type { NextRequest } from "next/server";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city") ?? "unknown";

  return Response.json(
    {
      status: "coming_soon",
      message: "VibeRater is launching soon. Join the waitlist at getviberater.co.",
      city,
      venues: [],
    },
    { headers: CORS }
  );
}
