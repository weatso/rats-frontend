import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

// PERBAIKAN: Baris import RoomBiasaImg, RuangBalapImg, dan VVIPRoomImg sudah Dihapus dari sini.

const consoles = [
  {
    id: 1,
    name: "VVIP ROOM",
    desc: "PS 5 30th Anniversary + Nintendo Switch OLED + Netflix",
    // PERBAIKAN: Gunakan jalur string langsung yang mengarah ke public/assets/
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

export default function Roster({ isDarkMode, onReservasi }) {
  if (!consoles || !Array.isArray(consoles)) return null;

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {consoles.map((item, i) => (
          <motion.div
            key={item.id || i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.2 }}
            className={`group cursor-pointer`}
            onClick={onReservasi}
          >
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
          </motion.div>
        ))}
      </div>

      <div className="h-32 md:h-64" />
    </section>
  )
}