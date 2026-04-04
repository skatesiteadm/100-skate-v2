import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import MoreStories from 'components/MoreStories'
import VideoCarousel from 'components/VideoCarousel'
import { BlogGrid } from 'components/ui/blog-posts'
import * as demo from 'lib/demo.data'
import { getClient } from 'lib/sanity.client'
import type { Post, Revista, Settings } from 'lib/sanity.queries'
import { urlForImage } from 'lib/sanity.image'
import { Suspense } from 'react'
import BannerSlot from 'components/BannerSlot'
import RevistaCard from 'components/RevistaCard'
import LojaPreview from 'components/LojaPreview'


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
    imageUrl: post.coverImage ? urlForImage(post.coverImage).width(800).url() : '',
    slug: post.slug,
    author: post.author?.name,
    category: 'Skate',
  }))

  const morePosts = posts.slice(3)

  return (
    <>
      <Layout preview={preview} loading={loading}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={description} level={1} />
          <BlogGrid posts={gridPosts} />

          {/* Banner anunciante */}
          <div className="my-8">
            <BannerSlot posicao="topo" />
          </div>

          {/* Seção Revista */}
          {revista && (
            <div className="my-12">
              <RevistaCard revista={revista} showBadge={true} />
            </div>
          )}

          <VideoCarousel
            apiEndpoint="/api/youtube-videos"
            title="Vídeos Recentes →"
            accentColor="#ff44cc"
            href="/videos"
            limit={6}
          />
          <LojaPreview />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
        <Suspense />
      </Layout>
    </>
  )
}
