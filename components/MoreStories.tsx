import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function MoreStories({ posts }: { posts: Post[] }) {
  return (
    <div className="mb-16">
      <section>
        <Link href="/fiksperto" className="block hover:opacity-70 transition-opacity">
          <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest cursor-pointer">
            Mais Notícias →
          </h2>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col gap-2">
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
  )
}
