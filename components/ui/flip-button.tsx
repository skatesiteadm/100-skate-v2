import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDarkMode } from 'lib/darkMode'

export function DarkModeButton({
  onToggle,
}: {
  onToggle?: (dark: boolean) => void
}) {
  const { dark } = useDarkMode()
  const [animating, setAnimating] = useState(false)

  const handleClick = () => {
    if (animating) return
    setAnimating(true)
    if (onToggle) onToggle(!dark)
    setTimeout(() => setAnimating(false), 400)
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      className="relative flex items-center gap-3 px-4 py-2 rounded-full transition-colors duration-300 border"
      style={{
        background: dark
          ? `repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 2px, #2a2a2a 2px, #2a2a2a 6px)`
          : '#f0f0f0',
        borderColor: dark ? '#444' : '#ccc',
      }}
    >
      {/* Shape de skate com % */}
      <div
        className="flex items-center justify-center rounded-sm font-black text-xs"
        style={{
          width: '28px',
          height: '36px',
          borderRadius: '6px 6px 8px 8px',
          background: dark ? '#ff44cc' : '#111',
          color: dark ? '#fff' : '#fff',
          fontSize: '13px',
          letterSpacing: '-1px',
          transform: 'rotate(-4deg)',
          flexShrink: 0,
        }}
      >
        %
      </div>

      {/* Logo */}
      <img
        src="/logoskate.svg"
        alt="100% SKATE"
        style={{
          height: '16px',
          width: 'auto',
          filter: dark ? 'brightness(0) saturate(100%) invert(1)' : 'brightness(0)',
          flexShrink: 0,
        }}
      />

      {/* Indicador */}
      <span
        className="text-xs font-black uppercase tracking-widest"
        style={{ color: dark ? '#aaa' : '#555', fontSize: '9px' }}
      >
        {dark ? 'DARK' : 'LIGHT'}
      </span>
    </motion.button>
  )
}
