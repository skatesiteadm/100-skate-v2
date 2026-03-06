import { useState } from 'react'
import BannerSlot from './BannerSlot'

export default function StickyBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-center h-16 relative">
        <BannerSlot posicao="mobile" />
        <button
          onClick={() => setVisible(false)}
          className="absolute right-2 top-1 text-gray-400 text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
