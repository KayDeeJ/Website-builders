import type React from 'react'
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export type SiteTheme = 'light' | 'dark'

const readTheme = (): SiteTheme =>
  document.documentElement.getAttribute('data-theme') === 'dark' ||
  (!document.documentElement.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? 'dark'
    : 'light'

/** The engine owns the theme toggle and writes data-theme on <html>; this follows it. */
export function useSiteTheme(): SiteTheme {
  const [theme, setTheme] = useState<SiteTheme>(() => (typeof document === 'undefined' ? 'light' : readTheme()))
  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(readTheme()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  return theme
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Lenis smooth scrolling on GSAP's clock. Routes are hash changes (#sell, #car-3), so on
 * every route the page jumps to the top and ScrollTrigger re-measures the newly shown view.
 * Scrolling pauses while the engine's dialogs or full-screen gallery are open (body.fsopen).
 */
export function useSiteMotion() {
  useEffect(() => {
    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh())
    window.addEventListener('hashchange', refresh)

    if (reducedMotion()) return () => window.removeEventListener('hashchange', refresh)

    const lenis = new Lenis({ lerp: 0.12, anchors: false })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const toTop = () => lenis.scrollTo(0, { immediate: true, force: true })
    window.addEventListener('hashchange', toTop)

    const mo = new MutationObserver(() => {
      if (document.body.classList.contains('fsopen')) lenis.stop()
      else lenis.start()
    })
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('hashchange', refresh)
      window.removeEventListener('hashchange', toTop)
      mo.disconnect()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}

/**
 * Screens are toggled by the engine through the `hidden` attribute. Animated parts sit in
 * screens that are hidden at load, so they measure nothing and would play unseen. This returns
 * a key that changes each time the enclosing screen (.view) is shown, so a component keyed on
 * it remounts and plays its entrance when the visitor actually arrives.
 */
export function useShownKey(ref: React.RefObject<Element | null>) {
  const [key, setKey] = useState(0)
  useEffect(() => {
    const view = ref.current?.closest('.view')
    if (!view) return
    let wasHidden = view.hasAttribute('hidden')
    const mo = new MutationObserver(() => {
      const hidden = view.hasAttribute('hidden')
      if (wasHidden && !hidden) setKey((k) => k + 1)
      wasHidden = hidden
    })
    mo.observe(view, { attributes: true, attributeFilter: ['hidden'] })
    return () => mo.disconnect()
  }, [ref])
  return key
}
