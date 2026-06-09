import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import { readToken } from 'lib/sanity.api'
import { getClient, getPostCount, getPostsPage, getSettings } from 'lib/sanity.client'
import type { Post, Settings } from 'lib/sanity.queries'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { SharedPageProps } from 'pages/_app'

const PER_PAGE = 21

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
  page: number
  totalPages: number
}

export default function FikspertoPage({ posts, page, totalPages }: PageProps) {
  return (
    <>
      <Head>
        <title>{page > 1 ? `Fiksperto — Página ${page} — 100% SKATE` : 'Fiksperto — 100% SKATE'}</title>
      </Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />
          <h1 className="text-3xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-8 tracking-widest text-black dark:text-white">
            Fiksperto
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {posts.map((post) => (
              <article key={post._id} className="flex flex-col gap-2">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-900">
                  <CoverImage slug={post.slug} title={post.title} image={post.coverImage} />
                </div>
                <h3 className="text-sm font-bold uppercase leading-tight text-black dark:text-white">
                  <Link href={`/posts/${post.slug}`} className="hover:text-[#ff44cc] transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <div className="text-xs text-gray-500 dark:text-zinc-400">
                  {post.author?.name && <span>{post.author.name} • </span>}
                  <Date dateString={post.date} />
                </div>
              </article>
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} />
        </div>
      </Layout>
    </>
  )
}

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-between mb-16 border-t border-zinc-200 dark:border-zinc-800 pt-8">
      {page > 1 ? (
        <Link
          href={page === 2 ? '/fiksperto' : `/fiksperto/${page - 1}`}
          className="font-black uppercase text-sm tracking-widest text-black dark:text-white hover:text-[#ff44cc] dark:hover:text-[#ff44cc] transition-colors"
        >
          ← Anterior
        </Link>
      ) : (
        <span className="opacity-0 pointer-events-none">←</span>
      )}

      <span className="text-xs text-zinc-400 tabular-nums tracking-widest">
        {page} / {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={`/fiksperto/${page + 1}`}
          className="font-black uppercase text-sm tracking-widest text-black dark:text-white hover:text-[#ff44cc] dark:hover:text-[#ff44cc] transition-colors"
        >
          Próxima →
        </Link>
      ) : (
        <span className="opacity-0 pointer-events-none">→</span>
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const total = await getPostCount(client)
  const totalPages = Math.ceil(total / PER_PAGE)

  const paths = [
    { params: { page: [] } },
    ...Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      params: { page: [String(i + 2)] },
    })),
  ]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { params, preview: previewMode = false, previewData } = ctx
  const pageParam = Array.isArray(params?.page) ? params.page[0] : undefined
  const page = pageParam ? parseInt(pageParam, 10) : 1

  if (isNaN(page) || page < 1) return { notFound: true }

  const client = getClient(
    previewMode ? { token: readToken, perspective: previewData } : undefined,
  )

  const start = (page - 1) * PER_PAGE
  const end = start + PER_PAGE

  const [settings, posts, total] = await Promise.all([
    getSettings(client),
    getPostsPage(client, start, end),
    getPostCount(client),
  ])

  const totalPages = Math.ceil(total / PER_PAGE)

  if (page > totalPages && totalPages > 0) return { notFound: true }

  return {
    props: {
      posts,
      settings,
      page,
      totalPages,
      previewMode,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
    revalidate: 60,
  }
}
