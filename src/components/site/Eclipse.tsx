import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/**
 * The hero's ground: a midnight-plum planet whose coral rim rises on load.
 * A soft light slides along the rim with the pointer. Pure CSS geometry,
 * animated with GSAP; rests in place under reduced motion.
 */
export default function Eclipse() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      gsap.from('.eclipse-body', { yPercent: 14, duration: 1.8, ease: 'expo.out' })
      gsap.from('.eclipse-glow', { opacity: 0, scale: 0.85, duration: 2.2, ease: 'expo.out', delay: 0.2 })

      const hero = el.closest('section') ?? window
      const move = (e: Event) => {
        const { clientX } = e as PointerEvent
        const x = (clientX / window.innerWidth) * 100
        gsap.to(el, { '--mx': `${x}%`, duration: 0.9, ease: 'power3.out', overwrite: true })
      }
      hero.addEventListener('pointermove', move)
      return () => hero.removeEventListener('pointermove', move)
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [--mx:50%]"
    >
      {/* Glow sitting just above the horizon */}
      <div className="eclipse-glow absolute top-[80%] left-1/2 h-[46vh] sm:top-[77%] w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,107,91,0.32),rgba(255,107,91,0.08)_60%,transparent)]" />
      {/* The planet: only its upper rim is ever on screen */}
      <div className="eclipse-body absolute top-[82%] sm:top-[81%] left-1/2 aspect-square w-[max(170vw,1100px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_0%,#2E1A36,#140A18_38%)] shadow-[inset_0_2px_0_0_#FF6B5B,inset_0_18px_40px_-24px_rgba(255,158,145,0.55),0_-24px_90px_-30px_rgba(255,107,91,0.7)]">
        {/* Pointer-following light, clipped to the planet by its radius */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(28vw_14vw_at_var(--mx)_0%,rgba(255,158,145,0.5),transparent_70%)]" />
      </div>
    </div>
  )
}
