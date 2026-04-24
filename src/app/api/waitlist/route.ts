import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const MC_API_KEY = process.env.MAILCHIMP_API_KEY!;
const MC_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
const MC_DC = MC_API_KEY.split("-")[1];

async function addToMailchimp(email: string, name: string, city: string) {
  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ");

  await fetch(
    `https://${MC_DC}.api.mailchimp.com/3.0/lists/${MC_AUDIENCE_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`any:${MC_API_KEY}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName || name,
          LNAME: lastName,
          CITY: city,
        },
        tags: ["waitlist"],
      }),
    }
  );
}

export async function POST(request: NextRequest) {
  const { name, email, city } = await request.json();

  if (!email || typeof email !== "string") {
    return Response.json({ error: "Valid email required" }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalized)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const isNew = await redis.sadd("waitlist", normalized);

  if (isNew === 0) {
    return Response.json({ error: "Already on waitlist" }, { status: 409 });
  }

  await redis.hset(`waitlist:${normalized}`, {
    name: (name ?? "").trim(),
    city: (city ?? "").trim(),
    email: normalized,
    joinedAt: new Date().toISOString(),
  });

  await addToMailchimp(normalized, (name ?? "").trim(), (city ?? "").trim());

  return Response.json({ success: true }, { status: 201 });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
