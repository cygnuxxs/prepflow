import redis from '@/lib/redis'
import { headers } from 'next/headers'
import { createHash } from 'node:crypto'

interface VisitorResponse {
  activeCount: number
  success: boolean
  error?: string
}

const TTL = 300 // 5 minutes
const ACTIVE_VISITORS_KEY = 'active_visitors'

const TRACK_VISITOR_SCRIPT = `
  local key = KEYS[1]
  local now = tonumber(ARGV[1])
  local visitorId = ARGV[2]
  local cutoff = tonumber(ARGV[3])
  local ttl = tonumber(ARGV[4])

  redis.call('ZADD', key, now, visitorId)
  redis.call('ZREMRANGEBYSCORE', key, '-inf', cutoff)
  redis.call('EXPIRE', key, ttl)

  return redis.call('ZCARD', key)
`

function resolveVisitorIp(inputHeaders: Headers): string | null {
  const candidateHeaders = [
    inputHeaders.get('x-forwarded-for'),
    inputHeaders.get('x-real-ip'),
    inputHeaders.get('cf-connecting-ip'),
    inputHeaders.get('fastly-client-ip'),
    inputHeaders.get('true-client-ip'),
  ]

  for (const rawHeaderValue of candidateHeaders) {
    if (!rawHeaderValue) continue

    for (const value of rawHeaderValue.split(',')) {
      const candidate = value.trim()

      if (!candidate || /^(unknown|undefined|null)$/i.test(candidate)) {
        continue
      }

      const normalized = candidate.replace(/^\[|\]$/g, '')

      if (
        /^[0-9a-fA-F:.]+$/.test(normalized) &&
        normalized !== ':' &&
        !/^::ffff:$/i.test(normalized)
      ) {
        return normalized
      }
    }
  }

  return null
}

export async function GET(request?: Request): Promise<Response> {
  try {
    const requestHeaders = request?.headers ?? (await headers())
    const ip = resolveVisitorIp(requestHeaders)

    if (!ip) {
      return Response.json(
        {
          activeCount: 0,
          success: false,
          error: 'Unable to identify visitor',
        } satisfies VisitorResponse,
        { status: 400 },
      )
    }

    // Avoid storing raw IP addresses in Redis.
    const visitorId = createHash('sha256')
      .update(ip)
      .digest('hex')

    const now = Math.floor(Date.now() / 1000)
    const cutoff = now - TTL

    const activeCount = (await redis.eval(
      TRACK_VISITOR_SCRIPT,
      [ACTIVE_VISITORS_KEY],
      [now, visitorId, cutoff, TTL],
    )) as number

    return Response.json(
      {
        activeCount,
        success: true,
      } satisfies VisitorResponse,
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  } catch (error) {
    console.log('Visitor tracking error:', error)
    console.error('Visitor tracking error:', error)
    return Response.json(
      {
        activeCount: 0,
        success: false,
        error: 'Failed to track visitors',
      } satisfies VisitorResponse,
      { status: 500, statusText: (error as any).message },
    )
  }
}
