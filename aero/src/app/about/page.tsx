import type { Metadata } from 'next'
import AboutContent from '@/components/sections/AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Since 2009, AERO has redefined private aviation. Learn about our mission, fleet, and commitment to excellence.',
}

export default function AboutPage() {
  return <AboutContent />
}
