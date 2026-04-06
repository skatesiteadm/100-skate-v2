import AlertBanner from 'components/AlertBanner'
import Footer from 'components/Footer'
import NewsletterPopup from 'components/NewsletterPopup'
import SidebarBanner from 'components/SidebarBanner'
import StickyBanner from 'components/StickyBanner'

export default function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#111111] transition-colors duration-300">
      <AlertBanner preview={preview} loading={loading} />
      <main className="flex-1 pb-16 md:pb-0">
        <div className="flex gap-6 max-w-screen-2xl mx-auto px-4">
          <div className="flex-1 min-w-0">{children}</div>
          <SidebarBanner />
        </div>
      </main>
      <Footer />
      <StickyBanner />
      <NewsletterPopup />
    </div>
  )
}
