import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Revista, Settings, todasRevistasQuery } from 'lib/sanity.queries'
import imageUrlBuilder from '@sanity/image-url'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
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

          <h1 className="text-3xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-8 tracking-widest text-black dark:text-white">
            Revista
          </h1>

          <div className="flex flex-col gap-8 mb-16">
            {revistas.map((revista) => (
              <section key={revista._id} className="bg-black text-white rounded-2xl overflow-hidden border border-transparent dark:border-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative flex justify-center items-center p-8 md:p-12 bg-gradient-to-br from-gray-900 to-black">
                    {revista.capa && (
                      <div className="relative">
                        {revista.ativa && (
                          <span className="absolute -top-3 -right-3 bg-[#ff44cc] text-white text-xs font-black uppercase px-3 py-1 rounded-full z-10 tracking-widest">
                            Nova Edição
                          </span>
                        )}
                        <img
                          src={urlFor(revista.capa)}
                          alt={revista.titulo}
                          className="rounded-lg shadow-2xl max-h-80 w-auto object-contain"
                          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }}
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
                    {revista.materiaDestaque && (
                      <div className="border-t border-gray-800 pt-5">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-500 block mb-2">
                          Matéria de Capa
                        </span>
                        <div className="flex items-center gap-4 flex-wrap">
                          <Link href={`/posts/${revista.materiaDestaque.slug}`} className="font-black uppercase text-lg hover:text-[#ff44cc] transition-colors">
                            {revista.materiaDestaque.title}
                          </Link>
                          {revista.linkCompra ? (
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
                    )}
                  </div>
                </div>
              </section>
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
