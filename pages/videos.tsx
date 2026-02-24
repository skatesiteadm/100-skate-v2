import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { useEffect, useState } from 'react'
import Head from 'next/head'

interface Video {
  id: string
  title: string
  thumbnail: string
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/youtube-videos-all')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.videos || [])
        if (data.videos?.length > 0) setActiveVideo(data.videos[0].id)
      })
  }, [])

  const [hero, ...rest] = videos

  return (
    <>
      <Head><title>Vídeos — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          {/* Player destaque */}
          {activeVideo && (
            <div className="w-full mb-8" style={{ paddingTop: '56.25%', position: 'relative' }}>
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
          {hero && activeVideo && (
            <h2 className="text-xl font-black uppercase mb-8">
              {videos.find(v => v.id === activeVideo)?.title}
            </h2>
          )}

          {/* Grid dos outros vídeos */}
          <h3 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
            Mais Vídeos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video.id)}
                className={`group flex flex-col gap-2 text-left ${activeVideo === video.id ? 'opacity-50' : ''}`}
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
        </div>
      </Layout>
    </>
  )
}
