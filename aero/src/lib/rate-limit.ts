import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

type Limiter = {
  limit: (key: string) => Promise<{ success: boolean; limit: number; remaining: number; reset: number }>
}

const HOUR = 60 * 60 * 1000
const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN
const redis = url && token ? new Redis({ url, token }) : null

if (!redis) {
  console.warn('Upstash Redis settings are missing, so rate limits only count per server instance')
}

// Without Upstash, each server instance keeps its own count. That's weaker than a shared
// count, but the site still builds and runs, and repeated requests are still slowed down.
function memoryLimiter(max: number): Limiter {
  const hits = new Map<string, { count: number; reset: number }>()
  return {
    async limit(key) {
      const now = Date.now()
      if (hits.size > 10_000) {
        for (const [k, v] of hits) if (v.reset <= now) hits.delete(k)
      }
      const entry = hits.get(key)
      if (!entry || entry.reset <= now) {
        hits.set(key, { count: 1, reset: now + HOUR })
        return { success: true, limit: max, remaining: max - 1, reset: now + HOUR }
      }
      entry.count += 1
      return { success: entry.count <= max, limit: max, remaining: Math.max(0, max - entry.count), reset: entry.reset }
    },
  }
}

// Allows `max` requests per hour per key
export function createRateLimiter(max: number, prefix: string): Limiter {
  if (!redis) return memoryLimiter(max)
  return new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(max, '1 h'), analytics: true, prefix })
}

// 100 requests per hour per IP
export const rateLimiter = createRateLimiter(100, 'aero:ratelimit')

// Helper to get real IP from request headers
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs — take the first (original client)
    return forwarded.split(',')[0].trim()
  }

  if (realIp) return realIp

  return 'anonymous'
}
