import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'

interface Video {
  id: string
  title: string
  thumbnail: string
}

interface VideoCarouselProps {
  apiEndpoint: string
  title: string
  accentColor?: string
  href?: string
  limit?: number
}

export default function VideoCarousel({
  apiEndpoint,
  title,
  accentColor = '#ff44cc',
  href,
  limit,
}: VideoCarouselProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    const url = limit ? `${apiEndpoint}?limit=${limit}` : apiEndpoint
    fetch(url)
      .then((res) => res.json())
      .then((data) => { setVideos(data.videos || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [apiEndpoint, limit])

  if (loading) return (
    <section className="mb-12">
      <div className="h-7 w-48 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-6" />
      <div className="flex gap-4 overflow-hidden mx-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-none w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] flex flex-col gap-2">
            <div className="rounded-xl bg-gray-200 dark:bg-zinc-800 animate-pulse" style={{ paddingTop: '56.25%' }} />
            <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse w-3/4" />
          </div>
        ))}
      </div>
    </section>
  )

  if (videos.length === 0) return null

  return (
    <>
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-4xl px-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-4 text-white text-2xl font-bold hover:text-gray-300"
            >
              ✕
            </button>
            <div style={{ paddingTop: '56.25%', position: 'relative' }}>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                className="rounded-xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <section className="mb-12">
        {href ? (
          <Link href={href} className="block hover:opacity-70 transition-opacity">
            <h2 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-6 tracking-widest cursor-pointer text-black dark:text-white">
              {title}
            </h2>
          </Link>
        ) : (
          <h2 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-6 tracking-widest text-black dark:text-white">
            {title}
          </h2>
        )}

        <div className="relative">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-black dark:bg-gray-700 text-white flex items-center justify-center text-2xl font-black hover:opacity-80 transition-opacity shadow-lg"
          >
            ‹
          </button>

          <div className="overflow-hidden mx-4" ref={emblaRef}>
            <div className="flex gap-4">
              {videos.map((video) => (
                <div key={video.id} className="flex-none w-[calc(50%-8px)] md:w-[calc(33.333%-11px)]">
                  <button
                    onClick={() => setActiveVideo(video.id)}
                    className="group flex flex-col gap-2 text-left w-full"
                  >
                    <div style={{ paddingTop: '56.25%', position: 'relative' }} className="overflow-hidden rounded-xl w-full">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div style={{ position: 'absolute', inset: 0 }} className="flex items-center justify-center">
                        <div
                          className="rounded-full w-12 h-12 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: accentColor }}
                        >
                          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold uppercase leading-tight group-hover:underline line-clamp-2 text-black dark:text-white">
                      {video.title}
                    </h3>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-black dark:bg-gray-700 text-white flex items-center justify-center text-2xl font-black hover:opacity-80 transition-opacity shadow-lg"
          >
            ›
          </button>
        </div>
      </section>
    </>
  )
}
