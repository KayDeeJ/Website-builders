/*
 * Ruby, the front desk. A floating receptionist that greets visitors on every screen, answers
 * questions from the site's own pages (knowledge.ts), sends people to the right screen, and hands
 * anything she can't answer to the engine's "Get help" desk (call back, live chat, email).
 *
 * It owns its own DOM, outside <main>, so it never touches engine markup. Every motion rests
 * under prefers-reduced-motion.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reducedMotion } from '../hooks'
import Avatar from './Avatar'
import { answer, pageOf, pages, type Link } from './knowledge'
import './receptionist.css'

type Msg = { id: number; who: 'bot' | 'me' | 'page'; text: string; links?: Link[] }

let nextId = 1
const SEEN_KEY = 'umt-rx-seen'

const readSeen = (): string[] => {
  try {
    return JSON.parse(sessionStorage.getItem(SEEN_KEY) ?? '[]')
  } catch {
    return []
  }
}
const markSeen = (p: string) => {
  try {
    const s = readSeen()
    if (!s.includes(p)) sessionStorage.setItem(SEEN_KEY, JSON.stringify([...s, p]))
  } catch {
    /* private mode: nudges simply repeat */
  }
}

/** Hands over to the engine's help desk, whose button stays in the page (hidden) as its hook. */
const openHelpDesk = () => document.getElementById('ghb')?.click()

