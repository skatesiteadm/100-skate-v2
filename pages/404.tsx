import Link from 'next/link'
import SEO from 'components/SEO'

export default function Custom404() {
  return (
    <>
      <SEO
        title="404"
        description="Pagina nao encontrada. Volte pro site da 100%SKATE."
      />
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: "'Montserrat', sans-serif",
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <img
          src="/favicon-100skate/favicon.svg"
          alt="100%SKATE"
          style={{ width: 80, marginBottom: '2rem', opacity: 0.6 }}
        />
        <h1
          style={{
            fontSize: '6rem',
            fontWeight: 900,
            color: '#fe44cb',
            margin: 0,
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            marginTop: '1rem',
            color: '#888',
          }}
        >
          Essa pagina nao existe. Deve ter caido do skate.
        </p>
        <Link
          href="/"
          style={{
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            backgroundColor: '#fe44cb',
            color: '#000',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.95rem',
          }}
        >
          VOLTAR PRO SITE
        </Link>
      </div>
    </>
  )
}
