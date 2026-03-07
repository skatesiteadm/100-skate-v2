import type { NextApiRequest, NextApiResponse } from 'next'

const PLAYLIST_ID = 'PLmu1x9wkyRKpDoznugZNL_XP7b53kbf5L'
const API_KEY = process.env.YOUTUBE_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=50`
    )
    const playlistData = await playlistRes.json()
    const ids = playlistData.items?.map((i: any) => i.snippet.resourceId.videoId).join(',')

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
        return h * 3600 + m * 60 + s > 62
      })
      .slice(0, 15)
      .map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        duration: item.contentDetails.duration,
      })) || []

    res.setHeader('Cache-Control', 's-maxage=3600')
    res.status(200).json({ videos })
  } catch (error) {
    res.status(500).json({ videos: [] })
  }
}
