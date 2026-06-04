import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Copy, MapPin, Smartphone, Loader2, AlertCircle } from 'lucide-react'
import RatsLogo from '../components/RatsLogo'

const API_BASE = process.env.NEXT_PUBLIC_API_URL

const STEPS = [
  { id: 0, title: 'Cabang', subtitle: 'Pilih lokasi bermain' },
  { id: 1, title: 'Ruangan', subtitle: 'Pilih setup favorit' },
  { id: 2, title: 'Waktu', subtitle: 'Tentukan jadwal' },
  { id: 3, title: 'Data Diri', subtitle: 'Identitas pemesan' },
  { id: 4, title: 'Konfirmasi', subtitle: 'Selesaikan pesanan' },
]

const TIME_SLOTS = [
  { label: '09:00', val: 9 }, { label: '10:00', val: 10 }, { label: '11:00', val: 11 },
  { label: '12:00', val: 12 }, { label: '13:00', val: 13 }, { label: '14:00', val: 14 },
  { label: '15:00', val: 15 }, { label: '16:00', val: 16 }, { label: '17:00', val: 17 },
  { label: '18:00', val: 18 }, { label: '19:00', val: 19 }, { label: '20:00', val: 20 },
  { label: '21:00', val: 21 }, { label: '22:00', val: 22 }, { label: '23:00', val: 23 },
  { label: '00:00', val: 24 }, { label: '01:00', val: 25 }, { label: '02:00', val: 26 }
]
const CLOSING_TIME = 27

