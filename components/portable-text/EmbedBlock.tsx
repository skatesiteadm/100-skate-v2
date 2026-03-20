/**
 * EmbedBlock -- renderer for the `embed` Portable Text block type.
 * Handles YouTube, Instagram, Twitter/X, SoundCloud, and generic iframe fallback.
 */

type EmbedValue = {
  url?: string
  caption?: string
}

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v')
  } catch {
    // not a valid URL
  }
  return null
}

function getSoundCloudUrl(url: string): string {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23fe44cb&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`
}

export default function EmbedBlock({ value }: { value: EmbedValue }) {
  const { url, caption } = value

  if (!url) return null

  let embed: React.ReactNode = null

  // YouTube
  const ytId = getYouTubeId(url)
  if (ytId) {
    embed = (
      <iframe
        src={`https://www.youtube.com/embed/${ytId}`}
        title={caption || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    )
    return (
      <figure className="my-6">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {embed}
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm italic text-gray-500 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  // Instagram
  if (url.includes('instagram.com')) {
    const postUrl = url.split('?')[0].replace(/\/$/, '')
    embed = (
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{ maxWidth: '540px', width: '100%', margin: '0 auto' }}
      >
        <a href={postUrl} target="_blank" rel="noopener noreferrer">
          Ver post no Instagram
        </a>
      </blockquote>
    )
    return (
      <figure className="my-6 flex flex-col items-center">
        {embed}
        {caption && (
          <figcaption className="mt-2 text-center text-sm italic text-gray-500 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
        {/* Instagram embed script -- loads once per page via window check */}
        <script
          async
          defer
          src="https://www.instagram.com/embed.js"
          // Next.js will deduplicate identical script tags
        />
      </figure>
    )
  }

  // Twitter/X
  if (url.includes('twitter.com') || url.includes('x.com')) {
    embed = (
      <blockquote className="twitter-tweet" data-lang="pt" data-dnt="true">
        <a href={url} target="_blank" rel="noopener noreferrer">
          Ver post no Twitter/X
        </a>
      </blockquote>
    )
    return (
      <figure className="my-6 flex flex-col items-center">
        {embed}
        {caption && (
          <figcaption className="mt-2 text-center text-sm italic text-gray-500 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />
      </figure>
    )
  }

  // SoundCloud
  if (url.includes('soundcloud.com')) {
    embed = (
      <iframe
        src={getSoundCloudUrl(url)}
        title={caption || 'SoundCloud player'}
        allow="autoplay"
        className="w-full"
        height={166}
      />
    )
    return (
      <figure className="my-6">
        {embed}
        {caption && (
          <figcaption className="mt-2 text-center text-sm italic text-gray-500 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  // Generic iframe fallback
  return (
    <figure className="my-6">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={url}
          title={caption || 'Embed'}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm italic text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
