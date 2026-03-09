import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { ProductCard } from 'components/ui/product-card'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const SHOPIFY_DOMAIN = '100-skate-2.myshopify.com'
const STOREFRONT_TOKEN = '20ef8b7d7a97abc7c900b98fd9c422c2'

interface ShopifyProduct {
  id: string
  title: string
  description: string
  handle: string
  priceRange: {
    minVariantPrice: { amount: string }
  }
  compareAtPriceRange: {
    minVariantPrice: { amount: string }
  }
  images: {
    edges: { node: { url: string } }[]
  }
  variants: {
    edges: { node: { id: string } }[]
  }
}

async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  const query = `{
    products(first: 20) {
      edges {
        node {
          id
          title
          description
          handle
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

export default function LojaPage() {
  const [produtos, setProdutos] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchShopifyProducts()
      .then(setProdutos)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Head><title>Loja — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />
          <div className="mb-10">
            <h1 className="text-3xl font-black uppercase border-b-2 border-black dark:border-white pb-3 tracking-widest text-black dark:text-white">
              Loja
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Produtos oficiais 100% SKATE</p>
          </div>

          {loading && (
            <p className="text-gray-400 text-sm mb-16">Carregando produtos...</p>
          )}

          {!loading && produtos.length === 0 && (
            <p className="text-gray-400 text-sm mb-16">Nenhum produto disponível no momento.</p>
          )}

          {!loading && produtos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
              {produtos.map((produto) => {
                const price = parseFloat(produto.priceRange.minVariantPrice.amount)
                const comparePrice = parseFloat(produto.compareAtPriceRange.minVariantPrice.amount)
                const imageUrl = produto.images.edges[0]?.node.url || ''
                const variantId = produto.variants.edges[0]?.node.id || ''
                const buyUrl = `https://${SHOPIFY_DOMAIN}/cart/${variantId.split('/').pop()}:1`

                return (
                  <ProductCard
                    key={produto.id}
                    name={produto.title}
                    tagline={produto.description?.split('.')[0] || ''}
                    price={price}
                    originalPrice={comparePrice > price ? comparePrice : undefined}
                    imageUrl={imageUrl}
                    buyUrl={buyUrl}
                  />
                )
              })}
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}
