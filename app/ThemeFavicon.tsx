"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeFavicon() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Pastikan sistem sudah berjalan sepenuhnya di browser pengunjung
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !resolvedTheme) return;

    // 1. CARI & HANCURKAN semua favicon bawaan/sisa cache yang bersembunyi
    document.querySelectorAll("link[rel*='icon']").forEach((el) => el.remove());

    // 2. BUAT elemen favicon baru secara paksa dari nol
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml"; // Memastikan browser membaca format SVG
    
    // Mode Gelap = Logo Biru, Mode Terang = Logo Pink
    link.href = resolvedTheme === "dark" ? "/images/LogoBiru.svg" : "/images/LogoPink.svg";
    
    // 3. SUNTIKKAN kembali ke posisi kepala (head) HTML
    document.head.appendChild(link);
  }, [resolvedTheme, mounted]);

  return null;
}