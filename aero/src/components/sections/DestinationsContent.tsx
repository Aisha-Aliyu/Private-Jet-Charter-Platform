'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const REGIONS = [
  {
    name: 'Americas',
    destinations: [
      { city: 'New York', airport: 'Teterboro (KTEB)', country: 'USA' },
      { city: 'Miami', airport: 'Opa-locka (KOPF)', country: 'USA' },
      { city: 'Los Angeles', airport: 'Van Nuys (KVNY)', country: 'USA' },
      { city: 'Las Vegas', airport: 'Henderson (KHND)', country: 'USA' },
      { city: 'Aspen', airport: 'Aspen (KASE)', country: 'USA' },
      { city: 'São Paulo', airport: 'Congonhas (SBSP)', country: 'Brazil' },
    ],
  },
  {
    name: 'Europe',
    destinations: [
      { city: 'London', airport: 'Farnborough (EGLF)', country: 'UK' },
      { city: 'Paris', airport: 'Le Bourget (LFPB)', country: 'France' },
      // FIX: moved apostrophe to JS string (safe in JS strings, only JSX text is problematic)
      { city: 'Monaco', airport: "Nice Côte d'Azur (LFMN)", country: 'Monaco' },
      { city: 'Geneva', airport: 'Geneva (LSGG)', country: 'Switzerland' },
      { city: 'Milan', airport: 'Linate (LIML)', country: 'Italy' },
      { city: 'Ibiza', airport: 'Ibiza (LEIB)', country: 'Spain' },
    ],
  },
  {
    name: 'Middle East & Africa',
    destinations: [
      { city: 'Dubai', airport: 'Al Maktoum (OMDW)', country: 'UAE' },
      { city: 'Riyadh', airport: 'King Khalid (OERK)', country: 'Saudi Arabia' },
      { city: 'Lagos', airport: 'Murtala Muhammed (DNMM)', country: 'Nigeria' },
      { city: 'Abuja', airport: 'Nnamdi Azikiwe (DNAA)', country: 'Nigeria' },
      { city: 'Johannesburg', airport: 'OR Tambo (FAOR)', country: 'South Africa' },
      { city: 'Cairo', airport: 'Cairo International (HECA)', country: 'Egypt' },
    ],
  },
  {
    name: 'Asia Pacific',
    destinations: [
      { city: 'Tokyo', airport: 'Haneda (RJTT)', country: 'Japan' },
      { city: 'Singapore', airport: 'Seletar (WSSL)', country: 'Singapore' },
      { city: 'Hong Kong', airport: 'HK International (VHHH)', country: 'China' },
      { city: 'Sydney', airport: 'Bankstown (YSBK)', country: 'Australia' },
      { city: 'Mumbai', airport: 'CSMT (VABB)', country: 'India' },
      { city: 'Maldives', airport: 'Velana (VRMM)', country: 'Maldives' },
    ],
  },
]

export default function DestinationsContent() {
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
              Global Network
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-7xl lg:text-9xl text-ivory tracking-tight leading-none mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            130+{' '}
            <span className="gold-shimmer">destinations.</span>
            <br />
            One standard.
          </motion.h1>

          <motion.p
            className="text-ivory/40 font-body text-xl max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            From private terminals in major cities to remote airstrips accessible
            only by charter — AERO connects you to the world on your terms.
          </motion.p>
        </div>
      </div>

      {/* Regions */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-16">
          {REGIONS.map(({ name, destinations }, ri) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ri * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold/40" />
                <h2 className="font-display text-3xl text-ivory">{name}</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-ivory/5">
                {destinations.map(({ city, airport, country }) => (
                  <div
                    key={city}
                    className="bg-obsidian p-5 hover:bg-smoke transition-colors duration-300 group"
                  >
                    <p className="font-display text-lg text-ivory mb-1 group-hover:text-gold transition-colors duration-300">
                      {city}
                    </p>
                    <p className="text-ivory/20 font-body text-xs mb-2">{country}</p>
                    <p className="text-ivory/15 font-body text-xs leading-relaxed">{airport}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-smoke border-t border-ivory/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-4">
            Don&apos;t see your destination?
          </p>
          <h2 className="font-display text-4xl text-ivory mb-6">We fly anywhere.</h2>
          <p className="text-ivory/30 font-body mb-8 max-w-sm mx-auto">
            Contact our concierge team — if there&apos;s an airstrip, we&apos;ll get you there.
          </p>
          <Link
            href="/booking"
            className="inline-block px-12 py-4 bg-gold text-obsidian font-body tracking-[0.25em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Request a Route
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
