import type { NextApiRequest, NextApiResponse } from 'next'

const CHANNEL_ID = 'UCP3_207yNHXuUOcfDnf6aEQ'
const API_KEY = process.env.YOUTUBE_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${CHANNEL_ID}&part=contentDetails`
    )
    const channelData = await channelRes.json()
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

    if (!uploadsPlaylistId) {
      return res.status(500).json({ videos: [] })
    }

    // Busca 50 itens da playlist
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=50`
    )
    const playlistData = await playlistRes.json()
    const ids = playlistData.items?.map((i: any) => i.snippet.resourceId.videoId).join(',')

    // Busca detalhes com duração de todos os 50
    const detailRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${ids}&part=contentDetails,snippet`
    )
    const detailData = await detailRes.json()

    const videos = detailData.items
      ?.filter((item: any) => {
        const duration = item.contentDetails.duration
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
        const h = parseInt(match?.[1] || '0')
        const m = parseInt(match?.[2] || '0')
        const s = parseInt(match?.[3] || '0')
        const total = h * 3600 + m * 60 + s
        return total > 60
      })
      .slice(0, 21)
      .map((item: any) => {
        const match = item.contentDetails.duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
        const h = parseInt(match?.[1] || '0')
        const m = parseInt(match?.[2] || '0')
        const s = parseInt(match?.[3] || '0')
        return {
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          duration: h * 3600 + m * 60 + s,
        }
      }) || []

    res.setHeader('Cache-Control', 's-maxage=3600')
    res.status(200).json({ videos })
  } catch (error) {
    res.status(500).json({ videos: [] })
  }
}
