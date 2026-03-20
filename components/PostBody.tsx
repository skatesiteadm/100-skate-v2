import { PortableText, type PortableTextReactComponents } from 'next-sanity'
import { SanityImage } from './SanityImage'
import BannerSlot from './BannerSlot'
import EmbedBlock from './portable-text/EmbedBlock'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    },
    embed: ({ value }) => {
      return <EmbedBlock value={value} />
    },
  },
  marks: {
    link: ({ children, value }) => {
      const { url, blank, title } = value ?? {}
      return (
        <a
          href={url}
          title={title}
          target={blank ? '_blank' : undefined}
          rel={blank ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
}

export default function PostBody({ content }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:uppercase prose-a:text-[#ff44cc] prose-a:no-underline hover:prose-a:underline dark:prose-p:text-zinc-300 dark:prose-li:text-zinc-300">
        <PortableText value={content} components={myPortableTextComponents} />
      </div>
      <div className="my-12">
        <BannerSlot posicao="topo" />
      </div>
    </div>
  )
}
