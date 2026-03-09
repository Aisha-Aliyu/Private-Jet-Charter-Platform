'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { useBookings } from '@/hooks/useBookings'
import { Plane, CalendarDays, TrendingUp, ArrowRight, MapPin, Clock, Star, Loader } from 'lucide-react'

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-gold/10 text-gold border border-gold/20',
  completed: 'bg-ivory/5 text-ivory/40 border border-ivory/10',
  pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border border-red-500/20',
}

interface Props {
  userName: string
  userEmail: string
  memberSince: string
}

export default function DashboardOverview({ userName, userEmail, memberSince }: Props) {
  const { bookings, loading, error } = useBookings()

  const totalSpent = bookings.reduce((sum, b) => sum + b.total_price, 0)
  const completedFlights = bookings.filter((b) => b.status === 'completed').length
  const nextFlight = bookings.find((b) => b.status === 'confirmed' || b.status === 'pending')

  const STATS = [
    {
      label: 'Total Flights',
      value: loading ? '—' : bookings.length.toString(),
      icon: Plane,
      sub: `${completedFlights} completed`,
    },
    {
      label: 'Total Spent',
      value: loading ? '—' : formatCurrency(totalSpent),
      icon: TrendingUp,
      sub: 'All time',
    },
    {
      label: 'Member Since',
      value: memberSince,
      icon: Star,
      sub: 'Elite member',
    },
    {
      label: 'Next Flight',
      value: nextFlight
        ? new Date(nextFlight.departure_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        : 'None',
      icon: CalendarDays,
      sub: nextFlight
        ? `${nextFlight.departure_city} → ${nextFlight.arrival_city}`
        : 'Book your next charter',
    },
  ]

  return (
    <div className="px-6 py-10 max-w-6xl">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-2">
          Welcome back
        </p>
        <h1 className="font-display text-5xl text-ivory tracking-tight">{userName}</h1>
        <p className="text-ivory/30 font-body mt-1">{userEmail}</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/5 mb-10">
        {STATS.map(({ label, value, icon: Icon, sub }, i) => (
          <motion.div
            key={label}
            className="bg-obsidian p-6 hover:bg-smoke transition-colors duration-500 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-ivory/20 text-xs tracking-[0.2em] uppercase font-body">
                {label}
              </span>
              <Icon
                size={14}
                className="text-ivory/10 group-hover:text-gold/40 transition-colors duration-500"
              />
            </div>
            <p className="font-display text-3xl text-ivory mb-1">{value}</p>
            <p className="text-ivory/25 font-body text-xs">{sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/booking"
          className="flex items-center justify-between p-5 bg-gold text-obsidian group hover:bg-gold-light transition-colors duration-300"
        >
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase mb-1">New Charter</p>
            <p className="font-display text-xl">Book a Jet</p>
          </div>
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>

        <Link
          href="/fleet"
          className="flex items-center justify-between p-5 border border-ivory/10 bg-smoke text-ivory hover:border-gold/30 transition-colors duration-300 group"
        >
          <div>
            <p className="text-ivory/30 font-body text-xs tracking-[0.2em] uppercase mb-1">
              Browse
            </p>
            <p className="font-display text-xl">Our Fleet</p>
          </div>
          <ArrowRight
            size={16}
            className="text-ivory/20 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300"
          />
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center justify-between p-5 border border-ivory/10 bg-smoke text-ivory hover:border-gold/30 transition-colors duration-300 group"
        >
          <div>
            <p className="text-ivory/30 font-body text-xs tracking-[0.2em] uppercase mb-1">
              Account
            </p>
            <p className="font-display text-xl">Settings</p>
          </div>
          <ArrowRight
            size={16}
            className="text-ivory/20 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300"
          />
        </Link>
      </motion.div>

      {/* Recent bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-ivory">Recent Bookings</h2>
          <Link
            href="/dashboard/bookings"
            className="flex items-center gap-2 text-ivory/30 hover:text-gold font-body text-xs tracking-[0.2em] uppercase transition-colors duration-300"
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-16 border border-ivory/5 bg-smoke">
            <Loader size={20} className="text-gold/40 animate-spin" />
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="py-10 text-center border border-red-500/10 bg-red-500/5">
            <p className="text-red-400/60 font-body text-sm">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-16 border border-ivory/5 bg-smoke">
            <Plane size={28} className="text-ivory/10 mx-auto mb-3" />
            <p className="font-display text-xl text-ivory/20 mb-2">No flights yet</p>
            <p className="text-ivory/15 font-body text-sm mb-6">
              Your booking history will appear here.
            </p>
            <Link
              href="/booking"
              className="inline-block px-6 py-2.5 bg-gold text-obsidian font-body tracking-[0.2em] text-xs uppercase hover:bg-gold-light transition-colors duration-300"
            >
              Book Your First Charter
            </Link>
          </div>
        )}

        {/* Real bookings */}
        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-px bg-ivory/5">
            {bookings.slice(0, 4).map((booking, i) => (
              <motion.div
                key={booking.id}
                className="bg-obsidian hover:bg-smoke transition-colors duration-300 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-ivory/10 flex items-center justify-center flex-shrink-0">
                    <Plane size={14} className="text-gold/40" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-ivory font-body text-sm">
                        {booking.departure_city} → {booking.arrival_city}
                      </p>
                      <span
                        className={`px-2 py-0.5 text-xs font-body tracking-wider capitalize ${
                          STATUS_STYLES[booking.status]
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-ivory/25 font-body text-xs">
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {new Date(booking.departure_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} /> {booking.jet_name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:flex-shrink-0">
                  <div className="text-right">
                    <p className="font-display text-lg text-ivory">
                      {formatCurrency(booking.total_price)}
                    </p>
                    <p className="text-ivory/20 font-body text-xs">
                      {booking.booking_reference}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-ivory/10" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
