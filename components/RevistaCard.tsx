import Link from 'next/link'
import { urlForImage } from 'lib/sanity.image'
import type { Revista } from 'lib/sanity.queries'

interface RevistaCardProps {
  revista: Revista
  showBadge?: boolean
}

export default function RevistaCard({ revista, showBadge = false }: RevistaCardProps) {
  return (
    <section className="bg-black text-white rounded-2xl overflow-hidden border border-transparent dark:border-zinc-800 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative flex justify-center items-center p-8 md:p-12 bg-gradient-to-br from-gray-900 to-black dark:from-[#111] dark:to-black">
          {revista.capa && (
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl aurora-frame" />
              <div className="absolute -inset-1 rounded-xl border border-[#ff44cc] opacity-60 z-10" />
              {showBadge && (
                <span className="absolute -top-3 -right-3 bg-[#ff44cc] text-white text-xs font-black uppercase px-3 py-1 rounded-full z-30 tracking-widest">
                  Nova Edição
                </span>
              )}
              <img
                src={urlForImage(revista.capa).width(600).url()}
                alt={revista.titulo || ''}
                className="relative rounded-lg shadow-2xl max-h-80 w-auto object-contain z-20"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-gray-400 border border-gray-700 px-3 py-1 rounded-full">
              Edição {revista.edicao}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff44cc]">
              Revista
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-black uppercase leading-tight">
            {revista.titulo}
          </h3>

          {revista.descricao && (
            <p className="text-gray-400 leading-relaxed text-sm">{revista.descricao}</p>
          )}

          {revista.materias && revista.materias.length > 0 && (
            <div className="border-t border-gray-800 pt-5">
              <span className="text-xs font-black uppercase tracking-widest text-gray-500 block mb-3">
                Nesta Edição
              </span>
              <ul className="flex flex-col gap-1">
                {revista.materias.map((materia, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#ff44cc] text-xs">•</span>
                    <span className="uppercase text-sm text-white">{materia.titulo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {revista.materiaDestaque && (
            <div className="border-t border-gray-800 pt-5">
              <span className="text-xs font-black uppercase tracking-widest text-gray-500 block mb-2">
                Matéria de Capa
              </span>
              <Link
                href={`/posts/${revista.materiaDestaque.slug}`}
                className="font-black uppercase text-lg hover:text-[#ff44cc] transition-colors"
              >
                {revista.materiaDestaque.title}
              </Link>
            </div>
          )}

          <div className="border-t border-gray-800 pt-5">
            {revista.esgotada ? (
              <button
                disabled
                className="bg-gray-800 text-gray-500 font-black uppercase text-xs px-5 py-2 rounded-full tracking-widest whitespace-nowrap cursor-not-allowed"
              >
                Sold Out
              </button>
            ) : revista.linkCompra ? (
              <button
                onClick={() => window.open(revista.linkCompra, '_blank')}
                className="bg-[#ff44cc] hover:bg-[#ff44cc]/80 text-white font-black uppercase text-xs px-5 py-2 rounded-full tracking-widest transition-colors whitespace-nowrap"
              >
                Compre Aqui
              </button>
            ) : (
              <button
                disabled
                className="bg-gray-800 text-gray-500 font-black uppercase text-xs px-5 py-2 rounded-full tracking-widest whitespace-nowrap cursor-not-allowed"
              >
                Compre em Breve
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
