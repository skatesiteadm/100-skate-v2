import type { NextApiRequest, NextApiResponse } from 'next'

const CHANNEL_ID = 'UCP3_207yNHXuUOcfDnf6aEQ'
const API_KEY = process.env.YOUTUBE_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=3&type=video`
    )
    const data = await response.json()

    const videos = data.items?.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    })) || []

    res.setHeader('Cache-Control', 's-maxage=3600')
    res.status(200).json({ videos })
  } catch (error) {
    res.status(500).json({ videos: [] })
  }
}
