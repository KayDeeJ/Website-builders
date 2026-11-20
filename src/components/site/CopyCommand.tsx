import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

/** A shell command with a copy control. States: idle, copied, failed. */
export default function CopyCommand({ command }: { command: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.setTimeout(() => setState('idle'), 2000)
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-plum/15 bg-plum py-1.5 pr-1.5 pl-4 text-cream">
      <code translate="no" className="min-w-0 flex-1 font-mono text-[13px] leading-5 break-all sm:text-sm">
        <span className="text-coral-soft select-none">$ </span>
        {command}
      </code>
      <Button
        type="button"
        size="sm"
        onClick={copy}
        className="h-11 min-w-28 rounded-lg bg-coral px-3 text-plum-deep hover:bg-coral-soft active:translate-y-px"
        aria-label={state === 'copied' ? 'Copied to clipboard' : 'Copy install command'}
      >
        {state === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : 'Copy'}
      </Button>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? 'Command copied' : state === 'failed' ? 'Copy failed, select the text instead' : ''}
      </span>
    </div>
  )
}
