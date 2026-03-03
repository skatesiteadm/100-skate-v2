import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import { ProductCard } from 'components/ui/product-card'
import Head from 'next/head'

const produtos = [
  {
    id: 1,
    name: 'Camiseta 100% SKATE',
    tagline: 'Edição limitada 2025',
    price: 89.90,
    originalPrice: 119.90,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    badge: 'Novo',
    buyUrl: 'https://shopify.com',
  },
  {
    id: 2,
    name: 'Boné 100% SKATE',
    tagline: 'Snapback aba reta',
    price: 69.90,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
    buyUrl: 'https://shopify.com',
  },
  {
    id: 3,
    name: 'Shape 100% SKATE',
    tagline: 'Deck 8.0 maple canadense',
    price: 249.90,
    originalPrice: 299.90,
    imageUrl: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=600&q=80',
    badge: 'Oferta',
    buyUrl: 'https://shopify.com',
  },
  {
    id: 4,
    name: 'Revista Edição 227',
    tagline: 'Desafio de Rua — edição impressa',
    price: 29.90,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    buyUrl: 'https://shopify.com',
  },
  {
    id: 5,
    name: 'Mochila 100% SKATE',
    tagline: 'Com compartimento para shape',
    price: 159.90,
    originalPrice: 199.90,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    buyUrl: 'https://shopify.com',
  },
  {
    id: 6,
    name: 'Adesivos Pack',
    tagline: '10 adesivos variados',
    price: 19.90,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    buyUrl: 'https://shopify.com',
  },
]

export default function LojaPage() {
  return (
    <>
      <Head><title>Loja — 100% SKATE</title></Head>
      <Layout preview={false}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <BlogHeader title="100% SKATE" description={[]} level={1} />

          <div className="mb-10">
            <h1 className="text-3xl font-black uppercase border-b-2 border-black pb-3 tracking-widest">
              Loja
            </h1>
            <p className="text-gray-500 text-sm mt-2">Produtos oficiais 100% SKATE</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {produtos.map((produto) => (
              <ProductCard
                key={produto.id}
                name={produto.name}
                tagline={produto.tagline}
                price={produto.price}
                originalPrice={produto.originalPrice}
                imageUrl={produto.imageUrl}
                badge={produto.badge}
                buyUrl={produto.buyUrl}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}
