import { useState } from 'react'
import { motion } from 'framer-motion'

export function DarkModeButton({
  onToggle,
}: {
  onToggle?: (dark: boolean) => void
}) {
  const [dark, setDark] = useState(false)

  const handleClick = () => {
    const next = !dark
    setDark(next)
    if (onToggle) onToggle(next)
  }

  return (
    <motion.button
      onClick={handleClick}
      className="relative overflow-hidden px-6 py-3 cursor-pointer"
      style={{
        borderRadius: 999,
        width: '160px',
        height: '48px',
        background: dark
          ? `repeating-linear-gradient(
              45deg,
              #1a1a1a,
              #1a1a1a 2px,
              #2a2a2a 2px,
              #2a2a2a 6px
            )`
          : '#f5f5f5',
        border: dark ? '2px solid #333' : '2px solid #e0e0e0',
        boxShadow: dark ? '0 4px 16px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.1)',
      }}
      animate={{ rotateX: dark ? 180 : 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      style={{ perspective: '600px' }}
    >
      <motion.div
        animate={{ opacity: dark ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Logo preta no modo claro */}
        <img
          src="/logoskate.svg"
          alt="100% SKATE"
          style={{ height: '20px', width: 'auto', filter: 'brightness(0)' }}
        />
      </motion.div>

      <motion.div
        animate={{ opacity: dark ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Logo pink no modo escuro */}
        <img
          src="/logoskate.svg"
          alt="100% SKATE"
          style={{ height: '20px', width: 'auto', filter: 'brightness(0) saturate(100%) invert(30%) sepia(100%) saturate(500%) hue-rotate(280deg)' }}
        />
      </motion.div>
    </motion.button>
  )
}
