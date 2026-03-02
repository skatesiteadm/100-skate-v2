import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Revista, Settings, revistaQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
  revista: Revista | null
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, revista, previewMode } = props
  if (previewMode) {
    return <PreviewIndexPage posts={posts} settings={settings} />
  }
  return (
    <main>
      <IndexPage posts={posts} settings={settings} revista={revista} />
    </main>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { preview: previewMode = false, previewData } = ctx
  const client = getClient(
    previewMode ? { token: readToken, perspective: previewData } : undefined,
  )
  const [settings, posts = [], revista = null] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
    client.fetch(revistaQuery),
  ])
  return {
    props: {
      posts,
      settings,
      revista,
      previewMode,
      previewPerspective: typeof previewData === 'string' ? previewData : null,
      token: previewMode ? readToken : '',
    },
  }
}

