import BannerSlot from './BannerSlot'

export default function SidebarBanner() {
  return (
    <div className="hidden xl:flex flex-col gap-4 w-40 shrink-0">
      <div className="sticky top-4">
        <BannerSlot posicao="sidebar" />
      </div>
    </div>
  )
}
