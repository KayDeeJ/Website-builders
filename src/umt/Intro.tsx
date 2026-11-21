import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { reducedMotion } from './hooks'

const seen = () => {
  try {
    return sessionStorage.getItem('umt-intro') === '1'
  } catch {
    return false
  }
}

/**
 * First visit of the session: the Union logo draws itself, headlights sweep on, and the page
 * opens from the centre. Any click or key skips it. Not shown under reduced motion.
 */
export default function Intro() {
  const [on, setOn] = useState(() => !reducedMotion() && !seen() && (location.hash === '' || location.hash === '#home'))
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!on) return
    const el = root.current
    if (!el) return
    window.__umtIntro = true
    try {
      sessionStorage.setItem('umt-intro', '1')
    } catch {
      /* private mode: the intro may show again, which is harmless */
    }
    const logo = document.querySelector('header.top .brand svg')?.cloneNode(true) as SVGSVGElement | undefined
    const slot = el.querySelector('.intro-logo')
    if (logo && slot) {
      logo.removeAttribute('role')
      logo.removeAttribute('aria-label')
      slot.appendChild(logo)
    }
    document.body.classList.add('fsopen')
    const q = gsap.utils.selector(el)
    const strokes = Array.from(el.querySelectorAll<SVGPathElement>('.intro-logo g path'))
    strokes.forEach((p) => {
      const len = p.getTotalLength()
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
    })
    const finish = () => {
      delete window.__umtIntro
      document.body.classList.remove('fsopen')
      window.dispatchEvent(new Event('umt:introdone'))
      setOn(false)
    }
    const tl = gsap.timeline({ onComplete: finish })
    tl.to(strokes, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.12 }, 0.15)
      .from(q('.intro-logo circle'), { scale: 0, transformOrigin: '50% 50%', duration: 0.45, ease: 'back.out(3)' }, 0.85)
      .from(q('.intro-logo > svg > path'), { autoAlpha: 0, x: -10, duration: 0.6, ease: 'power3.out' }, 0.75)
      .fromTo(q('.beam'), { autoAlpha: 0, scaleX: 0.2 }, { autoAlpha: 1, scaleX: 1, duration: 0.55, ease: 'power2.out', stagger: 0.06 }, 1.25)
      .to(q('.beam'), { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 1.95)
      .to(q('.intro-logo'), { autoAlpha: 0, scale: 1.06, duration: 0.45, ease: 'power2.in' }, 1.95)
      .fromTo(el, { clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', duration: 0.9, ease: 'expo.inOut' }, 2.15)
    const skip = () => tl.progress(1)
    el.addEventListener('click', skip)
    window.addEventListener('keydown', skip, { once: true })
    return () => {
      tl.kill()
      el.removeEventListener('click', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [on])

  if (!on) return null
  return (
    <div ref={root} className="intro" aria-hidden="true">
      <span className="beam beam-l" />
      <span className="beam beam-r" />
      <div className="intro-logo" />
    </div>
  )
}
