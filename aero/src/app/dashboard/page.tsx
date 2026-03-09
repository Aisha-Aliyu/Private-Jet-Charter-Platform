import { currentUser } from '@clerk/nextjs/server'
import DashboardOverview from '@/components/sections/dashboard/DashboardOverview'

export default async function DashboardPage() {
  const user = await currentUser()

  return (
    <DashboardOverview
      userName={user?.firstName ?? 'Member'}
      userEmail={user?.emailAddresses[0]?.emailAddress ?? ''}
      memberSince={user?.createdAt ? new Date(user.createdAt).getFullYear().toString() : '2025'}
    />
  )
}
