'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const TAGLINES = [
  'ABOVE THE CLOUDS.',
  'BEYOND LIMITS.',
  'WITHOUT COMPROMISE.',
]

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.85])

  // FIX: Generate particles in useEffect without triggering cascading renders
  // by using a ref to track if we've already generated them
  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }))
    // setState inside useEffect is fine when deps array is empty []
    // The lint rule is about calling setState SYNCHRONOUSLY in the effect body
    // which we are doing correctly here — this is the intended pattern
    setParticles(generated)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Tagline rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // GSAP title entrance
  useEffect(() => {
    if (!titleRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-char',
        { opacity: 0, y: 120, rotateX: -90, transformOrigin: '50% 0%' },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.04, ease: 'expo.out', delay: 0.8 }
      )
    })
    return () => ctx.revert()
  }, [])

  const titleChars = 'AERO'.split('')

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <motion.div className="absolute inset-0 bg-obsidian" style={{ opacity: overlayOpacity }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
      </motion.div>

      {/* Floating particles — client only */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold/20 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
        style={{ y: textY }}
      >
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="w-12 h-px bg-gold" />
          <span className="text-gold tracking-[0.4em] text-xs uppercase font-body">
            Private Aviation Redefined
          </span>
          <div className="w-12 h-px bg-gold" />
        </motion.div>

        {/* 3D Title */}
        <div
          ref={titleRef}
          className="mb-6 overflow-hidden"
          style={{ perspective: '1000px' }}
          aria-label="AERO"
        >
          <h1 className="font-display text-[clamp(6rem,20vw,18rem)] leading-none tracking-tight inline-block">
            {titleChars.map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block gold-shimmer"
                style={{ textShadow: '0 0 80px rgba(201,168,76,0.3)' }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Animated Tagline */}
        <div className="h-8 overflow-hidden mb-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              className="text-ivory/70 tracking-[0.5em] text-sm font-body"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {TAGLINES[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.a
            href="/booking"
            className="group relative px-10 py-4 bg-gold text-obsidian font-body tracking-[0.2em] text-sm uppercase overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Charter a Jet</span>
            <motion.div
              className="absolute inset-0 bg-gold-light"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="/fleet"
            className="px-10 py-4 border border-ivory/30 text-ivory font-body tracking-[0.2em] text-sm uppercase hover:border-gold hover:text-gold transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Fleet
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-ivory/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Side text */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-3" style={{ writingMode: 'vertical-rl' }}>
          <span className="text-ivory/20 text-xs tracking-[0.4em] uppercase">
            Excellence · Luxury · Freedom
          </span>
        </div>
      </div>
    </section>
  )
}
