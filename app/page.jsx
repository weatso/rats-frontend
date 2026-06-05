"use client";

import React, { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Menu from '../components/Menu'
import Roster from '../components/Roster'
import Footer from '../components/Footer'
import AboutPage from '../pages/AboutPage'
import SmoothScroll from '../components/SmoothScroll'

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://ratsgame.demo-weatso.my.id/booking'

// A dynamic Marquee component that reacts to Dark/Light mode
const Marquee = ({ text, isDarkMode }) => {
  const bgClass = isDarkMode ? 'bg-brand-black' : 'bg-brand-white'
  const textClass = isDarkMode ? 'text-brand-blue/20' : 'text-brand-pink/20'
  const borderClass = isDarkMode ? 'border-brand-blue/20' : 'border-brand-pink/20'

  return (
    <div className={`py-12 md:py-20 overflow-hidden whitespace-nowrap border-y transition-colors duration-700 flex ${bgClass} ${borderClass}`}>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        className="flex gap-12 md:gap-20 items-center pr-20"
      >
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className={`text-6xl md:text-[10vw] font-display font-medium uppercase tracking-tightest transition-colors duration-700 ${textClass}`}
          >
            {text}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

function App() {
  const [view, setView] = useState('home') // 'home', 'about'
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  React.useEffect(() => {
    const saved = localStorage.getItem('rats_theme')
    if (saved) setIsDarkMode(saved === 'dark')
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('rats_theme', newTheme ? 'dark' : 'light')
  }

  // Hard-redirect to the Laravel booking page — no longer handled in React
  const goToReservasi = () => {
    window.location.href = BOOKING_URL
  }

  const goToAbout = () => {
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
    setView('about')
  }

  const backToHome = () => {
    setView('home')
    window.scrollTo(0, 0)
  }

  if (view === 'about') {
    return (
      <Suspense fallback={<div className="h-screen w-full bg-brand-black flex items-center justify-center text-white font-display">Loading Story...</div>}>
        <div className="noise-overlay" />
        <AboutPage onBackToHome={backToHome} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </Suspense>
    )
  }

  return (
    <SmoothScroll>
      <div suppressHydrationWarning className={`relative min-h-screen ${isDarkMode ? 'bg-brand-black text-white' : 'bg-brand-white text-brand-black'}`}>
        <div className="noise-overlay" />

        <Navbar
          toggleMenu={toggleMenu}
          isOpen={isMenuOpen}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onReservasi={goToReservasi}
          onAbout={goToAbout}
        />

        <AnimatePresence>
          {isMenuOpen && (
            <Menu
              toggleMenu={toggleMenu}
              isDarkMode={isDarkMode}
              onReservasi={goToReservasi}
              onAbout={goToAbout}
              onBackToHome={backToHome}
            />
          )}
        </AnimatePresence>

        <main>
          <Hero isDarkMode={isDarkMode} onReservasi={goToReservasi} />

          <Marquee text="RATS ALWAYS LOVES YOU" isDarkMode={isDarkMode} />

          {/* About Section with Reveal */}
          <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto transition-colors duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h3 className="text-brand-pink font-mono text-sm uppercase tracking-[0.4em] mb-6">Our Philosophy</h3>
                <h2 className={`text-5xl md:text-7xl font-display font-medium uppercase tracking-tightest leading-none mb-8 ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                  WE BELIEVE GAMING IS <span className={isDarkMode ? 'text-white/20' : 'text-brand-black/10'}>MORE THAN A HOBBY.</span>
                </h2>
                <p className={`text-xl font-light opacity-60 leading-relaxed mb-8 ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                  It's an immersive escape, a competitive arena, and a shared memory. RATS Game brings premium hardware to your doorstep, crafted for those who demand excellence.
                </p>
                <button
                  onClick={goToAbout}
                  className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-brand-pink transition-colors"
                >
                  Learn our full story <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                className={`aspect-square bg-gradient-to-br from-brand-pink/20 to-brand-blue/20 rounded-3xl overflow-hidden border ${isDarkMode ? 'border-white/5' : 'border-brand-black/5'}`}
              >
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                  alt="Gaming Setup"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </motion.div>
            </div>
          </section>

          <Roster isDarkMode={isDarkMode} onReservasi={goToReservasi} />

          <section className="py-20">
            <div className="flex flex-col items-center justify-center text-center px-6">
              <h3 className={`text-4xl md:text-6xl font-display font-medium uppercase tracking-tightest mb-12 ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                Follow the <span className={isDarkMode ? 'text-brand-blue' : 'text-brand-pink'}>Vibe</span>
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12 text-sm font-bold uppercase tracking-widest">
                <a href="https://www.instagram.com/ratsgame.id/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">Instagram</a>
                <a href="https://www.tiktok.com/@rats.game" target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">TikTok</a>
              </div>
            </div>
          </section>
        </main>

        <Footer isDarkMode={isDarkMode} onReservasi={goToReservasi} onAbout={goToAbout} onHome={backToHome} />
      </div>
    </SmoothScroll>
  )
}

// Small helper for the arrow in about section
const ArrowRight = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.25 4.5L15.75 9L11.25 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.25 9H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default App