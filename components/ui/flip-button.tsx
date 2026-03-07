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
    <div style={{ perspective: '600px' }}>
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        animate={{ rotateX: dark ? 360 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 180 }}
        className="flex items-center gap-4 px-6 py-3 rounded-full border"
        style={{
          background: dark
            ? `repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 2px, #2a2a2a 2px, #2a2a2a 6px)`
            : '#f0f0f0',
          borderColor: dark ? '#444' : '#ccc',
        }}
      >
        <img
          src="/logoskate2.svg"
          alt="%"
          style={{ width: '30px', height: '30px' }}
        />
        <span
          className="font-black uppercase tracking-widest"
          style={{ color: dark ? '#aaa' : '#555', fontSize: '11px' }}
        >
          {dark ? 'DARK' : 'LIGHT'}
        </span>
      </motion.button>
    </div>
  )
}