export default function ReservationPage({ onBackToHome, isDarkMode }) {
  const [step, setStep] = useState(0)
  const [isStepsExpanded, setIsStepsExpanded] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // Portal mount guard — avoids SSR mismatch
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const [reservationData, setReservationData] = useState({
    branch: null,
    room: null,
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    startTimeVal: 9,
    duration: 1,
    name: '',
    email: '',
    whatsapp: ''
  })

  useEffect(() => {
    if (reservationData.startTimeVal + reservationData.duration > CLOSING_TIME) {
      const maxAllowed = CLOSING_TIME - reservationData.startTimeVal
      setReservationData(prev => ({ ...prev, duration: maxAllowed > 0 ? 1 : prev.duration }))
    }
  }, [reservationData.startTimeVal])

  const dates = useMemo(() => {
    const list = []
    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() + i)
      list.push({
        full: d.toISOString().split('T')[0],
        day: d.getDate(),
        month: d.toLocaleString('default', { month: 'short' }).toUpperCase()
      })
    }
    return list
  }, [])

  const [dbBranches, setDbBranches] = useState([])
  const [dbRooms, setDbRooms] = useState([])

  useEffect(() => {
    // Fetch branches and rooms from dynamic API endpoint
    fetch(`${API_BASE}/api/branches`)
      .then(res => res.json())
      .then(data => setDbBranches(data.data || []))
      .catch(err => console.error('Error fetching branches:', err))

    fetch(`${API_BASE}/api/rooms`)
      .then(res => res.json())
      .then(data => setDbRooms(data.data || []))
      .catch(err => console.error('Error fetching rooms:', err))
  }, [])

  const rooms = useMemo(() => dbRooms.filter(r => r.branch_id === reservationData.branch), [dbRooms, reservationData.branch])
  const selectedBranch = useMemo(() => dbBranches.find(b => b.id === reservationData.branch), [dbBranches, reservationData.branch])
  const selectedRoom = useMemo(() => rooms.find(r => r.id === reservationData.room), [rooms, reservationData.room])
  const totalPrice = useMemo(() => (selectedRoom?.price_per_hour || 0) * reservationData.duration, [selectedRoom, reservationData.duration])

  const handleSelect = (key, value) => {
    if (key === 'startTime') {
      const slot = TIME_SLOTS.find(s => s.label === value)
      setReservationData(prev => ({ ...prev, startTime: value, startTimeVal: slot.val }))
    } else {
      setReservationData(prev => ({ ...prev, [key]: value }))
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          branch_id: reservationData.branch,
          room_id: reservationData.room,
          customer_name: reservationData.name,
          customer_phone: reservationData.whatsapp,
          customer_email: reservationData.email,
          start_time: `${reservationData.date} ${reservationData.startTime}:00`,
          duration_hours: reservationData.duration,
          notes: reservationData.notes || ''
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Gagal menyimpan ke server RATS Game')
      }

      setBookingId(`RATS-${data.data.id}`)
      setIsSuccess(true)
    } catch (err) {
      console.error('Final Error:', err)
      setError(`Gagal menyimpan: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const theme = {
    sidebarBg: isDarkMode ? 'bg-brand-black' : 'bg-white',
    mainBg: isDarkMode ? 'bg-[#0c1014]' : 'bg-[#f8f9fa]',
    border: isDarkMode ? 'border-white/5' : 'border-brand-black/5',
    text: isDarkMode ? 'text-white' : 'text-brand-black',
    textMuted: isDarkMode ? 'text-white/40' : 'text-brand-black/40',
    cardBg: isDarkMode ? 'bg-white/[0.03]' : 'bg-brand-black/[0.02]',
    inputBorder: isDarkMode ? 'border-white/10' : 'border-brand-black/10'
  }

  if (isSuccess) {
    return (
      <div className={`h-screen ${isDarkMode ? 'bg-brand-black' : 'bg-[#f0f2f5]'} flex flex-col items-center justify-start py-20 px-6 overflow-y-auto`}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full">
          <div className={`relative ${isDarkMode ? 'bg-[#1a1f24]' : 'bg-white'} rounded-[2.5rem] shadow-2xl border ${isDarkMode ? 'border-white/5' : 'border-transparent'} overflow-hidden`}>
            <div className="bg-brand-pink p-8 text-white text-center">
              <Check size={32} className="mx-auto mb-4" />
              <h2 className="text-2xl font-display uppercase tracking-widest">Reservation Success</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-[8px] uppercase tracking-widest ${theme.textMuted}`}>Booking ID</span>
                  <p className={`text-xl font-display ${theme.text}`}>{bookingId}</p>
                </div>
                <RatsLogo isDarkMode={isDarkMode} className="w-20 h-20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col"><span className={`text-[8px] uppercase tracking-widest ${theme.textMuted}`}>Name</span><p className={`text-sm font-bold ${theme.text}`}>{reservationData.name}</p></div>
                <div className="flex flex-col"><span className={`text-[8px] uppercase tracking-widest ${theme.textMuted}`}>Branch</span><p className={`text-sm font-bold ${theme.text}`}>{selectedBranch?.id}</p></div>
              </div>
              <div className="p-4 rounded-2xl bg-brand-pink/10 border border-brand-pink/20">
                <p className="text-lg font-bold text-brand-pink">{selectedRoom?.name}</p>
                <p className={`text-[10px] ${theme.textMuted}`}>{reservationData.date} | {reservationData.startTime}</p>
              </div>
              <div className="flex justify-between items-end border-t border-white/5 pt-4">
                <div>
                  <span className={`text-[8px] uppercase tracking-widest ${theme.textMuted}`}>Grand Total</span>
                  <p className="text-3xl font-display text-brand-pink">IDR {totalPrice.toLocaleString()}</p>
                </div>
                <Smartphone size={32} className={theme.textMuted} />
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4 print:hidden">
            <p className={`text-center text-xs ${theme.textMuted} uppercase tracking-widest`}>
              Nota konfirmasi dikirim otomatis ke email Anda.
            </p>
            <button onClick={() => window.print()} className="w-full py-5 rounded-full bg-brand-black text-white dark:bg-white dark:text-brand-black font-bold uppercase tracking-widest text-xs shadow-xl">SIMPAN PDF</button>
            <button onClick={onBackToHome} className={`${theme.textMuted} w-full text-[10px] font-bold uppercase tracking-widest text-center`}>Kembali Ke Beranda</button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          MOBILE STICKY BOTTOM BAR — rendered via React Portal
          directly into document.body, so position:fixed ALWAYS
          anchors to the real viewport, bypassing every ancestor
          overflow / transform container. Hidden on desktop.
      ═══════════════════════════════════════════════════════ */}
      {isMounted && isMobile && createPortal(
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '12px 20px 20px',
            borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb',
            background: isDarkMode ? '#0F1523' : '#ffffff',
            boxShadow: '0 -8px 24px -4px rgba(0,0,0,0.4)',
          }}
        >
          {/* Grand Total — full width, centered */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderRadius: '12px',
            background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
          }}>
            <span style={{
              fontSize: '9px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
            }}>
              Grand Total
            </span>
            <span style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#f434a1',
              fontFamily: 'var(--font-display, inherit)',
            }}>
              IDR {totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Buttons row — Batal left, Next Step right */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={step === 0 ? onBackToHome : () => setStep(step - 1)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '999px',
                border: isDarkMode ? '2px solid rgba(255,255,255,0.15)' : '2px solid rgba(0,0,0,0.15)',
                background: 'transparent',
                color: isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                fontWeight: 700,
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              ← Batal
            </button>
            <button
              disabled={isLoading || (step === 0 && !reservationData.branch) || (step === 1 && !reservationData.room)}
              onClick={step === 4 ? handleSubmit : () => setStep(step + 1)}
              style={{
                flex: 2,
                padding: '12px',
                borderRadius: '999px',
                border: 'none',
                background: isLoading || (step === 0 && !reservationData.branch) || (step === 1 && !reservationData.room)
                  ? 'rgba(25,51,200,0.4)'
                  : '#1933c8',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(25,51,200,0.4)',
              }}
            >
              {isLoading
                ? '...'
                : step === 4 ? 'Confirm & Finish' : 'Next Step →'
              }
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* ════════════════════════════════════════════════════════════
          MAIN LAYOUT — normal flow, mobile scrolls freely
      ════════════════════════════════════════════════════════════ */}
      <div className={`min-h-screen flex flex-col md:flex-row md:h-screen md:overflow-hidden ${theme.sidebarBg} transition-all duration-700`}>
        {/* SIDEBAR */}
        <aside className={`w-full md:w-1/4 h-auto md:h-full border-b md:border-r ${theme.border} flex flex-col z-20 transition-all duration-500`}>
          <div
            onClick={() => setIsStepsExpanded(!isStepsExpanded)}
            className="flex md:hidden items-center justify-between p-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-xs font-bold text-white shadow-lg">
                {step + 1}
              </div>
              <div className="hidden xs:block">
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${theme.text}`}>Progress</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isStepsExpanded ? 180 : 0 }}
              className={theme.textMuted}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: isStepsExpanded ? 'auto' : 0,
              opacity: isStepsExpanded ? 1 : 0
            }}
            className="overflow-hidden md:!h-full md:!opacity-100 md:!overflow-y-auto flex flex-col"
          >
            <div className="p-6 lg:p-8 border-b border-white/5 md:border-none">
              <RatsLogo isDarkMode={isDarkMode} className="hidden md:block w-24 h-24 lg:w-32 lg:h-32 mb-6" />
              <nav className="space-y-4 lg:space-y-6">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-4">
                    <div className={`w-8 h-8 shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${step === i ? 'border-brand-pink bg-brand-pink text-white' : (step > i ? 'border-brand-blue bg-brand-blue text-white' : theme.inputBorder + ' ' + theme.textMuted)}`}>
                      {step > i ? <Check size={14} /> : i + 1}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${step === i ? theme.text : theme.textMuted}`}>{s.title}</span>
                  </div>
                ))}
              </nav>
            </div>

            {/* Live Receipt + Grand Total — DESKTOP sidebar only.
               Never render inside the mobile accordion. */}
            <div className="hidden md:flex flex-col flex-1">
              <div className="p-6 lg:p-8 flex-1">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-pink mb-4 lg:mb-6">Live Receipt</h4>
                <div className="space-y-4">
                  <div className="flex flex-col"><span className={`text-[8px] uppercase tracking-widest ${theme.textMuted}`}>Location</span><span className={`text-sm ${theme.text} truncate`}>{selectedBranch?.name || '--'}</span></div>
                  <div className="flex flex-col"><span className={`text-[8px] uppercase tracking-widest ${theme.textMuted}`}>Room</span><span className={`text-sm ${theme.text} truncate`}>{selectedRoom?.name || '--'}</span></div>
                  <div className="flex flex-col"><span className={`text-[8px] uppercase tracking-widest ${theme.textMuted}`}>Schedule</span><span className={`text-sm ${theme.text} truncate`}>{reservationData.date} | {reservationData.startTime}</span></div>
                </div>
              </div>
              <div className="p-6 lg:p-8 border-t border-white/5 bg-white/5 mt-auto shrink-0">
                <span className={`text-[10px] uppercase tracking-widest ${theme.textMuted}`}>Grand Total</span>
                <span className="block text-2xl lg:text-3xl font-display text-brand-pink">IDR {totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col md:h-full relative md:overflow-hidden">
          {/* main is the scrollable area on desktop; on mobile the whole page scrolls */}
          <main className={`flex-1 md:overflow-y-auto p-8 md:p-16 ${theme.mainBg} transition-all duration-700`}>
            <header className="mb-12">
              <h1 className={`text-3xl md:text-6xl font-display uppercase tracking-tightest ${theme.text}`}>{STEPS[step].title}</h1>
              <p className={`${theme.textMuted} text-xs md:text-sm uppercase tracking-widest mt-2`}>{STEPS[step].subtitle}</p>
            </header>

            <AnimatePresence mode="wait">
              {/* pb-48 on mobile = enough clearance above the fixed bottom bar */}
              <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="pb-48 md:pb-20">
                {error && <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-2"><AlertCircle size={18}/>{error}</div>}

                {step === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dbBranches.map(b => (
                      <button key={b.id} onClick={() => handleSelect('branch', b.id)} className={`p-8 rounded-3xl border-2 text-left transition-all ${reservationData.branch === b.id ? 'border-brand-blue bg-brand-blue/10' : theme.border + ' ' + theme.cardBg}`}>
                        <MapPin className="mb-4 text-brand-pink" size={32} />
                        <h3 className={`text-2xl font-bold ${theme.text}`}>{b.name}</h3>
                        <p className={`text-sm ${theme.textMuted}`}>{b.address}</p>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map(r => {
                      const imgPath = r.image || '/images/RoomBiasa.jpg';
                      const imgUrl = imgPath.startsWith('/') ? `${API_BASE}${imgPath}` : imgPath;
                      return (
                      <button key={r.id} onClick={() => handleSelect('room', r.id)} className={`flex flex-col rounded-2xl border-2 text-left transition-all overflow-hidden ${reservationData.room === r.id ? 'border-brand-pink bg-brand-pink/10' : theme.border + ' ' + theme.cardBg}`}>
                        <img src={imgUrl} className="w-full aspect-video object-cover" />
                        <div className="p-6">
                          <h3 className={`font-bold ${theme.text} mb-1`}>{r.name}</h3>
                          <p className="text-brand-pink font-display text-xl">IDR {r.price_per_hour ? r.price_per_hour.toLocaleString() : '0'}</p>
                        </div>
                      </button>
                      )
                    })}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-12">
                    <section>
                      <h4 className={`text-[10px] font-bold uppercase tracking-widest ${theme.textMuted} mb-6`}>01. PILIH TANGGAL</h4>
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {dates.map((d, i) => (
                          <button key={i} onClick={() => handleSelect('date', d.full)} className={`flex-shrink-0 w-24 h-32 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${reservationData.date === d.full ? 'border-brand-pink bg-brand-pink text-white shadow-lg' : theme.inputBorder + ' ' + theme.cardBg + ' ' + (isDarkMode ? 'text-white' : 'text-brand-black')}`}>
                            <span className="text-3xl font-display">{d.day}</span>
                            <span className="text-[10px] font-bold uppercase mt-1 opacity-60">{d.month}</span>
                          </button>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h4 className={`text-[10px] font-bold uppercase tracking-widest ${theme.textMuted} mb-6`}>02. PILIH JAM MULAI</h4>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {TIME_SLOTS.map((t, i) => {
                          const isValid = t.val + 1 <= CLOSING_TIME
                          return (
                            <button key={i} disabled={!isValid} onClick={() => handleSelect('startTime', t.label)} className={`py-4 rounded-xl border-2 font-mono transition-all ${reservationData.startTime === t.label ? 'border-brand-blue bg-brand-blue text-white shadow-lg' : (isValid ? theme.inputBorder + ' ' + (isDarkMode ? 'text-white/60' : 'text-brand-black/60') : 'opacity-10 cursor-not-allowed')}`}>
                              {t.label}
                            </button>
                          )
                        })}
                      </div>
                    </section>

                    <section>
                      <h4 className={`text-[10px] font-bold uppercase tracking-widest ${theme.textMuted} mb-6`}>03. PILIH DURASI</h4>
                      <div className="flex gap-4">
                        {[1, 3, 6, 8].map(d => {
                          const isValid = reservationData.startTimeVal + d <= CLOSING_TIME
                          return (
                            <button key={d} disabled={!isValid} onClick={() => handleSelect('duration', d)} className={`flex-1 py-5 rounded-2xl border-2 font-bold transition-all ${reservationData.duration === d ? 'border-brand-pink bg-brand-pink text-white shadow-lg' : (isValid ? theme.inputBorder + ' ' + (isDarkMode ? 'text-white/60' : 'text-brand-black/60') : 'opacity-10 cursor-not-allowed')}`}>
                              {d} JAM
                            </button>
                          )
                        })}
                      </div>
                    </section>
                  </div>
                )}

                {step === 3 && (
                  <div className="max-w-xl space-y-12">
                    {['name', 'email', 'whatsapp'].map(f => (
                      <div key={f} className="relative">
                        <input type="text" name={f} value={reservationData[f]} onChange={(e) => handleSelect(f, e.target.value)} placeholder=" " className={`w-full bg-transparent border-b-2 ${theme.inputBorder} py-4 text-lg md:text-2xl ${theme.text} outline-none focus:border-brand-pink transition-all peer`} required />
                        <label className={`absolute left-0 top-4 ${theme.textMuted} text-sm md:text-xl uppercase tracking-widest pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-brand-pink peer-[:not(:placeholder-shown)]:-top-6`}>{f}</label>
                      </div>
                    ))}
                  </div>
                )}

                {step === 4 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-10">
                    <div className={`${theme.cardBg} p-10 rounded-[2.5rem] border ${theme.border} space-y-6 shadow-2xl`}>
                      <h4 className="text-brand-pink font-bold text-xs uppercase tracking-[0.3em]">Summary</h4>
                      <div className="flex justify-between border-b border-white/5 pb-4"><span className={theme.textMuted}>Branch</span><span className={theme.text}>{selectedBranch?.name}</span></div>
                      <div className="flex justify-between border-b border-white/5 pb-4"><span className={theme.textMuted}>Room</span><span className={theme.text}>{selectedRoom?.name}</span></div>
                      <div className="flex justify-between pt-4"><span className={theme.textMuted}>Total</span><span className="text-4xl text-brand-pink font-display">IDR {totalPrice.toLocaleString()}</span></div>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-brand-pink font-bold text-xs uppercase tracking-[0.3em]">Payment</h4>
                      <div className={`${theme.cardBg} p-8 rounded-[2rem] border ${theme.border} flex justify-between items-center`}>
                        <div><span className="text-[8px] opacity-40 uppercase block mb-1">blu by BCA</span><p className={`text-2xl font-bold ${theme.text}`}>001 2345 6789</p></div>
                        <button onClick={() => copyToClipboard('00123456789')} className="p-4 bg-brand-blue text-white rounded-2xl hover:scale-110 transition-all"><Copy size={20}/></button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Desktop-only footer (hidden on mobile) */}
          <footer className={`hidden md:flex h-24 px-8 md:px-16 border-t ${theme.border} ${theme.sidebarBg} items-center justify-between z-40 backdrop-blur-md`}>
            <button onClick={step === 0 ? onBackToHome : () => setStep(step - 1)} className={`px-10 py-4 rounded-full border ${theme.inputBorder} ${theme.textMuted} font-bold uppercase text-[10px] tracking-[0.2em]`}>Back</button>
            <button
              disabled={isLoading || (step === 0 && !reservationData.branch) || (step === 1 && !reservationData.room)}
              onClick={step === 4 ? handleSubmit : () => setStep(step + 1)}
              className={`bg-brand-pink text-white px-12 py-4 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all ${isLoading ? 'opacity-50' : 'hover:scale-105'}`}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (step === 4 ? 'Confirm & Finish' : 'Next Step')}
            </button>
          </footer>
        </div>
      </div>
    </>
  )
}
