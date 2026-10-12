import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL as string
const redisSecret = process.env.UPSTASH_REDIS_REST_TOKEN as string
const redis = new Redis({
  url: redisUrl,
  token: redisSecret,
});

export default redis;
