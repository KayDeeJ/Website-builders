import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reducedMotion } from './hooks'
import { CoralButton } from './ui'

type Detail = {
  from: string | null
  to: string
  level: number
  sold: number
  perks: string[]
  next: { name: string; need: number } | null
}

declare global {
  interface Window {
    __umtOpenRewards?: () => void
  }
  interface WindowEventMap {
    'umt:tierup': CustomEvent<Detail>
  }
}

const SPARK: Record<string, string[]> = {
  bronze: ['#F7DCC4', '#D99B6C', '#FF9A8A'],
  silver: ['#FFFFFF', '#D9DEE5', '#FF9A8A'],
  gold: ['#FFF1BF', '#F5C451', '#FF9A8A'],
  platinum: ['#C9F2FF', '#E8C8FF', '#FFE3B0', '#FFFFFF'],
}

const stars = (level: number) => '★'.repeat(level)

/** A one-off burst of sparks from the medal, drawn on a canvas and then cleared. */
function burst(canvas: HTMLCanvasElement, x: number, y: number, colours: string[]) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = canvas.clientWidth * dpr
  canvas.height = canvas.clientHeight * dpr
  ctx.scale(dpr, dpr)
  const parts = Array.from({ length: 90 }, () => {
    const a = Math.random() * Math.PI * 2
    const v = 3 + Math.random() * 7
    return {
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v - 2,
      r: 1.5 + Math.random() * 3,
      life: 0,
      max: 50 + Math.random() * 40,
      c: colours[Math.floor(Math.random() * colours.length)],
      star: Math.random() < 0.35,
      spin: Math.random() * Math.PI,
    }
  })
  let raf = 0
  const draw = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    let alive = 0
    for (const p of parts) {
      if (p.life > p.max) continue
      alive++
      p.life++
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.97
      p.vy = p.vy * 0.97 + 0.12
      p.spin += 0.15
      ctx.globalAlpha = Math.max(0, 1 - p.life / p.max)
      ctx.fillStyle = p.c
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.spin)
      if (p.star) {
        const s = p.r * 1.8
        ctx.beginPath()
        for (let i = 0; i < 8; i++) {
          const rr = i % 2 ? s * 0.4 : s
          ctx.lineTo(Math.cos((i * Math.PI) / 4) * rr, Math.sin((i * Math.PI) / 4) * rr)
        }
        ctx.closePath()
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.arc(0, 0, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }
    ctx.globalAlpha = 1
    if (alive) raf = requestAnimationFrame(draw)
    else ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
  }
  raf = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(raf)
}

/**
 * Full-screen tier-up moment. The engine fires `umt:tierup` when a completed sale moves a
 * seller into a new tier; this shows the old medal turning into the new one, a burst of light,
 * the new rewards and the next goal. Any click or Escape skips to the end; it stays open until
 * the seller chooses. Under reduced motion it appears in its final state.
 */
