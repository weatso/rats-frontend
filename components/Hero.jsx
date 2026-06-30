import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import MagneticButton from './MagneticButton'

export default function Hero({ isDarkMode, onReservasi }) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set((clientX / innerWidth - 0.5) * 50)
      mouseY.set((clientY / innerHeight - 0.5) * 50)
      setMousePos({ x: clientX, y: clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const rotateX = useTransform(mouseX, [-25, 25], [-1, 1])

  const gradientClass = isDarkMode
    ? 'bg-gradient-to-b from-brand-black/20 via-brand-black/60 to-brand-black'
    : 'bg-gradient-to-b from-white/10 via-white/40 to-white'

  const accentColor = isDarkMode ? 'text-brand-blue' : 'text-brand-pink'
  const mainTextColor = isDarkMode ? 'text-white' : 'text-brand-black'
  const radialColor = isDarkMode
    ? 'rgba(45, 91, 255, 0.15)'
    : 'rgba(244, 52, 161, 0.15)'

  return (
    <section
      ref={containerRef}
      className={`relative h-screen w-full flex items-center justify-center overflow-hidden pt-20 transition-colors duration-500 ${
        isDarkMode ? 'bg-brand-black' : 'bg-brand-white'
      }`}
    >
      {/* Background Interactive Light */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none opacity-40 blur-[120px]"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, ${radialColor}, transparent)`,
        }}
      />

      {/* Background Image Parallax */}
      <motion.div
        style={{ y, scale, x: mouseX, rotate: rotateX }}
        className="absolute inset-0 z-0"
      >
        <div
          className={`absolute inset-0 z-10 transition-colors duration-700 ${gradientClass}`}
        />
        <Image
          src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop"
          alt="Premium PS5 Gaming Setup"
          fill
          className={`object-cover transition-all duration-700 ${
            isDarkMode
              ? 'brightness-[0.3] saturate-[0.5]'
              : 'brightness-110 saturate-[0.8]'
          }`}
          quality={80}
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1800px] px-6 md:px-12 flex flex-col items-center text-center">
        {/* LEVEL UP */}
        <div className="overflow-visible mb-2">
          <div className="overflow-hidden px-4 -mx-4 pt-16 -mt-16 pb-4">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              className={`text-[15vw] lg:text-[180px] font-display font-medium uppercase leading-none tracking-tightest ${mainTextColor}`}
            >
              LEVEL{' '}
              <span className={`${accentColor} italic inline-block pr-4`}>
                UP.
              </span>
            </motion.h1>
          </div>
        </div>

        {/* RATS GAME */}
        <div className="overflow-hidden mb-12 pt-16 -mt-16 pb-4">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
            className={`text-[15vw] lg:text-[180px] font-display font-medium uppercase leading-none tracking-tightest ${mainTextColor}`}
          >
            RATS GAME
          </motion.h1>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          <p
            className={`max-w-2xl text-xl md:text-4xl font-display uppercase tracking-widest ${
              isDarkMode ? 'text-brand-blue/60' : 'text-brand-pink/70'
            }`}
          >
            RATS ALWAYS LOVES YOU
          </p>

          {/* Redirects to Laravel booking page */}
          <MagneticButton>
            <a
              href={process.env.NEXT_PUBLIC_BOOKING_URL || 'https://ratsgame.demo-weatso.my.id/booking'}
              className={`inline-block px-12 py-5 rounded-full font-bold uppercase text-sm tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-xl ${
                isDarkMode
                  ? 'bg-brand-blue text-white hover:bg-white hover:text-brand-black'
                  : 'bg-brand-black text-white hover:bg-brand-pink'
              }`}
            >
              Reservasi Sekarang
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className={`absolute bottom-10 left-12 hidden md:flex items-center gap-4 text-xs uppercase tracking-[0.3em] ${
          isDarkMode ? 'text-brand-blue/30' : 'text-brand-pink/30'
        }`}
      >
        <div
          className={`w-px h-12 relative overflow-hidden ${
            isDarkMode ? 'bg-brand-blue/20' : 'bg-brand-pink/20'
          }`}
        >
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className={`absolute inset-0 ${
              isDarkMode ? 'bg-brand-blue' : 'bg-brand-pink'
            }`}
          />
        </div>
        <span>Scroll to Explore</span>
      </motion.div>
    </section>
  )
}
