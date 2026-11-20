import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import AnimatedContent from '@/components/AnimatedContent'
import BlurText from '@/components/BlurText'
import CountUp from '@/components/CountUp'
import ShinyText from '@/components/ShinyText'
import SplitText from '@/components/SplitText'
import SpotlightCard from '@/components/SpotlightCard'
import StarBorder from '@/components/StarBorder'
import CopyCommand from '@/components/site/CopyCommand'
import Eclipse from '@/components/site/Eclipse'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { brand } from '@/lib/brand'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const KIT = [...__KIT_FILES__].sort((a, b) => b.lines - a.lines)
const KIT_LINES = KIT.reduce((sum, f) => sum + f.lines, 0)

/** Coral ring mark used in the header and footer. */
function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12a9 9 0 0 1 18 0" fill="none" stroke={brand.coral[500]} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-[max(1rem,env(safe-area-inset-left))] sm:px-8">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 text-foreground" aria-label="Website Builders, back to top">
          <Mark />
          <ShinyText text="Website Builders" speed={3} delay={2} className="font-heading text-lg tracking-tight" />
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1 text-sm">
          {[
            ['#kit', 'Components'],
            ['#setup', 'Setup'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="link-draw flex min-h-11 items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" data-enter className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-16">
      <Eclipse />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-[18vh] sm:px-8">
        <h1 className="font-heading max-w-[15ch] text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.98] font-medium tracking-[-0.03em] text-balance">
          <SplitText
            tag="span"
            trigger="load"
            splitType="words"
            delay={60}
            text="7 motion components for websites that refuse to sit"
            textAlign="left"
          />{' '}
          <SplitText
            tag="span"
            trigger="load"
            splitType="chars"
            delay={45}
            text="still."
            textAlign="left"
            className="text-coral italic"
          />
        </h1>
        <BlurText
          trigger="load"
          animateBy="words"
          delay={25}
          text="React 19 and Tailwind v4 components for headlines, numbers, cards and buttons. Built on GSAP, recoloured in coral and midnight plum, and hold still the moment a visitor asks for less motion."
          className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground sm:text-xl"
        />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <StarBorder as="a" href="#kit" radius={14} className="min-h-12 justify-center text-base">
            Browse the components
          </StarBorder>
          <StarBorder as="a" href="#setup" theme="light" radius={14} stars={2} className="min-h-12 justify-center text-base">
            See the setup
          </StarBorder>
        </div>
      </div>
    </section>
  )
}

function KitSection() {
  const swatches = [
    { name: 'Midnight plum', hex: brand.plum[950], ring: brand.coral[500] },
    { name: 'Cream', hex: brand.cream, ring: brand.coral[600] },
  ]

  return (
    <section id="kit" aria-labelledby="kit-title" className="flex min-h-svh flex-col justify-center py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <h2 id="kit-title" className="font-heading max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance">
          The component kit, <span className="text-coral italic">by the numbers.</span>
        </h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <SpotlightCard className="lift flex flex-col p-7 sm:p-8">
            <p className="font-heading text-7xl leading-none font-medium text-coral tabular-nums">
              <CountUp to={KIT.length} duration={1.2} />
            </p>
            <h3 className="mt-3 text-lg font-medium">Components, ready to drop in</h3>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Component names" translate="no">
              {KIT.map((f) => (
                <li key={f.name} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                  {f.name}
                </li>
              ))}
            </ul>
          </SpotlightCard>

          <SpotlightCard className="lift flex flex-col p-7 sm:p-8">
            <p className="font-heading text-7xl leading-none font-medium text-coral tabular-nums">
              <CountUp to={2} duration={1.2} />
            </p>
            <h3 className="mt-3 text-lg font-medium">Themes, one palette</h3>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {swatches.map((s) => (
                <li key={s.name} className="flex flex-col gap-3 rounded-xl border border-border p-3">
                  <span
                    aria-hidden="true"
                    className="h-14 rounded-lg"
                    style={{ background: s.hex, boxShadow: `inset 0 3px 0 0 ${s.ring}, inset 0 0 0 1px rgba(255,158,145,0.18)` }}
                  />
                  <span className="text-sm">{s.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{s.hex}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>

          <SpotlightCard className="lift flex flex-col p-7 sm:p-8">
            <p className="font-heading text-7xl leading-none font-medium text-coral tabular-nums">
              <CountUp to={KIT_LINES} separator="," duration={1.6} />
            </p>
            <h3 className="mt-3 text-lg font-medium">Lines of TypeScript</h3>
            <ul className="mt-6 flex flex-col gap-2 text-sm" translate="no">
              {KIT.map((f) => (
                <li key={f.name} className="flex items-center gap-3">
                  <span className="w-32 shrink-0 truncate font-mono text-xs text-muted-foreground">{f.name}</span>
                  <span className="h-1.5 flex-1" aria-hidden="true">
                    <span className="block h-full rounded-full bg-coral/70" style={{ width: `${(f.lines / KIT[0].lines) * 100}%` }} />
                  </span>
                  <span className="w-8 text-right font-mono text-xs tabular-nums">{f.lines}</span>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}

function SetupSection() {
  const frame = useRef<HTMLDivElement>(null)

  // The page's one scroll moment: the cream card opens from an inset window to full width.
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(
        frame.current,
        { clipPath: 'inset(10% 8% 10% 8% round 40px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
          ease: 'none',
          scrollTrigger: { trigger: frame.current, start: 'top 95%', end: 'top 30%', scrub: 0.6 },
        },
      )
    },
    { scope: frame },
  )

  return (
    <section id="setup" aria-labelledby="setup-title" className="flex min-h-svh flex-col justify-center py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <div ref={frame}>
          <SpotlightCard theme="light" className="p-7 sm:p-12 lg:p-14">
            <AnimatedContent distance={40} duration={1} ease="expo.out" stagger={0.08} wipe="up" className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
              <div>
                <h2 id="setup-title" className="font-heading text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em] text-plum text-balance">
                  Install any component in <span className="text-coral-deep italic">one line.</span>
                </h2>
                <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-plum/85">
                  Each component installs through the shadcn CLI, lands in <code className="font-mono text-base text-plum">src/components</code>, and already
                  wears the palette. Pass a theme to switch between plum and cream.
                </p>
                <div className="mt-8">
                  <CopyCommand command="npx shadcn@latest add @react-bits/StarBorder-TS-TW" />
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-plum/12 bg-plum-deep">
                <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-3">
                  <span className="size-2.5 rounded-full bg-coral" aria-hidden="true" />
                  <span className="font-mono text-xs text-cream/60">App.tsx</span>
                </div>
                <pre translate="no" className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-6 text-cream/90">
                  <code>
                    <span className="text-coral-soft">import</span> StarBorder <span className="text-coral-soft">from</span>
                    {'\n  '}
                    <span className="text-[#F2C6A0]">'@/components/StarBorder'</span>
                    {'\n\n'}
                    {'<'}
                    <span className="text-coral">StarBorder</span> as=<span className="text-[#F2C6A0]">"a"</span> href=
                    <span className="text-[#F2C6A0]">"#top"</span>
                    {'>'}
                    {'\n  '}Back to top{'\n'}
                    {'</'}
                    <span className="text-coral">StarBorder</span>
                    {'>'}
                  </code>
                </pre>
                <div className="flex items-center justify-center border-t border-cream/10 px-5 py-10">
                  <StarBorder as="a" href="#top" radius={14} stars={3} className="min-h-12">
                    Back to top
                  </StarBorder>
                </div>
              </div>
            </AnimatedContent>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="flex items-center gap-2 text-foreground">
          <Mark /> Website Builders
        </span>
        <span>
          Components adapted from{' '}
          <a href="https://reactbits.dev" className="link-draw text-foreground" rel="noreferrer" target="_blank">
            React Bits
          </a>
          . Motion by GSAP and Lenis.
        </span>
      </div>
    </footer>
  )
}

function App() {
  useSmoothScroll()

  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded-md bg-coral px-4 py-3 text-plum-deep focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <KitSection />
        <SetupSection />
      </main>
      <Footer />
    </>
  )
}

export default App
