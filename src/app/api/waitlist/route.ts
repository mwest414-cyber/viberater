import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

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

  return Response.json({ success: true }, { status: 201 });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
