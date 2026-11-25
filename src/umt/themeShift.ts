/*
 * A graceful light/dark switch. The engine's toggle (#theme) sets data-theme on <html> the
 * moment it is clicked, so the whole page used to snap. This takes the click first, snapshots the
 * page with the View Transitions API, lets the engine switch the theme, then reveals the new theme
 * as a circle growing out of the toggle while the sun/moon icon turns.
 *
 * Browsers without View Transitions get a short colour cross-fade instead. Under reduced motion the
 * engine's instant switch is left as it is. The engine itself is not changed: it still owns the
 * theme, the saved choice and the icon.
 */
import { useEffect } from 'react'
import gsap from 'gsap'
import { reducedMotion } from './hooks'

type VT = { ready: Promise<void>; finished: Promise<void> }
type DocVT = Document & { startViewTransition?: (cb: () => void) => VT }

const DURATION = 760
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)'

export function useThemeShift() {
  useEffect(() => {
    let passing = false
    let busy = false

    const onClick = (e: MouseEvent) => {
      if (passing || reducedMotion()) return
      const btn = (e.target as Element | null)?.closest?.('#theme') as HTMLElement | null
      if (!btn) return
      // A second click while the reveal is running waits it out instead of snapping mid-sweep.
      if (busy) {
        e.stopImmediatePropagation()
        e.preventDefault()
        return
      }
      // Hold the click back from the engine, then hand it over inside the transition.
      e.stopImmediatePropagation()
      e.preventDefault()
      const pass = () => {
        passing = true
        btn.click()
        passing = false
      }

      const icon = btn.querySelector('svg')
      if (icon) {
        gsap.fromTo(
          icon,
          { rotation: 0, scale: 1 },
          { rotation: 180, scale: 0.6, duration: 0.3, ease: 'power2.in', yoyo: true, repeat: 1, transformOrigin: '50% 50%', clearProps: 'transform' },
        )
      }

      const doc = document as DocVT
      const root = document.documentElement
      if (!doc.startViewTransition) {
        root.classList.add('theme-fading')
        pass()
        window.setTimeout(() => root.classList.remove('theme-fading'), 650)
        return
      }

      const r = btn.getBoundingClientRect()
      const x = r.left + r.width / 2
      const y = r.top + r.height / 2
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      busy = true
      root.classList.add('theme-shift')
      const t = doc.startViewTransition(pass)
      t.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: DURATION, easing: EASE, pseudoElement: '::view-transition-new(root)' },
          )
          // The old theme dims slightly as the new one sweeps over it.
          root.animate(
            { filter: ['brightness(1)', 'brightness(0.9)'] },
            { duration: DURATION, easing: EASE, pseudoElement: '::view-transition-old(root)' },
          )
        })
        .catch(() => {})
      t.finished.finally(() => {
        root.classList.remove('theme-shift')
        busy = false
      })
    }

    window.addEventListener('click', onClick, true)
    return () => window.removeEventListener('click', onClick, true)
  }, [])
}
