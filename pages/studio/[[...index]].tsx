import { NextStudio } from 'next-sanity/studio'
import config from '../../sanity.config'

export default function StudioPage() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          [data-testid="hotkeys-dialog"],
          [class*="hotkey"],
          [class*="keyboard-shortcut"],
          [class*="KeyboardShortcut"],
          kbd {
            display: none !important;
          }
        }
      `}</style>
      <NextStudio config={config} />
    </>
  )
}
