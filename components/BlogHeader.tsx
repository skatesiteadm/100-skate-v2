import Link from 'next/link'

export default function BlogHeader({
  title,
  description,
  level,
}: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <>
          {/* Barra preta do topo */}
          <div className="w-full bg-black text-white text-xs flex justify-between items-center px-4 md:px-8 py-2">
            <div className="flex gap-3 md:gap-5">
              <Link href="/loja" className="hover:text-gray-300 tracking-widest">LOJA</Link>
              <Link href="/anuncie" className="hover:text-gray-300 tracking-widest">ANUNCIE</Link>
              <Link href="/contato" className="hover:text-gray-300 tracking-widest hidden md:block">CONTATO</Link>
            </div>
            <div className="flex gap-3 items-center text-xs">
              <span className="hidden md:block">🔍</span>
              <a href="https://instagram.com/cemporcentoskate" target="_blank" className="hover:text-gray-300">IG</a>
              <a href="https://youtube.com" target="_blank" className="hover:text-gray-300">YT</a>
            </div>
          </div>

          {/* Logo centralizado */}
          <header className="flex justify-center items-center pt-6 pb-0 w-full">
            <Link href="/" className="flex justify-center">
              <img
                src="/logoskate.svg"
                alt="CEMPORCENTOSKATE"
                style={{ height: '220px', width: 'auto' }}
              />
            </Link>
          </header>

          {/* Menu de categorias */}
          <nav className="w-full border-y border-gray-200 mb-12 overflow-x-auto">
            <ul className="flex gap-4 md:gap-8 px-4 md:px-8 py-6 text-xs md:text-sm font-bold uppercase whitespace-nowrap justify-center">
              <li><Link href="/" className="hover:text-red-600 transition-colors">Fiksperto</Link></li>
              <li><Link href="/" className="hover:text-red-600 transition-colors">Vídeos</Link></li>
              <li><Link href="/" className="hover:text-red-600 transition-colors">Campeonatos</Link></li>
              <li><Link href="/" className="hover:text-red-600 transition-colors">Eventos</Link></li>
              <li><Link href="/" className="hover:text-red-600 transition-colors">Revista</Link></li>
            </ul>
          </nav>
        </>
      )

    case 2:
      return (
        <header className="flex justify-center items-center py-4 border-b border-gray-200 mb-8 w-full">
          <Link href="/">
            <img
              src="/logoskate.svg"
              alt="CEMPORCENTOSKATE"
              style={{ height: '50px', width: 'auto', maxWidth: '180px' }}
            />
          </Link>
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`,
      )
  }
}
