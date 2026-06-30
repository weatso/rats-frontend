import React from 'react'
import { motion } from 'framer-motion'
// Kita hapus Instagram dan Mail dari sini, sisa ikon fungsional saja
import { MapPin, ArrowRight, Clock } from 'lucide-react'
import MagneticButton from './MagneticButton'

// SVG Kustom untuk Instagram
const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
)

// SVG Kustom untuk TikTok
const TikTokIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
)

export default function Footer({ isDarkMode, onReservasi, onAbout, onHome }) {
  const currentYear = new Date().getFullYear()

  const branches = [
    { 
      name: 'Chapter 01 Simongan', 
      link: 'https://maps.app.goo.gl/w8wTecmiAsTDTUHQ9'
    },
    { 
      name: 'Chapter 02 Tembalang', 
      link: 'https://maps.app.goo.gl/EJQ3D2SRZ6APvRMf7'
    },
    { 
      name: 'Chapter 03 Tembalang', 
      link: 'https://maps.app.goo.gl/SGrR1fxXHkvt1fR39'
    },
    { 
      name: 'Chapter 05A Pleburan', 
      link: 'https://maps.app.goo.gl/8SKP35yt1Z3eN2SeA'
    }
  ]

  const bgClass = isDarkMode ? 'bg-brand-black text-white' : 'bg-brand-white text-brand-black'
  const borderClass = isDarkMode ? 'border-white/10' : 'border-brand-black/10'
  const buttonClass = isDarkMode ? 'bg-white text-brand-black hover:bg-brand-pink hover:text-white' : 'bg-brand-black text-white hover:bg-brand-pink hover:text-white'
  const iconBg = isDarkMode ? 'bg-white/10 group-hover:bg-white group-hover:text-brand-pink' : 'bg-brand-black/10 group-hover:bg-brand-black group-hover:text-white'

  return (
    <footer id="footer" className={`${bgClass} px-6 md:px-12 pt-24 pb-12 rounded-t-[3rem] md:rounded-t-[5rem] transition-colors duration-700`}>
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-display uppercase tracking-tightest leading-none mb-12"
            >
              RATS <br />
              <span className="text-brand-pink">GAME</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
               {branches.map((b, i) => (
                 <a key={i} href={b.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:opacity-75 transition-opacity group">
                    <MapPin className="text-brand-pink shrink-0 mt-1" size={16} />
                    <div>
                        <p className="font-bold uppercase text-[10px] tracking-widest mb-1 opacity-50 group-hover:text-brand-pink transition-colors">{b.name}</p>
                        <p className="text-sm opacity-80 capitalize">Lihat detail maps</p>
                    </div>
                 </a>
               ))}
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl w-fit">
                <Clock className="text-brand-pink" size={20} />
                <div>
                    <p className="font-bold uppercase text-[8px] tracking-widest opacity-50">Operating Hours</p>
                    <p className="text-lg font-bold">09:00 AM - 03:00 AM</p>
                </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-12">
            <div className="flex flex-col items-start md:items-end gap-4">
              <p className="font-bold uppercase text-[10px] tracking-widest opacity-50">Quick Links</p>
              <nav className="flex flex-col items-start md:items-end gap-2 text-2xl font-display uppercase tracking-tightest">
                <button onClick={onHome} className="hover:text-brand-pink transition-colors">Home</button>
                <a href="#roster" className="hover:text-brand-pink transition-colors">Consoles</a>
                <button onClick={onAbout} className="hover:text-brand-pink transition-colors">About Us</button>
              </nav>
            </div>

            <MagneticButton>
              <a
                href={process.env.NEXT_PUBLIC_BOOKING_URL || 'https://ratsgame.demo-weatso.my.id/booking'}
                className={`group px-12 py-6 rounded-full flex items-center gap-4 transition-all ${buttonClass}`}
              >
                <span className="text-xl font-display uppercase tracking-widest">Reservasi</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${iconBg}`}>
                  <ArrowRight size={20} />
                </div>
              </a>
            </MagneticButton>
          </div>
        </div>

        <div className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8 ${borderClass}`}>
          <div className="flex gap-10">
            <a href="https://www.instagram.com/ratsgame.id/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:text-brand-pink transition-colors">
              <InstagramIcon size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Instagram</span>
            </a>
            <a href="https://www.tiktok.com/@rats.game" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 hover:text-brand-pink transition-colors">
              <TikTokIcon size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">TikTok</span>
            </a>
          </div>

          <div className="text-center md:text-right">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                <span style={{ color: '#fed100' }}>RATS ALWAYS</span> <span style={{ color: '#f4359f' }}>LOVES YOU</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">
              © {currentYear} RATS GAME.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}