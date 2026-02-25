import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { useEffect, useState } from 'react'
import Head from 'next/head'

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: number
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/youtube-videos-all')
      .then((res) => res.json())
      .then((data) => {
        const all = data.videos || []
        setVideos(all)
        const firstLong = all.find((v: Video) => v.duration > 120)
        setActiveVideo(firstLong?.id || all[0]?.id || null)
      })
  }, [])

  const activeTitle = videos.find((v) => v.id === activeVideo)?.title
  const gridVideos = videos.filter((v) => v.id !== activeVideo)

  return (
    <>
      <Head><title>Vídeos — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          {/* Player destaque */}
          {activeVideo && (
            <div className="w-full mb-4" style={{ paddingTop: '56.25%', position: 'relative' }}>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=0`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                className="rounded-xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          )}

          {/* Título do vídeo em destaque */}
          {activeTitle && (
            <h2 className="text-xl font-black uppercase mb-8 leading-tight">
              {activeTitle}
            </h2>
          )}

          {/* Grid dos outros vídeos */}
          <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
            Mais Vídeos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {gridVideos.slice(0, 12).map((video) => (
              <button
                key={video.id}
                onClick={() => {
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
                    <div className="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xs font-bold uppercase leading-tight group-hover:underline line-clamp-2">
                  {video.title}
                </h3>
              </button>
            ))}
          </div>

          {/* Botão ver mais */}
          <div className="flex justify-center mb-16">
            
              href="https://www.youtube.com/@CemporcentoSKATE_"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-black uppercase text-sm px-8 py-4 rounded-full tracking-widest transition-colors flex items-center gap-3"
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
              </svg>
              Ver Canal no YouTube
            </a>
          </div>

        </div>
      </Layout>
    </>
  )
}
