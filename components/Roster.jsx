import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, ChevronDown } from 'lucide-react'

const consoles = [
  {
    id: 1,
    name: "VVIP ROOM",
    desc: "PS 5 30th Anniversary + Nintendo Switch OLED + Netflix",
    image: "/images/VVIPRoom.jpg",
    price: "35k / Hour"
  },
  {
    id: 2,
    name: "Racing Simulator",
    desc: "Playseat Rig F1 + Thrustmaster T300RS + PS 5 Pro",
    image: "/images/RuangBalap.jpg",
    price: "30k / Hour"
  },
  {
    id: 3,
    name: "VIP PS4 PRO",
    desc: "Private Room + Nintendo Switch OLED + Netflix",
    image: "/images/RoomBiasa.jpg",
    price: "25k / Hour"
  }
]

// Branch data with their Google Sheets game list URLs
const branches = [
  {
    id: 'simongan',
    label: '#01 Simongan',
    color: 'from-red-600 to-rose-800',
    accentColor: 'text-red-500',
    borderColor: 'border-red-500/40',
    bgHover: 'hover:bg-red-500/10',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1D1zy58SJ9Rh14kHkxLNjz5SuJISVNHz9RchuirsbHQo/edit?gid=0#gid=0',
  },
  {
    id: 'tembalang',
    label: '#02 Tembalang',
    color: 'from-blue-600 to-indigo-800',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    bgHover: 'hover:bg-blue-500/10',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1MswXT4ZZUMFuF4TLWW28QY1Da9ir6fwV6RvfuEGvS3o/edit?gid=1386386638#gid=1386386638',
  },
  {
    id: 'chapter03',
    label: 'Chapter 03',
    color: 'from-purple-600 to-violet-800',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    bgHover: 'hover:bg-purple-500/10',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1iQQjHSGBPwf2mvz9TZ50TzrIB6ImfOiAmwXYV97h_vU/edit?gid=0#gid=0',
  },
  {
    id: 'chapter05',
    label: 'Chapter 05',
    color: 'from-emerald-600 to-teal-800',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgHover: 'hover:bg-emerald-500/10',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/13DjiPlT1oDgr96lBYUjdbGwIWyHuV4e4/edit?gid=379377895#gid=379377895',
  },
]

function GameListSection({ isDarkMode }) {
  return (
    <div id="games" className="mt-20 mb-8">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-start gap-3 mb-10"
      >
        <p className="text-brand-pink font-mono text-xs uppercase tracking-[0.4em]">
          Game Library
        </p>
        <h3 className={`text-4xl md:text-5xl font-display font-medium uppercase tracking-tightest leading-none ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
          LIST GAME{' '}
          <span className={isDarkMode ? 'text-white/20' : 'text-brand-black/20'}>
            PER CABANG
          </span>
        </h3>
        <p className={`text-sm font-light max-w-md leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-brand-black/50'}`}>
          Jelajahi semua game yang tersedia di seluruh cabang RATS Game dengan filter cabang interaktif bergaya PS5.
        </p>
      </motion.div>

      {/* Single CTA Card → /games */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={`rounded-3xl border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} p-5 sm:p-8 flex flex-col gap-5`}>
          <div>
            <span className="block text-xs font-bold uppercase tracking-[0.3em] mb-2 text-brand-pink">
              Global Catalog
            </span>
            <h4 className={`text-2xl font-black uppercase tracking-tightest mb-1 ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
              Lihat Semua Game
            </h4>
            <p className={`text-sm ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
              Filter game berdasarkan cabang. UI interaktif bergaya PS5 — temukan game impianmu.
            </p>
          </div>
          <Link
            href="/games"
            className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold uppercase text-sm tracking-widest transition-all duration-300 bg-gradient-to-r from-brand-pink to-red-600 text-white hover:scale-105 shadow-xl shadow-brand-pink/30"
          >
            Buka Game Catalog
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function Roster({ isDarkMode, onReservasi }) {
  if (!consoles || !Array.isArray(consoles)) return null

  return (
    <section id="roster" className={`py-24 px-6 md:px-12 max-w-[1800px] mx-auto overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-brand-black' : 'bg-brand-white'}`}>
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-brand-pink font-mono text-xs uppercase tracking-[0.4em] mb-4"
          >
            Price List Chapter 03
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`text-6xl md:text-8xl font-display font-medium uppercase tracking-tightest leading-none ${isDarkMode ? 'text-white' : 'text-brand-black'}`}
          >
            SELECT YOUR <br />
            <span className={isDarkMode ? 'text-white/20' : 'text-brand-black/20'}>EQUIPMENT</span>
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`${isDarkMode ? 'text-white/40' : 'text-brand-black/40'} text-sm uppercase tracking-widest max-w-[200px]`}
        >
          High performance guaranteed. All consoles are sanitized and updated regularly.
        </motion.div>
      </div>

      {/* Console cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {consoles.map((item, i) => (
          <motion.div
            key={item.id || i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.2 }}
            className="group cursor-pointer"
          >
            <a href={process.env.NEXT_PUBLIC_BOOKING_URL || 'https://ratsgame.demo-weatso.my.id/booking'} className="block">
            <div className={`relative aspect-[16/10] overflow-hidden rounded-sm mb-8 ${isDarkMode ? 'bg-white/5' : 'bg-brand-black/5'}`}>
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45 group-hover:rotate-0 shadow-xl">
                <ArrowUpRight size={24} />
              </div>
              <div className="absolute bottom-6 left-6 flex flex-col items-start gap-1">
                <span className="bg-brand-pink text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                  Ready to Play
                </span>
              </div>
            </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-3xl md:text-4xl font-display font-medium uppercase tracking-tightest mb-2 group-hover:text-brand-pink transition-colors ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                    {item.name}
                  </h3>
                  <p className={`${isDarkMode ? 'text-white/40' : 'text-brand-black/60'} font-light max-w-xs`}>{item.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-display text-brand-pink">{item.price}</span>
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Game List per Branch */}
      <GameListSection isDarkMode={isDarkMode} />

      <div className="h-32 md:h-64" />
    </section>
  )
}