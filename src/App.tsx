import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import AnimatedContent from '@/components/AnimatedContent'
import ShinyText from '@/components/ShinyText'
import SplitText from '@/components/SplitText'
import SpotlightCard from '@/components/SpotlightCard'
import StarBorder from '@/components/StarBorder'
import CountUp from '@/components/CountUp'
import CopyCommand from '@/components/site/CopyCommand'
import EclipseSection from '@/components/site/Eclipse'
import Playground from '@/components/site/Playground'
import { Button } from '@/components/ui/button'
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 text-foreground" aria-label="Website Builders, back to top">
          <Mark />
          <ShinyText text="Website Builders" speed={3} delay={2} className="font-heading text-lg tracking-tight max-[400px]:sr-only" />
        </a>
        <nav aria-label="Sections" className="flex items-center gap-1 text-sm">
          {[
            ['#kit', 'Components'],
            ['#setup', 'Setup'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="link-draw flex min-h-11 items-center px-2.5 text-muted-foreground transition-colors hover:text-foreground"
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
    <EclipseSection id="top" data-enter className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-16 pb-10">
      <div className="wrap grid items-start gap-6 pt-10 lg:grid-cols-12 lg:pt-0">
        <div className="hero-text lg:col-span-7">
          <h1 className="font-heading max-w-[15ch] text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.03em] text-balance">
            <SplitText
              tag="span"
              trigger="load"
              splitType="words"
              delay={60}
              textAlign="left"
              text="7 motion components for websites that refuse to sit"
            />{' '}
            <SplitText tag="span" trigger="load" splitType="words" textAlign="left" text="still." className="text-coral italic" />
          </h1>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
            React 19 and Tailwind v4 components for headlines, numbers, cards and buttons. Built on GSAP, recoloured in coral and midnight plum, and
            they hold still the moment a visitor asks for less motion.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <StarBorder as="a" href="#kit" radius={14} className="min-h-12 justify-center text-base">
              Browse the components
            </StarBorder>
            <StarBorder as="a" href="#setup" theme="light" radius={14} stars={2} className="min-h-12 justify-center text-base">
              See the setup
            </StarBorder>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:block">
          <Playground lines={KIT_LINES} />
        </div>
      </div>
    </EclipseSection>
  )
}

/** Card 2's live sample: switch a mini card between the two themes. */
function ThemeSample() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const options = [
    { id: 'dark', name: 'Midnight plum', hex: brand.plum[950] },
    { id: 'light', name: 'Cream', hex: brand.cream },
  ] as const

  return (
    <div data-ui className="flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-3">
      <div role="group" aria-label="Preview theme" className="grid grid-cols-2 gap-1 rounded-lg bg-background p-1">
        {options.map((o) => (
          <Button
            key={o.id}
            type="button"
            variant="ghost"
            aria-pressed={theme === o.id}
            onClick={() => setTheme(o.id)}
            className="h-11 justify-start gap-2 rounded-md text-sm text-muted-foreground hover:bg-secondary hover:text-foreground aria-pressed:bg-secondary aria-pressed:text-foreground"
          >
            <span className="size-3 rounded-full ring-1 ring-coral/60" style={{ background: o.hex }} aria-hidden="true" />
            {o.name}
          </Button>
        ))}
      </div>
      <SpotlightCard theme={theme} className="px-4 py-5" ambient>
        <p className={theme === 'dark' ? 'text-cream' : 'text-plum'}>
          <span className="font-heading text-xl">SpotlightCard</span>
          <span className="mt-1 block font-mono text-xs opacity-70" translate="no">
            theme="{theme}"
          </span>
        </p>
      </SpotlightCard>
    </div>
  )
}

