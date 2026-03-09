import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import WhyAeroSection from '@/components/sections/WhyAeroSection'
import FleetPreviewSection from '@/components/sections/FleetPreviewSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FleetPreviewSection />
      <StatsSection />
      <WhyAeroSection />
    </>
  )
}
