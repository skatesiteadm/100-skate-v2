import type { NextApiRequest, NextApiResponse } from 'next'

const PLAYLIST_ID = 'PLmu1x9wkyRKpDoznugZNL_XP7b53kbf5L'
const API_KEY = process.env.YOUTUBE_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${PLAYLIST_ID}&part=snippet&maxResults=13`
    )
    const playlistData = await playlistRes.json()

    const videos = playlistData.items?.map((i: any) => ({
      id: i.snippet.resourceId.videoId,
      title: i.snippet.title,
      thumbnail: i.snippet.thumbnails.high?.url || i.snippet.thumbnails.medium?.url,
      duration: '',
    })) || []

    res.setHeader('Cache-Control', 's-maxage=3600')
    res.status(200).json({ videos })
  } catch (error) {
    res.status(500).json({ videos: [] })
  }
}
