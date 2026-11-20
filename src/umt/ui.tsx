import { useRef, type CSSProperties, type ReactNode } from 'react'
import AnimatedContent from '@/components/AnimatedContent'
import SplitText from '@/components/SplitText'
import SpotlightCard from '@/components/SpotlightCard'
import StarBorder from '@/components/StarBorder'
import { brand } from '@/lib/brand'
import { useShownKey, useSiteTheme } from './hooks'

type Part = string | { hl: string }

/**
 * A heading whose words rise into place when its screen is shown. Parts marked `hl`
 * keep the site's highlight style (.hl). Screen readers get the plain heading text.
 */
export function Headline({ as: Tag = 'h2', parts, className }: { as?: 'h1' | 'h2'; parts: Part[]; className?: string }) {
  const label = parts.map((p) => (typeof p === 'string' ? p : p.hl)).join('')
  const ref = useRef<HTMLHeadingElement>(null)
  const shown = useShownKey(ref)
  return (
    <Tag ref={ref} key={shown} className={className} aria-label={label}>
      {parts.map((p, i) => {
        const text = (typeof p === 'string' ? p : p.hl).trim()
        const gap = i < parts.length - 1 ? ' ' : ''
        return (
          <span key={i} aria-hidden="true">
            <SplitText
              tag="span"
              trigger="load"
              text={text}
              splitType="words"
              textAlign="left"
              delay={70}
              duration={0.9}
              className={typeof p === 'string' ? '' : 'hl'}
            />
            {gap}
          </span>
        )
      })}
    </Tag>
  )
}

type ButtonProps = {
  children: ReactNode
  href?: string
  type?: 'submit' | 'button'
  ghost?: boolean
  className?: string
  onDark?: boolean
}

/** The site's coral pill button, with a star of light travelling its edge. */
export function CoralButton({ children, href, type = 'button', ghost, className = '', onDark }: ButtonProps) {
  const common = {
    radius: 999,
    thickness: 1,
    glow: 0.7,
    className: `umt-btn ${ghost ? 'umt-btn-ghost' : ''} ${className}`,
  }
  const solid = {
    backgroundColor: 'var(--brass)',
    textColor: 'var(--on-brass)',
    borderColor: 'rgba(255,255,255,.35)',
    color: '#FFFFFF',
  }
  const outline = {
    backgroundColor: 'transparent',
    textColor: onDark ? '#F7F1F8' : 'var(--ink)',
    borderColor: 'var(--brass-t)',
    color: brand.coral[500],
  }
  const look = ghost ? outline : solid
  return href ? (
    <StarBorder as="a" href={href} {...common} {...look}>
      {children}
    </StarBorder>
  ) : (
    <StarBorder as="button" type={type} {...common} {...look}>
      {children}
    </StarBorder>
  )
}

/** A card with a coral spotlight that follows the pointer, in the site's own surface colours. */
export function Spot({ children, className = '', onDark, style }: { children: ReactNode; className?: string; onDark?: boolean; style?: CSSProperties }) {
  const theme = useSiteTheme()
  const dark = onDark || theme === 'dark'
  return (
    <SpotlightCard
      theme={dark ? 'dark' : 'light'}
      spotlightColor={dark ? brand.coral[500] : brand.coral[600]}
      intensity={dark ? 0.18 : 0.12}
      className={`umt-spot ${className}`}
      style={
        {
          '--spotlight-card-surface': onDark ? 'rgba(255,255,255,.04)' : 'var(--bg)',
          '--spotlight-card-border': onDark ? 'rgba(255,93,93,.55)' : 'var(--line)',
          '--spotlight-card-shadow': 'none',
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </SpotlightCard>
  )
}

/** Content that rises in once as it scrolls into view. Rests visible under reduced motion. */
export function Reveal({ children, className, stagger = 0.08 }: { children: ReactNode; className?: string; stagger?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const shown = useShownKey(ref)
  return (
    <>
      <span ref={ref} hidden />
      <AnimatedContent
        key={shown}
        distance={28}
        duration={0.8}
        ease="power3.out"
        stagger={stagger}
        className={className}
      >
        {children}
      </AnimatedContent>
    </>
  )
}
