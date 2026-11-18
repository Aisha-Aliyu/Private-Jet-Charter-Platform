import DashboardSidebar from '@/components/layout/DashboardSidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-obsidian flex">
      <DashboardSidebar />
      <main className="flex-1 min-w-0 pt-20 md:pt-0 md:pl-64">
        {children}
      </main>
    </div>
  )
}
