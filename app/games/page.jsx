'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ALL_GAMES_MASTER } from '@/lib/gamesData';

const BRANCHES = [
  { id: 'all',       label: 'Semua Cabang',       color: '#f434a1' },
  { id: 'simongan',  label: 'RATS 01 — Simongan',  color: '#ef4444' },
  { id: 'tembalang', label: 'RATS 02 — Tembalang',  color: '#3b82f6' },
  { id: 'chapter03', label: 'RATS 03 — Chapter 03', color: '#8b5cf6' },
  { id: 'pleburan',  label: 'RATS 05 — Pleburan',   color: '#10b981' },
];

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://ratsgame.demo-weatso.my.id/booking';

// ─── Touch detection hook ─────────────────────────────────────────────────────
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

export default function GlobalGamesPage() {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedType,   setSelectedType]   = useState('all');
  const [activeIndex,    setActiveIndex]    = useState(0);
  const [bgIndex,        setBgIndex]        = useState(0);
  const [isDetailOpen,   setIsDetailOpen]   = useState(false); // Mobile: slide-up detail panel

  const carouselRef = useRef(null);
  const wheelLock   = useRef(false);
  const bgTimer     = useRef(null);
  const isTouch     = useIsTouchDevice();

  // ── Filtered list ────────────────────────────────────────────────────────────
  const filteredGames = useMemo(() => {
    let result = ALL_GAMES_MASTER;
    if (selectedBranch !== 'all') result = result.filter(g => g.branches.includes(selectedBranch));
    if (selectedType   !== 'all') result = result.filter(g => g.type === selectedType);
    return result;
  }, [selectedBranch, selectedType]);

  useEffect(() => { setActiveIndex(0); setBgIndex(0); setIsDetailOpen(false); }, [selectedBranch, selectedType]);

  useEffect(() => {
    clearTimeout(bgTimer.current);
    bgTimer.current = setTimeout(() => setBgIndex(activeIndex), 80);
    return () => clearTimeout(bgTimer.current);
  }, [activeIndex]);

  // Scroll active card into view
  useEffect(() => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.querySelectorAll('[data-card]');
    if (cards[activeIndex]) {
      cards[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  // Mouse wheel navigation (desktop only)
  useEffect(() => {
    if (isTouch) return;
    const onWheel = (e) => {
      if (wheelLock.current) return;
      wheelLock.current = true;
      if (e.deltaY > 0) setActiveIndex(p => Math.min(filteredGames.length - 1, p + 1));
      else if (e.deltaY < 0) setActiveIndex(p => Math.max(0, p - 1));
      setTimeout(() => { wheelLock.current = false; }, 300);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [filteredGames.length, isTouch]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setActiveIndex(p => Math.min(filteredGames.length - 1, p + 1));
      if (e.key === 'ArrowLeft')  setActiveIndex(p => Math.max(0, p - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filteredGames.length]);

  const activeGame = filteredGames[activeIndex] ?? null;
  const bgGame     = filteredGames[bgIndex]     ?? null;

  const handleCardClick = (index) => {
    if (activeIndex === index) {
      // On touch: clicking the already-active card opens detail
      if (isTouch) setIsDetailOpen(v => !v);
    } else {
      setActiveIndex(index);
      setIsDetailOpen(false);
    }
  };

  return (
    <div
      className="relative w-full bg-black text-white select-none"
      style={{ fontFamily: "'Inter', 'system-ui', sans-serif", minHeight: '100dvh' }}
    >
      {/* ── BACKGROUND ──────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0">
        {bgGame && (
          <Image
            src={bgGame.bg}
            alt={bgGame.title}
            fill
            className="object-cover object-center blur-md scale-[1.02] transition-all duration-700"
            quality={75}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        {bgGame && (
          <div
            className="absolute inset-0 opacity-10 transition-all duration-700"
            style={{ background: `radial-gradient(ellipse at 70% 40%, ${bgGame.accent}80, transparent 60%)` }}
          />
        )}
      </div>

      {/* ── NOISE ────────────────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.04]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* ── LAYOUT WRAPPER ───────────────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col" style={{ minHeight: '100dvh' }}>

        {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 sm:px-8 md:px-14 pt-5 pb-3 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-all duration-200"
          >
            ← Back
          </Link>

          <div className="text-center">
            <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] sm:tracking-[0.5em] text-white/25 uppercase">RATS GAME</p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/70">Global Game Catalog</p>
          </div>

          <a
            href={BOOKING_URL}
            className="px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full border border-white/20 text-white/70 hover:text-black hover:bg-white transition-all duration-200"
          >
            Reservasi →
          </a>
        </div>

        {/* ── MAIN CONTENT (grows to fill space) ──────────────────────────── */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">

          {/* ── INFO PANEL ─────────────────────────────────────────────────── */}
          {/* Desktop: overlaid at left. Mobile: shown between topbar & filters */}
          <div className="px-4 sm:px-8 md:px-14 pt-3 md:pt-6 pb-2 md:pb-0">
            {activeGame && (
              <div key={activeGame.id} style={{ animation: 'fadeSlideIn 0.35s ease forwards' }}>
                {/* Genre pill */}
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2 text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    backgroundColor: `${activeGame.accent}20`,
                    color: activeGame.accent,
                    border: `1px solid ${activeGame.accent}60`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeGame.accent }} />
                  {activeGame.genre}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.25rem] font-black uppercase leading-[1.05] tracking-tight mb-1.5 sm:mb-2 drop-shadow-2xl">
                  {activeGame.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/45 mb-2 sm:mb-4 font-mono">
                  <span>{activeGame.year}</span>
                  <span className="w-px h-3 bg-white/20" />
                  <span style={{ color: '#facc15' }}>★ {activeGame.rating}</span>
                  <span className="w-px h-3 bg-white/20" />
                  <span>{activeGame.branches.length} cabang</span>
                </div>

                {/* Description — hidden on very small screens to save space */}
                <div className="mb-3 sm:mb-5 max-w-sm hidden sm:block">
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    {activeGame.desc}
                  </p>
                  <p className="text-yellow-400 font-mono text-[11px] sm:text-xs mt-2">
                    📍 Tersedia di: {activeGame.rooms}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <a
                    href={BOOKING_URL}
                    className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-bold uppercase text-[11px] sm:text-xs tracking-widest text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl"
                    style={{ backgroundColor: activeGame.accent, boxShadow: `0 6px 24px ${activeGame.accent}55` }}
                  >
                    Mainkan Sekarang
                  </a>
                  <Link
                    href="/"
                    className="px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-bold uppercase text-[11px] sm:text-xs tracking-widest text-white/60 border border-white/20 hover:text-white hover:border-white/50 transition-all duration-200"
                  >
                    Info Cabang
                  </Link>
                </div>

                {/* Mobile-only: desc & room shown below buttons */}
                <div className="mt-2 sm:hidden">
                  <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2">
                    {activeGame.desc}
                  </p>
                  <p className="text-yellow-400 font-mono text-[10px] mt-1">
                    📍 {activeGame.rooms}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── BOTTOM SECTION: FILTERS + CAROUSEL ──────────────────────────── */}
          <div className="px-4 sm:px-8 md:px-14 pb-4 sm:pb-5 shrink-0">

            {/* Filters row */}
            <div className="mb-2 sm:mb-3 flex gap-2 sm:gap-4 flex-wrap">
              {/* Branch Filter */}
              <div className="relative flex-1 min-w-[130px] max-w-[220px]">
                <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white/25 mb-1">Filter Cabang</p>
                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="appearance-none w-full border text-white pl-3 sm:pl-5 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest cursor-pointer outline-none transition-all"
                    style={{
                      backgroundColor: BRANCHES.find(b => b.id === selectedBranch)?.color || 'transparent',
                      boxShadow: `0 0 14px ${BRANCHES.find(b => b.id === selectedBranch)?.color || '#fff'}60`,
                      borderColor: 'transparent'
                    }}
                  >
                    {BRANCHES.map(b => (
                      <option key={b.id} value={b.id} className="bg-neutral-900 text-white">{b.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mode Filter */}
              <div className="relative flex-1 min-w-[120px] max-w-[200px]">
                <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white/25 mb-1">Mode Permainan</p>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none w-full bg-black/40 border border-white/20 text-white pl-3 sm:pl-5 pr-8 sm:pr-10 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest cursor-pointer outline-none hover:bg-white/10 hover:border-white/50 transition-all"
                  >
                    {['all', 'Single Player', 'Multiplayer'].map(type => (
                      <option key={type} value={type} className="bg-neutral-900 text-white">
                        {type === 'all' ? 'Semua Mode' : type}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel header */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">
                {filteredGames.length} Game Tersedia
              </p>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setActiveIndex(p => Math.max(0, p - 1))}
                  disabled={activeIndex === 0}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 disabled:opacity-25 transition-colors text-sm"
                >‹</button>
                <span className="text-[10px] sm:text-xs font-mono text-white/40 tabular-nums w-8 sm:w-10 text-center">
                  {activeIndex + 1}/{filteredGames.length}
                </span>
                <button
                  onClick={() => setActiveIndex(p => Math.min(filteredGames.length - 1, p + 1))}
                  disabled={activeIndex === filteredGames.length - 1}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 disabled:opacity-25 transition-colors text-sm"
                >›</button>
              </div>
            </div>

            {/* ── CAROUSEL ─────────────────────────────────────────────────── */}
            <div
              ref={carouselRef}
              className="flex items-end gap-2 sm:gap-3 overflow-x-auto pb-1 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredGames.length === 0 ? (
                <p className="text-white/20 text-sm font-mono py-8 w-full text-center">
                  Tidak ada game di cabang ini.
                </p>
              ) : (
                filteredGames.map((game, index) => {
                  const isActive = activeIndex === index;
                  // On touch: all cards show color; on desktop: only active or hover
                  const shouldShowColor = isTouch || isActive;

                  return (
                    <div
                      key={game.id}
                      data-card
                      onClick={() => handleCardClick(index)}
                      className="shrink-0 snap-center cursor-pointer"
                      style={{
                        width:      isActive ? 'clamp(7rem, 18vw, 11rem)' : 'clamp(4.5rem, 12vw, 8rem)',
                        height:     isActive ? 'clamp(9rem, 23vw, 15rem)' : 'clamp(6.5rem, 18vw, 12rem)',
                        transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
                        opacity:    isActive ? 1 : 0.45,
                        position:   'relative',
                        borderRadius: '0.5rem',
                        overflow:   'hidden',
                        outline:    isActive ? '2px solid white' : 'none',
                        boxShadow:  isActive ? '0 16px 40px rgba(0,0,0,0.8)' : 'none',
                        transform:  isActive ? 'translateY(-4px)' : 'translateY(0)',
                      }}
                    >
                      {/* Cover image */}
                      {(game.cover || game.bg) ? (
                        <Image
                          src={game.cover || game.bg}
                          alt={game.title}
                          fill
                          className="object-cover object-center"
                          style={{
                            // Touch: always color; desktop: grayscale unless active/hover
                            filter: shouldShowColor ? 'grayscale(0%)' : 'grayscale(60%)',
                            transition: 'filter 0.3s ease',
                          }}
                          sizes="(max-width: 640px) 11rem, 18vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-800" />
                      )}
                      {/* Bottom gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                      {/* Accent top bar */}
                      {isActive && (
                        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: game.accent }} />
                      )}
                      {/* Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-white text-[10px] sm:text-[11px] font-bold uppercase leading-tight line-clamp-2">
                          {game.title}
                        </p>
                        {isActive && (
                          <p className="text-white/45 text-[8px] sm:text-[9px] font-mono mt-0.5">{game.genre}</p>
                        )}
                      </div>
                      {/* Rating badge */}
                      {isActive && (
                        <div
                          className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-black text-white"
                          style={{ backgroundColor: game.accent }}
                        >
                          {game.rating}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Progress dots — hide on very small screens if too many */}
            {filteredGames.length > 1 && filteredGames.length <= 60 && (
              <div className="flex items-center justify-center gap-1 mt-2.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                {filteredGames.map((g, i) => (
                  <button
                    key={g.id}
                    onClick={() => setActiveIndex(i)}
                    style={{
                      height: '3px',
                      width:  i === activeIndex ? '16px' : '3px',
                      borderRadius: '9999px',
                      backgroundColor: i === activeIndex
                        ? (activeGame?.accent ?? '#fff')
                        : 'rgba(255,255,255,0.2)',
                      transition: 'width 0.3s ease, background-color 0.3s ease',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Keyframe & scrollbar hide ─────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        [data-card]:hover .bg-cover { filter: grayscale(0%) !important; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
