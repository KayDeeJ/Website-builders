---
version: alpha
name: Union Motor Trade
description: A dealer-backed car marketplace in coral on midnight plum. Light by default with a full dark theme; Sora display over Hanken Grotesk body; coral pill buttons with a travelling star; spotlight cards; plain, regulated-business copy.

colors:
  brass: "#FF5D5D"        # coral: buttons, nav, accents
  brass-text: "#C02E2E"   # coral for text on light grounds (dark theme: #FF7B70)
  hero: "#2B1640"         # midnight plum: header, hero (dark), floating bar
  ink: "#1E1426"
  muted: "#645870"
  line: "#D6CEDD"
  bg: "#FBF8FA"           # dark theme: #140A1C
  alt: "#F0EAF2"          # dark theme: #1B0F25
  ok: "#1F6B43"
  warn: "#A15C00"

typography:
  display:
    fontFamily: Sora Variable
    fontSize: clamp(2.3rem, 6.2vw, 4.4rem)
    fontWeight: 250
    letterSpacing: -0.035em
  heading:
    fontFamily: Sora Variable
    fontSize: clamp(1.6rem, 3.4vw, 2.3rem)
    fontWeight: 300
  body:
    fontFamily: Hanken Grotesk Variable
    fontSize: 17px
    lineHeight: 1.65

rounded:
  control: 999px
  card: 14px
---

## Principles
- **Trust first.** One clear total price, optional extras never pre-ticked, placeholders marked `[to be confirmed]` until legal sign-off.
- **Coral is action.** Coral pills are the actions; coral text marks highlights and links.
- **Same layout as the original.** Upgrades add motion and light, never move content.

## Motion
- Headings rise in word by word when a screen is shown (SplitText); the home subtitle focuses in (BlurText).
- Selling rules count up (CountUp). Lists and steps rise in once (AnimatedContent).
- Primary buttons carry a star of light round their edge (StarBorder); cards follow the pointer with a coral spotlight (SpotlightCard).
- The floating Sell / Buy / Hot deals bar slides in when the header leaves the screen.
- Lenis smooth scrolling. Everything rests under `prefers-reduced-motion`.
