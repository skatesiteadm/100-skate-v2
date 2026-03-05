import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import MoreStories from 'components/MoreStories'
import YoutubeVideos from 'components/YoutubeVideos'
import LojaPreview from 'components/LojaPreview'
import { BlogGrid } from 'components/ui/blog-posts'
import * as demo from 'lib/demo.data'
import { getClient } from 'lib/sanity.client'
import type { Post, Revista, Settings } from 'lib/sanity.queries'
import imageUrlBuilder from '@sanity/image-url'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const builder = imageUrlBuilder(getClient())

function urlFor(source: any) {
  return builder.image(source).width(800).url()
}

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
  revista?: Revista | null
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings, revista } = props
  const { description = demo.description } = settings || {}

  const gridPosts = posts.slice(0, 3).map((post) => ({
    id: post._id,
    title: post.title,
    imageUrl: post.coverImage ? urlFor(post.coverImage) : '',
    slug: post.slug,
    author: post.author?.name,
    category: 'Skate',
  }))

  const morePosts = posts.slice(3)

  return (
    <>
      <IndexPageHead settings={settings} />
      <Layout preview={preview} loading={loading}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={description} level={1} />
          <BlogGrid posts={gridPosts} />

          {/* Banner anunciante */}
          <div className="w-full my-8 flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-xl" style={{ height: '120px' }}>
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Espaço Publicitário — 970×90</span>
          </div>

          {/* Seção Revista */}
          {revista && (
            <section className="my-12 bg-black text-white rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative flex justify-center items-center p-8 md:p-12 bg-gradient-to-br from-gray-900 to-black">
                  {revista.capa && (
                    <div className="relative">
                      <span className="absolute -top-3 -right-3 bg-[#ff44cc] text-white text-xs font-black uppercase px-3 py-1 rounded-full z-10 tracking-widest">
                        Nova Edição
                      </span>
                      <Image
  src={urlFor(revista.capa)}
  alt={revista.titulo || ''}
  width={300}
  height={400}
  className="rounded-lg shadow-2xl object-contain"
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
          )}

          <YoutubeVideos />
<LojaPreview />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
        <Suspense />
      </Layout>
    </>
  )
}
