'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ALL_FNB_MASTER, BRANCHES, FNB_CATEGORIES } from '@/lib/fnbData';

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

export default function FnbMenuPage() {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedCat,    setSelectedCat]    = useState('all');
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDarkMode = currentTheme === 'dark';

  const filteredMenu = useMemo(() => {
    let result = ALL_FNB_MASTER;
    if (selectedBranch !== 'all') result = result.filter(item => item.branches.includes(selectedBranch));
    if (selectedCat    !== 'all') result = result.filter(item => item.category === selectedCat);
    return result;
  }, [selectedBranch, selectedCat]);

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

  if (!mounted) return null;

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-sans pb-20 transition-colors duration-300">

        {/* ── HEADER ── */}
        <div className="relative pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-8 md:px-16 bg-gradient-to-b from-red-100 to-slate-50 dark:from-red-900/40 dark:to-black transition-colors duration-300">
          <Link
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 sm:mb-6 text-[11px] sm:text-xs font-bold uppercase tracking-widest rounded-full border border-slate-300 dark:border-white/20 text-slate-600 dark:text-white/60 hover:text-slate-900 hover:border-slate-500 dark:hover:text-white dark:hover:border-white/50 transition-all duration-200"
            href="/"
          >
            ← Back
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight drop-shadow-sm dark:drop-shadow-lg mb-2">
            RATS <span className="text-red-500">CAFE</span> &amp; MENU
          </h1>
          <p className="text-slate-600 dark:text-white/60 text-xs sm:text-sm md:text-base max-w-xl transition-colors">
            Pesan makanan dan minuman favoritmu langsung dari kursi kasir. Harga terjangkau, porsi gamer!
          </p>
        </div>

        {/* ── FILTER SECTION ── */}
        <div className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 md:px-16 py-3 sm:py-4 transition-colors duration-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* Cabang Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 shrink-0">Lokasi:</span>
              <select
                value={selectedBranch}
                onChange={e => setSelectedBranch(e.target.value)}
                className="flex-1 sm:flex-initial bg-white border border-slate-300 text-slate-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white text-[11px] sm:text-xs font-bold rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 outline-none transition-colors"
              >
                {BRANCHES.map(b => (
                  <option key={b.id} value={b.id}>{b.label}</option>
                ))}
              </select>
            </div>

            {/* Kategori Filter (Pills) */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
              {FNB_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full border transition-all shrink-0 ${
                    selectedCat === cat.id
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30'
                      : 'bg-transparent text-slate-500 border-slate-300 hover:text-slate-900 hover:border-slate-500 dark:text-white/50 dark:border-white/20 dark:hover:text-white dark:hover:border-white/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── MENU GRID ── */}
        <div className="px-4 sm:px-8 md:px-16 mt-6 sm:mt-10">
          {filteredMenu.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 lg:gap-6">
              {filteredMenu.map(item => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-gray-800 rounded-xl overflow-hidden
                             hover:border-red-500 dark:hover:border-red-500/50 transition-colors group shadow-sm dark:shadow-none"
                >
                  {/* Image area */}
                  <div className="relative w-full aspect-square bg-slate-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-colors">
                    {item.cover ? (
                      <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        className={`object-cover object-center transition-transform duration-500 ${isTouch ? 'scale-[1.05]' : 'group-hover:scale-110'}`}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                      />
                    ) : (
                      <span className="text-slate-400 dark:text-gray-600 text-xs font-mono z-10 relative">No Image</span>
                    )}

                    {/* Badge */}
                    <div className="absolute top-2 left-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase text-slate-800 dark:text-white/90 border border-slate-200 dark:border-white/10 z-10 transition-colors">
                      {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2.5 sm:p-4">
                    <h3 className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-white uppercase leading-tight line-clamp-2 mb-0.5 sm:mb-1 transition-colors">
                      {item.title}
                    </h3>
                    <p className="hidden sm:block text-[10px] text-slate-500 dark:text-white/40 line-clamp-2 mb-3 h-7 transition-colors">
                      {item.desc}
                    </p>
                    <span className="text-red-500 dark:text-red-400 font-black text-xs sm:text-sm">
                      {formatRupiah(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 sm:py-20 text-center border border-dashed border-slate-300 dark:border-gray-800 rounded-2xl transition-colors">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-400 dark:text-white/30 uppercase">Menu tidak tersedia</h2>
              <p className="text-slate-400 dark:text-white/20 text-sm mt-2">Coba pilih kategori atau cabang lain.</p>
            </div>
          )}
        </div>

      </div>
      <style>{`
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
