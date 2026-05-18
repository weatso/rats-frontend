import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Gamepad2 } from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function Menu({ isOpen, toggleMenu, isDarkMode, onReservasi, onAbout, onBackToHome }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const menuItems = [
    { title: "Home", action: onBackToHome },
    { title: "Consoles", action: () => { toggleMenu(); window.location.hash = "roster" } },
    { title: "About Us", action: onAbout },
  ]

  const containerVars = {
    initial: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
    animate: { 
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: { 
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  }

  const linkVars = {
    initial: { y: "100%" },
    animate: (i) => ({ 
      y: 0,
      transition: { delay: 0.4 + (i * 0.1), duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }),
    exit: (i) => ({ 
      y: "100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    })
  }

  const bgColor = isDarkMode ? 'bg-brand-blue' : 'bg-brand-pink'
  const textColor = isDarkMode ? 'text-white' : 'text-brand-black'
  
  const accentTextOpacity = isDarkMode ? 'opacity-[0.03]' : 'opacity-[0.05]'

  return (
    <motion.div
      variants={containerVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`fixed inset-0 z-[100] ${bgColor} ${textColor} flex flex-col justify-center items-center overflow-hidden transition-colors duration-500`}
    >
      {/* Back Button (Top Right) */}
      <div className="absolute top-10 right-10 z-[110]">
        <MagneticButton>
          <button 
            onClick={toggleMenu}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-brand-black/20 hover:bg-brand-black/10'}`}
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </MagneticButton>
      </div>

      {/* Floating 3D Element Decoration */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotateY: [0, 360],
            rotateX: [10, -10, 10],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className={`relative ${isDarkMode ? 'text-white/10' : 'text-brand-black/10'}`}
          style={{ perspective: 1000 }}
        >
           <Gamepad2 size={600} strokeWidth={0.5} />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-10 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col gap-2">
          {menuItems.map((item, i) => (
            <div 
                key={item.title} 
                className="overflow-hidden relative"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.button
                onClick={() => {
                    item.action()
                    toggleMenu()
                }}
                custom={i}
                variants={linkVars}
                className={`relative block text-[15vw] md:text-8xl lg:text-[9vw] font-display uppercase tracking-tightest origin-left transition-all leading-[0.9] pb-2 text-left ${hoveredIndex === i ? 'pl-8' : 'pl-0'}`}
              >
                {item.title}
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: hoveredIndex === i ? '100%' : 0 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    className={`absolute bottom-2 left-0 h-1 md:h-2 ${isDarkMode ? 'bg-white' : 'bg-brand-black'} rounded-full`}
                />
              </motion.button>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-0 flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
          <div className="text-left md:text-right w-full md:w-auto">
            <p className="opacity-50 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">Location</p>
            <p className="text-xl font-medium">Semarang, Indonesia</p>
          </div>
          
          <MagneticButton>
            <button 
                onClick={() => {
                    toggleMenu()
                    onReservasi()
                }}
                className={`mt-4 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-2xl ${isDarkMode ? 'bg-white text-brand-blue hover:bg-brand-pink hover:text-white' : 'bg-brand-black text-white hover:bg-brand-blue'}`}
            >
              Reservasi
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Socials at bottom */}
      <div className="absolute bottom-10 w-full px-10 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold opacity-60">
        <div className="flex gap-8">
          <a href="https://www.instagram.com/ratsgame.id/" target="_blank" rel="noopener noreferrer" className={`hover:opacity-100 transition-opacity ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>Instagram</a>
          <a href="https://www.tiktok.com/@rats.game" target="_blank" rel="noopener noreferrer" className={`hover:opacity-100 transition-opacity ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>TikTok</a>
        </div>
        <p>© 2026 RATS GAME</p>
      </div>
    </motion.div>
  )
}
