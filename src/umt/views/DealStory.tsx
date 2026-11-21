import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion, useShownKey } from '../hooks'

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

// The site's own stages ("Track every deal") and wording from How it works, Sell and Packages.
const STAGES = [
  { t: 'Reserved', d: 'The buyer buys or reserves the car at its fixed price.' },
  { t: 'Finance approved', n: 'Finance purchases', d: 'On approval, the lender pays out and any finance owed on the car is settled from the proceeds.' },
  { t: 'Inspection', d: 'The car is inspected before the deal completes, with a written report and photos.' },
  { t: 'Preparation', n: 'If ordered', d: 'Bodywork, alloy wheel, interior or full cosmetic work, with before-and-after photos.' },
  { t: 'Ready for delivery', d: 'Delivery to your door with live tracking, or collect it yourself.' },
  { t: 'Completed', d: 'Handover checklist and final photos, then payout and finance settlement tracking.' },
]

const ROAD = 'M40,150 C220,150 260,70 440,70 S700,190 880,150 S1120,60 1160,90'
const STOPS = [0.04, 0.22, 0.4, 0.58, 0.77, 0.96]

/**
 * Home: a pinned scene where scrolling drives a car along a road through each stage of a deal.
 * Under reduced motion it is a plain ordered list of the same stages.
 */
export default function DealStory() {
  const root = useRef<HTMLElement>(null)
  const shown = useShownKey(root)

  useEffect(() => {
    const el = root.current
    if (!el || reducedMotion() || el.closest('.view')?.hasAttribute('hidden')) return
    const q = gsap.utils.selector(el)
    const road = el.querySelector<SVGPathElement>('.ds-road-lit')
    if (!road) return
    const car = q('.ds-car')[0]
    const len = road.getTotalLength()
    const items = q('.ds-stage')
    const dots = q('.ds-dot')
    const count = q('.ds-count b')[0]
    let cur = -1
    const setStage = (i: number) => {
      if (i === cur) return
      cur = i
      items.forEach((s, k) => s.classList.toggle('on', k === i))
      dots.forEach((d, k) => d.classList.toggle('lit', k <= i))
      if (count) count.textContent = String(i + 1).padStart(2, '0')
    }
    setStage(0)
    gsap.set(road, { strokeDasharray: len, strokeDashoffset: len })
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${window.innerHeight * 3.2}`,
        pin: true,
        scrub: 0.7,
        onUpdate: (self) => {
          const p = self.progress
          let i = 0
          STOPS.forEach((s, k) => p >= s - 0.04 && (i = k))
          setStage(i)
        },
      },
    })
    tl.to(road, { strokeDashoffset: 0, duration: 1 }, 0).to(
      car,
      { duration: 1, motionPath: { path: road, align: road, alignOrigin: [0.5, 0.82], autoRotate: true, start: 0.0, end: 1 } },
      0,
    )
    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      gsap.set([road, car], { clearProps: 'all' })
    }
  }, [shown])

  return (
    <section ref={root} className="ds" aria-labelledby="ds-h">
      <div className="wrap ds-wrap">
        <div className="ds-head">
          <h2 id="ds-h">Every deal, start to finish</h2>
          <p className="lede">Buyers and sellers see the same progress, in their profile.</p>
        </div>
        <div className="ds-scene" aria-hidden="true">
          <svg viewBox="0 0 1200 220" preserveAspectRatio="xMidYMid meet">
            <path className="ds-road" d={ROAD} />
            <path className="ds-road-lit" d={ROAD} />
            <g className="ds-car">
              <use href="#car" width="120" height="40" x="-60" y="-34" />
            </g>
          </svg>
        </div>
        <ol className="ds-stages">
          {STAGES.map((s) => (
            <li key={s.t} className="ds-stage">
              <span className="ds-dot" aria-hidden="true" />
              <h3>
                {s.t}
                {s.n && <small>{s.n}</small>}
              </h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="ds-count" aria-hidden="true">
          <b>01</b> / {String(STAGES.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  )
}
