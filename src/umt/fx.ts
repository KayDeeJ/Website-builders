/*
 * Motion layer for the engine-built parts of the site. Nothing here edits the engine or the
 * text it reads back: every effect watches the DOM the engine writes and animates on top of it.
 * All of it is skipped when the visitor prefers reduced motion.
 */
import { useEffect } from 'react'
import gsap from 'gsap'
import { reducedMotion } from './hooks'

const EASE = 'power3.out'

/** Each screen the engine reveals rises in, instead of snapping into place. */
function screenTransitions() {
  const views = Array.from(document.querySelectorAll<HTMLElement>('main > .view'))
  const mo = new MutationObserver((records) => {
    for (const r of records) {
      const v = r.target as HTMLElement
      // The curtain or the car morph handles its own reveal.
      if (document.body.dataset.cinema) continue
      if (r.oldValue !== null && !v.hasAttribute('hidden')) {
        gsap.fromTo(
          v,
          { autoAlpha: 0, y: 18, filter: 'blur(8px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'expo.out', clearProps: 'opacity,visibility,transform,filter' },
        )
      }
    }
  })
  views.forEach((v) => mo.observe(v, { attributes: true, attributeFilter: ['hidden'], attributeOldValue: true }))
  return () => mo.disconnect()
}

/**
 * Buy grid: when a filter, chip, sort or page changes, the engine rebuilds the grid. Cards that
 * stay slide from their old place to the new one; cards that arrive fade up. Cards are matched
 * by their link (#car-N), positions captured just before the engine handles the input.
 */
function gridFlip() {
  const view = document.getElementById('view-buy')
  const grid = document.getElementById('grid')
  if (!view || !grid) return () => {}
  let before: Map<string, DOMRect> | null = null
  const keyOf = (el: Element) => el.querySelector('a[href^="#car-"]')?.getAttribute('href') ?? ''
  const snap = () => {
    before = new Map()
    grid.querySelectorAll(':scope > .car').forEach((c) => {
      const k = keyOf(c)
      if (k) before!.set(k, c.getBoundingClientRect())
    })
  }
  const opts = { capture: true }
  view.addEventListener('click', snap, opts)
  view.addEventListener('change', snap, opts)
  view.addEventListener('submit', snap, opts)

  const mo = new MutationObserver(() => {
    if (!before) return
    const prev = before
    before = null
    let i = 0
    grid.querySelectorAll<HTMLElement>(':scope > .car').forEach((c) => {
      const old = prev.get(keyOf(c))
      const now = c.getBoundingClientRect()
      if (old && (Math.abs(old.left - now.left) > 1 || Math.abs(old.top - now.top) > 1)) {
        gsap.fromTo(c, { x: old.left - now.left, y: old.top - now.top }, { x: 0, y: 0, duration: 0.6, ease: EASE, clearProps: 'transform' })
      } else if (!old) {
        gsap.fromTo(c, { autoAlpha: 0, y: 18, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, delay: Math.min(i++ * 0.04, 0.4), ease: EASE, clearProps: 'opacity,visibility,transform' })
      }
    })
  })
  mo.observe(grid, { childList: true })
  return () => {
    mo.disconnect()
    view.removeEventListener('click', snap, opts)
    view.removeEventListener('change', snap, opts)
    view.removeEventListener('submit', snap, opts)
  }
}

/* ---------- rolling numbers (finance figures) ---------- */

type Num = { prefix: string; value: number; decimals: number; suffix: string }
const parseNum = (s: string): Num | null => {
  const m = /^(\D*?)(-?[\d,]+(?:\.(\d+))?)(.*)$/.exec(s.trim())
  if (!m) return null
  return { prefix: m[1], value: Number(m[2].replace(/,/g, '')), decimals: m[3]?.length ?? 0, suffix: m[4] }
}
const fmtNum = (n: Num, v: number) =>
  n.prefix + v.toLocaleString('en-GB', { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals }) + n.suffix

/**
 * Shows `el` counting from `from` to its current text. The real element keeps the true figure
 * (the engine reads it back) and is only made transparent; an aria-hidden copy laid over it
 * counts up, then removes itself.
 */
type Roll = { copy: HTMLElement; el: HTMLElement; tween: gsap.core.Tween; timer: number }
const rolls = new Map<string, Roll>()

function endRoll(key: string) {
  const r = rolls.get(key)
  if (!r) return
  r.tween.kill()
  window.clearTimeout(r.timer)
  r.copy.remove()
  r.el.style.color = ''
  rolls.delete(key)
}

function rollOver(key: string, el: HTMLElement, from: string) {
  endRoll(key)
  const a = parseNum(from)
  const b = parseNum(el.textContent ?? '')
  if (!a || !b || a.value === b.value || a.prefix !== b.prefix) return
  // The copy lives on <body>, never inside the engine's markup: the engine reads these figures back
  // with selectors like ".row.big2 span:last-child", so nothing may be added next to them.
  const box = el.getBoundingClientRect()
  if (!box.width) return
  const copy = document.createElement('span')
  copy.className = 'num-roll'
  copy.setAttribute('aria-hidden', 'true')
  const cs = getComputedStyle(el)
  Object.assign(copy.style, {
    position: 'absolute',
    left: `${box.left + window.scrollX}px`,
    top: `${box.top + window.scrollY}px`,
    zIndex: '5',
    // Copy the longhands: the "font" shorthand reads back empty when font-variant-numeric is set.
    fontFamily: cs.fontFamily,
    fontSize: cs.fontSize,
    fontWeight: cs.fontWeight,
    fontStyle: cs.fontStyle,
    lineHeight: cs.lineHeight,
    letterSpacing: cs.letterSpacing,
    color: cs.color,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    fontVariantNumeric: cs.fontVariantNumeric,
  })
  copy.textContent = fmtNum(b, a.value)
  document.body.appendChild(copy)
  el.style.color = 'transparent'
  const state = { v: a.value }
  const tween = gsap.to(state, {
    v: b.value,
    duration: 0.55,
    ease: 'power2.out',
    onUpdate: () => (copy.textContent = fmtNum(b, state.v)),
    onComplete: () => endRoll(key),
  })
  // Safety net: never leave a copy on screen, whatever the engine does meanwhile.
  const timer = window.setTimeout(() => endRoll(key), 900)
  rolls.set(key, { copy, el, tween, timer })
}

/** Car page: the monthly payment and the total count to their new values as options change. */
function financeRoll() {
  const body = document.getElementById('car-body')
  if (!body) return () => {}
  let car = location.hash
  let lastPm = ''
  let lastTotal = ''
  let busy = false
  const check = () => {
    if (busy) return
    busy = true
    if (location.hash !== car) {
      car = location.hash
      lastPm = lastTotal = ''
    }
    const pm = document.getElementById('pm')
    // The engine's total is the row's last span; skip the overlay copies this module adds to the row.
    const totalSpans = body.querySelectorAll<HTMLElement>('#sum .row.big2 > span:not(.num-roll)')
    const total = totalSpans[totalSpans.length - 1] ?? null
    const pmText = pm?.textContent ?? ''
    const totalText = total?.textContent ?? ''
    if (pm && lastPm && pmText && pmText !== lastPm) rollOver('pm', pm, lastPm)
    if (total && lastTotal && totalText && totalText !== lastTotal) rollOver('total', total, lastTotal)
    lastPm = pmText
    lastTotal = totalText
    busy = false
  }
  const mo = new MutationObserver(check)
  mo.observe(body, { childList: true, subtree: true, characterData: true })
  return () => {
    mo.disconnect()
    endRoll('pm')
    endRoll('total')
  }
}

/* ---------- hot-deal countdown ---------- */

/**
 * The engine rewrites the countdown text every second. A visual copy shows the same text with
 * each changed character rolling up into place; the real #ptm stays for screen readers.
 */
function countdownRoll() {
  const promo = document.getElementById('promo')
  if (!promo) return () => {}
  const sync = () => {
    const ptm = document.getElementById('ptm')
    if (!ptm) return
    let roll = ptm.nextElementSibling as HTMLElement | null
    if (!roll || !roll.classList.contains('ptm-roll')) {
      roll = document.createElement('span')
      roll.className = 'ptm ptm-roll'
      roll.setAttribute('aria-hidden', 'true')
      ptm.after(roll)
      ptm.classList.add('ptm-src')
    }
    const text = ptm.textContent ?? ''
    const cells = Array.from(roll.children) as HTMLElement[]
    if (cells.length !== text.length) {
      roll.replaceChildren(
        ...Array.from(text).map((ch) => {
          const c = document.createElement('span')
          c.className = 'pd'
          c.textContent = ch
          return c
        }),
      )
      return
    }
    Array.from(text).forEach((ch, i) => {
      const c = cells[i]
      if (c.textContent === ch) return
      c.textContent = ch
      gsap.fromTo(c, { yPercent: 70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.35, ease: EASE, clearProps: 'all' })
    })
  }
  const mo = new MutationObserver((recs) => {
    if (recs.every((r) => (r.target as Element).closest?.('.ptm-roll'))) return
    sync()
  })
  mo.observe(promo, { childList: true, subtree: true, characterData: true })
  sync()
  return () => mo.disconnect()
}

/** Wires the motion layer once the engine has built its screens. */
export function useEngineFx() {
  useEffect(() => {
    if (reducedMotion()) return
    let cleanups: Array<() => void> = []
    const start = () => {
      cleanups = [screenTransitions(), gridFlip(), financeRoll(), countdownRoll()]
    }
    // The engine is a classic script appended after the first render; wait for it to have run.
    const ready = () => document.getElementById('grid')?.childElementCount
    if (ready()) start()
    else {
      const t = window.setInterval(() => {
        if (ready()) {
          window.clearInterval(t)
          start()
        }
      }, 100)
      cleanups.push(() => window.clearInterval(t))
    }
    return () => cleanups.forEach((c) => c())
  }, [])
}
