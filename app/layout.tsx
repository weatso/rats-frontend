import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ThemeFavicon from "./ThemeFavicon"; // <-- 1. Import komponen baru kita
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RATS GAME - Premium PS5 Rental",
  description: "Premium PS5 Rental Reservation System",
  // <-- 2. Konfigurasi "icons" dihapus dari sini karena sudah diurus oleh ThemeFavicon
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeFavicon /> {/* <-- 3. Pasang pendeteksi favicon di sini */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}