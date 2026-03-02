import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import MoreStories from 'components/MoreStories'
import YoutubeVideos from 'components/YoutubeVideos'
import { BlogGrid } from 'components/ui/blog-posts'
import * as demo from 'lib/demo.data'
import { getClient } from 'lib/sanity.client'
import type { Post, Revista, Settings } from 'lib/sanity.queries'
import imageUrlBuilder from '@sanity/image-url'
import { Suspense } from 'react'
import Link from 'next/link'

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

          <YoutubeVideos />

          {/* Seção Revista */}
          {revista && (
            <section className="my-12">
              <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
                Revista
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Capa */}
                <div className="flex justify-center">
                  {revista.capa && (
                    <img
                      src={urlFor(revista.capa)}
                      alt={revista.titulo}
                      className="rounded-xl shadow-2xl max-h-96 w-auto object-contain"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Edição {revista.edicao}
                  </span>
                  <h3 className="text-3xl font-black uppercase leading-tight">
                    {revista.titulo}
                  </h3>
                  {revista.descricao && (
                    <p className="text-gray-600 leading-relaxed">{revista.descricao}</p>
                  )}

                  {/* Matéria de capa */}
                  {revista.materiaDestaque && (
                    <div className="border-t pt-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                        Matéria de Capa
                      </span>
                      <Link href={`/posts/${revista.materiaDestaque.slug}`} className="font-black uppercase text-lg hover:underline">
                        {revista.materiaDestaque.title}
                      </Link>
                    </div>
                  )}

                  {/* Botão compra */}
                  {revista.linkCompra ? (
                    <button
                      onClick={() => window.open(revista.linkCompra, '_blank')}
                      className="bg-black text-white font-black uppercase text-sm px-8 py-4 rounded-full tracking-widest hover:bg-gray-800 transition-colors w-fit mt-2"
                    >
                      Comprar Revista
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-200 text-gray-400 font-black uppercase text-sm px-8 py-4 rounded-full tracking-widest w-fit mt-2 cursor-not-allowed"
                    >
                      Em Breve
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
        <Suspense />
      </Layout>
    </>
  )
}
