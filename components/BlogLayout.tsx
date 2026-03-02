import AlertBanner from 'components/AlertBanner'
import Footer from 'components/Footer'
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
    <div className="min-h-screen flex flex-col">
      <AlertBanner preview={preview} loading={loading} />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <StickyBanner />
    </div>
  )
}
