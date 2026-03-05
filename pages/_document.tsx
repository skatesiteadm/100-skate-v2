import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
  <link rel="icon" type="image/svg+xml" href="/favicon-100skate/favicon.svg" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-100skate/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-100skate/favicon-16x16.png" />
  <link rel="shortcut icon" href="/favicon-100skate/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon-100skate/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-title" content="100%SKATE" />
  <link rel="manifest" href="/favicon-100skate/site.webmanifest" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
</Head>
      <body className="bg-white text-black" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
