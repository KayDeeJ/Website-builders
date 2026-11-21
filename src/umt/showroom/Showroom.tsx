import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../hooks'
import { HeroScene } from '../ui'

declare global {
  interface Window {
    __umtIntro?: boolean
  }
}

/**
 * Home hero visual: the 3D showroom where WebGL is available and motion is welcome,
 * otherwise the original hero photograph.
 */
export default function Showroom({ fallback }: { fallback: string }) {
  const host = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<'3d' | 'photo'>(() => (reducedMotion() ? 'photo' : '3d'))

  useEffect(() => {
    if (mode !== '3d' || !host.current) return
    let stop = () => {}
    let gone = false
    import('./scene')
      .then((m) => {
        if (gone || !host.current) return
        stop = m.mount(host.current, () => setMode('photo'), !!window.__umtIntro)
      })
      .catch(() => setMode('photo'))
    return () => {
      gone = true
      stop()
    }
  }, [mode])

  if (mode === 'photo') return <HeroScene src={fallback} />
  return <div ref={host} className="scene showroom" aria-hidden="true" />
}
