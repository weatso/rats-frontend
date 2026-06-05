import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, ChevronDown } from 'lucide-react'

const consoles = [
  {
    id: 1,
    name: "VVIP ROOM",
    desc: "PS 5 30th Anniversary + Nintendo Switch OLED + Netflix",
    image: "/assets/VVIPRoom.jpg",
    price: "35k / Hour"
  },
  {
    id: 2,
    name: "Racing Simulator",
    desc: "Playseat Rig F1 + Thrustmaster T300RS + PS 5 Pro",
    image: "/assets/RuangBalap.jpg",
    price: "30k / Hour"
  },
  {
    id: 3,
    name: "VIP PS4 PRO",
    desc: "Private Room + Nintendo Switch OLED + Netflix",
    image: "/assets/RoomBiasa.jpg",
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
  const [selectedBranch, setSelectedBranch] = useState(null)

  const selected = branches.find(b => b.id === selectedBranch)

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
          Pilih cabang di bawah untuk melihat daftar lengkap game yang tersedia. Setiap cabang memiliki koleksi yang berbeda.
        </p>
      </motion.div>

      {/* Branch selector buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {branches.map((branch, i) => (
          <motion.button
            key={branch.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelectedBranch(selectedBranch === branch.id ? null : branch.id)}
            className={`
              group relative overflow-hidden rounded-2xl border px-6 py-5 text-left transition-all duration-300
              ${branch.borderColor} ${branch.bgHover}
              ${selectedBranch === branch.id
                ? `bg-gradient-to-br ${branch.color} border-transparent shadow-2xl scale-[1.02]`
                : `${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`
              }
            `}
          >
            <span className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${selectedBranch === branch.id ? 'text-white/70' : (isDarkMode ? 'text-white/40' : 'text-black/40')}`}>
              RATS GAME
            </span>
            <span className={`block text-base font-black uppercase tracking-tight ${selectedBranch === branch.id ? 'text-white' : (isDarkMode ? 'text-white' : 'text-brand-black')}`}>
              {branch.label}
            </span>
            <ChevronDown
              size={14}
              className={`absolute bottom-4 right-4 transition-transform duration-300 ${selectedBranch === branch.id ? 'rotate-180 text-white/70' : (isDarkMode ? 'text-white/30' : 'text-black/30')}`}
            />
          </motion.button>
        ))}
      </div>

      {/* Game list CTA panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className={`rounded-3xl border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
              <div>
                <span className={`block text-xs font-bold uppercase tracking-[0.3em] mb-2 ${selected.accentColor}`}>
                  {selected.label}
                </span>
                <h4 className={`text-2xl font-black uppercase tracking-tightest mb-1 ${isDarkMode ? 'text-white' : 'text-brand-black'}`}>
                  Lihat Daftar Game Lengkap
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-white/40' : 'text-black/40'}`}>
                  Buka Google Sheets untuk melihat seluruh judul game yang tersedia di cabang ini.
                </p>
              </div>
              <a
                href={selected.sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase text-sm tracking-widest transition-all duration-300 whitespace-nowrap bg-gradient-to-r ${selected.color} text-white hover:scale-105 shadow-xl`}
              >
                Buka Game List
                <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint when nothing selected */}
      {!selectedBranch && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center text-xs uppercase tracking-widest py-6 ${isDarkMode ? 'text-white/20' : 'text-black/20'}`}
        >
          ↑ Pilih cabang di atas untuk melihat daftar game
        </motion.p>
      )}
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