import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { site } from '@/lib/site'
import { reducedMotion, useShownKey } from './hooks'

/*
 * Home hero illustration: a seller hands the keys of a hatchback to a buyer, and the car
 * unlocks. Original artwork in the brand palette (no makes or badges), with shading, highlights
 * and reflections for depth. Plays once each time the home screen is shown (after the first-visit
 * intro), then rests. Static under reduced motion.
 */

const BODY =
  'M36 182 L34 140 Q34 128 42 122 L58 80 Q64 66 80 64 L300 58 Q330 57 346 70 L412 112 Q418 117 430 118 L530 128 Q560 132 566 150 L568 174 Q568 184 556 184 L520 184 A48 48 0 0 0 424 184 L188 184 A48 48 0 0 0 92 184 L48 184 Q36 184 36 182 Z'
const GLASS = 'M72 112 L82 76 Q86 70 96 70 L296 66 Q318 66 330 76 L384 112 Z'

function Defs() {
  return (
    <defs>
      <linearGradient id="kh-paint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6A4692" />
        <stop offset="0.38" stopColor="#43245F" />
        <stop offset="0.7" stopColor="#2E1846" />
        <stop offset="1" stopColor="#1C0D2C" />
      </linearGradient>
      <linearGradient id="kh-band" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="0.35" stopColor="#FFFFFF" stopOpacity="0.28" />
        <stop offset="0.55" stopColor="#FFD9D2" stopOpacity="0.4" />
        <stop offset="0.8" stopColor="#FFFFFF" stopOpacity="0.12" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="kh-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3A2A4E" />
        <stop offset="0.5" stopColor="#140B20" />
        <stop offset="1" stopColor="#23162F" />
      </linearGradient>
      <radialGradient id="kh-rim" cx="0.38" cy="0.32" r="0.75">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.5" stopColor="#C9C6D3" />
        <stop offset="1" stopColor="#5E5A6C" />
      </radialGradient>
      <linearGradient id="kh-spoke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#E9E7EF" />
        <stop offset="1" stopColor="#77738A" />
      </linearGradient>
      <radialGradient id="kh-headglow" cx="0" cy="0.5" r="1">
        <stop offset="0" stopColor="#FFF1DA" stopOpacity="0.85" />
        <stop offset="1" stopColor="#FFF1DA" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="kh-reflect" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <mask id="kh-reflect-mask">
        <rect x="0" y="180" width="600" height="120" fill="url(#kh-reflect)" />
      </mask>
      <clipPath id="kh-body-clip">
        <path d={BODY} />
      </clipPath>
      <clipPath id="kh-glass-clip">
        <path d={GLASS} />
      </clipPath>
      <linearGradient id="kh-skin-a" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#CC9068" />
        <stop offset="0.55" stopColor="#B27650" />
        <stop offset="1" stopColor="#8F5838" />
      </linearGradient>
      <linearGradient id="kh-skin-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F8D6BC" />
        <stop offset="0.6" stopColor="#EDBE9C" />
        <stop offset="1" stopColor="#D9A47F" />
      </linearGradient>
      <linearGradient id="kh-sleeve-a" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5A4176" />
        <stop offset="1" stopColor="#2E1D40" />
      </linearGradient>
      <linearGradient id="kh-sleeve-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F6F0F8" />
        <stop offset="1" stopColor="#CDBFD6" />
      </linearGradient>
      <linearGradient id="kh-cuff-b" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FF7A6E" />
        <stop offset="1" stopColor="#E54848" />
      </linearGradient>
      <linearGradient id="kh-fob" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3A2E48" />
        <stop offset="0.5" stopColor="#1A1222" />
        <stop offset="1" stopColor="#0E0914" />
      </linearGradient>
      <linearGradient id="kh-metal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.45" stopColor="#B8B4C4" />
        <stop offset="1" stopColor="#6E6A7C" />
      </linearGradient>
      <linearGradient id="kh-tag" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FF8578" />
        <stop offset="1" stopColor="#E54848" />
      </linearGradient>
      <radialGradient id="kh-sun" cx="0.62" cy="0.9" r="0.55">
        <stop offset="0" stopColor="#FF5D5D" stopOpacity="0.38" />
        <stop offset="0.5" stopColor="#FF9A8A" stopOpacity="0.12" />
        <stop offset="1" stopColor="#FF9A8A" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="kh-beam" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE3DC" stopOpacity="0.22" />
        <stop offset="1" stopColor="#FFE3DC" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="kh-floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FF9A8A" stopOpacity="0.22" />
        <stop offset="1" stopColor="#FF9A8A" stopOpacity="0" />
      </linearGradient>
    </defs>
  )
}

