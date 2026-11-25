/*
 * Cinematic transitions between screens.
 *  - Following a link to another screen: a plum curtain with the Union logo sweeps across, the
 *    screen changes behind it, and the curtain sweeps away.
 *  - Opening a car from a car card: the card's photo grows into the car page's gallery and the
 *    price glides into the price panel.
 * Links are handled after the engine's own click handlers have run (window, bubble phase), and
 * only when nothing else has taken the click. Back/forward and reduced motion keep plain routing.
 */
import { useEffect } from 'react'
import gsap from 'gsap'
import { reducedMotion } from './hooks'
import { pageOf, pages } from './receptionist/knowledge'

let busy = false
const isCar = (href: string) => /^#car-\d+$/.test(href)

function makeCurtain() {
  const c = document.createElement('div')
  c.className = 'curtain'
  c.setAttribute('aria-hidden', 'true')
  const logo = document.querySelector('header.top .brand svg')?.cloneNode(true) as SVGElement | undefined
  const mark = document.createElement('div')
  mark.className = 'curtain-logo'
  if (logo) {
    logo.removeAttribute('role')
    logo.removeAttribute('aria-label')
    mark.appendChild(logo)
  }
  const edge = document.createElement('span')
  edge.className = 'curtain-edge'
  // The name of the screen being opened, set on each sweep.
  const label = document.createElement('div')
  label.className = 'curtain-label'
  c.append(mark, label, edge)
  document.body.appendChild(c)
  return c
}

function curtainTo(href: string) {
  busy = true
  document.body.dataset.cinema = 'on'
  const c = document.querySelector<HTMLElement>('.curtain') ?? makeCurtain()
  const logo = c.querySelector('.curtain-logo')
  const edge = c.querySelector('.curtain-edge')
  const label = c.querySelector<HTMLElement>('.curtain-label')
  if (label) {
    label.replaceChildren(
      ...Array.from(pages[pageOf(href)].title).map((ch) => {
        const s = document.createElement('span')
        s.textContent = ch === ' ' ? '\u00a0' : ch
        return s
      }),
    )
  }
  const letters = label ? Array.from(label.children) : []
  gsap.killTweensOf([c, logo, edge, label, ...letters])
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(c, { visibility: 'hidden' })
      delete document.body.dataset.cinema
      busy = false
    },
  })
  tl.set(c, { visibility: 'visible', clipPath: 'inset(0% 100% 0% 0%)' })
    .set(logo, { autoAlpha: 0, scale: 0.92 })
    .set(edge, { left: '0%', autoAlpha: 1 })
    .to(c, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.42, ease: 'expo.in' }, 0)
    .to(edge, { left: '100%', duration: 0.42, ease: 'expo.in' }, 0)
    .set(label, { autoAlpha: 1 })
    .set(letters, { autoAlpha: 0, yPercent: 110 })
    .to(logo, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.22)
    .to(letters, { autoAlpha: 1, yPercent: 0, duration: 0.34, stagger: { amount: 0.18 }, ease: 'expo.out' }, 0.24)
    .call(
      () => {
        location.hash = href
      },
      undefined,
      0.5,
    )
    .to(logo, { autoAlpha: 0, scale: 1.04, duration: 0.25, ease: 'power2.in' }, 0.72)
    .to(letters, { autoAlpha: 0, yPercent: -80, duration: 0.25, stagger: 0.008, ease: 'power2.in' }, '<')
    .set(edge, { left: '0%' })
    .to(c, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.6, ease: 'expo.out' }, '>-0.05')
    .to(edge, { left: '100%', duration: 0.6, ease: 'expo.out', autoAlpha: 0 }, '<')
}

/** Lays an element's copy over the page at its current place, for the flight to the car page. */
function ghost(el: HTMLElement, cls: string) {
  const r = el.getBoundingClientRect()
  const g = el.cloneNode(true) as HTMLElement
  g.removeAttribute('id')
  g.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'))
  g.classList.add('flight', cls)
  g.setAttribute('aria-hidden', 'true')
  const cs = getComputedStyle(el)
  Object.assign(g.style, {
    position: 'fixed',
    left: `${r.left}px`,
    top: `${r.top}px`,
    width: `${r.width}px`,
    height: `${r.height}px`,
    margin: '0',
    zIndex: '340',
    pointerEvents: 'none',
    borderRadius: cs.borderRadius,
    fontFamily: cs.fontFamily,
    fontSize: cs.fontSize,
    fontWeight: cs.fontWeight,
    letterSpacing: cs.letterSpacing,
    lineHeight: cs.lineHeight,
    color: cs.color,
  })
  document.body.appendChild(g)
  return g
}

function morphTo(card: HTMLElement, href: string) {
  const photo = card.querySelector<HTMLElement>('.ph')
  const price = card.querySelector<HTMLElement>('.price')
  if (!photo) {
    curtainTo(href)
    return
  }
  busy = true
  document.body.dataset.cinema = 'on'
  const gPhoto = ghost(photo, 'flight-photo')
  const gPrice = price ? ghost(price, 'flight-price') : null
  location.hash = href
  // The engine routes on the hashchange event, which fires after this; wait for the car page.
  const view = document.getElementById('view-car')
  const t0 = performance.now()
  const ready = () => view && !view.hasAttribute('hidden') && document.getElementById('gph')
  const wait = () => (ready() || performance.now() - t0 > 600 ? requestAnimationFrame(fly) : requestAnimationFrame(wait))
  requestAnimationFrame(wait)
  const fly = () => {
    const body = document.getElementById('car-body')
    const toPhoto = document.getElementById('gph')
    const toPrice = body?.querySelector<HTMLElement>('.price.xl') ?? null
    const done = () => {
      ;[toPhoto, toPrice].forEach((t) => t && (t.style.visibility = ''))
      gsap.to([gPhoto, gPrice].filter(Boolean), {
        autoAlpha: 0,
        duration: 0.25,
        onComplete: () => {
          gPhoto.remove()
          gPrice?.remove()
          delete document.body.dataset.cinema
          busy = false
        },
      })
    }
    if (!toPhoto) {
      done()
      return
    }
    const p = toPhoto.getBoundingClientRect()
    toPhoto.style.visibility = 'hidden'
    if (toPrice) toPrice.style.visibility = 'hidden'
    const rest = body?.querySelectorAll(':scope > *')
    if (rest) gsap.fromTo(rest, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, delay: 0.35, ease: 'power2.out', clearProps: 'opacity,visibility' })
    const tl = gsap.timeline({ onComplete: done })
    tl.to(gPhoto, { left: p.left, top: p.top, width: p.width, height: p.height, borderRadius: getComputedStyle(toPhoto).borderRadius, duration: 0.8, ease: 'expo.inOut' }, 0)
    if (gPrice && toPrice) {
      const q = toPrice.getBoundingClientRect()
      const fs = getComputedStyle(toPrice).fontSize
      tl.to(gPrice, { left: q.left, top: q.top, width: q.width, height: q.height, fontSize: fs, duration: 0.8, ease: 'expo.inOut' }, 0.05)
    }
  }
}

export function useCinema() {
  useEffect(() => {
    if (reducedMotion()) return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a || a.target) return
      const href = a.getAttribute('href') ?? ''
      if (href.length < 2 || href === location.hash || (href === '#home' && !location.hash)) return
      if (a.closest('.tupv, .mdl, .curtain') || document.body.classList.contains('fsopen')) return
      e.preventDefault()
      if (busy) {
        location.hash = href
        return
      }
      const card = a.closest<HTMLElement>('.car')
      if (isCar(href) && card) morphTo(card, href)
      else curtainTo(href)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])
}
