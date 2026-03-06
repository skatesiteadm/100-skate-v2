import Avatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>,
) {
  const { title, coverImage, date, author, slug } = props
  return (
    <>
      <div className="mb-8 sm:mx-0">
        <CoverImage title={title} image={coverImage} priority slug={slug} />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4 text-xs uppercase tracking-widest">
          <span className="bg-black text-white px-2 py-1 rounded font-bold">Skate</span>
          {date && (
            <span className="text-gray-500">
              <Date dateString={date} />
            </span>
          )}
        </div>
        <PostTitle>{title}</PostTitle>
        {author && (
          <div className="mb-8">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        )}
      </div>
    </>
  )
}
