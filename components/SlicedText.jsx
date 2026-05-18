import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+'

export default function SlicedText({ text, className, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  useEffect(() => {
    let iteration = 0
    let interval = null

    const startScramble = () => {
        setIsScrambling(true)
        interval = setInterval(() => {
            setDisplayText(prev => 
                text.split('').map((char, index) => {
                    if (index < iteration) return text[index]
                    return chars[Math.floor(Math.random() * chars.length)]
                }).join('')
            )

            if (iteration >= text.length) {
                clearInterval(interval)
                setIsScrambling(false)
            }
            iteration += 1 / 3
        }, 30)
    }

    const timer = setTimeout(startScramble, (delay * 1000) + 600)
    return () => {
        clearInterval(interval)
        clearTimeout(timer)
    }
  }, [text, delay])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ 
            clipPath: 'inset(0 100% 0 0)',
            skewX: 15,
            x: -20
        }}
        animate={{ 
            clipPath: 'inset(0 0% 0 0)',
            skewX: 0,
            x: 0
        }}
        transition={{ 
            duration: 1, 
            delay: delay + 0.6, 
            ease: [0.76, 0, 0.24, 1] 
        }}
      >
        {displayText}
      </motion.div>
      
      {/* Decorative Scanline during reveal */}
      <motion.div
        initial={{ left: '0%' }}
        animate={{ left: '100%' }}
        transition={{ duration: 1, delay: delay + 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 bottom-0 w-1 bg-brand-blue z-10"
      />
    </div>
  )
}
