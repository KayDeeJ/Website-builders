import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { reducedMotion, useShownKey } from './hooks'

/*
 * Home hero illustration: a seller hands the keys of a hatchback to a buyer, and the car
 * unlocks. Original artwork in the brand palette (no makes or badges). Plays once each time
 * the home screen is shown (after the first-visit intro), then rests. Static under reduced motion.
 */

const SKIN_A = '#B67A55'
const SKIN_B = '#EFC3A2'

function Car() {
  return (
    <g transform="translate(700 432) scale(1.1)">
    <g className="kh-car">
      <defs>
        <linearGradient id="kh-paint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5B3A7E" />
          <stop offset="0.45" stopColor="#3D215A" />
          <stop offset="1" stopColor="#25123A" />
        </linearGradient>
        <linearGradient id="kh-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A1D38" />
          <stop offset="0.55" stopColor="#120A1C" />
          <stop offset="1" stopColor="#1E1328" />
        </linearGradient>
        <radialGradient id="kh-rim" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#F4F2F7" />
          <stop offset="0.6" stopColor="#B9B6C4" />
          <stop offset="1" stopColor="#6E6A7C" />
        </radialGradient>
      </defs>
      <ellipse cx="300" cy="226" rx="292" ry="13" fill="#000" opacity="0.28" className="kh-shadow" />
      <ellipse className="kh-glowfloor" cx="300" cy="224" rx="250" ry="18" fill="#FF5D5D" opacity="0" />
      {/* body */}
      <path
        fill="url(#kh-paint)"
        d="M36 182 L34 140 Q34 128 42 122 L58 80 Q64 66 80 64 L300 58 Q330 57 346 70 L412 112 Q418 117 430 118 L530 128 Q560 132 566 150 L568 174 Q568 184 556 184 L520 184 A48 48 0 0 0 424 184 L188 184 A48 48 0 0 0 92 184 L48 184 Q36 184 36 182 Z"
      />
      {/* glass and pillars */}
      <path fill="url(#kh-glass)" d="M72 112 L82 76 Q86 70 96 70 L296 66 Q318 66 330 76 L384 112 Z" />
      <path fill="#3D215A" d="M222 67 L234 67 L236 112 L224 112 Z" />
      <path d="M118 74 L292 69" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
      {/* shoulder light, door lines, handles, mirror */}
      <path d="M60 118 Q300 106 540 134" fill="none" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" />
      <path d="M236 116 L238 178 M384 116 L392 176" stroke="#1A0B26" strokeOpacity="0.55" strokeWidth="2" />
      <rect x="292" y="124" width="22" height="6" rx="3" fill="#1A0B26" opacity="0.6" />
      <rect x="170" y="124" width="22" height="6" rx="3" fill="#1A0B26" opacity="0.6" />
      <path d="M398 104 L414 100 Q420 100 418 108 L404 112 Z" fill="#2E1745" />
      {/* lights */}
      <path className="kh-head" d="M526 132 L556 140 Q561 146 552 149 L522 143 Z" fill="#FFF1DA" />
      <path className="kh-tail" d="M40 124 L55 120 L51 141 L38 143 Z" fill="#FF5D5D" />
      <path className="kh-ind" d="M548 160 L564 160 L564 166 L548 166 Z" fill="#FFB347" opacity="0.35" />
      {/* wheels */}
      {[472, 140].map((x) => (
        <g key={x} className="kh-wheel" transform={`translate(${x} 184)`}>
          <circle r="40" fill="#141018" />
          <circle r="26" fill="url(#kh-rim)" />
          {[0, 72, 144, 216, 288].map((a) => (
            <rect key={a} x="-3" y="-24" width="6" height="18" rx="3" fill="#8D889B" transform={`rotate(${a})`} />
          ))}
          <circle r="8" fill="#FF5D5D" />
        </g>
      ))}
      {/* unlock pulses */}
      {[0, 1, 2].map((i) => (
        <circle key={i} className="kh-pulse" cx="300" cy="110" r="40" fill="none" stroke="#FF9A8A" strokeWidth="3" opacity="0" />
      ))}
    </g>
    </g>
  )
}

