import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SEO from 'components/SEO'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { getClient, getSettings } from 'lib/sanity.client'
import { Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'
import { readToken } from 'lib/sanity.api'
import { urlForImage } from 'lib/sanity.image'

interface SearchResult {
  _id: string
  _type: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: any
  author?: { name: string }
  date?: string
}

interface PageProps extends SharedPageProps {
  settings: Settings
}

export default function BuscaPage({ settings }: PageProps) {
  const router = useRouter()
  const q = (router.query.q as string) || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (q.length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || [])
        setLoading(false)
      })
      .catch(() => {
        setResults([])
        setLoading(false)
      })
  }, [q])

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
      <SEO
        title={q ? `Busca: ${q}` : 'Busca'}
        description={`Resultados de busca no site da 100%SKATE para ${q}.`}
      />
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          <div className="mb-12">
            <h1 className="text-2xl md:text-3xl font-black uppercase mb-2 text-black dark:text-white">
              {q ? `Resultados para: ${q}` : 'Busca'}
            </h1>
            {!loading && results.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {loading && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">Buscando...</p>
          )}

          {!loading && q.length >= 2 && results.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl font-bold text-gray-400 mb-2">Nenhum resultado encontrado.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tente buscar com outros termos.</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {results.map((item) => (
                <Link
                  key={item._id}
                  href={item._type === 'post' ? `/posts/${item.slug}` : '#'}
                  className="group flex flex-col gap-2"
                >
                  {item.coverImage && (
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                      <Image
                        src={urlForImage(item.coverImage).width(400).url()}
                        alt={item.title || ''}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <span className="text-[10px] uppercase tracking-widest text-[#ff44cc] font-bold">
                    {getTypeLabel(item._type)}
                  </span>
                  <h3 className="text-sm font-bold uppercase leading-tight group-hover:text-[#ff44cc] transition-colors text-black dark:text-white">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{item.excerpt}</p>
                  )}
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {item.author?.name && <span>{item.author.name}</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}
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
  const settings = await getSettings(client)
  return {
    props: {
      settings,
      previewMode,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
  }
}
