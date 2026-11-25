/*
 * Arrivals: every screen plays its own entrance when it is shown. The back link slides in from
 * the left, then the blocks of the screen rise in one after another; cards in a row tip up out of
 * the page, list points slide in, and anything below the fold waits and arrives as it scrolls in.
 *
 * It only animates on top of the DOM (transforms and opacity, cleared when done) and leaves alone
 * anything that has motion of its own: split headings, Reveal blocks, the tracker, the buy grid,
 * the home scroll story and the hero. Skipped entirely under reduced motion.
 */
import { useEffect } from 'react'
import gsap from 'gsap'
import { reducedMotion } from './hooks'

const OWN_MOTION = 'h1, h2, .split-parent, .invisible, .tracker-fill, #grid, .scene, .hero, .ds, .gh-steps'
const GROUPS = '.cols, .grid2, .grid3, .tiles, .pk, ul, ol, .fork'
const CLEAR = 'opacity,visibility,transform,filter'

type Kind = 'back' | 'card' | 'point' | 'block'

function pieces(view: HTMLElement): Array<[HTMLElement, Kind]> {
  const out: Array<[HTMLElement, Kind]> = []
  const ok = (el: Element): el is HTMLElement =>
    el instanceof HTMLElement && !el.matches(OWN_MOTION) && !el.querySelector(OWN_MOTION) && !el.closest('.invisible') && el.getClientRects().length > 0
  view.querySelectorAll<HTMLElement>('section > .wrap').forEach((wrap) => {
    if (wrap.closest('.invisible, .ds')) return
    Array.from(wrap.children).forEach((el) => {
      if (el.matches('.back')) {
        if (ok(el)) out.push([el, 'back'])
        return
      }
      // A row of cards or a list: its items arrive one by one.
      const kids = el.matches(GROUPS) ? Array.from(el.children).filter(ok) : []
      if (kids.length >= 2 && kids.length <= 14 && !el.querySelector(OWN_MOTION)) {
        const kind: Kind = el.matches('ul, ol') ? 'point' : 'card'
        kids.forEach((k) => out.push([k, kind]))
        return
      }
      if (ok(el)) out.push([el, 'block'])
    })
  })
  return out
}

const FROM: Record<Kind, gsap.TweenVars> = {
  back: { autoAlpha: 0, x: -18 },
  card: { autoAlpha: 0, y: 36, rotationX: -14, transformPerspective: 900, transformOrigin: '50% 0%' },
  point: { autoAlpha: 0, x: -20 },
  block: { autoAlpha: 0, y: 24, filter: 'blur(6px)' },
}
const TO: gsap.TweenVars = { autoAlpha: 1, x: 0, y: 0, rotationX: 0, filter: 'blur(0px)', duration: 0.8, ease: 'expo.out', clearProps: CLEAR }

export function useArrivals() {
  useEffect(() => {
    if (reducedMotion()) return
    let io: IntersectionObserver | null = null
    let live: HTMLElement[] = []

    const settle = () => {
      io?.disconnect()
      io = null
      gsap.killTweensOf(live)
      gsap.set(live, { clearProps: CLEAR })
      live = []
    }

    const arrive = (view: HTMLElement) => {
      settle()
      // Opening a car from its card: the photo flight already choreographs that page.
      if (document.querySelector('.flight')) return
      const list = pieces(view)
      if (!list.length) return
      live = list.map(([el]) => el)
      // Behind the curtain, wait for it to start lifting.
      const base = document.body.dataset.cinema ? 0.5 : 0.08
      const fold = window.innerHeight * 0.96
      const later: Array<[HTMLElement, Kind]> = []
      let i = 0
      for (const [el, kind] of list) {
        gsap.set(el, FROM[kind])
        if (el.getBoundingClientRect().top < fold) {
          gsap.to(el, { ...TO, delay: base + Math.min(i++ * 0.07, 0.9) })
        } else later.push([el, kind])
      }
      if (!later.length) return
      const kinds = new Map(later)
      let batch = 0
      let batchT = 0
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue
            const el = e.target as HTMLElement
            io?.unobserve(el)
            if (!kinds.has(el)) continue
            // Items entering together cascade instead of landing at once.
            gsap.to(el, { ...TO, delay: Math.min(batch++ * 0.07, 0.5) })
            window.clearTimeout(batchT)
            batchT = window.setTimeout(() => (batch = 0), 120)
          }
        },
        { threshold: 0 },
      )
      later.forEach(([el]) => io!.observe(el))
    }

    let mo: MutationObserver | null = null
    const start = () => {
      const views = Array.from(document.querySelectorAll<HTMLElement>('main > .view'))
      mo = new MutationObserver((records) => {
        // The engine hides every screen, then shows one; act once per screen that ended up shown.
        const shown = new Set<HTMLElement>()
        for (const r of records) if (r.oldValue !== null) shown.add(r.target as HTMLElement)
        shown.forEach((v) => {
          if (!v.hasAttribute('hidden')) requestAnimationFrame(() => arrive(v))
        })
      })
      views.forEach((v) => mo!.observe(v, { attributes: true, attributeFilter: ['hidden'], attributeOldValue: true }))
    }

    const ready = () => document.getElementById('grid')?.childElementCount
    let t = 0
    if (ready()) start()
    else
      t = window.setInterval(() => {
        if (ready()) {
          window.clearInterval(t)
          start()
        }
      }, 100)

    return () => {
      window.clearInterval(t)
      mo?.disconnect()
      settle()
    }
  }, [])
}
