'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const API_BASE = process.env.NEXT_PUBLIC_API_URL

// ─── F&B Data ────────────────────────────────────────────────────────────────
const fnbCategories = [
  {
    key: 'snack',
    emoji: '🍿',
    label: 'Makanan Ringan',
    accent: 'from-amber-500 to-orange-600',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-500/30',
    accentBg: 'bg-amber-500/10',
    items: [
      { name: 'French Fries', price: 'Rp 15.000', desc: 'Crispy golden fries' },
      { name: 'Kentang Goreng Keju', price: 'Rp 18.000', desc: 'Extra melted cheese' },
      { name: 'Cireng Bumbu Rujak', price: 'Rp 12.000', desc: 'Spicy tamarind sauce' },
      { name: 'Sosis Bakar', price: 'Rp 13.000', desc: 'Grilled beef sausage' },
      { name: 'Popcorn Caramel', price: 'Rp 10.000', desc: 'Sweet & crunchy' },
      { name: 'Indomie Goreng', price: 'Rp 12.000', desc: 'Indonesian classic' },
      { name: 'Keripik Singkong', price: 'Rp 8.000', desc: 'Cassava chips' },
    ],
  },
  {
    key: 'drink',
    emoji: '🥤',
    label: 'Minuman',
    accent: 'from-sky-500 to-blue-600',
    accentText: 'text-sky-400',
    accentBorder: 'border-sky-500/30',
    accentBg: 'bg-sky-500/10',
    items: [
      { name: 'Es Teh Manis', price: 'Rp 5.000', desc: 'Sweet iced tea' },
      { name: 'Es Jeruk', price: 'Rp 8.000', desc: 'Fresh orange juice' },
      { name: 'Kopi Hitam', price: 'Rp 8.000', desc: 'Strong black coffee' },
      { name: 'Kopi Susu', price: 'Rp 12.000', desc: 'Milk coffee' },
      { name: 'Matcha Latte', price: 'Rp 15.000', desc: 'Premium Japanese matcha' },
      { name: 'Jus Alpukat', price: 'Rp 15.000', desc: 'Avocado blend' },
      { name: 'Milkshake Coklat', price: 'Rp 18.000', desc: 'Thick chocolate shake' },
      { name: 'Aqua 600ml', price: 'Rp 5.000', desc: 'Mineral water' },
    ],
  },
  {
    key: 'heavy',
    emoji: '🍽️',
    label: 'Makanan Berat',
    accent: 'from-rose-500 to-red-700',
    accentText: 'text-rose-400',
    accentBorder: 'border-rose-500/30',
    accentBg: 'bg-rose-500/10',
    items: [
      { name: 'Nasi Goreng Spesial', price: 'Rp 22.000', desc: 'Fried rice special' },
      { name: 'Mie Goreng Seafood', price: 'Rp 22.000', desc: 'Seafood noodles' },
      { name: 'Nasi Ayam Geprek', price: 'Rp 20.000', desc: 'Smashed spicy chicken' },
      { name: 'Burger Beef Double', price: 'Rp 25.000', desc: 'Double beef patty' },
      { name: 'Hot Dog Jumbo', price: 'Rp 18.000', desc: 'Jumbo grilled hot dog' },
      { name: 'Sandwich Club', price: 'Rp 20.000', desc: 'Triple layer club' },
      { name: 'Rice Box Ayam Bakar', price: 'Rp 23.000', desc: 'Grilled chicken rice box' },
    ],
  },
]

