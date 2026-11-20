import { useRef, type HTMLAttributes, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type Props = HTMLAttributes<HTMLElement> & { children: ReactNode; 'data-enter'?: boolean }

/**
 * The hero section, painted with its own ground: a midnight-plum planet whose
 * coral rim rises on load, a glow hugging the rim, and a soft light that follows
 * the pointer along the horizon. All of it is the section's CSS background
 * (`.eclipse` in index.css, driven by --rise and --mx), so there are no extra
 * layers; it rests in place under reduced motion.
 */
export default function EclipseSection({ children, className = '', ...props }: Props) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(el, { '--rise': '160px' }, { '--rise': '0px', duration: 1.8, ease: 'expo.out' })
      const move = (e: PointerEvent) => {
        gsap.to(el, { '--mx': `${(e.clientX / window.innerWidth) * 100}%`, duration: 0.9, ease: 'power3.out', overwrite: 'auto' })
      }
      el.addEventListener('pointermove', move)
      return () => el.removeEventListener('pointermove', move)
    },
    { scope: root },
  )

  return (
    <section ref={root} {...props} className={`eclipse ${className}`}>
      {children}
    </section>
  )
}
