import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Copy, ChevronRight, ChevronLeft, MapPin, Monitor, Clock, User, CreditCard } from 'lucide-react'

// Optimized Sub-components to prevent unnecessary re-renders
const StepIndicator = React.memo(({ currentStep, totalSteps }) => (
  <div className="flex gap-2 mb-8">
    {[...Array(totalSteps)].map((_, i) => (
      <div 
        key={i} 
        className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-brand-pink' : 'bg-white/10'}`}
      />
    ))}
  </div>
))

const BranchCard = React.memo(({ branch, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(branch.id)}
    className={`w-full p-6 rounded-2xl border text-left transition-all ${isActive ? 'bg-brand-blue/20 border-brand-blue ring-1 ring-brand-blue' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
  >
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-xl font-bold uppercase tracking-tight">{branch.name}</h3>
      <MapPin size={18} className={isActive ? 'text-brand-blue' : 'text-white/30'} />
    </div>
    <p className="text-sm opacity-50">{branch.location}</p>
  </motion.button>
))

const RoomCard = React.memo(({ room, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(room.id)}
    className={`w-full p-4 rounded-xl border text-left transition-all ${isActive ? 'bg-brand-pink/10 border-brand-pink ring-1 ring-brand-pink' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
  >
    <div className="aspect-video bg-white/5 rounded-lg mb-4 overflow-hidden">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
    </div>
    <h3 className="font-bold uppercase text-sm tracking-widest mb-1">{room.name}</h3>
    <p className="text-xs opacity-50">{room.price}</p>
  </motion.button>
))

export default function ReservationModal({ isOpen, onClose, isDarkMode }) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    branch: '',
    room: '',
    duration: 2,
    name: '',
    email: '',
    whatsapp: ''
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [copied, setCopied] = useState(false)

  // Data Constants
  const branches = useMemo(() => [
    { id: 'pusat', name: 'RATS Pusat', location: 'Jl. Kaliurang KM 5.5, Yogyakarta' },
    { id: 'selatan', name: 'RATS Cabang Selatan', location: 'Bantul, Yogyakarta' }
  ], [])

  const rooms = useMemo(() => [
    { id: 'vip', name: 'VIP Room - PS5', price: '25k / Hour', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop' },
    { id: 'standard', name: 'Standard Pack - PS5', price: '15k / Hour', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop' },
    { id: 'ps4', name: 'Standard Pack - PS4', price: '10k / Hour', image: 'https://images.unsplash.com/photo-1507457379470-08b8006caaea?q=80&w=2070&auto=format&fit=crop' }
  ], [])

  const durations = [2, 4, 6, 12]

  // Handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSelect = useCallback((key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }, [])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const handleSubmit = () => {
    console.log('Final Reservation Data:', formData)
    setIsSuccess(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-black/90 backdrop-blur-xl"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className={`relative w-full max-w-2xl bg-brand-black border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col ${isDarkMode ? 'text-white' : 'text-white'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-pink rounded-xl flex items-center justify-center">
              <Clock className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-display uppercase tracking-tightest">Reservasi</h2>
              <p className="text-[10px] uppercase tracking-widest opacity-40">Step {step + 1} of 5</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 flex-1 overflow-y-auto max-h-[70vh]">
          <StepIndicator currentStep={step} totalSteps={5} />

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                {/* Step 1: Branch */}
                {step === 0 && (
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-6">Pilih Cabang</h4>
                    {branches.map(b => (
                      <BranchCard 
                        key={b.id} 
                        branch={b} 
                        isActive={formData.branch === b.id} 
                        onClick={(val) => handleSelect('branch', val)} 
                      />
                    ))}
                  </div>
                )}

                {/* Step 2: Room */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-6">Pilih Ruangan</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {rooms.map(r => (
                        <RoomCard 
                          key={r.id} 
                          room={r} 
                          isActive={formData.room === r.id} 
                          onClick={(val) => handleSelect('room', val)} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Duration */}
                {step === 2 && (
                  <div className="space-y-8 py-4 text-center">
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-6 text-left">Pilih Durasi</h4>
                    <div className="flex flex-wrap justify-center gap-4">
                      {durations.map(d => (
                        <button
                          key={d}
                          onClick={() => handleSelect('duration', d)}
                          className={`w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center transition-all ${formData.duration === d ? 'border-brand-pink bg-brand-pink text-white' : 'border-white/10 hover:border-white/30 text-white/50'}`}
                        >
                          <span className="text-2xl font-bold">{d}</span>
                          <span className="text-[10px] uppercase font-bold tracking-widest">Jam</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm opacity-50">Ingin durasi lebih lama? Anda bisa menambah durasi di tempat.</p>
                  </div>
                )}

                {/* Step 4: Data Diri */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-6">Data Diri</h4>
                    <div className="space-y-6">
                      {['name', 'email', 'whatsapp'].map((field) => (
                        <div key={field} className="relative group">
                          <input 
                            type={field === 'email' ? 'email' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            placeholder=" "
                            className="w-full bg-transparent border-b-2 border-white/10 py-3 px-1 text-lg outline-none focus:border-brand-pink transition-colors peer"
                            required
                          />
                          <label className="absolute left-1 top-3 text-white/30 text-lg uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                            {field}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Payment */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-6">Pembayaran Manual</h4>
                    
                    <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">QRIS / GoPay</span>
                                <div className="px-3 py-1 bg-brand-pink text-white text-[8px] font-bold uppercase rounded-full">Scan Here</div>
                            </div>
                            <div className="aspect-square w-40 mx-auto bg-white rounded-lg p-2 mb-4">
                                {/* Placeholder QR */}
                                <div className="w-full h-full border-4 border-dashed border-brand-black/10 flex items-center justify-center">
                                    <span className="text-brand-black font-bold text-xs">QRIS CODE</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold uppercase">0812 3456 7890</p>
                                <p className="text-[10px] opacity-40 uppercase tracking-widest">RATS GAME OFFICIAL</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">blu by BCA Digital</span>
                                <p className="text-xl font-bold tracking-tight">001 2345 6789</p>
                                <p className="text-[10px] opacity-40 uppercase tracking-widest">RATS GAME YOGYAKARTA</p>
                            </div>
                            <button 
                                onClick={() => copyToClipboard('00123456789')}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                            >
                                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-500/20">
                  <Check size={48} className="text-white" />
                </div>
                <h2 className="text-4xl font-display uppercase tracking-tightest mb-4">Reservasi Diterima!</h2>
                <p className="max-w-xs text-white/50 text-sm leading-relaxed">
                  Admin kami akan segera memverifikasi pembayaran Anda. Silakan cek WhatsApp Anda untuk update selanjutnya.
                </p>
                <button 
                    onClick={onClose}
                    className="mt-10 bg-white text-brand-black px-12 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-brand-pink hover:text-white transition-all"
                >
                    Kembali ke Beranda
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        {!isSuccess && (
          <div className="p-8 border-t border-white/5 flex gap-4">
            {step > 0 && (
              <button 
                onClick={prevStep}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest"
              >
                <ChevronLeft size={18} />
                Back
              </button>
            )}
            <button 
              disabled={step === 0 && !formData.branch || step === 1 && !formData.room}
              onClick={step === 4 ? handleSubmit : nextStep}
              className={`flex-1 bg-brand-pink text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-brand-pink/20 ${(!formData.branch && step === 0) ? 'opacity-50 grayscale' : 'hover:scale-105'}`}
            >
              {step === 4 ? 'Saya Sudah Transfer' : 'Next Step'}
              {step < 4 && <ChevronRight size={18} />}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
