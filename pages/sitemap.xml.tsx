import { getAllPosts, getClient } from 'lib/sanity.client'

type SitemapLocation = {
  url: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
  lastmod?: Date
}

// Use this to manually add routes to the sitemap
const defaultUrls: SitemapLocation[] = [
  { url: '/', changefreq: 'daily', priority: 1, lastmod: new Date() },
  { url: '/videos', changefreq: 'daily', priority: 0.8 },
  { url: '/eventos', changefreq: 'weekly', priority: 0.8 },
  { url: '/revista', changefreq: 'weekly', priority: 0.8 },
  { url: '/fiksperto', changefreq: 'weekly', priority: 0.7 },
  { url: '/loja', changefreq: 'weekly', priority: 0.7 },
  { url: '/nossa-historia', changefreq: 'monthly', priority: 0.5 },
  { url: '/contato', changefreq: 'monthly', priority: 0.4 },
]

const createSitemap = (locations: SitemapLocation[]) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://cemporcentoskate.com'
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locations
        .map((location) => {
          return `<url>
                    <loc>${baseUrl}${location.url}</loc>
                    <priority>${location.priority}</priority>
                    ${
                      location.lastmod
                        ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
                        : ''
                    }
                  </url>`
        })
        .join('')}
  </urlset>
  `
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const client = getClient()

  // Get list of Post urls
  const [posts = []] = await Promise.all([getAllPosts(client)])
  const postUrls: SitemapLocation[] = posts
    .filter(({ slug = '' }) => slug)
    .map((post) => {
      return {
        url: `/posts/${post.slug}`,
        priority: 0.5,
        lastmod: new Date(post._updatedAt),
      }
    })

  // ... get more routes here

  // Return the default urls, combined with dynamic urls above
  const locations = [...defaultUrls, ...postUrls]

  // Set response to XML
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap(locations))
  res.end()

  return {
    props: {},
  }
}
