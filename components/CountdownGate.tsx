import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import NumberFlow from '@number-flow/react'

// Monday April 6, 2026 at midnight BRT (UTC-3)
// Change this date to adjust the launch time
const LAUNCH_DATE = new Date('2026-04-06T19:00:00Z')
const BYPASS_KEY = 'skatepreview'


function getTimeLeft() {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  }
}

export default function CountdownGate({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false })

  useEffect(() => {
    const bypass = localStorage.getItem(BYPASS_KEY) === '1'
    const t = getTimeLeft()
    setTime(t)
    setUnlocked(bypass || t.done)
    setReady(true)

    if (!bypass && !t.done) {
      const id = setInterval(() => {
        const next = getTimeLeft()
        setTime(next)
        if (next.done) {
          setUnlocked(true)
          clearInterval(id)
        }
      }, 1000)
      return () => clearInterval(id)
    }
  }, [])

  // Never block the bypass route itself
  if (router.pathname === '/skatepreview') return <>{children}</>

  // Avoid hydration mismatch — render nothing until client is ready
  if (!ready) return null

  if (unlocked) return <>{children}</>

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'inherit',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aurora background glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(100deg, #ff44cc 0%, #ff44cc 7%, transparent 10%, transparent 12%, #ff44cc 16%)',
          backgroundSize: '300%',
          animation: 'aurora 36s linear infinite',
          filter: 'blur(60px)',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      />

      <style>{`
        @keyframes aurora {
          from { background-position: 50% 50%, 50% 50%; }
          to { background-position: 350% 50%, 350% 50%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .countdown-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 70px;
        }
        .countdown-number {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 900;
          line-height: 1;
          color: #ffffff;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
        }
        .countdown-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #71717a;
        }
        .countdown-sep {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 900;
          color: #3f3f46;
          line-height: 1;
          margin-bottom: 20px;
          user-select: none;
        }
        .countdown-wrapper {
          animation: fadeUp 0.6s ease both;
        }
      `}</style>

      {/* Logo */}
      <div style={{ animation: 'fadeUp 0.5s ease both', animationDelay: '0s', marginBottom: '2.5rem' }}>
        <img
          src="/logoskate.svg"
          alt="100% SKATE"
          style={{
            height: 'clamp(80px, 14vw, 160px)',
            width: 'auto',
            filter: 'brightness(0) saturate(100%) invert(42%) sepia(97%) saturate(1000%) hue-rotate(280deg) brightness(1.1)',
          }}
        />
      </div>

      {/* Em breve */}
      <p
        style={{
          color: '#71717a',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          animation: 'fadeUp 0.5s ease both',
          animationDelay: '0.1s',
        }}
      >
        Em breve
      </p>

      {/* Countdown */}
      <div
        className="countdown-wrapper"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'clamp(8px, 2vw, 24px)',
          animationDelay: '0.2s',
        }}
      >
        <div className="countdown-unit">
          <NumberFlow value={time.days} format={{ minimumIntegerDigits: 2 }} className="countdown-number" />
          <span className="countdown-label">Dias</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-unit">
          <NumberFlow value={time.hours} format={{ minimumIntegerDigits: 2 }} className="countdown-number" />
          <span className="countdown-label">Horas</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-unit">
          <NumberFlow value={time.minutes} format={{ minimumIntegerDigits: 2 }} className="countdown-number" />
          <span className="countdown-label">Min</span>
        </div>
        <span className="countdown-sep">:</span>
        <div className="countdown-unit">
          <NumberFlow value={time.seconds} format={{ minimumIntegerDigits: 2 }} className="countdown-number" />
          <span className="countdown-label">Seg</span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: 'clamp(40px, 8vw, 80px)',
          height: '2px',
          backgroundColor: '#ff44cc',
          opacity: 0.4,
          borderRadius: '1px',
          margin: '2.5rem 0',
          animation: 'fadeUp 0.5s ease both',
          animationDelay: '0.3s',
        }}
      />

      {/* Social links */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          animation: 'fadeUp 0.5s ease both',
          animationDelay: '0.35s',
        }}
      >
        <a
          href="https://instagram.com/cemporcentoskate"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          style={{ color: '#52525b', transition: 'color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ff44cc')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#52525b')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a
          href="https://youtube.com/@CemporcentoSKATE_"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          style={{ color: '#52525b', transition: 'color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ff44cc')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#52525b')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
          </svg>
        </a>
        <a
          href="https://tiktok.com/@cemporcentoskate"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          style={{ color: '#52525b', transition: 'color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#ff44cc')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#52525b')}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
