import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function MoreStories({ posts }: { posts: Post[] }) {
  const col1 = posts.slice(0, 3)
  const col2 = posts.slice(3, 6)
  const col3 = posts.slice(6, 9)

  return (
    <div className="space-y-12 mb-16">

      {/* Seção Fiksperto */}
      {col1.length > 0 && (
        <section>
          <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
            Fiksperto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {col1.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Banner anunciante */}
      <div className="w-full bg-gray-100 flex items-center justify-center h-24 border border-dashed border-gray-300 text-gray-400 text-sm font-bold uppercase tracking-widest">
        Espaço Anunciante — 970×90
      </div>

      {/* Seção Vídeos */}
      {col2.length > 0 && (
        <section>
          <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
            Vídeos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {col2.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Seção Eventos */}
      {col3.length > 0 && (
        <section>
          <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
            Eventos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {col3.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col gap-2">
      <div className="relative aspect-video overflow-hidden">
        <CoverImage slug={post.slug} title={post.title} image={post.coverImage} />
      </div>
      <h3 className="text-sm font-bold uppercase leading-tight">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
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
