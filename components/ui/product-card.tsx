import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string
  name: string
  tagline?: string
  price: number
  originalPrice?: number
  badge?: string
  buyUrl?: string
}

export function ProductCard({
  className,
  imageUrl,
  name,
  tagline,
  price,
  originalPrice,
  badge,
  buyUrl,
  ...props
}: ProductCardProps) {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)

  return (
    <div
      className={cn(
        'group relative flex flex-col items-center overflow-hidden rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {badge && (
        <span className="absolute top-3 right-3 bg-[#ff44cc] text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest z-10">
          {badge}
        </span>
      )}

      <div className="relative mb-4 flex h-52 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-grow flex-col items-center gap-1 w-full">
        <h3 className="font-black uppercase text-sm leading-tight">{name}</h3>
        {tagline && <p className="text-xs text-gray-500">{tagline}</p>}
      </div>

      <div className="mt-4 flex flex-col items-center gap-3 w-full">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>
        <button
          onClick={() => buyUrl && window.open(buyUrl, '_blank')}
          className="w-full bg-black hover:bg-[#ff44cc] text-white font-black uppercase text-xs px-4 py-3 rounded-full tracking-widest transition-colors duration-300"
        >
          Comprar
        </button>
      </div>
    </div>
  )
}
