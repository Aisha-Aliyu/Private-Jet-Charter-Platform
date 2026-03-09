import type { Metadata } from 'next'
import DestinationsContent from '@/components/sections/DestinationsContent'

export const metadata: Metadata = {
  title: 'Destinations',
  description:
    'Fly AERO to 130+ private terminals worldwide. From New York to Dubai, Lagos to Tokyo — we connect you everywhere.',
}

export default function DestinationsPage() {
  return <DestinationsContent />
}
