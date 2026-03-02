export default function SidebarBanner() {
  return (
    <div className="hidden xl:flex flex-col gap-4 w-40 shrink-0">
      {/* Banner vertical 160x600 */}
      <div
        className="bg-gray-100 border border-dashed border-gray-300 rounded-xl flex items-center justify-center sticky top-4"
        style={{ width: '160px', height: '600px' }}
      >
        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          Espaço Publicitário 160×600
        </span>
      </div>
    </div>
  )
}
