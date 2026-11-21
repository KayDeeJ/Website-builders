/**
 * The business name, in one place. Changing it here renames the site everywhere it is written
 * as text: headings, the page title, the footer, the engine's messages, emails, reward tickets
 * and reference numbers (`refPrefix`), and the letter on the key-fob tag (`mark`).
 *
 * Not covered: the header logo is drawn artwork (src/umt/markup/Header.tsx). A new name needs a
 * new logo there; the intro and the screen-transition curtain reuse whatever logo the header has.
 */
export const site = {
  name: 'Union Motor Trade',
  mark: 'U',
  refPrefix: 'UMT',
  tagline: 'Sell your car or find your next one',
} as const

declare global {
  interface Window {
    /** Read by the engine (a classic script) for the name it writes into its messages. */
    __umtSite?: typeof site
  }
}

if (typeof window !== 'undefined') window.__umtSite = site
