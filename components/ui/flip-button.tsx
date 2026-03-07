import { motion } from 'framer-motion'
import { useDarkMode } from 'lib/darkMode'

export function DarkModeButton({
  onToggle,
}: {
  onToggle?: (dark: boolean) => void
}) {
  const { dark } = useDarkMode()

  const handleClick = () => {
    if (onToggle) onToggle(!dark)
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      className="relative flex items-center gap-3 px-4 py-2 rounded-full border"
      style={{
        background: dark
          ? `repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 2px, #2a2a2a 2px, #2a2a2a 6px)`
          : '#f0f0f0',
        borderColor: dark ? '#444' : '#ccc',
      }}
    >
      {/* Shape com logoskate2.svg flipando */}
      <div style={{ perspective: '600px' }}>
        <motion.div
          animate={{ rotateX: dark ? 180 : 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          style={{
            width: '28px',
            height: '36px',
            borderRadius: '6px 6px 8px 8px',
            background: '#ff44cc',
            transform: 'rotate(-4deg)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/logoskate2.svg"
            alt="%"
            style={{ width: '18px', height: '18px', filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>
      </div>

      {/* Label */}
      <span
        className="font-black uppercase tracking-widest"
        style={{ color: dark ? '#aaa' : '#555', fontSize: '9px' }}
      >
        {dark ? 'DARK' : 'LIGHT'}
      </span>
    </motion.button>
  )
}
