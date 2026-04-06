import { useEffect, useState } from 'react'

const STORAGE_KEY = '100skate_newsletter_seen'
const DISMISS_KEY = '100skate_newsletter_dismissed'
const MAX_DISMISSALS = 4

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const done = localStorage.getItem(STORAGE_KEY)
    const dismissals = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10)
    if (!done && dismissals < MAX_DISMISSALS) {
      const timer = setTimeout(() => setVisible(true), 10000)
      return () => clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    const dismissals = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10) + 1
    if (dismissals >= MAX_DISMISSALS) {
      localStorage.setItem(STORAGE_KEY, '1')
    }
    localStorage.setItem(DISMISS_KEY, String(dismissals))
    setVisible(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email inválido')
      return
    }
    setError('')
    try {
      const res = await fetch('https://formspree.io/f/xreornzq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _gotcha: '' }),
      })
      if (res.ok) {
        setEnviado(true)
        localStorage.setItem(STORAGE_KEY, '1')
      } else {
        setError('Erro ao cadastrar. Tente novamente.')
      }
    } catch {
      setError('Erro ao cadastrar. Tente novamente.')
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={dismiss} />
      <div className="relative bg-black text-white rounded-2xl p-8 w-full max-w-lg z-10">
        <img src="/logoskate.svg" alt="100% SKATE" className="h-8 mb-6" style={{ filter: 'brightness(0) saturate(100%) invert(39%) sepia(98%) saturate(2055%) hue-rotate(285deg) brightness(101%)' }} />

        {enviado ? (
          <div className="text-center py-4">
            <span className="text-[#ff44cc] text-3xl font-black block mb-2">ok.</span>
            <p className="text-gray-400 text-sm">Você está dentro. A gente manda novidade em breve.</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-black uppercase tracking-widest text-[#ff44cc] mb-2">Newsletter</p>
            <h2 className="text-2xl font-black uppercase leading-tight mb-1">Fique por dentro</h2>
            <p className="text-gray-400 text-sm mb-6">
              Novidades, edições e ofertas direto no seu email.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="flex gap-2 mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="seu@email.com"
                  className="flex-1 bg-zinc-800 text-white placeholder-gray-500 border-2 border-zinc-700 focus:border-[#ff44cc] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#ff44cc] text-white font-black uppercase text-xs px-5 rounded-xl hover:bg-pink-500 transition-colors shrink-0"
                >
                  Entrar
                </button>
              </div>
              {error && <p className="text-red-500 text-xs font-bold mb-2">{error}</p>}
            </form>

            <button
              onClick={dismiss}
              className="text-gray-500 text-xs font-bold hover:text-gray-300 transition-colors w-full text-center mt-1"
            >
              Não quero participar
            </button>
          </>
        )}
      </div>
    </div>
  )
}
