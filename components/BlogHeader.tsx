import Link from 'next/link'
import SearchBar from 'components/SearchBar'

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
  switch (level) {
    case 1:
      return (
        <>
          <div className="w-full bg-black text-white text-xs flex justify-between items-center px-4 md:px-8 py-2 rounded-b-xl">
            <div className="flex gap-3 md:gap-5">
              <Link href="/loja" className="hover:text-pink-400 tracking-widest transition-colors">LOJA</Link>
              <Link href="/nossa-historia" className="hover:text-pink-400 tracking-widest transition-colors">NOSSA HISTORIA</Link>
              <Link href="/contato" className="hover:text-pink-400 tracking-widest hidden md:block transition-colors">CONTATO</Link>
            </div>
            <div className="flex gap-3 items-center text-xs">
              <SearchBar />
              <div className="hidden md:flex gap-3 items-center">
                <a href="https://instagram.com/cemporcentoskate" target="_blank" className="hover:text-pink-400 transition-colors">IG</a>
                <a href="https://youtube.com/@CemporcentoSKATE_" target="_blank" className="hover:text-pink-400 transition-colors">YT</a>
                <a href="https://tiktok.com/@cemporcentoskate" target="_blank" className="hover:text-pink-400 transition-colors">TK</a>
              </div>
            </div>
          </div>
          <header className="flex justify-center items-center pt-1 pb-0 w-full">
            <Link href="/" className="flex justify-center" onDoubleClick={() => document.documentElement.classList.toggle('dark')}>
              <img
                src="/logoskate.svg"
                alt="CEMPORCENTOSKATE"
                style={{ height: '220px', width: 'auto' }}
                className="dark:invert"
              />
            </Link>
          </header>
          {!hideNav && (
            <nav className="w-full border-y border-gray-200 dark:border-gray-800 mb-14 overflow-x-auto">
              <ul className="flex gap-4 md:gap-8 px-4 md:px-8 py-6 text-xs md:text-sm font-bold uppercase whitespace-nowrap justify-center">
                <li><Link href="/fiksperto" className="text-black dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Fiksperto</Link></li>
                <li><Link href="/videos" className="text-black dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Videos</Link></li>
                <li><Link href="/eventos" className="text-black dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Eventos</Link></li>
                <li><Link href="/revista" className="text-black dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Revista</Link></li>
                <li><Link href="/loja" className="text-black dark:text-white transition-colors hover:text-[#ff44cc] dark:hover:text-[#ff44cc]">Loja</Link></li>
              </ul>
            </nav>
          )}
        </>
      )
    case 2:
      return (
        <header className="flex justify-center items-center py-4 border-b border-gray-200 dark:border-gray-800 mb-8 w-full">
          <Link href="/">
            <img
              src="/logoskate.svg"
              alt="CEMPORCENTOSKATE"
              style={{ height: '50px', width: 'auto', maxWidth: '180px' }}
              className="dark:invert"
            />
          </Link>
        </header>
      )
    default:
      throw new Error(
        `Invalid level: ${JSON.stringify(level) || typeof level}, only 1 or 2 are allowed`,
      )
  }
}
