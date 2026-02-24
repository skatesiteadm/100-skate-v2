import type { NextApiRequest, NextApiResponse } from 'next'

const CHANNEL_ID = 'UCP3_207yNHXuUOcfDnf6aEQ'
const API_KEY = process.env.YOUTUBE_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Busca os 10 mais recentes para ter margem para filtrar shorts
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=10&type=video`
    )
    const searchData = await searchRes.json()
    const ids = searchData.items?.map((i: any) => i.id.videoId).join(',')

    // Busca detalhes para pegar duração
    const detailRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${ids}&part=contentDetails,snippet`
    )
    const detailData = await detailRes.json()

    const videos = detailData.items
      ?.filter((item: any) => {
        const duration = item.contentDetails.duration
        // Filtra shorts — duração menor que PT1M (1 minuto)
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
        const hours = parseInt(match?.[1] || '0')
        const minutes = parseInt(match?.[2] || '0')
        const seconds = parseInt(match?.[3] || '0')
        const total = hours * 3600 + minutes * 60 + seconds
        return total > 90
      })
      .slice(0, 3)
      .map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
      })) || []

    res.setHeader('Cache-Control', 's-maxage=3600')
    res.status(200).json({ videos })
  } catch (error) {
    res.status(500).json({ videos: [] })
  }
}
