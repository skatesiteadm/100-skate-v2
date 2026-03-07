import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import PodcastCarousel from 'components/PodcastCarousel'

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [autoplay, setAutoplay] = useState(false)

  useEffect(() => {
    fetch('/api/youtube-videos-all')
      .then((res) => res.json())
      .then((data) => {
        const all = data.videos || []
        setVideos(all)
        setActiveVideo(all[0]?.id || null)
      })
  }, [])

  const activeTitle = videos.find((v) => v.id === activeVideo)?.title
  const gridVideos = videos.filter((v) => v.id !== activeVideo)
  const cols = 4
  const trimmed = Math.floor(gridVideos.length / cols) * cols
  const displayVideos = gridVideos.slice(0, trimmed)

  return (
    <>
      <Head><title>Vídeos — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          {activeTitle && (
            <h2 className="text-xl font-black uppercase mb-4 leading-tight text-black dark:text-white">
              {activeTitle}
            </h2>
          )}

          {activeVideo && (
            <div className="w-full mb-8" style={{ paddingTop: '56.25%', position: 'relative' }}>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=${autoplay ? 1 : 0}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                className="rounded-xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          )}

          <h3 className="text-xl font-black uppercase border-b-2 border-black dark:border-white pb-2 mb-6 tracking-widest text-black dark:text-white">
            Mais Vídeos
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {displayVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => {
                  setAutoplay(true)
                  setActiveVideo(video.id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="group flex flex-col gap-2 text-left"
              >
                <div style={{ paddingTop: '56.25%', position: 'relative' }} className="overflow-hidden rounded-xl w-full">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div style={{ position: 'absolute', inset: 0 }} className="flex items-center justify-center">
                    <div style={{ backgroundColor: '#cc0000' }} className="rounded-full w-8 h-8 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xs font-bold uppercase leading-tight group-hover:underline line-clamp-2 text-black dark:text-white">
                  {video.title}
                </h3>
              </button>
            ))}
          </div>

          <PodcastCarousel />

          <div className="flex justify-center mb-16">
            <button
              onClick={() => window.open('https://youtube.com/@CemporcentoSKATE_', '_blank')}
              className="bg-black dark:bg-white hover:bg-[#ff44cc] dark:hover:bg-[#ff44cc] text-white dark:text-black dark:hover:text-white font-black uppercase text-sm px-8 py-4 rounded-full tracking-widest transition-colors"
            >
              Ver Mais Vídeos
            </button>
          </div>
        </div>
      </Layout>
    </>
  )
}
