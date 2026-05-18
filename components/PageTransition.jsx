import React from 'react'
import { motion } from 'framer-motion'

const wallVariants = {
  initial: {
    top: "100vh"
  },
  animate: {
    top: "-100vh",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    top: "0vh",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function PageTransition({ children }) {
  const wallColor = "#1933c8" // RATS Deep Blue

  return (
    <div className="relative w-full overflow-hidden">
      {/* THE ELEGANT SOLID WIPE */}
      <motion.div
        variants={wallVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 z-[300] w-full h-full pointer-events-none"
        style={{ backgroundColor: wallColor }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
