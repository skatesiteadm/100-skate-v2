import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SkatePreview() {
  const router = useRouter()

  useEffect(() => {
    localStorage.setItem('skatepreview', '1')
    router.replace('/')
  }, [router])

  return null
}
