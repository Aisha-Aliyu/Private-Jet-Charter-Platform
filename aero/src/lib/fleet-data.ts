import { Jet } from '@/types'

export const JETS: Jet[] = [
  {
    id: 'citation-cj4',
    name: 'Citation CJ4',
    model: 'Cessna Citation CJ4',
    category: 'light',
    capacity: 9,
    range_km: 3190,
    speed_kmh: 778,
    price_per_hour: 3200,
    image_url: '/images/jets/cj4.jpg',
    features: ['Wi-Fi', 'Refreshment Center', 'Flat-screen Entertainment', 'Leather Seating'],
    description:
      'The Citation CJ4 defines light jet excellence. Perfect for shorter routes, it delivers exceptional speed and comfort in a refined cabin environment.',
    available: true,
  },
  {
    id: 'phenom-300',
    name: 'Phenom 300',
    model: 'Embraer Phenom 300E',
    category: 'light',
    capacity: 10,
    range_km: 3650,
    speed_kmh: 834,
    price_per_hour: 3800,
    image_url: '/images/jets/phenom300.jpg',
    features: [ 'Wi-Fi', 'Fully Flat Seats', 'Gourmet Catering', 'Satellite Phone'],
    description:
      'The world\'s best-selling light jet for over a decade. The Phenom 300E offers class-leading range and a luxuriously appointed cabin.',
    available: true,
  },
  {
    id: 'citation-xls',
    name: 'Citation XLS+',
    model: 'Cessna Citation XLS+',
    category: 'midsize',
    capacity: 12,
    range_km: 3700,
    speed_kmh: 815,
    price_per_hour: 4900,
    image_url: '/images/jets/citation-xls.jpg',
    features: ['Stand-up Cabin', 'Wi-Fi', 'Full Galley', 'Enclosed Lavatory', 'Catering'],
    description:
      'The Citation XLS+ strikes the ideal balance between range, comfort, and efficiency. Its stand-up cabin transforms every journey.',
    available: true,
  },
  {
    id: 'hawker-900',
    name: 'Hawker 900XP',
    model: 'Hawker 900XP',
    category: 'midsize',
    capacity: 9,
    range_km: 5685,
    speed_kmh: 848,
    price_per_hour: 5400,
    image_url: '/images/jets/hawker900.jpg',
    features: ['Transatlantic Range', 'Full Galley', 'Wi-Fi', 'Satellite Comm', 'Sleeper Config'],
    description:
      'With transcontinental capability, the Hawker 900XP is built for those who demand long-range performance without compromise.',
    available: false,
  },
  {
    id: 'challenger-350',
    name: 'Challenger 350',
    model: 'Bombardier Challenger 350',
    category: 'heavy',
    capacity: 10,
    range_km: 7408,
    speed_kmh: 870,
    price_per_hour: 7200,
    image_url: '/images/jets/challenger350.jpg',
    features: ['Flat-bed Seats', 'Full Galley', 'Wi-Fi', 'Shower', 'Private Suite', 'Catering'],
    description:
      'The Challenger 350 sets the gold standard for super-midsize jets. Exceptional range and a supremely comfortable cabin for the world\'s most discerning travelers.',
    available: true,
  },
  {
    id: 'gulfstream-g650',
    name: 'Gulfstream G650',
    model: 'Gulfstream G650ER',
    category: 'ultra-long-range',
    capacity: 19,
    range_km: 13890,
    speed_kmh: 956,
    price_per_hour: 14500,
    image_url: '/images/jets/g650.jpg',
    features: [
      'Non-stop Ultra Range',
      'Full Private Suite',
      'Shower',
      'Conference Room',
      'Master Bedroom',
      'Chef Galley',
    ],
    description:
      'The pinnacle of private aviation. The G650ER connects any two cities on Earth non-stop with an unrivaled cabin environment that defines the word luxury.',
    available: true,
  },
]

export const CATEGORIES = [
  { id: 'all', label: 'All Aircraft' },
  { id: 'light', label: 'Light Jets' },
  { id: 'midsize', label: 'Midsize Jets' },
  { id: 'heavy', label: 'Heavy Jets' },
  { id: 'ultra-long-range', label: 'Ultra Long Range' },
] as const

export type CategoryId = typeof CATEGORIES[number]['id']
