import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Revista, Settings, todasRevistasQuery } from 'lib/sanity.queries'
import imageUrlBuilder from '@sanity/image-url'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import type { SharedPageProps } from 'pages/_app'

const builder = imageUrlBuilder(getClient())
function urlFor(source: any) {
  return builder.image(source).width(600).url()
}

interface PageProps extends SharedPageProps {
  revistas: Revista[]
  settings: Settings
}

export default function RevistaPage({ revistas, settings }: PageProps) {
  return (
    <>
      <Head><title>Revista — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          <h1 className="text-3xl font-black uppercase border-b-2 border-black pb-2 mb-8 tracking-widest">
            Revista
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {revistas.map((revista) => (
              <div key={revista._id} className="flex flex-col gap-3">
                {/* Capa */}
                <div className="relative overflow-hidden rounded-xl bg-gray-100">
                  {revista.ativa && (
                    <span className="absolute top-2 right-2 bg-[#ff44cc] text-white text-xs font-black uppercase px-2 py-1 rounded-full z-10 tracking-widest">
                      Nova
                    </span>
                  )}
                  {revista.capa && (
                    <img
                      src={urlFor(revista.capa)}
                      alt={revista.titulo}
                      className="w-full object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Edição {revista.edicao}
                  </span>
                  <h3 className="text-sm font-black uppercase leading-tight">
                    {revista.titulo}
                  </h3>
                  {revista.descricao && (
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {revista.descricao}
                    </p>
                  )}
                </div>

                {/* Botão */}
                {revista.linkCompra ? (
                  <button
                    onClick={() => window.open(revista.linkCompra, '_blank')}
                    className="bg-black hover:bg-gray-800 text-white font-black uppercase text-xs px-4 py-2 rounded-full tracking-widest transition-colors w-full"
                  >
                    Compre Aqui
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-100 text-gray-400 font-black uppercase text-xs px-4 py-2 rounded-full tracking-widest w-full cursor-not-allowed"
                  >
                    Compre em Breve
                  </button>
                )}
              </div>
            ))}
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
  const [settings, revistas = []] = await Promise.all([
    getSettings(client),
    client.fetch(todasRevistasQuery),
  ])
  return {
    props: {
      revistas,
      settings,
      previewMode,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
  }
}