// ─── Category Card ─────────────────────────────────────────────────────────────
function CategorySection({ cat, index, isDarkMode, hoverAccent }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div className={`rounded-3xl border overflow-hidden ${cat.accentBorder} ${isDarkMode ? 'bg-white/[0.03]' : 'bg-black/[0.03]'}`} >
      {/* Header */}
      <button
        onClick={() => setOpen(p => !p)}
        className={`w-full flex items-center justify-between px-7 py-6 transition-all duration-300 ${open ? cat.accentBg : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5')}`}
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{cat.emoji}</span>
          <div className="text-left">
            <p className={`text-xs font-bold uppercase tracking-[0.3em] ${cat.accentText} mb-0.5`}>
              Kategori
            </p>
            <h3 className="text-xl font-black uppercase tracking-tight">
              {cat.label}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-sm font-bold ${cat.accentText}`}>
            {cat.items.length} Items
          </span>
          <ChevronDown
            size={20}
            className={`transition-transform duration-400 ${open ? 'rotate-180 ' + cat.accentText : (isDarkMode ? 'text-white/30' : 'text-black/30')}`}
          />
        </div>
      </button>

      {/* Item list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
              {cat.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`px-6 py-5 border-b transition-colors duration-200 group ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-black/5 hover:bg-black/5'}`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h4 className={`text-base font-bold transition-colors leading-tight mb-1 ${hoverAccent}`}>
                        {item.name}
                      </h4>
                      <p className={`text-xs font-light ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>{item.desc}</p>
                    </div>
                    <p className={`text-lg font-black font-mono mt-3 ${cat.accentText}`}>
                      {item.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FnbMenuPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rats_theme')
      if (saved) return saved === 'dark'
    }
    return true
  })

  useEffect(() => {
    const saved = localStorage.getItem('rats_theme')
    if (saved) setIsDarkMode(saved === 'dark')
  }, [])

  const hoverAccent = isDarkMode ? 'group-hover:text-brand-blue' : 'group-hover:text-brand-pink'
  const accentText = isDarkMode ? 'text-brand-blue' : 'text-brand-pink'
  const accentBg = isDarkMode ? 'bg-brand-blue' : 'bg-brand-pink'
  const accentShadow = isDarkMode ? 'shadow-brand-blue/20' : 'shadow-brand-pink/20'

  return (
    <div suppressHydrationWarning className={`min-h-screen ${isDarkMode ? 'bg-brand-black text-white' : 'bg-brand-white text-brand-black'}`}>
      {/* Background noise texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Ambient glow */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] pointer-events-none z-0 ${isDarkMode ? 'bg-brand-blue/5' : 'bg-brand-pink/5'}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">

        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <Link
            href="/"
            className={`group flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'}`}
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to Home
          </Link>

          <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${isDarkMode ? 'text-white/20' : 'text-black/20'}`}>
            RATS GAME — Menu
          </span>
        </div>

        {/* Hero text */}
        <div className="mb-16">
          <p className={`${accentText} font-mono text-xs uppercase tracking-[0.4em] mb-5 transition-colors duration-700`}>
            Food & Beverages
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-display font-black uppercase tracking-tightest leading-none">
            OUR{' '}
            <span className={`transition-colors duration-700 ${isDarkMode ? 'text-white/15' : 'text-black/15'}`}>MENU</span>
          </h1>
          <p className={`text-lg font-light mt-6 max-w-xl leading-relaxed transition-colors duration-700 ${isDarkMode ? 'text-white/40' : 'text-black/60'}`}>
            Nikmati berbagai pilihan makanan dan minuman premium selama sesi gaming Anda. Semua tersedia untuk dipesan langsung di meja Anda.
          </p>
        </div>

        {/* Category sections */}
        <div className="flex flex-col gap-4">
          {fnbCategories.map((cat, i) => (
            <CategorySection key={cat.key} cat={cat} index={i} isDarkMode={isDarkMode} hoverAccent={hoverAccent} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className={`mt-20 py-16 border-t flex flex-col md:flex-row items-center justify-between gap-8 ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tightest mb-2">
              Siap Gaming?
            </h3>
            <p className={`text-sm transition-colors duration-700 ${isDarkMode ? 'text-white/40' : 'text-black/60'}`}>
              Buat reservasi sekarang dan nikmati menu di atas sambil main!
            </p>
          </div>
          <a
            href={`${API_BASE}/admin/live-lobby`}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-10 py-5 rounded-full text-white font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-2xl whitespace-nowrap ${accentBg} ${accentShadow}`}
          >
            Reservasi Sekarang →
          </a>
        </div>
      </div>
    </div>
  )
}
