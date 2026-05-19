import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Gamepad2 } from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function Menu({ isOpen, toggleMenu, isDarkMode, onReservasi, onAbout, onBackToHome }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // ── Five uniform giant nav items ──────────────────────────────────────────
  const menuItems = [
    {
      title: 'Home',
      action: () => { onBackToHome(); toggleMenu() },
    },
    {
      title: 'Consoles',
      action: () => {
        toggleMenu()
        setTimeout(() => {
          document.getElementById('roster')?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      },
    },
    {
      title: 'About Us',
      action: () => { onAbout(); toggleMenu() },
    },
    {
      title: 'List Games',
      action: () => {
        toggleMenu()
        setTimeout(() => {
          document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })
        }, 350)
      },
    },
    {
      title: 'F&B Menu',
      href: '/menu', // Navigate to dedicated F&B page
      action: () => {
        window.open('/menu', '_self')
        toggleMenu()
      },
    },
  ]

  const containerVars = {
    initial: { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
    animate: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const linkVars = {
    initial: { y: '100%' },
    animate: (i) => ({
      y: 0,
      transition: {
        delay: 0.35 + i * 0.08,
        duration: 0.75,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    exit: () => ({
      y: '100%',
      transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
    }),
  }

  const bgColor = isDarkMode ? 'bg-brand-blue' : 'bg-brand-pink'
  const textColor = isDarkMode ? 'text-white' : 'text-brand-black'
  const underlineColor = isDarkMode ? 'bg-white' : 'bg-brand-black'

  return (
    <motion.div
      variants={containerVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`fixed inset-0 z-[100] ${bgColor} ${textColor} flex flex-col overflow-hidden transition-colors duration-500`}
    >
      {/* Back Button */}
      <div className="absolute top-8 right-8 z-[110]">
        <MagneticButton>
          <button
            onClick={toggleMenu}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${
              isDarkMode
                ? 'border-white/20 hover:bg-white/10'
                : 'border-brand-black/20 hover:bg-brand-black/10'
            }`}
          >
            <ArrowLeft size={13} />
            Back
          </button>
        </MagneticButton>
      </div>

      {/* Floating Gamepad Decoration */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotateY: [0, 360], rotateX: [10, -10, 10], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className={`${isDarkMode ? 'text-white/10' : 'text-brand-black/10'}`}
          style={{ perspective: 1000 }}
        >
          <Gamepad2 size={560} strokeWidth={0.5} />
        </motion.div>
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start h-full px-8 md:px-14 pt-24 pb-20">

        {/* ── Left: Nav Items ─────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center h-full gap-0 max-w-[65%]">
          {menuItems.map((item, i) => (
            <div
              key={item.title}
              className="overflow-hidden"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative">
                <motion.button
                  onClick={item.action}
                  custom={i}
                  variants={linkVars}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`
                    relative block w-full text-left font-display uppercase tracking-tightest leading-none
                    text-5xl sm:text-6xl md:text-7xl lg:text-[7vw] xl:text-[7.5vw]
                    pb-3 transition-all duration-300
                    ${hoveredIndex === i ? 'pl-5 opacity-100' : 'pl-0 opacity-90 hover:opacity-100'}
                  `}
                >
                  {item.title}
                </motion.button>

                {/* Uniform underline — IDENTICAL on all 5 items */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIndex === i ? '100%' : 0 }}
                  transition={{ duration: 0.38, ease: [0.33, 1, 0.68, 1] }}
                  className={`absolute bottom-3 left-0 h-[3px] md:h-1 ${underlineColor} rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: Meta + CTA ───────────────────────────────────────────── */}
        <div className="flex flex-col items-start md:items-end justify-center h-full gap-6 shrink-0 mt-8 md:mt-0">
          <div className="text-left md:text-right">
            <p className="opacity-50 text-[10px] uppercase tracking-[0.3em] mb-1 font-bold">
              Location
            </p>
            <p className="text-lg font-medium">Semarang, Indonesia</p>
          </div>

          <MagneticButton>
            <button
              onClick={() => {
                toggleMenu()
                onReservasi()
              }}
              className={`px-9 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all shadow-2xl hover:scale-105 ${
                isDarkMode
                  ? 'bg-white text-brand-blue hover:bg-brand-pink hover:text-white'
                  : 'bg-brand-black text-white hover:bg-brand-blue hover:text-white'
              }`}
            >
              Reservasi Sekarang
            </button>
          </MagneticButton>

          <div className="text-left md:text-right opacity-50">
            <p className="text-[10px] uppercase tracking-[0.25em] font-bold mb-2">Follow Us</p>
            <div className="flex md:flex-col gap-3 text-[10px] font-bold uppercase tracking-widest">
              <a
                href="https://www.instagram.com/ratsgame.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 hover:underline transition-all"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@rats.game"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 hover:underline transition-all"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-8 text-[10px] uppercase tracking-widest font-bold opacity-40 z-10">
        © 2026 RATS GAME — All Rights Reserved
      </div>
    </motion.div>
  )
}
