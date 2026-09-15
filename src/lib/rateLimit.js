import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimitInstance = null;

function createRatelimit() {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;

  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    throw new Error(
      "Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN.",
    );
  }

  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  return new Ratelimit({
    redis,

    limiter: Ratelimit.slidingWindow(5, "10 m"),

    analytics: true,

    prefix: "portfolio-blog",
  });
}

export function getRatelimit() {
  if (!ratelimitInstance) {
    ratelimitInstance = createRatelimit();
  }

  return ratelimitInstance;
}

export async function checkRateLimit(identifier) {
  if (typeof identifier !== "string" || !identifier.trim()) {
    throw new TypeError("Rate-limit identifier must be a non-empty string.");
  }

  return getRatelimit().limit(identifier);
}
