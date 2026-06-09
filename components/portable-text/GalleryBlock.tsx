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

function LightboxImage({ image, onLoad }: { image: GalleryImage; onLoad: () => void }) {
  const imageProps = useNextSanityImage(getSanityImageConfig(), image.asset)
  if (!imageProps) return null
  return (
    <Image
      {...imageProps}
      alt={image.alt || ''}
      sizes="90vw"
      style={{ maxHeight: '75vh', maxWidth: '85vw', width: 'auto', height: 'auto' }}
      className="rounded object-contain"
      onLoad={onLoad}
    />
  )
}

export default function GalleryBlock({ value }: { value: GalleryValue }) {
  const [active, setActive] = useState<number | null>(null)
  const [imgLoading, setImgLoading] = useState(false)
  const images = value?.images ?? []

  useEffect(() => {
    if (active !== null) setImgLoading(true)
  }, [active])

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
          {/* Prev — fixed to overlay, never moves */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActive((i) => Math.max(i! - 1, 0)) }}
            disabled={active === 0}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#ff44cc] hover:bg-white hover:text-[#ff44cc] text-white text-3xl font-black transition-colors disabled:opacity-20 disabled:pointer-events-none"
          >
            ‹
          </button>

          {/* Next — fixed to overlay, never moves */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActive((i) => Math.min(i! + 1, images.length - 1)) }}
            disabled={active === images.length - 1}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#ff44cc] hover:bg-white hover:text-[#ff44cc] text-white text-3xl font-black transition-colors disabled:opacity-20 disabled:pointer-events-none"
          >
            ›
          </button>

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

            <div className="relative">
              <div className={imgLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
                <LightboxImage
                  key={active}
                  image={images[active]}
                  onLoad={() => setImgLoading(false)}
                />
              </div>
              {imgLoading && (
                <div className="absolute inset-0 animate-pulse bg-zinc-800 rounded min-w-[240px] min-h-[160px]" />
              )}
            </div>

            {images[active].caption && (
              <p className="mt-3 text-center text-sm text-zinc-400 italic max-w-lg px-4">
                {images[active].caption}
              </p>
            )}

            <p className="mt-2 text-xs text-zinc-500 tabular-nums">
              {active + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
