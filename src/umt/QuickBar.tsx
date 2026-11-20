import { useEffect, useRef } from 'react'
import ShinyText from '@/components/ShinyText'
import { brand } from '@/lib/brand'

/**
 * Floating Sell / Buy / Hot deals bar (from the floating nav preview). It slides in once
 * the header has scrolled out of view. The engine sets aria-current on its links.
 */
export default function QuickBar() {
  const bar = useRef<HTMLElement>(null)

  useEffect(() => {
    const q = bar.current
    const header = document.querySelector('header.top')
    if (!q || !header) return
    const set = (on: boolean) => {
      q.classList.toggle('on', on)
      q.setAttribute('aria-hidden', String(!on))
      q.querySelectorAll('a').forEach((a) => (a.tabIndex = on ? 0 : -1))
    }
    set(false)
    const io = new IntersectionObserver(([e]) => set(!e.isIntersecting), { threshold: 0 })
    io.observe(header)
    return () => io.disconnect()
  }, [])

  return (
    <nav ref={bar} className="nav qbar" id="qbar" aria-label="Quick links">
      <a href="#sell" data-v="sell">
        Sell
      </a>
      <a href="#buy" data-v="buy">
        Buy
      </a>
      <a href="#deals" data-v="deals" className="hotnav">
        <span className="hotdot" aria-hidden="true" />
        <ShinyText text="Hot deals" color={brand.coral[500]} shineColor="#FFFFFF" speed={2.4} delay={1.5} />
      </a>
    </nav>
  )
}
