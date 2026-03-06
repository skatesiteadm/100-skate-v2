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
  return (
    <div className="mx-auto max-w-3xl">
      <div className="prose prose-lg prose-headings:font-black prose-headings:uppercase prose-a:text-[#ff44cc] prose-a:no-underline hover:prose-a:underline">
        <PortableText value={content} components={myPortableTextComponents} />
      </div>
      <div className="my-12">
        <BannerSlot posicao="topo" />
      </div>
    </div>
  )
}
