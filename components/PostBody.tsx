import { PortableText, type PortableTextReactComponents } from 'next-sanity'
import { SanityImage } from './SanityImage'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
  },
}

export default function PostBody({ content }) {
  return (
    <div className="mx-auto max-w-3xl prose prose-lg prose-headings:font-black prose-headings:uppercase prose-a:text-[#ff44cc] prose-a:no-underline hover:prose-a:underline">
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}
