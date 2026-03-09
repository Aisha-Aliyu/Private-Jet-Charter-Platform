/**
 * Environment variable validation
 * This runs at server startup — if any required var is missing,
 * the app crashes immediately with a clear error message
 * rather than silently failing later
 */

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}\n` +
      `Check your .env.local file and Vercel project settings.`
    )
  }
  return value
}

// Server-only variables (never expose to client)
export const serverEnv = {
  clerkSecretKey: requireEnv('CLERK_SECRET_KEY'),
  supabaseServiceRoleKey: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
  upstashRedisUrl: requireEnv('UPSTASH_REDIS_REST_URL'),
  upstashRedisToken: requireEnv('UPSTASH_REDIS_REST_TOKEN'),
} as const

// Public variables (safe for client)
export const publicEnv = {
  clerkPublishableKey: requireEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
  supabaseUrl: requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
} as const
