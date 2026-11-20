import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import BlurText from '@/components/BlurText'
import CountUp from '@/components/CountUp'
import ShinyText from '@/components/ShinyText'
import SpotlightCard from '@/components/SpotlightCard'
import StarBorder from '@/components/StarBorder'

/**
 * The hero's product frame: the kit's own components running live.
 * "Replay" remounts them so every entrance plays again; nothing loops on its own.
 */
export default function Playground({ lines }: { lines: number }) {
  const [run, setRun] = useState(0)

  return (
    <div data-ui className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground" translate="no">
          <span className="size-2 rounded-full bg-coral" aria-hidden="true" />
          playground.tsx
        </span>
        <span className="text-xs text-muted-foreground">Live</span>
      </div>

      <div key={run} className="flex flex-col gap-4 p-4 sm:p-5">
        <div className="rounded-xl border border-border bg-background/60 px-5 py-4">
          <BlurText
            trigger="load"
            animateBy="words"
            delay={90}
            text="Headlines that arrive, word by word."
            className="font-heading text-2xl leading-tight sm:text-[1.75rem]"
          />
        </div>

        <SpotlightCard className="p-5" ambient>
          <p className="font-heading text-5xl leading-none text-coral tabular-nums">
            <CountUp to={lines} separator="," duration={2} trigger="load" replayOnHover />
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Lines of TypeScript, counted on load. Hover to count again.</p>
        </SpotlightCard>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-5 py-3">
          <ShinyText text="Coral light on midnight plum" speed={2.6} className="text-sm" />
          <StarBorder type="button" onClick={() => setRun((n) => n + 1)} radius={12} className="min-h-11 px-4 py-2 text-sm">
            <RotateCcw className="size-4" aria-hidden="true" />
            Replay the demo
          </StarBorder>
        </div>
      </div>
    </div>
  )
}
