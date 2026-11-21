/*
 * Tactile layer: magnetic buttons, a "View" lens cursor over cars, a light glare across car
 * photos, and prices that count up as cards appear. Mouse/trackpad only for the pointer effects;
 * all of it is skipped under reduced motion. Car prices are display-only (the engine never reads
 * them back), so counting them is safe.
 */
import { useEffect } from 'react'
import gsap from 'gsap'
import { reducedMotion } from './hooks'

const MAGNETIC = '.umt-btn, .btn, .chip, .seg button, .tgl, .tools a.prof, .pager button'
const LENS = '.car a.pl, .fork a.fork-link'

function magnetic() {
  let active: HTMLElement | null = null
  const release = (el: HTMLElement) => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' })
  const move = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest?.(MAGNETIC) as HTMLElement | null
    if (active && active !== el) {
      release(active)
      active = null
    }
    if (!el || el.closest('.tupv, .curtain, .intro')) return
    active = el
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    gsap.to(el, { x: dx * 0.22, y: dy * 0.32, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
  }
  const leave = () => {
    if (active) release(active)
    active = null
  }
  document.addEventListener('pointermove', move, { passive: true })
  document.addEventListener('pointerleave', leave)
  return () => {
    document.removeEventListener('pointermove', move)
    document.removeEventListener('pointerleave', leave)
  }
}

function lens() {
  const el = document.createElement('div')
  el.className = 'lens'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = '<span>View</span>'
  document.body.appendChild(el)
  document.body.classList.add('lens-on')
  const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
  const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })
  let on = false
  const move = (e: PointerEvent) => {
    xTo(e.clientX)
    yTo(e.clientY)
    const over = (e.target as Element | null)?.closest?.(LENS) as HTMLElement | null
    const want = !!over && !document.body.classList.contains('fsopen')
    if (want !== on) {
      on = want
      if (over) el.firstElementChild!.textContent = over.classList.contains('fork-link') ? 'Open' : 'View'
      gsap.to(el, { scale: on ? 1 : 0, autoAlpha: on ? 1 : 0, duration: 0.35, ease: on ? 'back.out(2)' : 'power2.in' })
    }
  }
  gsap.set(el, { scale: 0, autoAlpha: 0, xPercent: -50, yPercent: -50 })
  document.addEventListener('pointermove', move, { passive: true })
  return () => {
    document.removeEventListener('pointermove', move)
    document.body.classList.remove('lens-on')
    el.remove()
  }
}

function glare() {
  const move = (e: PointerEvent) => {
    const ph = (e.target as Element | null)?.closest?.('.car .ph') as HTMLElement | null
    if (!ph) return
    const r = ph.getBoundingClientRect()
    ph.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`)
    ph.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  document.addEventListener('pointermove', move, { passive: true })
  return () => document.removeEventListener('pointermove', move)
}

/** Prices count up from a little below as car cards and the hot-deal card appear. */
function counters() {
  const fmt = (n: number) => '£' + Math.round(n).toLocaleString('en-GB')
  const run = (el: HTMLElement) => {
    if (el.dataset.counted === el.textContent) return
    const m = /^£([\d,]+)$/.exec((el.textContent ?? '').trim())
    if (!m) return
    const to = Number(m[1].replace(/,/g, ''))
    const s = { v: to * 0.82 }
    el.textContent = fmt(s.v)
    gsap.to(s, {
      v: to,
      duration: 0.9,
      ease: 'power3.out',
      onUpdate: () => (el.textContent = fmt(s.v)),
      onComplete: () => {
        el.textContent = fmt(to)
        el.dataset.counted = el.textContent
      },
    })
  }
  const targets = ['grid', 'deal-grid', 'gain-grid', 'promo']
    .map((id) => document.getElementById(id))
    .filter((x): x is HTMLElement => !!x)
  const mo = new MutationObserver((recs) => {
    const found = new Set<HTMLElement>()
    recs.forEach((r) =>
      r.addedNodes.forEach((n) => {
        if (!(n instanceof HTMLElement)) return
        n.querySelectorAll<HTMLElement>('.price, .pr b').forEach((p) => found.add(p))
      }),
    )
    found.forEach(run)
  })
  targets.forEach((t) => mo.observe(t, { childList: true, subtree: true }))
  return () => mo.disconnect()
}

export function useTactile() {
  useEffect(() => {
    if (reducedMotion()) return
    const fine = window.matchMedia('(pointer: fine)').matches
    const stops = [counters()]
    if (fine) stops.push(magnetic(), lens(), glare())
    return () => stops.forEach((s) => s())
  }, [])
}
