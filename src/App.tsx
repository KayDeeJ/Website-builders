import AnimatedContent from '@/components/AnimatedContent'
import BlurText from '@/components/BlurText'
import CountUp from '@/components/CountUp'
import ShinyText from '@/components/ShinyText'
import SplitText from '@/components/SplitText'
import SpotlightCard from '@/components/SpotlightCard'
import StarBorder from '@/components/StarBorder'

// Component showcase: every installed React Bits piece in the coral / midnight plum palette.
function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-5xl flex-col gap-24 px-4 py-24 sm:px-8">
      <header className="flex flex-col gap-6">
        <ShinyText text="Component showcase" className="text-sm font-medium tracking-wide uppercase" />
        <SplitText
          tag="h1"
          text="Coral light on midnight plum."
          className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl"
        />
        <BlurText
          text="Seven React Bits components, restyled to one palette."
          animateBy="words"
          className="max-w-xl text-lg text-muted-foreground"
        />
        <div className="flex flex-wrap gap-4 pt-2">
          <StarBorder>Get started</StarBorder>
          <StarBorder theme="light">Light variant</StarBorder>
        </div>
      </header>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          { to: 1280, label: 'Projects shipped', suffix: '' },
          { to: 98, label: 'Satisfaction', suffix: '%' },
          { to: 42, label: 'Countries', suffix: '' },
        ].map((stat) => (
          <SpotlightCard key={stat.label} className="p-8">
            <p className="text-5xl font-semibold text-coral tabular-nums">
              <CountUp to={stat.to} separator="," />
              {stat.suffix}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </SpotlightCard>
        ))}
      </section>

      <AnimatedContent>
        <SpotlightCard theme="light" className="p-10">
          <h2 className="text-2xl font-semibold text-plum">Light card on cream</h2>
          <p className="mt-2 max-w-prose text-plum/70">
            AnimatedContent reveals this block on scroll. The spotlight follows your pointer in deep coral.
          </p>
        </SpotlightCard>
      </AnimatedContent>
    </main>
  )
}

export default App
