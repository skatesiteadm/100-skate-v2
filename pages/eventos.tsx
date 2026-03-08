"use client"
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useEffect, useState } from 'react'

interface Evento {
  id: string
  title: string
  date: Date
  location: string
  status: 'passado' | 'futuro'
  image: string
}

const eventos: Evento[] = [
  {
    id: '1',
    title: 'Desafio de Rua BH',
    date: new Date('2025-07-15'),
    location: 'Belo Horizonte, MG',
    status: 'passado',
    image: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'A Banca SP',
    date: new Date('2025-12-10'),
    location: 'São Paulo, SP',
    status: 'passado',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    title: '100% Chance',
    date: new Date('2026-06-20'),
    location: 'Brasil',
    status: 'futuro',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    title: 'Desafio de Rua — Interior SP',
    date: new Date('2026-07-18'),
    location: 'Interior de São Paulo, SP',
    status: 'futuro',
    image: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    title: '100% Bowl Jam Porto Alegre',
    date: new Date('2026-10-10'),
    location: 'Porto Alegre, RS',
    status: 'futuro',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
  },
]

interface CountdownUnit {
  v: number
  l: string
}

function Countdown({ date }: { date: Date }) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const update = () => setTimeLeft(Math.max(0, Math.floor((+date - Date.now()) / 1000)))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [date])

  const days = Math.floor(timeLeft / 86400)
  const hours = Math.floor((timeLeft % 86400) / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const units: CountdownUnit[] = [
    { v: days, l: 'Dias' },
    { v: hours, l: 'Hrs' },
    { v: minutes, l: 'Min' },
    { v: seconds, l: 'Seg' },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 mt-3">
      {units.map((unit) => (
        <div key={unit.l} className="bg-zinc-800 rounded-xl p-2 text-center">
          <div className="text-lg font-black tabular-nums text-white">{unit.v.toString().padStart(2, '0')}</div>
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">{unit.l}</div>
        </div>
      ))}
    </div>
  )
}

export default function EventosPage() {
  const futuros = eventos.filter(e => e.status === 'futuro')
  const passados = eventos.filter(e => e.status === 'passado')

  return (
    <>
      <Head><title>Eventos — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          <h1 className="text-3xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-8 tracking-widest text-black dark:text-white">
            Próximos Eventos
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {futuros.map((evento) => (
              <motion.div
                key={evento.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#111111] shadow-sm"
              >
                <div className="relative overflow-hidden h-48">
                  <img src={evento.image} alt={evento.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 right-3 bg-[#ff44cc] text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest">
                    Em Breve
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-black uppercase text-lg leading-tight text-black dark:text-white">{evento.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 font-bold uppercase tracking-widest">{evento.location}</p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{evento.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  <Countdown date={evento.date} />
                </div>
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-8 tracking-widest text-black dark:text-white">
            Eventos Passados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {passados.map((evento) => (
              <motion.div
                key={evento.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex gap-4 p-4 bg-white dark:bg-[#111111]"
              >
                <img src={evento.image} alt={evento.title} className="w-32 h-24 object-cover rounded-xl flex-shrink-0 grayscale" />
                <div className="flex flex-col justify-center">
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500 mb-1">Encerrado</span>
                  <h3 className="font-black uppercase text-base leading-tight text-black dark:text-white">{evento.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 font-bold">{evento.location}</p>
                  <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{evento.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}
