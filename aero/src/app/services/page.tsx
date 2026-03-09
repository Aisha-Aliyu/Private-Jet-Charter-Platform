import type { Metadata } from 'next'
import ServicesContent from '@/components/sections/ServicesContent'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AERO offers private jet charter, group charters, cargo flights, and bespoke concierge services worldwide.',
}

export default function ServicesPage() {
  return <ServicesContent />
}
