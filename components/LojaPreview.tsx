import Link from 'next/link'
import { ProductCard } from 'components/ui/product-card'

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
]

export default function LojaPreview() {
  return (
    <section className="my-12">
      <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-8">
        <h2 className="text-xl font-black uppercase tracking-widest">Loja →</h2>
        <Link href="/loja" className="text-xs font-black uppercase tracking-widest hover:text-[#ff44cc] transition-colors">
          Ver tudo
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
    </section>
  )
}
