import type { NextApiRequest, NextApiResponse } from 'next'
import { getClient } from 'lib/sanity.client'

const client = getClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ results: [] })
  }

  const { q, limit } = req.query

  if (!q || typeof q !== 'string' || q.trim().length < 2 || q.trim().length > 200) {
    return res.status(400).json({ results: [] })
  }

  const searchTerm = q.trim()
  const resultLimit = Math.min(parseInt((limit as string) || '20', 10), 50)

  try {
    const results = await client.fetch(
      `*[
        _type in ["post", "evento", "revista"] &&
        (title match $term || titulo match $term || excerpt match $term || descricao match $term)
      ] | order(_updatedAt desc) [0...$limit] {
        _id,
        _type,
        "title": coalesce(title, titulo),
        "slug": slug.current,
        excerpt,
        coverImage,
        "author": author->{name},
        date
      }`,
      { term: `${searchTerm}*`, limit: resultLimit },
    )

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate')
    return res.status(200).json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return res.status(500).json({ results: [] })
  }
}
