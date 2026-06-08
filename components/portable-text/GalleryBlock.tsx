import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { getSanityImageConfig } from 'lib/sanity.client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

type GalleryImage = {
  _key: string
  asset: SanityImageSource
  alt?: string
  caption?: string
}

type GalleryValue = {
  images?: GalleryImage[]
  title?: string
}

function GalleryThumb({ image, onClick }: { image: GalleryImage; onClick: () => void }) {
  const imageProps = useNextSanityImage(getSanityImageConfig(), image.asset)
  if (!imageProps) return null
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative aspect-square overflow-hidden rounded bg-zinc-900 hover:opacity-80 transition-opacity cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff44cc]"
    >
      <Image
        {...imageProps}
        alt={image.alt || ''}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
        className="object-cover"
      />
    </button>
  )
}

function LightboxImage({ image }: { image: GalleryImage }) {
  const imageProps = useNextSanityImage(getSanityImageConfig(), image.asset)
  if (!imageProps) return null
  return (
    <Image
      {...imageProps}
      alt={image.alt || ''}
      sizes="90vw"
      style={{ maxHeight: '75vh', maxWidth: '85vw', width: 'auto', height: 'auto' }}
      className="rounded object-contain"
    />
  )
}

export default function GalleryBlock({ value }: { value: GalleryValue }) {
  const [active, setActive] = useState<number | null>(null)
  const images = value?.images ?? []

  useEffect(() => {
    if (active === null) return
    const total = images.length

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((i) => Math.min(i! + 1, total - 1))
      if (e.key === 'ArrowLeft') setActive((i) => Math.max(i! - 1, 0))
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, images.length])

  if (!images.length) return null

  return (
    <>
      {value.title && (
        <h3 className="mt-8 mb-3 font-black uppercase text-base tracking-wide">
          {value.title}
        </h3>
      )}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {images.map((img, i) => (
          <GalleryThumb key={img._key} image={img} onClick={() => setActive(i)} />
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Fechar galeria"
              className="absolute -top-10 right-0 text-white text-4xl leading-none hover:text-[#ff44cc] transition-colors"
            >
              ×
            </button>

            {/* Prev */}
            {active > 0 && (
              <button
                type="button"
                onClick={() => setActive((i) => i! - 1)}
                aria-label="Foto anterior"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white text-5xl leading-none hover:text-[#ff44cc] transition-colors hidden sm:block"
              >
                ‹
              </button>
            )}

            <LightboxImage image={images[active]} />

            {images[active].caption && (
              <p className="mt-3 text-center text-sm text-zinc-400 italic max-w-lg px-4">
                {images[active].caption}
              </p>
            )}

            <p className="mt-2 text-xs text-zinc-500 tabular-nums">
              {active + 1} / {images.length}
            </p>

            {/* Mobile nav buttons */}
            <div className="flex gap-8 mt-4 sm:hidden">
              <button
                type="button"
                onClick={() => setActive((i) => Math.max(i! - 1, 0))}
                disabled={active === 0}
                className="text-white text-4xl leading-none disabled:opacity-20"
                aria-label="Foto anterior"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setActive((i) => Math.min(i! + 1, images.length - 1))}
                disabled={active === images.length - 1}
                className="text-white text-4xl leading-none disabled:opacity-20"
                aria-label="Próxima foto"
              >
                ›
              </button>
            </div>

            {/* Next */}
            {active < images.length - 1 && (
              <button
                type="button"
                onClick={() => setActive((i) => i! + 1)}
                aria-label="Próxima foto"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white text-5xl leading-none hover:text-[#ff44cc] transition-colors hidden sm:block"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
