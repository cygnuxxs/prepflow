import redis from '@/lib/redis'
import { headers } from 'next/headers'

// Define response type for better type safety
interface VisitorResponse {
  activeCount: number;
  success: boolean;
  error?: string;
}

export async function GET() {
  try {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for');
    const key = `visitor:${ip}`;
    console.log(ip)
    const TTL = 300; // 5 minutes in seconds

    // Use pipeline to combine multiple Redis operations
    const pipeline = redis.pipeline();

    // Set the IP with TTL
    pipeline.set(key, Date.now(), { ex: TTL });

    // Store in active visitors set
    pipeline.sadd("active_visitors", key);
    pipeline.expire("active_visitors", TTL);

    // Execute first batch of operations
    await pipeline.exec();

    // Get active keys and clean up expired ones
    const activeKeys = (await redis.smembers("active_visitors")) as string[];

    // Check existence of each key
    const existsPipeline = redis.pipeline();
    for (const k of activeKeys) {
      existsPipeline.exists(k);
    }
    const pipelineResults = await existsPipeline.exec();
    const results = pipelineResults.map(result => result === 1);

    // Clean up expired keys from the set
    const expiredKeys = activeKeys.filter((_, index: number) => !results[index]);
    if (expiredKeys.length > 0) {
      await redis.srem("active_visitors", ...expiredKeys);
    }

    const activeCount = results.filter(exists => exists).length;

    const response: VisitorResponse = {
      activeCount,
      success: true
    };

    return Response.json(response, {
      status: 200,
    });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    const response: VisitorResponse = {
      activeCount: 0,
      success: false,
      error: 'Failed to track visitors'
    };
    return Response.json(response, { status: 500 });
  }
}
