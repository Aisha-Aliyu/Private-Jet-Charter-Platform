import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Validate env vars at startup
if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Missing Upstash Redis environment variables')
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// 100 requests per hour per IP
export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 h'),
  analytics: true,
  prefix: 'aero:ratelimit',
})

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
