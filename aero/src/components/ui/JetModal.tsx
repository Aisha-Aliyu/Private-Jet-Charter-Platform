'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Jet } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { X, Users, Gauge, MapPin, Zap, Check } from 'lucide-react'
import Link from 'next/link'

interface JetModalProps {
  jet: Jet | null
  onClose: () => void
}

export default function JetModal({ jet, onClose }: JetModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (jet) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [jet])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const SPECS = jet
    ? [
        { label: 'Passengers', value: `${jet.capacity} seats`, icon: Users },
        { label: 'Range', value: `${jet.range_km.toLocaleString()} km`, icon: MapPin },
        { label: 'Speed', value: `${jet.speed_kmh} km/h`, icon: Gauge },
        { label: 'Hourly Rate', value: formatCurrency(jet.price_per_hour), icon: Zap },
      ]
    : []

  return (
    <AnimatePresence>
      {jet && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-smoke border-l border-ivory/10 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header Image Area */}
            <div className="relative h-72 overflow-hidden bg-gradient-to-br from-mist to-obsidian">

              {/* Fallback design — always behind image */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="absolute inset-0">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-px bg-gold/10"
                      style={{ top: `${10 + i * 11}%`, left: 0, right: 0 }}
                    />
                  ))}
                </div>
                <svg
                  viewBox="0 0 300 120"
                  className="w-64 h-auto text-gold/20 fill-current relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15,68 L90,63 L135,45 L195,42 L255,52 L285,60 L255,63 L195,57 L135,60 L90,72 L15,75 Z" />
                  <path d="M120,42 L150,15 L165,42 Z" />
                  <path d="M180,52 L210,37 L222,52 Z" />
                  <path d="M90,72 L75,90 L105,72 Z" />
                  <circle cx="30" cy="68" r="4" />
                </svg>
              </div>

              {/* Real image — only if url exists */}
              {jet.image_url ? (
                <Image
                  src={jet.image_url}
                  alt={jet.name}
                  fill
                  className="object-cover z-10"
                  sizes="100vw"
                  priority
                />
              ) : null}

              {/* Gradient overlay — sits above image for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-smoke z-20" />

              {/* Availability badge */}
              <div
                className={`absolute top-6 left-6 z-30 px-4 py-1.5 text-xs tracking-[0.25em] uppercase font-body ${
                  jet.available
                    ? 'bg-gold text-obsidian'
                    : 'bg-ivory/10 text-ivory/50 border border-ivory/10'
                }`}
              >
                {jet.available ? 'Available Now' : 'Charter on Request'}
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center border border-ivory/20 text-ivory/60 hover:border-gold hover:text-gold transition-all duration-300 bg-obsidian/50 backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">

              {/* Title */}
              <div className="mb-8">
                <motion.h2
                  className="font-display text-5xl text-ivory tracking-wide mb-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {jet.name}
                </motion.h2>
                <motion.p
                  className="text-ivory/40 font-body tracking-widest text-sm uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {jet.model}
                </motion.p>
              </div>

              {/* Specs grid */}
              <motion.div
                className="grid grid-cols-2 gap-px bg-ivory/5 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {SPECS.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-smoke p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={13} className="text-gold" />
                      <span className="text-ivory/30 text-xs tracking-[0.2em] uppercase font-body">
                        {label}
                      </span>
                    </div>
                    <p className="font-display text-2xl text-ivory">{value}</p>
                  </div>
                ))}
              </motion.div>

              {/* Description */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-ivory/30 text-xs tracking-[0.3em] uppercase font-body mb-3">
                  About This Aircraft
                </h3>
                <p className="text-ivory/70 font-body leading-relaxed text-lg">
                  {jet.description}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <h3 className="text-ivory/30 text-xs tracking-[0.3em] uppercase font-body mb-4">
                  Onboard Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {jet.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-4 h-4 border border-gold/40 flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-gold" />
                      </div>
                      <span className="text-ivory/60 font-body text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Pricing + CTA */}
              <motion.div
                className="border-t border-ivory/10 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-ivory/30 text-xs tracking-[0.2em] uppercase font-body mb-1">
                      Starting from
                    </p>
                    <p className="font-display text-4xl gold-shimmer">
                      {formatCurrency(jet.price_per_hour)}
                    </p>
                    <p className="text-ivory/30 text-sm font-body">per flight hour</p>
                  </div>
                  <p className="text-ivory/20 text-xs font-body text-right max-w-32">
                    Final price includes all fees & catering
                  </p>
                </div>

                <Link
                  href={`/booking?jet=${jet.id}`}
                  className="block w-full text-center py-4 bg-gold text-obsidian font-body tracking-[0.25em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
                >
                  Charter This Jet
                </Link>

                <button
                  onClick={onClose}
                  className="block w-full text-center py-3 mt-3 text-ivory/30 font-body tracking-[0.2em] text-xs uppercase hover:text-ivory/60 transition-colors duration-300"
                >
                  Continue Browsing
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
