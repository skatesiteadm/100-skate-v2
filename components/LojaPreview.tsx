import Link from 'next/link'
import { ProductCard } from 'components/ui/product-card'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!

interface ShopifyProduct {
  id: string
  title: string
  handle: string
  priceRange: { minVariantPrice: { amount: string } }
  compareAtPriceRange: { minVariantPrice: { amount: string } }
  images: { edges: { node: { url: string } }[] }
  variants: { edges: { node: { id: string } }[] }
}

async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  const query = `{
    products(first: 8) {
      edges {
        node {
          id title handle
          priceRange { minVariantPrice { amount } }
          compareAtPriceRange { minVariantPrice { amount } }
          images(first: 1) { edges { node { url } } }
          variants(first: 1) { edges { node { id } } }
        }
      }
    }
  }`
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query }),
  })
  const data = await res.json()
  return data.data?.products?.edges?.map((e: any) => e.node) || []
}

export default function LojaPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 })
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const [produtos, setProdutos] = useState<ShopifyProduct[]>([])

  useEffect(() => {
    fetchShopifyProducts().then(setProdutos)
  }, [])

  if (!produtos.length) return null

  return (
    <section className="my-12">
      <div className="border-b-2 border-black dark:border-gray-100 pb-2 mb-8">
        <Link href="/loja" className="block hover:opacity-70 transition-opacity">
          <h2 className="text-xl font-black uppercase tracking-widest cursor-pointer text-black dark:text-gray-100">
            Loja →
          </h2>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl font-black hover:bg-[#ff44cc] transition-colors shadow-lg"
        >
          ‹
        </button>
        <div className="overflow-hidden mx-4" ref={emblaRef}>
          <div className="flex gap-4">
            {produtos.map((produto) => {
              const price = parseFloat(produto.priceRange.minVariantPrice.amount)
              const comparePrice = parseFloat(produto.compareAtPriceRange.minVariantPrice.amount)
              const imageUrl = produto.images.edges[0]?.node.url || ''
              const variantId = produto.variants.edges[0]?.node.id || ''
              const buyUrl = `https://${SHOPIFY_DOMAIN}/cart/${variantId.split('/').pop()}:1`

              return (
                <div key={produto.id} className="flex-none w-[calc(50%-8px)] md:w-[calc(25%-12px)]">
                  <ProductCard
                    name={produto.title}
                    price={price}
                    originalPrice={comparePrice > price ? comparePrice : undefined}
                    imageUrl={imageUrl}
                    buyUrl={buyUrl}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl font-black hover:bg-[#ff44cc] transition-colors shadow-lg"
        >
          ›
        </button>
      </div>
    </section>
  )
}