function Wheel({ x }: { x: number }) {
  return (
    <g className="kh-wheel" transform={`translate(${x} 184)`}>
      <circle r="40" fill="#141018" />
      <circle r="38" fill="none" stroke="#2C2634" strokeWidth="3" />
      <circle r="27" fill="url(#kh-rim)" />
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d="M-4 -25 L4 -25 L2.5 -8 L-2.5 -8 Z" fill="url(#kh-spoke)" transform={`rotate(${a})`} />
      ))}
      <circle r="27" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1" />
      <circle r="9" fill="#FF5D5D" />
      <circle r="9" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="-2.5" cy="-2.5" r="3" fill="#FFFFFF" opacity="0.45" />
    </g>
  )
}

function Car() {
  return (
    <g transform="translate(700 432) scale(1.1)">
      <g className="kh-car">
        {/* floor: shadow, glow and a faint mirror reflection */}
        <ellipse cx="300" cy="227" rx="300" ry="14" fill="#000" opacity="0.32" />
        <ellipse className="kh-glowfloor" cx="300" cy="224" rx="250" ry="18" fill="#FF5D5D" opacity="0" />
        <g mask="url(#kh-reflect-mask)" opacity="0.32">
          <path d={BODY} fill="url(#kh-paint)" transform="translate(0 452) scale(1 -1)" />
        </g>
        {/* wheel arches show dark inside */}
        <circle cx="472" cy="184" r="49" fill="#0C0712" />
        <circle cx="140" cy="184" r="49" fill="#0C0712" />
        {/* body with a light band, darker sill and roof sheen, clipped to the paint */}
        <path fill="url(#kh-paint)" d={BODY} />
        <g clipPath="url(#kh-body-clip)">
          <rect x="20" y="114" width="560" height="22" fill="url(#kh-band)" />
          <rect x="20" y="152" width="560" height="40" fill="#000" opacity="0.22" />
          <path d="M84 62 L300 56 Q330 55 346 68" fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="3" />
          <path d="M430 116 L530 126 Q558 130 564 146" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="2.5" />
        </g>
        {/* glass with streaks */}
        <path fill="url(#kh-glass)" d={GLASS} />
        <g clipPath="url(#kh-glass-clip)">
          <path d="M120 112 L170 66 L196 66 L146 112 Z" fill="#FFFFFF" opacity="0.1" />
          <path d="M290 112 L320 72 L332 74 L304 112 Z" fill="#FFFFFF" opacity="0.08" />
          <path d="M96 74 L300 68" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2.5" />
        </g>
        <path fill="#331A4C" d="M222 67 L234 67 L236 112 L224 112 Z" />
        <path d="M226 68 L227 111" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1.5" />
        {/* shut lines, handles, mirror */}
        <path d="M236 116 L238 178 M384 116 L392 176" stroke="#12081C" strokeOpacity="0.6" strokeWidth="2" />
        <path d="M238 116 L240 178 M386 116 L394 176" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />
        <rect x="292" y="124" width="24" height="6" rx="3" fill="#12081C" opacity="0.7" />
        <rect x="292" y="123" width="24" height="2" rx="1" fill="#FFFFFF" opacity="0.2" />
        <rect x="170" y="124" width="24" height="6" rx="3" fill="#12081C" opacity="0.7" />
        <rect x="170" y="123" width="24" height="2" rx="1" fill="#FFFFFF" opacity="0.2" />
        <path d="M396 104 L414 99 Q422 99 419 108 L404 113 Z" fill="#2A1540" />
        <path d="M400 104 L413 101" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.5" />
        {/* lights, with a glow that shows when they flash */}
        <ellipse className="kh-headglow" cx="566" cy="144" rx="70" ry="22" fill="url(#kh-headglow)" opacity="0" />
        <path className="kh-head" d="M526 132 L556 140 Q561 146 552 149 L522 143 Z" fill="#FFF1DA" />
        <path d="M530 134 L550 139" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
        <path className="kh-tail" d="M40 124 L55 120 L51 141 L38 143 Z" fill="#FF5D5D" />
        <path d="M43 126 L52 123" stroke="#FFD0C8" strokeWidth="1.2" opacity="0.8" />
        <path className="kh-ind" d="M548 160 L564 160 L564 166 L548 166 Z" fill="#FFB347" opacity="0.35" />
        <Wheel x={472} />
        <Wheel x={140} />
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
      <circle cx="-30" cy="0" r="13" fill="none" stroke="url(#kh-metal)" strokeWidth="4.5" />
      <circle cx="-30" cy="0" r="13" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="10 70" />
      <rect x="-49" y="12" width="28" height="32" rx="8" fill="url(#kh-tag)" />
      <rect x="-46" y="15" width="22" height="26" rx="6" fill="none" stroke="#FFE3DC" strokeOpacity="0.65" strokeWidth="1" strokeDasharray="2.5 2" />
      <circle cx="-35" cy="17.5" r="2" fill="#7A1E1E" opacity="0.5" />
      <text x="-35" y="35" textAnchor="middle" fontFamily="Sora Variable, Sora, sans-serif" fontWeight="600" fontSize="15" fill="#3A0E0E">
        {site.mark}
      </text>
      <rect x="-20" y="-16" width="60" height="33" rx="16" fill="url(#kh-fob)" />
      <rect x="-20" y="-16" width="60" height="33" rx="16" fill="none" stroke="#FFFFFF" strokeOpacity="0.12" />
      <path d="M-12 -10 Q10 -15 32 -10" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="1" cy="5" r="4.5" fill="#FF5D5D" />
      <circle cx="0" cy="4" r="1.6" fill="#FFFFFF" opacity="0.6" />
      <circle cx="16" cy="5" r="4.5" fill="#4E3F5E" />
      <circle cx="15" cy="4" r="1.6" fill="#FFFFFF" opacity="0.35" />
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
      // the handover: the keys swing, then arc across into the open hand
      .to(q('.kh-fob'), { keyframes: { rotation: [62, 48, 70, 58] }, duration: 0.6, ease: 'sine.inOut' }, 1.35)
      .to(q('.kh-fob'), { x: 720, y: 560, rotation: 10, duration: 0.45, ease: 'power2.out' }, 1.95)
      .to(q('.kh-fob'), { x: 806, y: 610, rotation: 6, duration: 0.45, ease: 'power2.in' }, 2.4)
      .fromTo(q('.kh-glint'), { scale: 0, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1.3, opacity: 1, duration: 0.25, ease: 'back.out(3)' }, 2.78)
      .to(q('.kh-glint'), { scale: 0.4, opacity: 0, duration: 0.45, ease: 'power2.in' }, 3.05)
      .to(q('.kh-curl'), { opacity: 1, duration: 0.3, ease: 'power2.out' }, 2.85)
      .to(q('.kh-seller'), { x: -60, y: 40, duration: 0.9, ease: 'power2.inOut' }, 2.9)
      .to(q('.kh-buyer'), { y: 8, duration: 0.5, ease: 'power2.inOut', yoyo: true, repeat: 1 }, 3.0)
      // the car unlocks: double flash, glow and pulses
      .to(q('.kh-head, .kh-tail, .kh-ind'), { opacity: 1, duration: 0.12, yoyo: true, repeat: 3, ease: 'none' }, 3.25)
      .to(q('.kh-headglow'), { opacity: 1, duration: 0.12, yoyo: true, repeat: 3, ease: 'none' }, 3.25)
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
      <Defs />
      <rect x="0" y="0" width="1400" height="787" fill="url(#kh-sun)" />
      <path d="M1400 120 L1400 420 L560 787 L260 787 Z" fill="url(#kh-beam)" />
      <rect x="0" y="684" width="1400" height="60" fill="url(#kh-floor)" />
      <rect x="0" y="684" width="1400" height="1.5" fill="#FF9A8A" opacity="0.45" />
      <Car />
      {/* seller: dark shaded sleeve with folds, a watch, the back of the hand pinching the key ring */}
      <g className="kh-seller">
        <path d="M-80 830 L452 566 Q470 590 478 628 L-20 930 Z" fill="url(#kh-sleeve-a)" />
        <path d="M120 760 C200 718 270 690 330 662 M170 800 C250 760 320 724 380 700" fill="none" stroke="#2A1A3A" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 790 C160 740 260 696 360 652" fill="none" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="4" strokeLinecap="round" />
        <path d="M430 576 L456 563 Q476 590 482 630 L456 642 Q450 606 430 576 Z" fill="#6A4F8A" />
        <circle cx="462" cy="620" r="3" fill="#C9C6D3" />
        <path
          d="M470 585 C510 556 562 552 592 563 C612 571 624 586 618 599 C614 608 601 609 596 601 C588 592 572 590 560 597 C547 605 529 619 505 626 C489 630 475 624 470 616 Z"
          fill="url(#kh-skin-a)"
        />
        {/* watch on the wrist */}
        <path d="M478 584 C486 580 492 598 494 618 L484 622 C482 604 478 592 474 588 Z" fill="#241830" />
        <ellipse cx="487" cy="602" rx="8" ry="11" fill="url(#kh-metal)" transform="rotate(-18 487 602)" />
        <ellipse cx="487" cy="602" rx="5.5" ry="8" fill="#1E1426" transform="rotate(-18 487 602)" />
        <path d="M487 597 L488 602 L491 604" stroke="#FF9A8A" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        {/* knuckles, creases and a nail */}
        <path d="M520 566 C548 560 574 561 592 567" fill="none" stroke="#E0A67E" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
        <path d="M548 572 C552 569 558 569 562 572 M572 572 C576 570 581 571 584 574" fill="none" stroke="#8E5A3B" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        <path d="M506 622 C524 614 542 604 556 598" fill="none" stroke="#7E4C30" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M608 595 C611 600 607 604 603 602 C601 599 604 594 608 595 Z" fill="#E8C2A6" opacity="0.85" />
        <path d="M542 600 C563 606 584 608 598 604 C606 602 608 611 599 614 C580 620 559 619 538 612 Z" fill="#9F6644" />
        <path d="M552 604 C570 609 586 609 596 606" fill="none" stroke="#C88C64" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* buyer: light shaded sleeve, buttoned coral cuff, open hand palm up */}
      <g className="kh-buyer">
        <path d="M1480 880 L912 632 Q896 664 902 712 L1460 1000 Z" fill="url(#kh-sleeve-b)" />
        <path d="M1100 760 C1040 730 990 708 950 690 M1180 840 C1110 806 1040 776 980 748" fill="none" stroke="#A996B6" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
        <path d="M924 638 L904 628 Q886 664 894 716 L914 726 Q906 680 924 638 Z" fill="url(#kh-cuff-b)" />
        <circle cx="908" cy="700" r="3.2" fill="#FFE3DC" />
        <path
          d="M906 640 C872 628 832 626 800 631 C770 635 736 631 706 625 C690 622 683 635 694 641 C722 650 762 654 792 658 C822 670 862 690 906 702 Z"
          fill="url(#kh-skin-b)"
        />
        <path d="M904 700 C862 688 822 670 794 660 C826 676 864 694 902 708 Z" fill="#CE9775" />
        <path d="M790 645 C760 644 730 640 702 634 M792 652 C764 652 738 648 712 643" fill="none" stroke="#D29E7B" strokeWidth="2" strokeLinecap="round" />
        <path d="M842 650 C826 646 812 646 800 648" fill="none" stroke="#D29E7B" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        <path d="M700 626 C695 628 694 634 699 636 C703 634 704 629 700 626 Z" fill="#FCE6D8" opacity="0.9" />
        <path d="M884 640 C864 612 838 600 815 602 C802 603 801 616 813 618 C833 621 851 631 864 648 Z" fill="#F6D2B6" />
        <path d="M816 605 C812 607 812 612 816 613" fill="none" stroke="#FCE6D8" strokeWidth="2" strokeLinecap="round" />
        <path d="M876 636 C860 618 842 608 824 608" fill="none" stroke="#D9A47F" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        <path className="kh-curl" d="M700 626 C684 618 676 604 684 596 C690 590 700 598 704 610 Z" fill="#F2C9AB" opacity="0" />
      </g>
      <Fob />
      <path className="kh-glint" d="M806 556 L814 582 L840 590 L814 598 L806 624 L798 598 L772 590 L798 582 Z" fill="#FFE3DC" opacity="0" />
    </svg>
  )
}
