import Head from "next/head"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
  publishedAt?: string
  author?: string
}

const defaults = {
  siteName: "100%SKATE",
  title: "100%SKATE | A maior midia de skate do Brasil",
  description:
    "30 anos documentando a historia do skate brasileiro. Materias, videos, eventos, revista e a cultura da rua.",
  image: "https://cemporcentoskate.com/og-default.png",
  url: "https://cemporcentoskate.com",
}

export default function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  publishedAt,
  author,
}: SEOProps) {
  const pageTitle = title
    ? `${title} | ${defaults.siteName}`
    : defaults.title
  const pageDescription = description || defaults.description
  const pageImage = image || defaults.image
  const pageUrl = url || defaults.url

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={pageUrl} />

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={defaults.siteName} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {type === "article" && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
    </Head>
  )
}
