import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight, History, Star, MousePointer2 } from 'lucide-react'
import RatsLogo from '../components/RatsLogo'
import MagneticButton from '../components/MagneticButton'

const LOCATIONS = [
  { id: '01', name: 'RATS GAME #01 Simongan', address: 'Jl. Simongan No.57, Semarang', link: 'https://maps.app.goo.gl/1rM6dLCUdVZ8aP6M6' },
  { id: '02', name: 'RATS GAME #02 Tembalang', address: 'Mulawarman Raya 11D, Semarang', link: 'https://maps.app.goo.gl/ddoJDq2paKTu2mbc6' },
  { id: '03', name: 'RATS GAME #03 Tembalang', address: 'Mulawarman Raya 11A, Semarang', link: 'https://maps.app.goo.gl/quDNMgXFTBCinKXB6' },
  { id: '5A', name: 'RATS GAME #05A Pleburan', address: 'Pleburan Barat 7A, Semarang', link: 'https://maps.app.goo.gl/L62NknsECzsQKnx79' }
]

const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
}

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

export default function AboutPage({ onBackToHome, isDarkMode }) {
  const theme = {
    bg: isDarkMode ? 'bg-brand-black' : 'bg-brand-white',
    text: isDarkMode ? 'text-white' : 'text-brand-black',
    muted: isDarkMode ? 'text-white/40' : 'text-brand-black/40',
    accent: isDarkMode ? 'text-brand-blue' : 'text-brand-pink',
    card: isDarkMode ? 'bg-white/5 border-white/10' : 'bg-brand-black/5 border-brand-black/10'
  }

  return (
    <motion.div 
        initial="initial"
        animate="animate"
        className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 overflow-x-hidden`}
    >
      {/* Header / Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-12 flex justify-between items-center backdrop-blur-md">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={onBackToHome} 
            className="cursor-pointer"
        >
          <RatsLogo isDarkMode={isDarkMode} className="w-12 h-12 md:w-20 md:h-20" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <MagneticButton>
                <div onClick={onBackToHome} className="cursor-pointer group flex items-center gap-4">
                    <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Back to Home</span>
                    <div className={`w-12 h-12 rounded-full border ${theme.card} flex items-center justify-center group-hover:bg-brand-pink group-hover:text-white transition-all shadow-xl`}>
                        <ArrowRight className="rotate-180 md:rotate-0" size={20} />
                    </div>
                </div>
            </MagneticButton>
        </motion.div>
      </nav>

      <main className="pt-48 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* SECTION 1: THE STORY */}
        <motion.section variants={stagger} className="mb-32">
            <div className="text-center mb-20">
                <motion.h3 variants={fadeInUp} className={`${theme.accent} font-mono text-xs uppercase tracking-[0.4em] mb-4`}>
                    The Origin
                </motion.h3>
                <div className="flex flex-col items-center">
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-8xl font-display uppercase tracking-tightest leading-none opacity-20 italic">
                        From Star
                    </motion.h1>
                    <motion.h1 variants={fadeInUp} className={`text-4xl md:text-8xl font-display uppercase tracking-tightest leading-none ${theme.accent}`}>
                        To Rats.
                    </motion.h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <motion.div variants={fadeInUp} className={`p-8 rounded-[2rem] border ${theme.card}`}>
                        <History className={`${theme.accent} mb-4`} size={32} />
                        <h4 className="text-xl font-bold mb-4 uppercase tracking-wider">Bukan Sekedar Nama</h4>
                        <p className={`leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/70'}`}>
                            Awalnya kami lahir dengan nama <span className="font-bold">STAR GAME</span>. Namun karena kendala pendaftaran merek di HKI, kami harus mencari identitas baru yang tetap membawa semangat yang sama.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className={`p-8 rounded-[2rem] border ${theme.card}`}>
                        <Star className={`${theme.accent} mb-4`} size={32} />
                        <h4 className="text-xl font-bold mb-4 uppercase tracking-wider">The Mirror Concept</h4>
                        <p className={`leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-brand-black/70'}`}>
                            Filosofi kami tidak berubah. Kami memutar kata <span className="font-bold tracking-widest text-brand-blue">STAR</span> menjadi <span className="font-bold tracking-widest text-brand-pink">RATS</span>. Sebuah cerminan bahwa kualitas bintang tetap ada di setiap tikus yang kami bawa.
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    variants={fadeInUp}
                    className="relative flex flex-col items-center justify-center py-20"
                >
                    <div className={`absolute inset-0 blur-3xl rounded-full transition-colors duration-700 ${isDarkMode ? 'bg-brand-blue/10' : 'bg-brand-pink/10'}`} />
                    <div className="flex items-center gap-8 text-4xl md:text-6xl font-display">
                        <span className="text-brand-blue">RATS</span>
                        <div className={`w-px h-20 transition-colors ${isDarkMode ? 'bg-white/10' : 'bg-brand-black/10'}`} />
                        <span className="opacity-30">STAR</span>
                    </div>
                    <div className="mt-12 flex items-center gap-6">
                         <div className="flex flex-col items-center gap-2">
                            <div className={`w-20 h-20 rounded-full border ${theme.card} flex items-center justify-center`}>
                                <Star className="text-yellow-400" size={40} />
                            </div>
                            <span className="text-[10px] font-bold opacity-40">STAR</span>
                         </div>
                         <span className="text-2xl opacity-20">+</span>
                         <div className="flex flex-col items-center gap-2">
                            <div className={`w-20 h-20 rounded-full border ${theme.card} flex items-center justify-center`}>
                                <MousePointer2 className={theme.accent} size={40} />
                            </div>
                            <span className="text-[10px] font-bold opacity-40">RATS</span>
                         </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>

        {/* SECTION 2: LOCATIONS */}
        <motion.section variants={stagger}>
            <div className="mb-16">
                <motion.h3 variants={fadeInUp} className={`${theme.accent} font-mono text-xs uppercase tracking-[0.4em] mb-4`}>
                    Find Us
                </motion.h3>
                <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-display uppercase tracking-tightest">
                    Our Branches.
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LOCATIONS.map((loc, i) => (
                    <motion.a 
                        key={loc.id}
                        href={loc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeInUp}
                        className={`group p-8 rounded-[2.5rem] border ${theme.card} hover:border-brand-pink transition-all flex justify-between items-center`}
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className={theme.accent} size={18} />
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.muted}`}>Branch #{loc.id}</span>
                            </div>
                            <h4 className="text-2xl font-bold uppercase">{loc.name}</h4>
                            <p className={`text-sm mt-2 ${theme.muted}`}>{loc.address}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full border ${theme.card} flex items-center justify-center group-hover:bg-brand-pink group-hover:text-white transition-all shadow-lg`}>
                            <ArrowRight size={20} />
                        </div>
                    </motion.a>
                ))}
            </div>
        </motion.section>
      </main>

      <footer className="py-20 text-center border-t border-white/5 opacity-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em]">RATS GAME INDONESIA © 2026</p>
      </footer>
    </motion.div>
  )
}
