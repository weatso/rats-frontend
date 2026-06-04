import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// PERBAIKAN: Baris import LogoPink dan LogoBiru dihapus dari sini.

export default function RatsLogo({ className = "w-12 h-12", isDarkMode = true }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mencegah Hydration Mismatch: Jangan render logo yang bergantung pada tema
  // sampai komponen benar-benar di-mount di sisi client (browser).
  if (!mounted) {
    return <div className={`${className} relative flex items-center justify-center opacity-0`} />
  }

  // PERBAIKAN: Langsung gunakan jalur string yang mengarah ke folder public/assets
  // Mapping sesuai permintaan: Dark -> Biru, Light -> Pink
  const currentLogo = isDarkMode ? '/assets/LogoBiru.svg' : '/assets/LogoPink.svg'

  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={isDarkMode ? 'dark' : 'light'}
          src={currentLogo}
          alt="RATS Logo"
          className="w-full h-full object-contain"
          
          // Efek Thanos Snap / Disintegration
          initial={{ 
            opacity: 0, 
            scale: 1.2, 
            filter: 'blur(10px) brightness(2)',
            clipPath: 'inset(0% 0% 100% 0%)' 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: 'blur(0px) brightness(1)',
            clipPath: 'inset(0% 0% 0% 0%)' 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8, 
            filter: 'blur(15px) grayscale(1) brightness(0.5)',
            transition: { duration: 0.8, ease: "easeInOut" },
            // Simulasi hancur menyamping
            x: [0, 10, -10, 20],
            y: [0, -5, -10, -20]
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.43, 0.13, 0.23, 0.96] 
          }}
        />
      </AnimatePresence>

      {/* Efek Debu Tambahan (Optional Particles) */}
      <AnimatePresence>
        {!isDarkMode && (
           <motion.div 
             initial={{ opacity: 0 }}
             exit={{ opacity: [0, 1, 0], scale: [1, 2], x: 20, y: -20 }}
             className="absolute inset-0 bg-brand-pink/20 rounded-full blur-2xl pointer-events-none"
           />
        )}
      </AnimatePresence>
    </div>
  )
}