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
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
        setResults([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch {
        setResults([])
      }
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim().length > 0) {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
      setQuery('')
      setResults([])
    }
  }

  function getTypeLabel(type: string) {
    switch (type) {
      case 'post': return 'Materia'
      case 'evento': return 'Evento'
      case 'revista': return 'Revista'
      default: return ''
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hover:text-pink-400 transition-colors"
        aria-label="Buscar"
      >
        🔍
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar..."
          className="bg-transparent border-b border-white/40 text-white text-xs outline-none w-28 md:w-40 py-0.5 placeholder-gray-400"
        />
        <button
          type="button"
          onClick={() => { setOpen(false); setQuery(''); setResults([]) }}
          className="text-gray-400 hover:text-white text-xs"
        >
          ✕
        </button>
      </form>

      {query.length >= 2 && (
        <div className="absolute top-8 right-0 w-72 bg-black border border-gray-800 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
          {loading && (
            <p className="text-xs text-gray-500 p-3">Buscando...</p>
          )}
          {!loading && results.length === 0 && (
            <p className="text-xs text-gray-500 p-3">Nenhum resultado.</p>
          )}
          {!loading && results.map((item) => (
            <Link
              key={item._id}
              href={item._type === 'post' ? `/posts/${item.slug}` : '#'}
              onClick={() => { setOpen(false); setQuery(''); setResults([]) }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900 transition-colors border-b border-gray-800/50 last:border-0"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#ff44cc] font-bold">
                  {getTypeLabel(item._type)}
                </span>
                <p className="text-xs text-white font-bold leading-tight">{item.title}</p>
              </div>
            </Link>
          ))}
          {!loading && results.length > 0 && (
            <button
              onClick={handleSubmit as any}
              className="w-full text-center text-xs text-[#ff44cc] font-bold uppercase tracking-widest py-2 hover:bg-gray-900 transition-colors"
            >
              Ver todos os resultados →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
