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
      className="flex items-center gap-3 px-4 py-2 rounded-full border"
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
        style={{ width: '24px', height: '24px' }}
      />
      <span
        className="font-black uppercase tracking-widest"
        style={{ color: dark ? '#aaa' : '#555', fontSize: '9px' }}
      >
        {dark ? 'DARK' : 'LIGHT'}
      </span>
    </motion.button>
  )
}
