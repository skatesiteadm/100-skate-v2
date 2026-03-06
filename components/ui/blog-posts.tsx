import { cn } from '../../lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  category?: string
  imageUrl: string
  slug: string
  author?: string
  date?: string
}

interface BlogGridProps {
  posts?: BlogPost[]
  className?: string
}

export function BlogGrid({ posts = [], className }: BlogGridProps) {
  const [hero, ...rest] = posts
  return (
    <div className={cn('flex flex-col gap-4 mb-12', className)}>
      {hero && (
        <Link 
          href={`/posts/${hero.slug}`} 
          className="relative overflow-hidden rounded-xl group w-full bg-gray-100 dark:bg-[#111111]" 
          style={{ height: '420px' }}
        >
          <Image
            src={hero.imageUrl}
            alt={hero.title || ''}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 text-white">
            {hero.category && (
              <span className="text-xs uppercase font-bold bg-white/20 backdrop-blur px-2 py-1 rounded mb-2 inline-block">
                {hero.category}
              </span>
            )}
            <h2 className="text-2xl md:text-3xl font-black uppercase leading-tight">{hero.title}</h2>
            {hero.author && <p className="text-xs text-gray-300 mt-1">{hero.author}</p>}
          </div>
        </Link>
      )}
      <div className="grid grid-cols-2 gap-4" style={{ height: '260px' }}>
        {rest.slice(0, 2).map((post) => (
          <Link 
            key={post.id} 
            href={`/posts/${post.slug}`} 
            className="relative overflow-hidden rounded-xl group bg-gray-100 dark:bg-[#111111]"
          >
            <Image
              src={post.imageUrl}
              alt={post.title || ''}
              fill
              sizes="(max-width: 768px) 50vw, 600px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              {post.category && (
                <span className="text-xs uppercase font-bold bg-white/20 backdrop-blur px-2 py-1 rounded mb-1 inline-block">
                  {post.category}
                </span>
              )}
              <h3 className="text-base font-black uppercase leading-tight">{post.title}</h3>
              {post.author && <p className="text-xs text-gray-300 mt-1">{post.author}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
