'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const TIMELINE = [
  { year: '2009', event: 'AERO founded in New York with 3 aircraft.' },
  { year: '2013', event: 'Expanded to European routes. London office opened.' },
  { year: '2016', event: 'Fleet grew to 20 aircraft. Dubai hub established.' },
  { year: '2019', event: '10 years of excellence. 10,000 flights completed.' },
  { year: '2022', event: 'Ultra-long-range fleet introduced. Non-stop global routes.' },
  { year: '2025', event: '47 aircraft. 130+ destinations. 2,400+ completed charters.' },
]

const TEAM = [
  {
    name: 'James Harrington',
    role: 'Chief Executive Officer',
    bio: 'Former commercial airline captain with 22 years in aviation operations.',
  },
  {
    name: 'Sophia Reeves',
    role: 'Head of Concierge',
    bio: 'Luxury hospitality veteran who has served heads of state and Fortune 500 executives.',
  },
  {
    name: 'Marcus Osei',
    role: 'Director of Operations',
    bio: 'Aviation logistics expert with deep expertise in African and Middle Eastern routes.',
  },
  {
    name: 'Elena Vasquez',
    role: 'Chief Safety Officer',
    bio: 'ICAO-certified safety auditor with a perfect safety record spanning 18 years.',
  },
]

export default function AboutContent() {
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
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold tracking-[0.4em] text-xs uppercase font-body">
              Our Story
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-7xl lg:text-9xl text-ivory tracking-tight leading-none mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Flying the world&apos;s{' '}
            <span className="gold-shimmer">elite</span>
            <br />since 2009.
          </motion.h1>

          <motion.p
            className="text-ivory/40 font-body text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            AERO was founded on a single belief — that the journey should be as
            extraordinary as the destination. We&apos;ve spent 15 years proving it, one
            charter at a time.
          </motion.p>
        </div>
      </div>

      {/* Mission statement */}
      <section className="py-24 px-6 bg-smoke">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            className="font-display text-3xl lg:text-4xl text-ivory leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* FIX: use &quot; for double quotes, &apos; for apostrophes */}
            &quot;We don&apos;t sell seats. We craft experiences. Every AERO charter is
            a seamless extension of your life — your time, your privacy,
            your{' '}
            <em className="gold-shimmer not-italic">freedom</em>.&quot;
          </motion.blockquote>
          <p className="text-ivory/30 font-body mt-6 tracking-widest text-sm">
            — James Harrington, CEO
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold tracking-[0.4em] text-xs uppercase font-body">
              Our Journey
            </span>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-ivory/5" />
            <div className="space-y-12 pl-16">
              {TIMELINE.map(({ year, event }, i) => (
                <motion.div
                  key={year}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute -left-12 top-1 w-3 h-3 border border-gold/40 bg-obsidian flex items-center justify-center">
                    <div className="w-1 h-1 bg-gold/60" />
                  </div>
                  <p className="text-gold font-display text-2xl mb-1">{year}</p>
                  <p className="text-ivory/50 font-body leading-relaxed">{event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-smoke">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-px bg-gold" />
            <span className="text-gold tracking-[0.4em] text-xs uppercase font-body">
              Leadership
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/5">
            {TEAM.map(({ name, role, bio }, i) => (
              <motion.div
                key={name}
                className="bg-smoke p-8 hover:bg-mist transition-colors duration-500 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 border border-gold/20 bg-obsidian flex items-center justify-center mb-6 group-hover:border-gold/40 transition-colors duration-500">
                  <span className="font-display text-2xl text-gold/30">
                    {name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display text-xl text-ivory mb-1">{name}</h3>
                <p className="text-gold/60 font-body text-xs tracking-widest uppercase mb-4">
                  {role}
                </p>
                <p className="text-ivory/30 font-body text-sm leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl text-ivory mb-6">
            Ready to experience AERO?
          </h2>
          <Link
            href="/booking"
            className="inline-block px-12 py-5 bg-gold text-obsidian font-body tracking-[0.25em] text-sm uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Charter a Jet
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
