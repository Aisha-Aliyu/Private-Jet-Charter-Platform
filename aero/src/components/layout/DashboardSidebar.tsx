'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { UserButton } from '@clerk/nextjs'
import {
  LayoutDashboard,
  Plane,
  CalendarDays,
  Settings,
  Map,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Bookings', href: '/dashboard/bookings', icon: CalendarDays },
  { label: 'Fleet', href: '/fleet', icon: Plane },
  { label: 'Destinations', href: '/destinations', icon: Map },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-30 flex-col bg-smoke border-r border-ivory/5"
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-ivory/5">
          {!collapsed && (
            <motion.span
              className="font-display text-xl tracking-widest gold-shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              AERO
            </motion.span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-6 flex items-center justify-center text-ivory/20 hover:text-gold transition-colors"
            aria-label="Toggle sidebar"
          >
            <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.3 }}>
              <ChevronRight size={14} />
            </motion.div>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-6 space-y-1 px-3">
          {NAV.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 text-sm font-body tracking-[0.1em] uppercase transition-all duration-300 relative group',
                  isActive
                    ? 'text-gold bg-gold/5 border-l-2 border-gold'
                    : 'text-ivory/30 hover:text-ivory/70 border-l-2 border-transparent hover:border-ivory/10'
                )}
              >
                <Icon size={15} className="flex-shrink-0" />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="truncate"
                  >
                    {label}
                  </motion.span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User area */}
        <div className="p-4 border-t border-ivory/5 flex items-center gap-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: '32px',
                  height: '32px',
                  borderRadius: '0px',
                  border: '1px solid rgba(201,168,76,0.3)',
                },
              },
            }}
          />
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-w-0"
            >
              <p className="text-ivory/50 font-body text-xs truncate">Member Account</p>
            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-smoke/95 backdrop-blur-md border-b border-ivory/5 flex items-center justify-between px-6 py-4 mt-[73px]">
        <span className="text-ivory/30 font-body text-xs tracking-[0.2em] uppercase">Dashboard</span>
        <div className="flex items-center gap-4">
          {NAV.slice(0, 3).map(({ href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors duration-200',
                pathname === href ? 'text-gold' : 'text-ivory/30 hover:text-ivory/60'
              )}
            >
              <Icon size={16} />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