function KitSection() {
  return (
    <section id="kit" aria-labelledby="kit-title" className="flex min-h-svh flex-col justify-center overflow-x-clip py-16">
      <div className="wrap">
        <h2 id="kit-title" className="font-heading max-w-[20ch] text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance">
          The component kit, <span className="text-coral italic">by the numbers.</span>
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <SpotlightCard className="lift flex flex-col gap-6 p-6 sm:p-7">
            <div data-ui className="flex min-h-[148px] items-center justify-center rounded-xl border border-border bg-background/60 p-4">
              <SplitText
                tag="p"
                trigger="hover"
                hoverEffect="wave"
                splitType="chars"
                text="Hover this headline"
                accentColor={brand.coral[500]}
                className="font-heading cursor-default text-3xl"
              />
            </div>
            <h3 className="font-heading">
              <span className="block text-[2.25rem] leading-none font-medium lg:text-5xl text-coral tabular-nums">
                <CountUp to={KIT.length} duration={1.2} />
              </span>
              <span className="mt-2 block text-xl font-medium">Components, ready to drop in</span>
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label="Component names" translate="no">
              {KIT.map((f) => (
                <li key={f.name} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                  {f.name}
                </li>
              ))}
            </ul>
          </SpotlightCard>

          <SpotlightCard className="lift flex flex-col gap-6 p-6 sm:p-7">
            <ThemeSample />
            <h3 className="font-heading">
              <span className="block text-[2.25rem] leading-none font-medium lg:text-5xl text-coral tabular-nums">
                <CountUp to={2} duration={1.2} />
              </span>
              <span className="mt-2 block text-xl font-medium">Themes, one palette</span>
            </h3>
          </SpotlightCard>

          <SpotlightCard className="lift flex flex-col gap-6 p-6 sm:p-7">
            <ul data-ui className="flex min-h-[148px] flex-col justify-center gap-2 rounded-xl border border-border bg-background/60 p-4 text-sm" translate="no" aria-label="Lines per component">
              {KIT.map((f) => (
                <li key={f.name} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 truncate font-mono text-xs text-muted-foreground">{f.name}</span>
                  <span className="h-1.5 flex-1" aria-hidden="true">
                    <span className="block h-full rounded-full bg-coral/80" style={{ width: `${(f.lines / KIT[0].lines) * 100}%` }} />
                  </span>
                  <span className="w-8 text-right font-mono text-xs tabular-nums">{f.lines}</span>
                </li>
              ))}
            </ul>
            <h3 className="font-heading">
              <span className="block text-[2.25rem] leading-none font-medium lg:text-5xl text-coral tabular-nums">
                <CountUp to={KIT_LINES} separator="," duration={1.6} />
              </span>
              <span className="mt-2 block text-xl font-medium">Lines of TypeScript</span>
            </h3>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}

function SetupSection() {
  const band = useRef<HTMLElement>(null)

  // The page's scroll moment: the cream band opens from an inset window to full bleed.
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      band.current,
      { '--ix': '6%', '--iy': '8%' },
      {
        '--ix': '0%',
        '--iy': '0%',
        ease: 'none',
        scrollTrigger: { trigger: band.current, start: 'top 95%', end: 'top 25%', scrub: 0.6 },
      },
    )
  })

  return (
    <section
      id="setup"
      aria-labelledby="setup-title"
      data-scroll-moment="band-opens"
      ref={band}
      className="cream-band flex min-h-svh flex-col justify-center overflow-x-clip py-16 text-plum"
    >
      <AnimatedContent
        distance={40}
        duration={1}
        ease="expo.out"
        wipe="up"
        className="wrap grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16"
      >
        <div>
          <h2 id="setup-title" className="font-heading text-[clamp(2.5rem,4.5vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance">
            Install any component in <span className="text-coral-deep italic">one line.</span>
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-plum/85">
            Each component installs through the shadcn CLI, lands in <code className="font-mono text-base">src/components</code>, and already
            wears the palette. Pass a theme to switch between plum and cream.
          </p>
          <div className="mt-8 max-w-[560px]">
            <CopyCommand command="npx shadcn@latest add @react-bits/StarBorder-TS-TW" />
          </div>
        </div>

        <div data-ui className="overflow-hidden rounded-2xl bg-plum-deep shadow-[0_30px_60px_-30px_rgba(46,26,54,0.55)]">
          <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-3">
            <span className="size-2.5 rounded-full bg-coral" aria-hidden="true" />
            <span className="font-mono text-xs text-cream/60" translate="no">
              App.tsx
            </span>
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
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-col gap-2 py-8 text-sm text-muted-foreground">
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