export default function Receptionist() {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(() => pageOf(location.hash))
  const [msgs, setMsgs] = useState<Msg[]>(() => [{ id: nextId++, who: 'bot', text: pages[pageOf(location.hash)].nudge }])
  const [typing, setTyping] = useState(false)
  const [nudge, setNudge] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const launch = useRef<HTMLButtonElement>(null)
  const face = useRef<SVGSVGElement>(null)
  const log = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const chips = useRef<HTMLDivElement>(null)
  const nudgeEl = useRef<HTMLDivElement>(null)
  const openRef = useRef(open)
  const pageRef = useRef(page)
  useEffect(() => {
    openRef.current = open
  }, [open])
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  /* ---------- the face: idle float, blinks, glances at the pointer ---------- */
  useEffect(() => {
    const svg = face.current
    const btn = launch.current
    if (!svg || !btn || reducedMotion()) return
    const head = svg.querySelector('.rx-head')
    const eyes = svg.querySelectorAll('.rx-eye')
    const ctx = gsap.context(() => {
      gsap.set(eyes, { transformOrigin: '50% 50%', transformBox: 'fill-box' })
      gsap.to(btn, { y: -5, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      const blink = () => {
        gsap.to(eyes, { scaleY: 0.1, duration: 0.07, yoyo: true, repeat: 1, ease: 'power1.in' })
        blinkT = window.setTimeout(blink, 2400 + Math.random() * 3200)
      }
      let blinkT = window.setTimeout(blink, 1800)
      const ex = gsap.quickTo(svg.querySelector('.rx-eyes'), 'x', { duration: 0.4, ease: 'power3.out' })
      const ey = gsap.quickTo(svg.querySelector('.rx-eyes'), 'y', { duration: 0.4, ease: 'power3.out' })
      const hr = gsap.quickTo(head, 'rotation', { duration: 0.8, ease: 'power3.out' })
      gsap.set(head, { transformOrigin: '50% 80%', transformBox: 'fill-box' })
      const look = (e: PointerEvent) => {
        const r = svg.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const d = Math.hypot(dx, dy) || 1
        const k = Math.min(1, d / 400)
        ex((dx / d) * 2.2 * k)
        ey((dy / d) * 1.8 * k)
        hr((dx / d) * 6 * k)
      }
      window.addEventListener('pointermove', look, { passive: true })
      return () => {
        window.clearTimeout(blinkT)
        window.removeEventListener('pointermove', look)
      }
    }, root)
    return () => ctx.revert()
  }, [])

  /** Ruby smiles: eyes close happily and she hops. Used on arrival at a screen and on answers. */
  const smile = useCallback(() => {
    if (reducedMotion()) return
    const svgs = root.current?.querySelectorAll<SVGSVGElement>('.rx-face')
    svgs?.forEach((svg) => {
      const tl = gsap.timeline()
      tl.to(svg.querySelectorAll('.rx-eye'), { autoAlpha: 0, duration: 0.12 }, 0)
        .to(svg.querySelector('.rx-happy'), { autoAlpha: 1, duration: 0.12 }, 0)
        .fromTo(svg, { y: 0, rotation: 0 }, { y: -9, rotation: -6, duration: 0.22, ease: 'power2.out' }, 0)
        .to(svg, { y: 0, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)' })
        .to(svg.querySelectorAll('.rx-eye'), { autoAlpha: 1, duration: 0.15 }, 0.85)
        .to(svg.querySelector('.rx-happy'), { autoAlpha: 0, duration: 0.15 }, 0.85)
    })
  }, [])

  /* ---------- arrival: the launcher drops in once the intro has played ---------- */
  useLayoutEffect(() => {
    const btn = launch.current
    if (!btn || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        btn,
        { scale: 0, rotation: -40, autoAlpha: 0 },
        { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.9, delay: document.querySelector('.intro') ? 3.2 : 0.8, ease: 'back.out(2)' },
      )
    })
    return () => ctx.revert()
  }, [])

  /* ---------- every screen change: Ruby reacts, nudges or notes it in the chat ---------- */
  useEffect(() => {
    const onRoute = () => {
      const p = pageOf(location.hash)
      if (pageRef.current === p) return
      pageRef.current = p
      setPage(p)
      later(smile, 450)
      if (openRef.current) {
        setMsgs((m) => [...m, { id: nextId++, who: 'page', text: pages[p].title }, { id: nextId++, who: 'bot', text: pages[p].nudge }])
      } else if (!readSeen().includes(p)) {
        later(() => setNudge(pages[p].nudge), 900)
      }
      markSeen(p)
    }
    window.addEventListener('hashchange', onRoute)
    // First greeting on the landing screen.
    const p0 = pageOf(location.hash)
    if (!readSeen().includes(p0)) {
      later(() => {
        if (!openRef.current) setNudge(pages[p0].nudge)
        markSeen(p0)
      }, document.querySelector('.intro') ? 4600 : 2200)
    }
    const t = timers.current
    return () => {
      window.removeEventListener('hashchange', onRoute)
      t.forEach(clearTimeout)
    }
  }, [smile])

  /* ---------- the nudge bubble: pops from the face, leaves on its own ---------- */
  useLayoutEffect(() => {
    const el = nudgeEl.current
    if (!el || !nudge) return
    if (!reducedMotion()) {
      gsap.fromTo(el, { autoAlpha: 0, y: 14, scale: 0.85, transformOrigin: '100% 100%' }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.8)' })
      smile()
    }
    const t = window.setTimeout(() => {
      if (reducedMotion()) return setNudge(null)
      gsap.to(el, { autoAlpha: 0, y: 8, scale: 0.92, duration: 0.3, ease: 'power2.in', onComplete: () => setNudge(null) })
    }, 7000)
    return () => window.clearTimeout(t)
  }, [nudge, smile])

  /* ---------- opening and closing: the panel grows out of the face ---------- */
  const toggle = (on: boolean) => {
    const el = panel.current
    if (!el) return
    if (on) {
      setNudge(null)
      setOpen(true)
    } else if (reducedMotion()) {
      setOpen(false)
    } else {
      gsap.to(el, {
        clipPath: 'circle(0% at 100% 100%)',
        y: 20,
        duration: 0.45,
        ease: 'expo.in',
        onComplete: () => setOpen(false),
      })
    }
  }

  useLayoutEffect(() => {
    const el = panel.current
    if (!el || !open) return
    input.current?.focus({ preventScroll: true })
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(el, { clipPath: 'circle(0% at 100% 100%)', y: 20 }, { clipPath: 'circle(150% at 100% 100%)', y: 0, duration: 0.7, ease: 'expo.out', clearProps: 'clipPath,transform' })
        .from('.rx-top > *', { autoAlpha: 0, y: -10, stagger: 0.06, duration: 0.4, ease: 'power3.out' }, 0.15)
        .from('.rx-msg', { autoAlpha: 0, y: 14, stagger: 0.05, duration: 0.45, ease: 'power3.out' }, 0.22)
        .from('.rx-chip', { autoAlpha: 0, y: 10, scale: 0.9, stagger: 0.05, duration: 0.4, ease: 'back.out(2)' }, 0.32)
        .from('.rx-form', { autoAlpha: 0, y: 12, duration: 0.4, ease: 'power3.out' }, 0.3)
    }, el)
    smile()
    return () => ctx.revert()
  }, [open, smile])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggle(false)
        launch.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  /* ---------- each new message springs in; the log follows it ---------- */
  const shown = useRef(0)
  useLayoutEffect(() => {
    const box = log.current
    if (!box) return
    const items = Array.from(box.querySelectorAll<HTMLElement>('.rx-msg, .rx-typing'))
    const fresh = items.slice(shown.current)
    shown.current = box.querySelectorAll('.rx-msg').length
    box.scrollTo({ top: box.scrollHeight, behavior: reducedMotion() ? 'auto' : 'smooth' })
    if (reducedMotion() || !open) return
    fresh.forEach((m) => {
      const me = m.classList.contains('rx-me')
      const tl = gsap.timeline()
      tl.fromTo(
        m,
        { autoAlpha: 0, y: 16, x: me ? 24 : -24, scale: 0.92, transformOrigin: me ? '100% 100%' : '0% 100%' },
        { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.5, ease: 'back.out(1.6)', clearProps: 'transform,opacity,visibility' },
      )
      const words = m.querySelectorAll('.rx-w')
      if (words.length) tl.fromTo(words, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, stagger: 0.018, duration: 0.3, ease: 'power2.out', clearProps: 'all' }, 0.08)
      const links = m.querySelectorAll('.rx-link')
      if (links.length) tl.fromTo(links, { autoAlpha: 0, y: 8, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.4, ease: 'back.out(2)', clearProps: 'all' }, '>-0.15')
    })
  }, [msgs, typing, open])

  /* the suggested questions change with the screen: they shuffle out and back in */
  useLayoutEffect(() => {
    if (!open || reducedMotion() || !chips.current) return
    gsap.fromTo(chips.current.children, { autoAlpha: 0, y: 10, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4, ease: 'back.out(2)', clearProps: 'all' })
    // only when the screen changes, not on open (the open timeline does that)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  /* ---------- asking ---------- */
  const ask = (q: string) => {
    const text = q.trim()
    if (!text) return
    setMsgs((m) => [...m, { id: nextId++, who: 'me', text }])
    setDraft('')
    if (/^(talk to a person|contact|human)$/i.test(text)) {
      setTyping(true)
      later(() => {
        setTyping(false)
        setMsgs((m) => [...m, { id: nextId++, who: 'bot', text: 'Opening the help desk for you: call back, live chat or email.' }])
        later(openHelpDesk, 700)
      }, 600)
      return
    }
    const r = answer(text)
    setTyping(true)
    later(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: nextId++, who: 'bot', text: r.text, links: r.links }])
      later(smile, 120)
    }, reducedMotion() ? 0 : Math.min(1400, 450 + r.text.length * 4))
  }

  const follow = (l: Link) => {
    if (l.href === '#help') {
      openHelpDesk()
      return true
    }
    // On a phone the panel covers the page: get out of the way of the screen being opened.
    if (window.matchMedia('(max-width: 560px)').matches) later(() => toggle(false), 50)
    return false
  }

  const p = pages[page]
  return (
    <div ref={root} className={`rx${open ? ' rx-open' : ''}`}>
      {nudge && !open && (
        <div ref={nudgeEl} className="rx-nudge" role="status">
          <button type="button" className="rx-nudge-body" onClick={() => toggle(true)}>
            <b>Ruby</b>
            <span>{nudge}</span>
          </button>
          <button type="button" className="rx-nudge-x" aria-label="Dismiss" onClick={() => setNudge(null)}>
            ×
          </button>
        </div>
      )}

      <div ref={panel} id="rx-panel" className="rx-panel" role="dialog" aria-label="Ruby, the front desk" hidden={!open}>
        <div className="rx-top">
          <span className="rx-mini">
            <Avatar size={40} />
            <i className="rx-live" aria-hidden="true" />
          </span>
          <div className="rx-id">
            <b>Ruby</b>
            <span>
              Front desk · <em key={page} className="rx-where">{p.title}</em>
            </span>
          </div>
          <button type="button" className="rx-close" aria-label="Close" onClick={() => toggle(false)}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={log} className="rx-log" aria-live="polite" data-lenis-prevent="">
          {msgs.map((m) =>
            m.who === 'page' ? (
              <div key={m.id} className="rx-msg rx-page">
                <span>Now on {m.text}</span>
              </div>
            ) : (
              <div key={m.id} className={`rx-msg rx-${m.who}`}>
                <p>
                  {m.who === 'bot'
                    ? m.text.split(' ').map((w, i) => (
                        <span key={i} className="rx-w">
                          {w}{' '}
                        </span>
                      ))
                    : m.text}
                </p>
                {m.links && (
                  <div className="rx-links">
                    {m.links.map((l) => (
                      <a
                        key={l.href}
                        className="rx-link"
                        href={l.href}
                        onClick={(e) => {
                          if (follow(l)) e.preventDefault()
                        }}
                      >
                        {l.label}
                        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                          <path d="M4 8h8M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ),
          )}
          {typing && (
            <div className="rx-typing" aria-label="Ruby is typing">
              <i />
              <i />
              <i />
            </div>
          )}
        </div>

        <div ref={chips} className="rx-chips" key={page}>
          {p.asks.map((a) => (
            <button key={a} type="button" className="rx-chip" onClick={() => ask(a)}>
              {a}
            </button>
          ))}
        </div>

        <form
          className="rx-form"
          onSubmit={(e) => {
            e.preventDefault()
            ask(draft)
          }}
        >
          <label className="rx-sr" htmlFor="rx-q">
            Ask Ruby a question
          </label>
          <input
            ref={input}
            id="rx-q"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about selling, buying, fees…"
            autoComplete="off"
            maxLength={240}
          />
          <button type="submit" className="rx-send" aria-label="Send" disabled={!draft.trim()}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M4 12 20 4l-6 16-2.5-6.5L4 12Z" fill="currentColor" />
            </svg>
          </button>
        </form>
      </div>

      <button
        ref={launch}
        type="button"
        className="rx-launch"
        aria-expanded={open}
        aria-controls="rx-panel"
        aria-label={open ? 'Close the front desk' : 'Ask Ruby, the front desk'}
        onClick={() => toggle(!open)}
      >
        <Avatar ref={face} size={58} />
        <span className="rx-ring" aria-hidden="true" />
      </button>
    </div>
  )
}
