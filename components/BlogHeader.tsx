import Link from 'next/link'
import SearchBar from 'components/SearchBar'
import { useDarkMode } from 'lib/darkMode'
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function BlogHeader({
  title,
  description,
  level,
  hideNav = false,
}: {
  title: string
  description?: any[]
  level: 1 | 2
  hideNav?: boolean
}) {
  const { dark, toggle } = useDarkMode()
  const router = useRouter()
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [flipping, setFlipping] = useState(false)

  function handleLogoClick() {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current)
      clickTimer.current = null
      setFlipping(true)
      setTimeout(() => setFlipping(false), 600)
      toggle()
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null
        router.push('/')
      }, 250)
    }
  }

  const logoFilter = dark
  ? 'brightness(0) saturate(100%) invert(30%) sepia(100%) saturate(500%) hue-rotate(280deg) brightness(1.2)'
  : 'brightness(0)'

  const flipStyle = flipping
    ? { animation: 'logoFlip 0.6s ease' }
    : {}

  switch (level) {
    case 1:
      return (
        <>
          <style>{`
            @keyframes logoFlip {
              0% { transform: rotateX(0deg); }
              50% { transform: rotateX(90deg); }
              100% { transform: rotateX(0deg); }
            }
          `}</style>

          <div className="w-full bg-zinc-900 dark:bg-zinc-200 text-zinc-300 dark:text-black text-xs flex justify-between items-center px-4 md:px-8 py-2 rounded-b-xl">
            <div className="flex gap-3 md:gap-5">
              <Link href="/loja" className="hover:text-[#ff44cc] tracking-widest transition-colors">LOJA</Link>
              <Link href="/nossa-historia" className="hover:text-[#ff44cc] tracking-widest transition-colors">NOSSA HISTÓRIA</Link>
              <Link href="/contato" className="hover:text-[#ff44cc] tracking-widest hidden md:block transition-colors">CONTATO</Link>
            </div>
            <div className="flex gap-3 items-center text-xs">
              <SearchBar />
              <div className="hidden md:flex gap-3 items-center">
                <a href="https://instagram.com/cemporcentoskate" target="_blank" rel="noreferrer" className="hover:text-[#ff44cc] transition-colors" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@CemporcentoSKATE_" target="_blank" rel="noreferrer" className="hover:text-[#ff44cc] transition-colors" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@cemporcentoskate" target="_blank" rel="noreferrer" className="hover:text-[#ff44cc] transition-colors" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <header className="flex justify-center items-center pt-1 pb-0 w-full" style={{ perspective: '800px' }}>
            <img
              src="/logoskate.svg"
              alt="CEMPORCENTOSKATE"
              onClick={handleLogoClick}
              className="h-[140px] md:h-[220px]"
              style={{
                width: 'auto',
                cursor: 'pointer',
                filter: logoFilter,
                transition: 'filter 0.4s ease',
                ...flipStyle,
              }}
            />
          </header>

          {!hideNav && (
            <nav className="w-full border-y border-zinc-800 mb-4 md:mb-14 overflow-x-auto">
              <ul className="flex gap-4 md:gap-8 px-4 md:px-8 py-3 md:py-6 text-xs md:text-sm font-bold uppercase whitespace-nowrap justify-center">
                <li><Link href="/fiksperto" className="text-gray-900 dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Fiksperto</Link></li>
                <li><Link href="/videos" className="text-gray-900 dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Vídeos</Link></li>
                <li><Link href="/eventos" className="text-gray-900 dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Eventos</Link></li>
                <li><Link href="/revista" className="text-gray-900 dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Revista</Link></li>
                <li><Link href="/loja" className="text-gray-900 dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Loja</Link></li>
              </ul>
            </nav>
          )}
        </>
      )
    case 2:
      return (
        <header className="flex justify-center items-center py-4 border-b border-zinc-800 mb-8 w-full" style={{ perspective: '800px' }}>
          <img
            src="/logoskate.svg"
            alt="100%SKATE"
            onClick={handleLogoClick}
            style={{
              height: '50px',
              width: 'auto',
              maxWidth: '180px',
              cursor: 'pointer',
              filter: logoFilter,
              transition: 'filter 0.4s ease',
              ...flipStyle,
            }}
          />
        </header>
      )
    default:
      throw new Error(
        `Invalid level: ${JSON.stringify(level) || typeof level}, only 1 or 2 are allowed`,
      )
  }
}
