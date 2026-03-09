'use client'

import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { Plane, Clock, MapPin, ArrowRight, Plus } from 'lucide-react'

const ALL_BOOKINGS = [
  {
    id: 'BK-001',
    route: 'New York → Dubai',
    departure: 'KTEB',
    arrival: 'OMDB',
    date: 'Mar 22, 2025',
    returnDate: null,
    aircraft: 'Gulfstream G650',
    passengers: 4,
    status: 'confirmed',
    amount: 87500,
  },
  {
    id: 'BK-002',
    route: 'London → Paris',
    departure: 'EGLC',
    arrival: 'LFPB',
    date: 'Feb 14, 2025',
    returnDate: null,
    aircraft: 'Citation CJ4',
    passengers: 2,
    status: 'completed',
    amount: 6200,
  },
  {
    id: 'BK-003',
    route: 'Lagos → London',
    departure: 'DNMM',
    arrival: 'EGLL',
    date: 'Jan 30, 2025',
    returnDate: 'Feb 5, 2025',
    aircraft: 'Challenger 350',
    passengers: 6,
    status: 'completed',
    amount: 42000,
  },
  {
    id: 'BK-004',
    route: 'Dubai → Singapore',
    departure: 'OMDB',
    arrival: 'WSSS',
    date: 'Dec 18, 2024',
    returnDate: null,
    aircraft: 'Hawker 900XP',
    passengers: 3,
    status: 'completed',
    amount: 28400,
  },
]

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-gold/10 text-gold border border-gold/20',
  completed: 'bg-ivory/5 text-ivory/40 border border-ivory/10',
  pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border border-red-500/20',
}

export default function BookingsPage() {
  return (
    <div className="px-6 py-10 max-w-5xl">
      {/* Header */}
      <motion.div
        className="flex items-end justify-between mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-2">
            History
          </p>
          <h1 className="font-display text-5xl text-ivory tracking-tight">My Bookings</h1>
        </div>
        <Link
          href="/booking"
          className="flex items-center gap-2 px-6 py-3 bg-gold text-obsidian font-body tracking-[0.15em] text-xs uppercase hover:bg-gold-light transition-colors duration-300"
        >
          <Plus size={13} /> New Charter
        </Link>
      </motion.div>

      {/* Bookings list */}
      <div className="space-y-px bg-ivory/5">
        {ALL_BOOKINGS.map((booking, i) => (
          <motion.div
            key={booking.id}
            className="bg-obsidian hover:bg-smoke transition-colors duration-300 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              {/* Left: Route info */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border border-ivory/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Plane size={16} className="text-gold/40" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-display text-xl text-ivory">{booking.route}</h3>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-body tracking-wider capitalize ${
                        STATUS_STYLES[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-5 text-ivory/25 font-body text-xs">
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {booking.date}
                      {booking.returnDate && ` → ${booking.returnDate}`}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      {booking.aircraft}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Plane size={11} />
                      {booking.passengers} passengers
                    </span>
                    <span className="text-ivory/15">
                      {booking.departure} → {booking.arrival}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Price + action */}
              <div className="flex items-center gap-6 lg:flex-shrink-0 pl-16 lg:pl-0">
                <div className="text-right">
                  <p className="font-display text-2xl text-ivory">
                    {formatCurrency(booking.amount)}
                  </p>
                  <p className="text-ivory/20 font-body text-xs mt-0.5">{booking.id}</p>
                </div>
                <button className="w-8 h-8 border border-ivory/10 flex items-center justify-center text-ivory/20 hover:border-gold hover:text-gold transition-all duration-300">
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state — shown when no bookings */}
      {ALL_BOOKINGS.length === 0 && (
        <div className="text-center py-24 border border-ivory/5 bg-smoke">
          <Plane size={32} className="text-ivory/10 mx-auto mb-4" />
          <p className="font-display text-2xl text-ivory/20 mb-2">No flights yet</p>
          <p className="text-ivory/20 font-body text-sm mb-8">
            Your booking history will appear here.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-3 bg-gold text-obsidian font-body tracking-[0.2em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Book Your First Charter
          </Link>
        </div>
      )}
    </div>
  )
}
