import DashboardOverview from '@/components/sections/dashboard/DashboardOverview'

export default function DashboardPage() {
  return (
    <DashboardOverview
      userName="Your Flights"
      userEmail="Bookings are saved in this browser"
      memberSince={new Date().getFullYear().toString()}
    />
  )
}
