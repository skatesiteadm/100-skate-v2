import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'

export default function HeroPost(
  props: Pick<Post, 'title' | 'coverImage' | 'date' | 'excerpt' | 'author' | 'slug'>,
) {
  const { title, coverImage, date, excerpt, author, slug } = props
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matéria destaque grande */}
        <div className="relative">
          <CoverImage slug={slug} title={title} image={coverImage} priority />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white text-xl md:text-2xl font-bold uppercase leading-tight">
              <Link href={`/posts/${slug}`} className="hover:underline">
                {title || 'Untitled'}
              </Link>
            </h3>
            <div className="text-gray-300 text-xs mt-1">
              {author?.name && <span>{author.name} • </span>}
              <Date dateString={date} />
            </div>
          </div>
        </div>

        {/* Coluna direita vazia por ora — será preenchida com morePosts */}
        <div className="flex flex-col gap-4">
          {excerpt && (
            <p className="text-sm text-gray-600 leading-relaxed">{excerpt}</p>
          )}
        </div>
      </div>
    </section>
  )
}
