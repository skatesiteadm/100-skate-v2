import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { q } = req.query

  if (!q || typeof q !== 'string' || q.trim().length < 2) {
    return res.status(400).json({ results: [] })
  }

  const searchTerm = q.trim()

  try {
    const results = await client.fetch(
      `*[
        _type in ["post", "evento", "revista"] &&
        (title match $term || titulo match $term || excerpt match $term || descricao match $term)
      ] | order(_updatedAt desc) [0...10] {
        _id,
        _type,
        "title": coalesce(title, titulo),
        "slug": slug.current
      }`,
      { term: `${searchTerm}*` },
    )

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate')
    return res.status(200).json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return res.status(500).json({ results: [] })
  }
}
