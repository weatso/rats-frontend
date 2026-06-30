export const FNB_CATEGORIES = [
  { id: 'all', label: 'Semua Menu' },
  { id: 'makan', label: 'Makan (Heavy)' },
  { id: 'snack', label: 'Snack (Cemilan)' },
  { id: 'minum', label: 'Minuman' },
];

export const BRANCHES = [
  { id: 'all', label: 'Semua Cabang', color: '#f434a1' },
  { id: 'simongan', label: 'RATS 01 — Simongan', color: '#ef4444' },
  { id: 'tembalang', label: 'RATS 02 — Tembalang', color: '#3b82f6' },
  { id: 'chapter03', label: 'RATS 03 — Chapter 03', color: '#8b5cf6' },
  { id: 'pleburan', label: 'RATS 05 — Pleburan', color: '#10b981' },
];

export const ALL_FNB_MASTER = [
  // --- MAKAN (HEAVY) ---
  { id: 1, title: 'Mie Goreng Spesial + Telur', category: 'makan', price: 15000, cover: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800', desc: 'Indomie goreng andalan gamer dengan telur setengah matang.', branches: ['all', 'simongan', 'tembalang', 'chapter03', 'pleburan'] },
  { id: 2, title: 'Nasi Goreng RATS', category: 'makan', price: 20000, cover: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800', desc: 'Nasi goreng porsi besar siap menemani sesi begadang push rank.', branches: ['tembalang', 'chapter03', 'pleburan'] },
  { id: 3, title: 'Indomie Rebus Kari Ayam', category: 'makan', price: 15000, cover: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800', desc: 'Kuah hangat gurih pedas, cocok buat mabar di saat hujan.', branches: ['all', 'simongan', 'tembalang', 'chapter03', 'pleburan'] },
  { id: 4, title: 'Nasi Ayam Geprek', category: 'makan', price: 22000, cover: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800', desc: 'Ayam krispi pedas nampol lengkap dengan nasi putih hangat.', branches: ['tembalang', 'chapter03'] },
  { id: 5, title: 'Nasi Gila Mabar', category: 'makan', price: 25000, cover: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800', desc: 'Campuran sosis, bakso, ayam, dan telur orak arik pedas manis.', branches: ['chapter03', 'pleburan'] },
  { id: 6, title: 'Magelangan (Mie Nasgor)', category: 'makan', price: 22000, cover: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800', desc: 'Kombinasi maut nasi dan mie digoreng bumbu kecap spesial.', branches: ['simongan', 'tembalang'] },
  { id: 7, title: 'Nasi Telur Kecap Pontianak', category: 'makan', price: 13000, cover: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800', desc: 'Menu akhir bulan merakyat, kenyang dan nikmat tiada tara.', branches: ['all', 'simongan', 'tembalang', 'chapter03', 'pleburan'] },
  
  // --- SNACK (CEMILAN) ---
  { id: 8, title: 'French Fries (Kentang Goreng)', category: 'snack', price: 12000, cover: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800', desc: 'Kentang goreng renyah dengan taburan bumbu asin gurih.', branches: ['all', 'simongan', 'tembalang', 'chapter03', 'pleburan'] },
  { id: 9, title: 'Platter Sosis & Nugget', category: 'snack', price: 18000, cover: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=800', desc: 'Cemilan mabar pas untuk bagi-bagi dengan teman 1 sofa.', branches: ['tembalang', 'chapter03', 'pleburan'] },
  { id: 10, title: 'Roti Bakar Coklat Keju', category: 'snack', price: 15000, cover: 'https://images.unsplash.com/photo-1584314918237-67990499252c?auto=format&fit=crop&q=80&w=800', desc: 'Manis gurih, teman pas minum kopi sambil nunggu giliran main.', branches: ['all', 'simongan', 'tembalang', 'chapter03', 'pleburan'] },
  { id: 11, title: 'Pisang Goreng Keju Susu', category: 'snack', price: 14000, cover: 'https://images.unsplash.com/photo-1598515753241-1557bf859a22?auto=format&fit=crop&q=80&w=800', desc: 'Pisang manis dilapisi tepung krispi dengan limpahan keju.', branches: ['tembalang', 'chapter03'] },
  { id: 12, title: 'Mendoan Panas (Isi 5)', category: 'snack', price: 12000, cover: 'https://images.unsplash.com/photo-1560684352-8497818fa928?auto=format&fit=crop&q=80&w=800', desc: 'Tempe mendoan anget disajikan dengan sambal kecap pedas.', branches: ['simongan', 'pleburan'] },
  { id: 13, title: 'Cireng Bumbu Rujak', category: 'snack', price: 15000, cover: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=800', desc: 'Kenyal krispi dicocol bumbu rujak asam pedas mantap.', branches: ['tembalang', 'chapter03', 'pleburan'] },
  { id: 14, title: 'Dimsum Ayam Kukus', category: 'snack', price: 16000, cover: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800', desc: 'Dimsum premium lembut, aman dimakan agar stik gak berminyak.', branches: ['chapter03', 'pleburan'] },

  // --- MINUMAN ---
  { id: 15, title: 'Es Teh Manis Jumbo', category: 'minum', price: 5000, cover: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800', desc: 'Pelepas dahaga paling legendaris setelah teriak-teriak main bola.', branches: ['all', 'simongan', 'tembalang', 'chapter03', 'pleburan'] },
  { id: 16, title: 'Es Kopi Susu Gula Aren', category: 'minum', price: 15000, cover: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800', desc: 'Kopi susu creamy buat nahan ngantuk main sampai pagi.', branches: ['simongan', 'chapter03', 'pleburan'] },
  { id: 17, title: 'Air Mineral (Aqua)', category: 'minum', price: 4000, cover: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800', desc: 'Air putih dingin menyegarkan.', branches: ['all', 'simongan', 'tembalang', 'chapter03', 'pleburan'] },
  { id: 18, title: 'Es Jeruk Peras', category: 'minum', price: 7000, cover: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=800', desc: 'Manis asam segar, penurun emosi kalau kalah main Tekken.', branches: ['all', 'simongan', 'tembalang', 'chapter03', 'pleburan'] },
  { id: 19, title: 'Matcha Latte Ice', category: 'minum', price: 18000, cover: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800', desc: 'Minuman teh hijau Jepang creamy yang bikin rileks.', branches: ['tembalang', 'chapter03', 'pleburan'] },
  { id: 20, title: 'Red Velvet Cold', category: 'minum', price: 18000, cover: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800', desc: 'Rasa kue red velvet cair yang lembut dan manis di tenggorokan.', branches: ['tembalang', 'chapter03'] },
];
