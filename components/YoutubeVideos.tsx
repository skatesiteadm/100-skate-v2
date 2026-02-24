import { useEffect, useState } from 'react'

interface Video {
  id: string
  title: string
  thumbnail: string
  url: string
}

export default function YoutubeVideos() {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    fetch('/api/youtube-videos')
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []))
  }, [])

  if (videos.length === 0) return null

  return (
    <section className="mb-12">
      <h2 className="text-xl font-black uppercase border-b-2 border-black pb-2 mb-6 tracking-widest">
        Vídeos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.slice(0, 3).map((video) => (
          <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2">
            <div className="relative overflow-hidden rounded-xl aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="text-sm font-bold uppercase leading-tight group-hover:underline">
              {video.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  )
}
