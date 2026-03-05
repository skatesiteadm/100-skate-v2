import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import SEO from 'components/SEO'
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
      <SEO />
      <IndexPage posts={posts} settings={settings} revista={revista} />
    </main>
  )
}

