'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 2400, suffix: '+', label: 'Flights Completed', description: 'Across 6 continents' },
  { value: 98, suffix: '%', label: 'On-Time Departure', description: 'Industry-leading reliability' },
  { value: 47, suffix: '', label: 'Aircraft in Fleet', description: 'Light to ultra-long range' },
  { value: 130, suffix: '+', label: 'Destinations', description: 'Private terminals worldwide' },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = 16
    const increment = value / (duration / step)

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(start))
      }
    }, step)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-smoke/50 to-obsidian" />

      {/* Gold horizontal line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 justify-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-8 h-px bg-gold/40" />
          <span className="text-gold/60 tracking-[0.4em] text-xs uppercase font-body">
            By The Numbers
          </span>
          <div className="w-8 h-px bg-gold/40" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-obsidian p-10 text-center group hover:bg-smoke transition-colors duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <p className="font-display text-5xl lg:text-6xl gold-shimmer mb-3">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-ivory font-body text-base mb-1">{stat.label}</p>
              <p className="text-ivory/30 font-body text-xs tracking-wider">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
