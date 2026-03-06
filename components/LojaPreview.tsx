import Link from 'next/link'
import { ProductCard } from 'components/ui/product-card'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'

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

export default function LojaPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="my-12">
   <div className="border-b-2 border-black dark:border-white pb-2 mb-8">
  <Link href="/loja" className="block hover:opacity-70 transition-opacity">
    <h2 className="text-xl font-black uppercase tracking-widest cursor-pointer text-black dark:text-white">
      Loja →
    </h2>
  </Link>
</div>
      {/* Carrossel com setas laterais */}
      <div className="relative">
        {/* Seta esquerda */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl font-black hover:bg-[#ff44cc] transition-colors shadow-lg"
        >
          ‹
        </button>

        <div className="overflow-hidden mx-4" ref={emblaRef}>
          <div className="flex gap-4">
            {produtos.map((produto) => (
              <div key={produto.id} className="flex-none w-[calc(50%-8px)] md:w-[calc(25%-12px)]">
                <ProductCard
                  name={produto.name}
                  tagline={produto.tagline}
                  price={produto.price}
                  originalPrice={produto.originalPrice}
                  imageUrl={produto.imageUrl}
                  badge={produto.badge}
                  buyUrl={produto.buyUrl}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Seta direita */}
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
