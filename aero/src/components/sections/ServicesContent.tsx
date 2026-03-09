'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Plane, Package, Users, Star, Clock, Shield } from 'lucide-react'

const SERVICES = [
  {
    icon: Plane,
    title: 'On-Demand Charter',
    description:
      'Book a private jet within hours. Access 47 aircraft across our global fleet, available at your convenience 24/7.',
    features: ['4-hour booking window', 'One-way & round trips', 'Empty leg specials'],
    cta: '/booking',
  },
  {
    icon: Users,
    title: 'Group Charters',
    description:
      'Coordinate executive travel, sports teams, or luxury group experiences with dedicated aircraft and tailored catering.',
    features: ['Up to 19 passengers', 'Conference setup', 'Custom catering'],
    cta: '/booking',
  },
  {
    icon: Package,
    title: 'Cargo Charter',
    description:
      'Time-critical freight moved with precision. Medical supplies, luxury goods, and sensitive cargo handled with care.',
    features: ['Temperature control', 'Door-to-door tracking', 'Customs clearance'],
    cta: '/booking',
  },
  {
    icon: Star,
    title: 'Concierge Services',
    description:
      'Your dedicated AERO concierge handles every detail — ground transport, hotels, restaurant reservations, and beyond.',
    features: ['24/7 availability', 'Global network', 'White-glove service'],
    cta: '/about',
  },
  {
    icon: Clock,
    title: 'Empty Leg Flights',
    description:
      'Exclusive access to repositioning flights at significantly reduced rates. Luxury travel at exceptional value.',
    features: ['Up to 75% savings', 'Flexible booking', 'Same aircraft quality'],
    cta: '/fleet',
  },
  {
    icon: Shield,
    title: 'Jet Management',
    description:
      'Let AERO manage your private aircraft. Maintenance, crew, scheduling, and charter income — all handled for you.',
    features: ['Full maintenance', 'Crew management', 'Revenue sharing'],
    cta: '/about',
  },
]

export default function ServicesContent() {
  return (
    <div className="min-h-screen bg-obsidian">
      {/* Hero */}
      <div className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold tracking-[0.4em] text-xs uppercase font-body">
              What We Offer
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-7xl lg:text-9xl text-ivory tracking-tight leading-none mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Every service,{' '}
            <span className="gold-shimmer">perfected.</span>
          </motion.h1>
        </div>
      </div>

      {/* Services grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ivory/5">
          {SERVICES.map(({ icon: Icon, title, description, features, cta }, i) => (
            <motion.div
              key={title}
              className="bg-obsidian p-10 hover:bg-smoke transition-colors duration-500 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Gold corner on hover */}
              <div className="absolute top-0 left-0 w-12 h-px bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-px h-12 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-12 h-12 border border-gold/20 flex items-center justify-center mb-8 group-hover:border-gold/50 transition-colors duration-500">
                <Icon size={18} className="text-gold/50 group-hover:text-gold transition-colors duration-500" />
              </div>

              <h3 className="font-display text-2xl text-ivory mb-4">{title}</h3>
              <p className="text-ivory/40 font-body text-sm leading-relaxed mb-6">
                {description}
              </p>

              <ul className="space-y-2 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-ivory/25 font-body text-xs">
                    <div className="w-1 h-1 bg-gold/40 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={cta}
                className="text-gold/50 hover:text-gold font-body text-xs tracking-[0.2em] uppercase transition-colors duration-300"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
