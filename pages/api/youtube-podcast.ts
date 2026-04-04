import type { NextApiRequest, NextApiResponse } from 'next'
import { YOUTUBE_PODCAST_PLAYLIST_ID } from 'lib/youtube.constants'

const API_KEY = process.env.YOUTUBE_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ videos: [] })
  }

  const limit = Math.min(parseInt((req.query.limit as string) || '10', 10), 50)

  try {
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${YOUTUBE_PODCAST_PLAYLIST_ID}&part=snippet&maxResults=${limit}`
    )
    const playlistData = await playlistRes.json()

    const videos = playlistData.items?.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
    })) || []

    res.setHeader('Cache-Control', 's-maxage=3600')
    res.status(200).json({ videos })
  } catch (error) {
    res.status(500).json({ videos: [] })
  }
}
