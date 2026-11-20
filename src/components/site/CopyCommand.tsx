import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import StarBorder from '@/components/StarBorder'

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
    <div className="flex items-center gap-3 rounded-[14px] bg-plum py-1.5 pr-1.5 pl-4 text-cream">
      <code translate="no" className="min-w-0 flex-1 font-mono text-[13px] leading-5 break-all sm:text-sm">
        <span className="text-coral-soft select-none">$ </span>
        {command}
      </code>
      <StarBorder
        type="button"
        onClick={copy}
        theme="light"
        radius={12}
        className="min-h-11 shrink-0 px-4 py-2 text-sm"
        aria-label={state === 'copied' ? 'Copied to clipboard' : 'Copy the install command'}
      >
        {state === 'copied' ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select to copy' : 'Copy command'}
      </StarBorder>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? 'Command copied' : state === 'failed' ? 'Copy failed, select the text instead' : ''}
      </span>
    </div>
  )
}
