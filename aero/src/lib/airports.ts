import { Airport } from '@/types'

export const AIRPORTS: Airport[] = [
  { code: 'KTEB', name: 'Teterboro Airport', city: 'New York', country: 'USA' },
  { code: 'KLAS', name: 'Harry Reid International', city: 'Las Vegas', country: 'USA' },
  { code: 'KLAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
  { code: 'KMDW', name: 'Chicago Midway', city: 'Chicago', country: 'USA' },
  { code: 'KMIA', name: 'Miami International', city: 'Miami', country: 'USA' },
  { code: 'KBOS', name: 'Boston Logan', city: 'Boston', country: 'USA' },
  { code: 'KDAL', name: 'Dallas Love Field', city: 'Dallas', country: 'USA' },
  { code: 'KSFO', name: 'San Francisco International', city: 'San Francisco', country: 'USA' },
  { code: 'EGLL', name: 'London Heathrow', city: 'London', country: 'UK' },
  { code: 'EGLC', name: 'London City Airport', city: 'London', country: 'UK' },
  { code: 'LFPB', name: 'Paris Le Bourget', city: 'Paris', country: 'France' },
  { code: 'EDDB', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Germany' },
  { code: 'LIMC', name: 'Milan Malpensa', city: 'Milan', country: 'Italy' },
  { code: 'LSZH', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
  { code: 'OMDB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
  { code: 'OMSJ', name: 'Sharjah International', city: 'Sharjah', country: 'UAE' },
  { code: 'RJTT', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan' },
  { code: 'VHHH', name: 'Hong Kong International', city: 'Hong Kong', country: 'China' },
  { code: 'WSSS', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'YSSY', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia' },
  { code: 'DNMM', name: 'Murtala Muhammed International', city: 'Lagos', country: 'Nigeria' },
  { code: 'DNAA', name: 'Nnamdi Azikiwe International', city: 'Abuja', country: 'Nigeria' },
  { code: 'FAOR', name: 'O.R. Tambo International', city: 'Johannesburg', country: 'South Africa' },
  { code: 'HECA', name: 'Cairo International', city: 'Cairo', country: 'Egypt' },
  { code: 'GMMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Morocco' },
]

export function searchAirports(query: string): Airport[] {
  if (!query || query.length < 2) return []
  const q = query.toLowerCase()
  return AIRPORTS.filter(
    (a) =>
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
  ).slice(0, 6)
}

// Rough flight hour estimator based on distance
export function estimateFlightHours(from: string, to: string): number {
  // Simplified — in production use real distance API
  const pairs: Record<string, number> = {
    'KTEB-KLAX': 5.5, 'KLAX-KTEB': 5.5,
    'KTEB-KLAS': 5.0, 'KLAS-KTEB': 5.0,
    'KTEB-KMIA': 3.0, 'KMIA-KTEB': 3.0,
    'EGLL-LFPB': 1.0, 'LFPB-EGLL': 1.0,
    'EGLL-OMDB': 7.0, 'OMDB-EGLL': 7.0,
    'OMDB-RJTT': 9.0, 'RJTT-OMDB': 9.0,
    'EGLL-DNMM': 6.5, 'DNMM-EGLL': 6.5,
  }
  const key = `${from}-${to}`
  return pairs[key] ?? 3.5 // Default estimate
}
