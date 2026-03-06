import { PortableText, type PortableTextReactComponents } from 'next-sanity'
import { SanityImage } from './SanityImage'
import BannerSlot from './BannerSlot'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function PostBody({ content }) {
  if (!content || content.length === 0) return null

  const antes = content.slice(0, 3)
  const depois = content.slice(3)

  return (
    <div className="mx-auto max-w-3xl prose prose-lg prose-headings:font-black prose-headings:uppercase prose-a:text-[#ff44cc] prose-a:no-underline hover:prose-a:underline">
      <PortableText value={antes} components={myPortableTextComponents} />
      {depois.length > 0 && (
        <>
          <div className="my-8 not-prose">
            <BannerSlot posicao="topo" />
          </div>
          <PortableText value={depois} components={myPortableTextComponents} />
        </>
      )}
    </div>
  )
}
