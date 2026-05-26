'use client';

import React, { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface Branch {
  id: number;
  name: string;
  address?: string;
}

interface Game {
  id: number;
  title: string;
  category: string;
  image_url?: string;
}

interface FnbItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image?: string;
}

export default function EquipmentSection() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const [fnbItems, setFnbItems] = useState<FnbItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch active branches on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/branches`)
      .then((res) => res.json())
      .then((data) => setBranches(data.data || []))
      .catch((err) => console.error('Error fetching branches:', err));
  }, []);

  // Fetch Games and F&B when branch changes
  useEffect(() => {
    if (!selectedBranchId) {
      setGames([]);
      setFnbItems([]);
      return;
    }

    setLoading(true);

    const fetchGames = fetch(`${API_BASE}/api/branches/${selectedBranchId}/games`)
      .then((res) => res.json())
      .then((data) => setGames(data.data || []));

    const fetchFnb = fetch(`${API_BASE}/api/branches/${selectedBranchId}/fnb`)
      .then((res) => res.json())
      .then((data) => setFnbItems(data.data || []));

    Promise.all([fetchGames, fetchFnb])
      .catch((err) => console.error('Error fetching branch menu assets:', err))
      .finally(() => setLoading(false));
  }, [selectedBranchId]);

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden" id="equipment">
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-4 py-1.5 rounded-full border border-red-500/20">
            Select Your Equipment
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tight">
            GAMES &amp; FNB MENU
          </h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Choose your preferred gaming branch below to view its specific game collection and food &amp; beverage menus.
          </p>
        </div>

        {/* Branch Selector Dropdown */}
        <div className="max-w-md mx-auto mb-16">
          <div className="bg-neutral-900/60 backdrop-blur-md p-6 rounded-3xl border border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <label htmlFor="branch-select" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Step 1: Choose a Branch
            </label>
            <select
              id="branch-select"
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="w-full bg-black text-white border border-neutral-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-2xl px-5 py-4 text-base font-medium transition-all duration-300 outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 9l3 3 3-3' stroke='%23ef4444' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 1.25rem center',
                backgroundSize: '1.5em 1.5em',
                backgroundRepeat: 'no-repeat',
                paddingRight: '2.5rem'
              }}
            >
              <option value="">-- Click here to select a branch --</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Lists Section */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4 font-medium">Loading exclusive branch items...</p>
          </div>
        ) : !selectedBranchId ? (
          <div className="text-center py-20 bg-neutral-950/40 border border-dashed border-neutral-800/80 rounded-[2.5rem]">
            <span className="text-5xl block mb-4">🎮</span>
            <h3 className="text-xl font-bold text-white">Select a Branch First</h3>
            <p className="text-gray-400 mt-2 max-w-sm mx-auto text-sm">
              Please choose a RATS GAME branch using the selector above to explore their local catalog.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {/* Games List */}
            <div>
              <div className="flex items-center gap-3 mb-8 border-b border-neutral-800 pb-4">
                <span className="text-2xl">👾</span>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">
                  Available Games
                </h3>
                <span className="text-xs bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-0.5 rounded-full font-bold">
                  {games.length} Titles
                </span>
              </div>

              {games.length === 0 ? (
                <div className="text-center py-10 bg-neutral-900/10 rounded-2xl border border-neutral-800">
                  <p className="text-gray-500 text-sm">No games listed for this branch yet. Contact staff for details.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {games.map((game) => (
                    <div
                      key={game.id}
                      className="group bg-neutral-900/30 border border-neutral-800 rounded-3xl p-5 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-500 flex flex-col justify-between"
                    >
                      <div>
                        {game.image_url ? (
                          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-4 bg-neutral-950">
                            <img
                              src={game.image_url}
                              alt={game.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="aspect-[16/9] w-full rounded-2xl bg-neutral-950 flex items-center justify-center mb-4 text-3xl">
                            🕹️
                          </div>
                        )}
                        <h4 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                          {game.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 mt-4 block">
                        {game.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Food & Beverages Menu */}
            <div>
              <div className="flex items-center gap-3 mb-8 border-b border-neutral-800 pb-4">
                <span className="text-2xl">🍔</span>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">
                  Food &amp; Beverages Menu
                </h3>
                <span className="text-xs bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-0.5 rounded-full font-bold">
                  {fnbItems.length} Options
                </span>
              </div>

              {fnbItems.length === 0 ? (
                <div className="text-center py-10 bg-neutral-900/10 rounded-2xl border border-neutral-800">
                  <p className="text-gray-500 text-sm">No food or beverage items listed for this branch yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {fnbItems.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-neutral-900/30 border border-neutral-800 rounded-3xl p-5 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-500 flex flex-col justify-between"
                    >
                      <div>
                        {item.image ? (
                          <div className="aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-neutral-950">
                            <img
                              src={`${API_BASE}/storage/${item.image}`}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="aspect-square w-full rounded-2xl bg-neutral-950 flex items-center justify-center mb-4 text-3xl">
                            🍿
                          </div>
                        )}
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 bg-red-500/5 px-2 py-0.5 rounded-md border border-red-500/10 inline-block mb-2">
                          {item.category}
                        </span>
                        <h4 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                          {item.name}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800/80">
                        <span className="text-xs text-gray-500">Price</span>
                        <span className="text-base font-black text-white font-mono">
                          Rp {parseFloat(item.price).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
