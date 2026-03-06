import Link from 'next/link'
import { DarkModeButton } from 'components/ui/flip-button'
import { useDarkMode } from 'lib/darkMode'

export default function Footer() {
  const { toggle } = useDarkMode()

  return (
    <footer className="bg-zinc-900 text-white mt-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <Link href="/">
              <img src="/logoskate.svg" alt="100% SKATE" style={{ height: '60px', width: 'auto', filter: 'invert(1)', cursor: 'pointer' }} />
            </Link>
            <p className="text-zinc-400 text-xs mt-4 leading-relaxed">
              30 anos documentando a história do skate brasileiro.
            </p>
            <div className="mt-6">
              <DarkModeButton onToggle={toggle} />
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-4 tracking-widest text-white">Conteúdo</h4>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li><Link href="/fiksperto" className="hover:text-[#ff44cc] transition-colors">Fiksperto</Link></li>
              <li><Link href="/videos" className="hover:text-[#ff44cc] transition-colors">Vídeos</Link></li>
              <li><Link href="/eventos" className="hover:text-[#ff44cc] transition-colors">Eventos</Link></li>
              <li><Link href="/revista" className="hover:text-[#ff44cc] transition-colors">Revista</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-4 tracking-widest text-white">Institucional</h4>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li><Link href="/nossa-historia" className="hover:text-[#ff44cc] transition-colors">Nossa História</Link></li>
              <li><Link href="/contato" className="hover:text-[#ff44cc] transition-colors">Contato</Link></li>
              <li><Link href="/loja" className="hover:text-[#ff44cc] transition-colors">Loja</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-sm mb-4 tracking-widest text-white">Redes Sociais</h4>
            <ul className="space-y-2 text-zinc-400 text-xs">
              <li><a href="https://instagram.com/cemporcentoskate" target="_blank" rel="noreferrer" className="hover:text-[#ff44cc] transition-colors">Instagram</a></li>
              <li><a href="https://youtube.com/@CemporcentoSKATE_" target="_blank" rel="noreferrer" className="hover:text-[#ff44cc] transition-colors">YouTube</a></li>
              <li><a href="https://tiktok.com/@cemporcentoskate" target="_blank" rel="noreferrer" className="hover:text-[#ff44cc] transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-6 text-center text-zinc-500 text-xs">
          © {new Date().getFullYear()} 100% SKATE — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
