import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu as MenuIcon, X, Moon, Sun } from 'lucide-react'
import MagneticButton from './MagneticButton'
import RatsLogo from './RatsLogo'

export default function Navbar({ toggleMenu, isOpen, isDarkMode, toggleTheme, onReservasi, onHome }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navBg = isDarkMode 
    ? (scrolled ? 'bg-brand-black/80 backdrop-blur-md' : 'bg-transparent')
    : (scrolled ? 'bg-brand-white/80 backdrop-blur-md' : 'bg-transparent')

  const textColor = isDarkMode ? 'text-white' : 'text-brand-black'

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-3 md:px-12 ${navBg} ${textColor} ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">
        {/* Logo - SIZED DOWN */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <div onClick={onHome} className="cursor-pointer">
            <RatsLogo isDarkMode={isDarkMode} className="w-16 h-16 md:w-24 md:h-24" />
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Theme Toggle */}
          <MagneticButton>
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/10' : 'border-brand-black/10 hover:bg-brand-black/5'}`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </MagneticButton>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden md:block"
          >
            <MagneticButton>
              <button className="text-[9px] font-bold tracking-[0.2em] uppercase hover:text-brand-pink transition-colors">
                PS5 Rental Semarang
              </button>
            </MagneticButton>
          </motion.div>

          <MagneticButton>
            <button 
              onClick={toggleMenu}
              className={`group flex items-center gap-2 border px-5 py-2.5 rounded-full transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-brand-black/5 border-brand-black/10 hover:bg-brand-black/10'}`}
            >
              <span className="text-[9px] font-bold uppercase tracking-widest">
                {isOpen ? 'Close' : 'Menu'}
              </span>
              <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X size={14} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <MenuIcon size={14} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </MagneticButton>
          
          <div className="hidden lg:block">
            <MagneticButton>
              <button 
                onClick={onReservasi}
                className={`${isDarkMode ? 'bg-brand-blue' : 'bg-brand-pink'} text-white px-6 py-2.5 rounded-full font-bold uppercase text-[9px] tracking-widest hover:scale-105 transition-transform shadow-lg ${isDarkMode ? 'shadow-brand-blue/20' : 'shadow-brand-pink/20'}`}
              >
                Reservasi
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </nav>
  )
}
