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
              <a 
                href="https://wa.me/6282260801616?text=Halo%20RATS%20GAME%2C%20saya%20ingin%20bertanya%20tentang%20reservasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-full font-bold uppercase text-[9px] tracking-widest transition-all hover:scale-105"
              >
                {/* WhatsApp SVG Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hubungi WA
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </nav>
  )
}
