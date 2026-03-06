import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface SearchResult {
  _id: string
  title: string
  slug: string
  _type: string
}

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    if (!open) { setQuery(''); setResults([]) }
  }, [open])

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch { setResults([]) }
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    if (query.trim().length > 0) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
    }
  }

  function getTypeLabel(type: string) {
    switch (type) {
      case 'post': return 'Matéria'
      case 'evento': return 'Evento'
      case 'revista': return 'Revista'
      default: return ''
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hover:text-pink-400 transition-colors"
        aria-label="Buscar"
      >
        🔍
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <span className="text-xl">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar matérias, eventos, revista..."
                className="flex-1 text-base outline-none text-black placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-black text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </form>

            <div className="max-h-96 overflow-y-auto">
              {loading && (
                <p className="text-sm text-gray-400 p-5">Buscando...</p>
              )}
              {!loading && query.length >= 2 && results.length === 0 && (
                <p className="text-sm text-gray-400 p-5">Nenhum resultado para "{query}".</p>
              )}
              {!loading && query.length < 2 && (
                <p className="text-sm text-gray-400 p-5">Digite pelo menos 2 caracteres para buscar.</p>
              )}
              {!loading && results.map((item) => (
                <Link
                  key={item._id}
                  href={item._type === 'post' ? `/posts/${item.slug}` : '#'}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#ff44cc] font-black">
                      {getTypeLabel(item._type)}
                    </span>
                    <p className="text-sm text-black font-bold leading-tight">{item.title}</p>
                  </div>
                </Link>
              ))}
              {!loading && results.length > 0 && (
                <button
                  onClick={() => handleSubmit()}
                  className="w-full text-center text-xs text-[#ff44cc] font-black uppercase tracking-widest py-4 hover:bg-gray-50 transition-colors"
                >
                  Ver todos os resultados →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
