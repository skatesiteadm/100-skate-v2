export default function StickyBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-center h-16 bg-gray-100 relative">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          Espaço Publicitário — 320×50
        </span>
        <button
          onClick={(e) => (e.currentTarget.parentElement!.parentElement!.style.display = 'none')}
          className="absolute right-2 top-1 text-gray-400 text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
