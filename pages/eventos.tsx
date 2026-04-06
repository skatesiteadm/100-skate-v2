import EventCard from 'components/EventCard'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import BannerSlot from 'components/BannerSlot'
import { motion } from 'framer-motion'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { eventosQuery, Evento, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  eventos: Evento[]
  settings: Settings
}

const mockEventos: Evento[] = [
  {
    _id: 'mock-1',
    title: 'Cave Trippin',
    dates: [
      { date: '2025-07-15T00:00:00Z', cities: 'Belo Horizonte, MG' },
      { date: '2025-08-10T00:00:00Z', cities: 'São Paulo, SP' },
      { date: '2025-09-05T00:00:00Z', cities: 'Curitiba, PR' },
    ],
    image: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=800&h=600&fit=crop',
  },
  {
    _id: 'mock-2',
    title: 'A Banca SP',
    dates: [{ date: '2025-12-10T00:00:00Z', cities: 'São Paulo, SP' }],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
  },
  {
    _id: 'mock-3',
    title: '100% Chance',
    dates: [{ date: '2026-06-20T00:00:00Z', cities: 'Brasil' }],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
  },
  {
    _id: 'mock-4',
    title: 'Desafio de Rua Interior SP',
    dates: [{ date: '2026-07-18T00:00:00Z', cities: 'Interior de São Paulo, SP' }],
    image: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=800&h=600&fit=crop',
  },
  {
    _id: 'mock-5',
    title: '100% Bowl Jam Porto Alegre',
    dates: [{ date: '2026-10-10T00:00:00Z', cities: 'Porto Alegre, RS' }],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
  },
]

const toEventEnd = (dateStr: string) => new Date(`${dateStr}T23:59:59`)
const entryEnd = (d: { date: string; endDate?: string }) => toEventEnd(d.endDate ?? d.date)

function isFuturo(e: Evento, now: Date): boolean {
  return e.dates.some((d) => entryEnd(d) >= now)
}

function isPassado(e: Evento, now: Date): boolean {
  return e.dates.every((d) => entryEnd(d) < now)
}

export default function EventosPage({ eventos }: PageProps) {
  const now = new Date()
  const data = eventos.length >= 4 ? eventos : mockEventos
  const futuros = data.filter((e) => isFuturo(e, now)).slice(0, 12)
  const passados = data.filter((e) => isPassado(e, now)).slice(-4)

  return (
    <>
      <Head><title>Eventos - 100%SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100%SKATE" description={[]} level={1} />

          <div className="mb-8">
            <BannerSlot posicao="topo" />
          </div>

          <h1 className="text-3xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-8 tracking-widest text-black dark:text-white">
            Próximos Eventos
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {futuros.map((evento) => (
              <EventCard key={evento._id} evento={evento} />
            ))}
          </div>

          <h2 className="text-3xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-8 tracking-widest text-black dark:text-white">
            Eventos Passados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {passados.map((evento) => {
              const displayDate = evento.dates[0]?.date ?? ''
              const displayLocation = evento.dates[0]?.cities ?? ''
              return (
                <motion.div
                  key={evento._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 flex gap-4 p-4 bg-white dark:bg-[#111111]"
                >
                  {evento.image && (
                    <img
                      src={evento.image}
                      alt={evento.title}
                      className="w-32 h-24 object-cover rounded-xl flex-shrink-0 grayscale"
                    />
                  )}
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500 mb-1">
                      Encerrado
                    </span>
                    <h3 className="font-black uppercase text-base leading-tight text-black dark:text-white">
                      {evento.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 font-bold">
                      {displayLocation}
                    </p>
                    {displayDate && (
                      <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">
                        {new Date(`${displayDate}T08:00:00`).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                    {evento.linkMateria && (
                      <a
                        href={evento.linkMateria}
                        className="mt-3 inline-block text-center border-2 border-black dark:border-white bg-transparent text-black dark:text-white hover:opacity-80 font-black uppercase text-xs px-4 py-2 rounded-full tracking-widest transition-opacity"
                      >
                        Ver Matéria
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { preview: previewMode = false, previewData } = ctx
  const client = getClient(
    previewMode ? { token: readToken, perspective: previewData } : undefined,
  )
  const [settings, eventosData] = await Promise.all([
    getSettings(client),
    client.fetch(eventosQuery),
  ])
  const eventos = eventosData || []
  return {
    props: {
      eventos,
      settings,
      previewMode,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
    revalidate: 60,
  }
}
