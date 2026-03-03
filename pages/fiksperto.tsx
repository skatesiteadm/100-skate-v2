import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import type { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

export default function FikspertoPage({ posts, settings }: PageProps) {
  return (
    <>
      <Head><title>Fiksperto — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          <h1 className="text-3xl font-black uppercase border-b-2 border-black pb-2 mb-8 tracking-widest">
            Fiksperto
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {posts.map((post) => (
              <article key={post._id} className="flex flex-col gap-2">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <CoverImage slug={post.slug} title={post.title} image={post.coverImage} />
                </div>
                <h3 className="text-sm font-bold uppercase leading-tight">
                  <Link href={`/posts/${post.slug}`} className="hover:text-[#ff44cc] transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <div className="text-xs text-gray-500">
                  {post.author?.name && <span>{post.author.name} • </span>}
                  <Date dateString={post.date} />
                </div>
              </article>
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
  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
  ])
  return {
    props: {
      posts,
      settings,
      previewMode,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
  }
}