function Fob() {
  return (
    <g className="kh-fob">
      <circle cx="-30" cy="0" r="13" fill="none" stroke="#C9C6D3" strokeWidth="4" />
      <rect x="-48" y="12" width="26" height="30" rx="7" fill="#FF5D5D" />
      <text x="-35" y="33" textAnchor="middle" fontFamily="Sora Variable, Sora, sans-serif" fontWeight="600" fontSize="16" fill="#1E1426">
        U
      </text>
      <rect x="-20" y="-16" width="58" height="32" rx="15" fill="#1E1426" />
      <rect x="-14" y="-12" width="44" height="8" rx="4" fill="#FFFFFF" opacity="0.14" />
      <circle cx="0" cy="4" r="4" fill="#FF5D5D" />
      <circle cx="14" cy="4" r="4" fill="#5B4A6B" />
    </g>
  )
}

export default function KeyHandover() {
  const root = useRef<SVGSVGElement>(null)
  const shown = useShownKey(root)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const q = gsap.utils.selector(el)
    const finalState = () => {
      gsap.set(q('.kh-seller'), { x: -60, y: 40 })
      gsap.set(q('.kh-buyer'), { x: 0, y: 0 })
      gsap.set(q('.kh-fob'), { x: 806, y: 610, rotation: 6 })
      gsap.set(q('.kh-curl'), { opacity: 1 })
      gsap.set(q('.kh-head'), { opacity: 1 })
    }
    if (reducedMotion() || el.closest('.view')?.hasAttribute('hidden')) {
      finalState()
      return
    }
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
    tl.set(q('.kh-fob'), { x: 630, y: 604, rotation: 62, transformOrigin: '-30px 0px' })
      .set(q('.kh-curl'), { opacity: 0 })
      .set(q('.kh-pulse'), { opacity: 0, scale: 0.4, transformOrigin: '300px 110px' })
      .fromTo(q('.kh-car'), { x: 180, opacity: 0 }, { x: 0, opacity: 1, duration: 1.4, ease: 'expo.out' }, 0)
      .fromTo(q('.kh-wheel'), { rotation: 0 }, { rotation: -200, duration: 1.4, ease: 'expo.out', transformOrigin: '50% 50%' }, 0)
      .fromTo(q('.kh-seller'), { x: -420, y: 120 }, { x: 0, y: 0, duration: 1.1 }, 0.5)
      .fromTo(q('.kh-fob'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.6)
      .fromTo(q('.kh-buyer'), { x: 420, y: 120 }, { x: 0, y: 0, duration: 1.1 }, 0.75)
      // the handover: the keys arc across into the open hand
      .to(q('.kh-fob'), { keyframes: { rotation: [62, 48, 70, 58] }, duration: 0.6, ease: 'sine.inOut' }, 1.35)
      .to(q('.kh-fob'), { x: 720, y: 560, rotation: 10, duration: 0.45, ease: 'power2.out' }, 1.95)
      .to(q('.kh-fob'), { x: 806, y: 610, rotation: 6, duration: 0.45, ease: 'power2.in' }, 2.4)
      .fromTo(q('.kh-glint'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1.3, opacity: 1, duration: 0.25, ease: 'back.out(3)' }, 2.78)
      .to(q('.kh-glint'), { scale: 0.4, opacity: 0, duration: 0.45, ease: 'power2.in' }, 3.05)
      .to(q('.kh-curl'), { opacity: 1, duration: 0.3, ease: 'power2.out' }, 2.85)
      .to(q('.kh-seller'), { x: -60, y: 40, duration: 0.9, ease: 'power2.inOut' }, 2.9)
      .to(q('.kh-buyer'), { y: 8, duration: 0.5, ease: 'power2.inOut', yoyo: true, repeat: 1 }, 3.0)
      // the car unlocks: double flash and pulses
      .to(q('.kh-head, .kh-tail, .kh-ind'), { opacity: 1, duration: 0.12, yoyo: true, repeat: 3, ease: 'none' }, 3.25)
      .to(q('.kh-glowfloor'), { opacity: 0.35, duration: 0.25, yoyo: true, repeat: 3, ease: 'none' }, 3.25)
      .to(q('.kh-pulse'), { opacity: 0.9, scale: 1, duration: 0.01 }, 3.25)
      .to(q('.kh-pulse'), { scale: 4.2, opacity: 0, duration: 1.1, ease: 'power2.out', stagger: 0.18 }, 3.26)
      .set(q('.kh-head'), { opacity: 1 })

    const play = () => tl.play(0)
    if (window.__umtIntro) window.addEventListener('umt:introdone', play, { once: true })
    else play()
    return () => {
      window.removeEventListener('umt:introdone', play)
      tl.kill()
    }
  }, [shown])

  return (
    <svg ref={root} className="kh" viewBox="0 0 1400 787" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="kh-sun" cx="0.62" cy="0.9" r="0.55">
          <stop offset="0" stopColor="#FF5D5D" stopOpacity="0.38" />
          <stop offset="0.5" stopColor="#FF9A8A" stopOpacity="0.12" />
          <stop offset="1" stopColor="#FF9A8A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="kh-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF9A8A" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FF9A8A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1400" height="787" fill="url(#kh-sun)" />
      <rect x="0" y="684" width="1400" height="3" fill="url(#kh-ground)" />
      <Car />
      {/* seller: dark sleeve, back of the hand, finger and thumb pinching the key ring */}
      <g className="kh-seller">
        <path d="M-80 830 L452 566 Q470 590 478 628 L-20 930 Z" fill="#45305C" />
        <path d="M430 576 L456 563 Q476 590 482 630 L456 642 Q450 606 430 576 Z" fill="#6A4F8A" />
        <path
          d="M470 585 C510 556 562 552 592 563 C612 571 624 586 618 599 C614 608 601 609 596 601 C588 592 572 590 560 597 C547 605 529 619 505 626 C489 630 475 624 470 616 Z"
          fill={SKIN_A}
        />
        <path d="M520 566 C548 560 574 561 592 567" fill="none" stroke="#C98E66" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <path d="M506 622 C524 614 542 604 556 598" fill="none" stroke="#8E5A3B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M542 600 C563 606 584 608 598 604 C606 602 608 611 599 614 C580 620 559 619 538 612 Z" fill="#A9704C" />
      </g>
      {/* buyer: light sleeve with a coral cuff, open hand palm up, fingers reaching left */}
      <g className="kh-buyer">
        <path d="M1480 880 L912 632 Q896 664 902 712 L1460 1000 Z" fill="#E6DCEC" />
        <path d="M924 638 L904 628 Q886 664 894 716 L914 726 Q906 680 924 638 Z" fill="#FF5D5D" />
        <path
          d="M906 640 C872 628 832 626 800 631 C770 635 736 631 706 625 C690 622 683 635 694 641 C722 650 762 654 792 658 C822 670 862 690 906 702 Z"
          fill={SKIN_B}
        />
        <path d="M904 700 C862 688 822 670 794 660 C826 676 864 694 902 708 Z" fill="#D9A684" />
        <path d="M790 645 C760 644 730 640 702 634 M792 652 C764 652 738 648 712 643" fill="none" stroke="#D9A684" strokeWidth="2" strokeLinecap="round" />
        <path d="M884 640 C864 612 838 600 815 602 C802 603 801 616 813 618 C833 621 851 631 864 648 Z" fill="#F4CDB0" />
        <path className="kh-curl" d="M700 626 C684 618 676 604 684 596 C690 590 700 598 704 610 Z" fill={SKIN_B} opacity="0" />
      </g>
      <Fob />
      <path className="kh-glint" d="M806 556 L814 582 L840 590 L814 598 L806 624 L798 598 L772 590 L798 582 Z" fill="#FFE3DC" opacity="0" />
    </svg>
  )
}