export default function TierUp() {
  const [d, setD] = useState<Detail | null>(null)
  const root = useRef<HTMLDivElement>(null)
  const sparks = useRef<HTMLCanvasElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const back = useRef<Element | null>(null)

  useEffect(() => {
    const on = (e: CustomEvent<Detail>) => {
      back.current = document.activeElement
      setD(e.detail)
    }
    window.addEventListener('umt:tierup', on)
    return () => window.removeEventListener('umt:tierup', on)
  }, [])

  const close = useCallback((rewards: boolean) => {
    tl.current?.kill()
    setD(null)
    document.body.classList.remove('fsopen', 'tu-open')
    if (rewards) window.__umtOpenRewards?.()
    else (back.current as HTMLElement | null)?.focus?.()
  }, [])

  useLayoutEffect(() => {
    const el = root.current
    if (!d || !el) return
    document.body.classList.add('fsopen', 'tu-open')
    const q = gsap.utils.selector(el)
    const done = () => (q('.tu-actions button, .tu-actions a')[0] as HTMLElement | undefined)?.focus()

    if (reducedMotion()) {
      gsap.set(q('.tu-from'), { autoAlpha: 0 })
      done()
      return
    }

    let stopSparks = () => {}
    const t = gsap.timeline({ onComplete: done })
    tl.current = t
    t.set(q('.tu-medal'), { transformPerspective: 700 }, 0)
    t.set(q('.tu-to'), { autoAlpha: 0, rotateY: -90 }, 0)
    t.fromTo(q('.tu-backdrop'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: 'power2.out' })
      .fromTo(q('.tu-from'), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' }, 0.15)
      .to(q('.tu-from'), { scale: 1.08, duration: 0.25, ease: 'power1.inOut', yoyo: true, repeat: 1 }, 0.7)
      .to(q('.tu-from'), { rotateY: 90, duration: 0.3, ease: 'power2.in' }, 1.15)
      .set(q('.tu-from'), { autoAlpha: 0 })
      .to(q('.tu-to'), { autoAlpha: 1, rotateY: 0, duration: 0.55, ease: 'back.out(1.8)' }, 1.45)
      .fromTo(q('.tu-to'), { scale: 1.25 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.55)' }, 1.45)
      .call(() => {
        const c = sparks.current
        const m = q('.tu-to')[0]?.getBoundingClientRect()
        if (c && m) stopSparks = burst(c, m.left + m.width / 2, m.top + m.height / 2, SPARK[d.to.toLowerCase()] ?? SPARK.gold)
      }, [], 1.5)
      .fromTo(q('.tu-rays'), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 1.45)
      .fromTo(q('.tu-h .w'), { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 }, 1.75)
      .fromTo(q('.tu-sub'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.1)
      .fromTo(q('.tu-perks li'), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power2.out', stagger: 0.12 }, 2.3)
      .fromTo(q('.tu-actions'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.3 + d.perks.length * 0.12)

    return () => {
      t.kill()
      stopSparks()
    }
  }, [d])

  useEffect(() => {
    if (!d) return
    const key = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (tl.current && tl.current.progress() < 1) tl.current.progress(1)
      else close(false)
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [d, close])

  if (!d) return null
  const t = d.to.toLowerCase()
  const fromLevel = Math.max(1, d.level - 1)
  const skip = () => {
    if (tl.current && tl.current.progress() < 1) tl.current.progress(1)
  }

  return (
    <div ref={root} className={`tu tu-${t}`} role="dialog" aria-modal="true" aria-labelledby="tu-h" onClick={skip}>
      <div className="tu-backdrop" aria-hidden="true" />
      <canvas ref={sparks} className="tu-sparks" aria-hidden="true" />
      <div className="tu-stage">
        <div className="tu-medals" aria-hidden="true">
          <span className="tu-rays" />
          {d.from && (
            <span className={`tu-medal tu-from tu-m-${d.from.toLowerCase()}`}>
              <span>{stars(fromLevel)}</span>
            </span>
          )}
          <span className={`tu-medal tu-to tu-m-${t}`}>
            <span>{stars(d.level)}</span>
          </span>
        </div>
        <h2 className="tu-h" id="tu-h">
          <span className="w">You’re</span> <span className="w">now</span> <span className="w tu-name">{d.to}</span>
        </h2>
        <p className="tu-sub">
          Trusted Seller, level {d.level}. That’s {d.sold} cars sold
          {d.next ? `, ${d.next.need} more to reach ${d.next.name}.` : ', our top tier.'}
        </p>
        <ul className="tu-perks" aria-label={`Unlocked with ${d.to}`}>
          {d.perks.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="tu-actions" onClick={(e) => e.stopPropagation()}>
          <CoralButton onClick={() => close(true)}>See my rewards</CoralButton>
          <button type="button" className="tu-later" onClick={() => close(false)}>
            Carry on
          </button>
        </div>
      </div>
    </div>
  )
}
