import { useEffect, useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { getClient } from 'lib/sanity.client'

const builder = imageUrlBuilder(getClient())

interface Banner {
  _id: string
  nome: string
  imagem: any
  link: string
}

interface BannerSlotProps {
  posicao: 'topo' | 'sidebar' | 'mobile'
}

const dimensoes = {
  topo: { w: 970, h: 90, label: '970x90' },
  sidebar: { w: 160, h: 600, label: '160x600' },
  mobile: { w: 320, h: 50, label: '320x50' },
}

export default function BannerSlot({ posicao }: BannerSlotProps) {
  const [banner, setBanner] = useState<Banner | null>(null)
  const [loaded, setLoaded] = useState(false)
  const dim = dimensoes[posicao]

  useEffect(() => {
    const hoje = new Date().toISOString().split('T')[0]
    getClient()
      .fetch<Banner[]>(
        `*[_type == "banner" && ativo == true && posicao == $posicao && (dataInicio == null || dataInicio <= $hoje) && (dataFim == null || dataFim >= $hoje)] {
          _id, nome, imagem, link
        }`,
        { posicao, hoje }
      )
      .then((banners) => {
        if (banners.length > 0) {
          setBanner(banners[Math.floor(Math.random() * banners.length)])
        }
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [posicao])

  function trackClick() {
    if (typeof window !== 'undefined' && (window as any).gtag && banner) {
      ;(window as any).gtag('event', 'banner_click', {
        banner_nome: banner.nome,
        banner_posicao: posicao,
        banner_link: banner.link,
      })
    }
  }

  if (!loaded) return null

  if (!banner) {
    return (
      <div
        className="w-full flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-xl"
        style={{ height: dim.h, maxWidth: dim.w, margin: '0 auto' }}
      >
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          Espaco Publicitario - {dim.label}
        </span>
      </div>
    )
  }

  return (
    <a
      href={banner.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackClick}
      className="block"
      style={{ maxWidth: dim.w, margin: '0 auto' }}
    >
      <img
        src={builder.image(banner.imagem).width(dim.w).height(dim.h).url()}
        alt={banner.nome}
        width={dim.w}
        height={dim.h}
        className="rounded-xl"
        loading="lazy"
      />
    </a>
  )
}
