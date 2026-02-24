import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import MoreStories from 'components/MoreStories'
import { BlogGrid } from 'components/ui/blog-posts'
import * as demo from 'lib/demo.data'
import type { Post, Settings } from 'lib/sanity.queries'
import { Suspense } from 'react'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const { description = demo.description } = settings || {}

  const gridPosts = posts.slice(0, 3).map((post) => ({
    id: post._id,
    title: post.title,
    imageUrl: post.coverImage?.url || '',
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
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </div>
        <Suspense />
      </Layout>
    </>
  )
}
