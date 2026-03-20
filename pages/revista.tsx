import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { readToken } from 'lib/sanity.api'
import { getClient, getSettings } from 'lib/sanity.client'
import { Revista, Settings, todasRevistasQuery } from 'lib/sanity.queries'
import RevistaCard from 'components/RevistaCard'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import type { SharedPageProps } from 'pages/_app'


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
              <RevistaCard key={revista._id} revista={revista} showBadge={revista.ativa} />
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
