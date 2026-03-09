'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Globe, Star } from 'lucide-react'

const PILLARS = [
  {
    icon: Shield,
    title: 'Uncompromising Safety',
    body: 'Every aircraft in our fleet holds the highest safety certifications. Our pilots average 8,000+ flight hours and undergo rigorous bi-annual training.',
  },
  {
    icon: Clock,
    title: 'On Your Schedule',
    body: 'Depart when you choose. Our 4-hour booking window and 24/7 concierge ensure your aircraft is ready precisely when you need it.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    body: 'Access over 5,000 airports worldwide — including private terminals unreachable by commercial airlines — connecting you to every corner of the globe.',
  },
  {
    icon: Star,
    title: 'White Glove Service',
    body: 'From bespoke catering to ground transportation and hotel arrangements, your dedicated concierge manages every detail of your journey.',
  },
]

export default function WhyAeroSection() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24 items-end">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold tracking-[0.4em] text-xs uppercase font-body">
                The AERO Difference
              </span>
            </div>
            <h2 className="font-display text-6xl lg:text-7xl text-ivory leading-[1.05] tracking-tight">
              {/* FIX: apostrophe and quotes as HTML entities */}
              Why the world&apos;s elite{' '}
              <em className="gold-shimmer not-italic">fly with us</em>
            </h2>
          </motion.div>

          <motion.p
            className="text-ivory/50 font-body text-xl leading-relaxed"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Since 2009, AERO has redefined what private aviation means. We don&apos;t just
            charter jets — we craft seamless journeys that begin the moment you contact us
            and end only when you&apos;re home.
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/5">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              className="bg-obsidian p-8 group hover:bg-smoke transition-all duration-500 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
            >
              <div className="absolute top-0 left-0 w-8 h-px bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-px h-8 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="mb-6">
                <div className="w-12 h-12 border border-gold/20 flex items-center justify-center group-hover:border-gold/60 transition-colors duration-500">
                  <Icon
                    size={18}
                    className="text-gold/60 group-hover:text-gold transition-colors duration-500"
                  />
                </div>
              </div>

              <h3 className="font-display text-2xl text-ivory mb-4 tracking-wide">{title}</h3>
              {/* body is a JS string so apostrophes are fine here — rendered via {body} */}
              <p className="text-ivory/40 font-body text-sm leading-relaxed">{body}</p>

              <div className="absolute bottom-6 right-6 font-display text-6xl text-ivory/3 select-none">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
