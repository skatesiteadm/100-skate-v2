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
          <div className="w-full bg-black text-white text-xs flex justify-between items-center px-6 py-2">
            <div className="flex gap-4">
              <Link href="/loja" className="hover:text-gray-300">LOJA</Link>
              <Link href="/anuncie" className="hover:text-gray-300">ANUNCIE</Link>
              <Link href="/contato" className="hover:text-gray-300">CONTATO</Link>
            </div>
            <div className="flex gap-3">
              <span>🔍</span>
              <span>Instagram</span>
              <span>YouTube</span>
            </div>
          </div>

          {/* Logo centralizado */}
          <header className="flex justify-center items-center py-6 border-b border-gray-200">
            <Link href="/">
              <img
                src="/logoskate.svg"
                alt="CEMPORCENTOSKATE"
                style={{ height: '100px', width: 'auto' }}
              />
            </Link>
          </header>

          {/* Menu de categorias */}
          <nav className="w-full border-b border-gray-200 mb-8">
            <ul className="flex gap-6 px-6 py-3 text-sm font-bold uppercase">
              <li><Link href="/" className="hover:text-red-600">Fiksperto</Link></li>
              <li><Link href="/" className="hover:text-red-600">Vídeos</Link></li>
              <li><Link href="/" className="hover:text-red-600">Campeonatos</Link></li>
              <li><Link href="/" className="hover:text-red-600">Eventos</Link></li>
              <li><Link href="/" className="hover:text-red-600">Revista</Link></li>
            </ul>
          </nav>
        </>
      )

    case 2:
      return (
        <header className="flex justify-start items-center py-4 border-b border-gray-200 mb-8">
          <Link href="/">
            <img
              src="/logoskate.svg"
              alt="CEMPORCENTOSKATE"
              style={{ height: '50px', width: 'auto' }}
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
