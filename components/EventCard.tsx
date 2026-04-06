import { AnimatePresence, motion } from 'framer-motion'
import { Evento, EventoDate } from 'lib/sanity.queries'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

// Evento começa às 08:00 e termina à meia-noite do dia de fim
const toStart = (dateStr: string) => new Date(`${dateStr}T08:00:00`)
const toEnd = (dateStr: string) => new Date(`${dateStr}T23:59:59`)

const entryEnd = (d: EventoDate) => toEnd(d.endDate ?? d.date)
const isOngoing = (d: EventoDate, now: Date) => toStart(d.date) <= now && entryEnd(d) >= now
const isPast = (d: EventoDate, now: Date) => entryEnd(d) < now
const isFuture = (d: EventoDate, now: Date) => toStart(d.date) > now

function Countdown({ target }: { target: Date | null }) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (!target) { setTimeLeft(0); return }
    const update = () => setTimeLeft(Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000)))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [target])

  const days = Math.floor(timeLeft / 86400)
  const hours = Math.floor((timeLeft % 86400) / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const units = [
    { v: days, l: 'Dias' },
    { v: hours, l: 'Hrs' },
    { v: minutes, l: 'Min' },
    { v: seconds, l: 'Seg' },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 mt-3">
      {units.map((unit) => (
        <div key={unit.l} className="bg-zinc-800 rounded-xl p-2 text-center">
          <div className="text-lg font-black tabular-nums text-white">
            {unit.v.toString().padStart(2, '0')}
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">{unit.l}</div>
        </div>
      ))}
    </div>
  )
}

function formatDateRange(d: EventoDate) {
  const fmt = (str: string) =>
    toStart(str).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  if (d.endDate && d.endDate !== d.date) {
    const start = toStart(d.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    const end = toStart(d.endDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    return `${start} a ${end}`
  }
  return fmt(d.date)
}

interface EventCardProps {
  evento: Evento
}

export default function EventCard({ evento }: EventCardProps) {
  const now = new Date()
  const dates = evento.dates ?? []

  const firstActiveIndex = dates.findIndex((d) => !isPast(d, now))
  const initialIndex = firstActiveIndex >= 0 ? firstActiveIndex : Math.max(0, dates.length - 1)

  const [selectedIndex, setSelectedIndex] = useState(initialIndex)

  if (!dates.length) return null

  const current = dates[selectedIndex]
  const hasMultiple = dates.length > 1
  const currentIsPast = isPast(current, now)

  // Countdown: próximo evento que ainda não começou
  const nextFuture = dates.find((d) => isFuture(d, now))
  const currentOngoing = dates.find((d) => isOngoing(d, now))
  const anyOngoing = !!currentOngoing

  const countdownTarget = nextFuture
    ? toStart(nextFuture.date)
    : null

  const badge = anyOngoing ? 'Hoje' : 'Em Breve'
  const badgeColor = anyOngoing ? 'bg-green-500' : 'bg-[#ff44cc]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#111111] shadow-sm"
    >
      {/* Imagem fixa */}
      <div className="relative overflow-hidden h-48">
        {evento.image && (
          <img src={evento.image} alt={evento.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className={`absolute top-3 right-3 ${badgeColor} text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest`}>
          {badge}
        </span>
      </div>

      <div className="p-5">
        {/* Titulo fixo */}
        <h3 className="text-center font-black uppercase text-lg leading-tight text-black dark:text-white">
          {evento.title}
        </h3>

        {/* Bloco navegavel: cidade + datas */}
        <div className="flex items-center gap-1 mt-2">
          {hasMultiple && (
            <button
              onClick={() => setSelectedIndex((i) => i - 1)}
              disabled={selectedIndex === 0}
              aria-label="Etapa anterior"
              className="flex shrink-0 items-center justify-center rounded-full bg-black/70 text-[#fe44cb] transition-opacity disabled:opacity-30"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <ChevronLeft size={18} />
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="min-w-0 flex-1 text-center"
            >
              <p className={`truncate text-xs font-bold uppercase tracking-widest ${currentIsPast ? 'text-zinc-500' : 'text-gray-500 dark:text-zinc-400'}`}>
                {current.cities}
              </p>
              <p className={`mt-0.5 text-xs ${currentIsPast ? 'text-zinc-600 line-through' : 'text-gray-400 dark:text-zinc-500'}`}>
                {formatDateRange(current)}
              </p>
              {currentIsPast && (
                <p className="mt-0.5 text-xs font-black uppercase tracking-widest text-zinc-500">
                  Realizado
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {hasMultiple && (
            <button
              onClick={() => setSelectedIndex((i) => i + 1)}
              disabled={selectedIndex === dates.length - 1}
              aria-label="Proxima etapa"
              className="flex shrink-0 items-center justify-center rounded-full bg-black/70 text-[#fe44cb] transition-opacity disabled:opacity-30"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Indicador de posicao */}
        {hasMultiple && (
          <p className="mt-1 text-center text-xs font-bold tracking-widest text-gray-400 dark:text-zinc-500">
            {selectedIndex + 1} / {dates.length}
          </p>
        )}

        {/* Countdown sempre aponta pro proximo evento futuro */}
        {anyOngoing ? (
          <div className="mt-3 rounded-xl bg-green-900/40 px-4 py-3 text-center">
            <p className="text-sm font-black uppercase tracking-widest text-green-400">
              Acontecendo agora
            </p>
          </div>
        ) : (
          <Countdown target={countdownTarget} />
        )}

        {evento.linkAtivo === 'inscricao' && evento.linkInscricao && (
          <a
            href={evento.linkInscricao}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block w-full rounded-full border-2 border-[#ff44cc] bg-white px-4 py-2 text-center text-xs font-black uppercase tracking-widest text-black transition-opacity hover:opacity-80 dark:bg-black dark:text-white"
          >
            Saiba Mais
          </a>
        )}
        {evento.linkAtivo === 'materia' && evento.linkMateria && (
          <a
            href={evento.linkMateria}
            className="mt-4 block w-full rounded-full border-2 border-black bg-[#ff44cc] px-4 py-2 text-center text-xs font-black uppercase tracking-widest text-white transition-opacity hover:opacity-80 dark:border-white"
          >
            Ver Matéria
          </a>
        )}
      </div>
    </motion.div>
  )
}
