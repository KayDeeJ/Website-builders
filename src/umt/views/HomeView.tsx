import { site } from '@/lib/site'
import BlurText from '@/components/BlurText'
import KeyHandover from '../KeyHandover'
import DealStory from './DealStory'
import { CoralButton, Headline, Reveal, Spot } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function HomeView() {
  return (
    <>
<div id="view-home" className="view">
  <div className="hero"><div className="scene handover" aria-hidden="true"><KeyHandover /></div><div className="wrap herogrid"><div className="heromain">
    <Headline as="h1" parts={["What brings you to", { hl: `${site.name}?` }]} />
    <BlurText trigger="load" animateBy="words" delay={30} className="sub" text="The dealer-backed marketplace connecting private car sellers with cash and finance buyers. Open to everyday drivers, not just the trade." />
    <form className="pcform" id="pc-home" noValidate><label>Your postcode<input id="pc-home-in" autoComplete="postal-code" placeholder="e.g. LS1 4AB" aria-describedby="pc-home-msg" /></label><CoralButton type="submit">See cars near me</CoralButton><p className="pcmsg" id="pc-home-msg" aria-live="polite"></p></form>
    <div className="fork">
      <a href="#sell" className="fork-link"><Spot onDark className="fork-card">
        <span className="bg" aria-hidden="true"><svg viewBox="0 0 400 180" preserveAspectRatio="xMaxYMax slice" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 152H312M30 96H292M30 96V152M160 96V152M292 96V152" />
          <g transform="translate(46,70) scale(.62)"><use href="#car" /></g><g transform="translate(126,70) scale(.62)"><use href="#car" /></g><g transform="translate(206,70) scale(.62)"><use href="#car" /></g>
          <g transform="translate(46,126) scale(.62)"><use href="#car" /></g><g transform="translate(126,126) scale(.62)"><use href="#car" /></g><g transform="translate(206,126) scale(.62)"><use href="#car" /></g>
          <path d="M312 152V110H346L366 130V152Z" /><path d="M322 116H342L355 130H322Z" strokeWidth="2" />
          <circle cx="62" cy="163" r="10" /><circle cx="92" cy="163" r="10" /><circle cx="232" cy="163" r="10" /><circle cx="262" cy="163" r="10" /><circle cx="340" cy="163" r="10" />
        </svg></span>
        <h2>Sell my car</h2><p>Check your car against our criteria and list it free.</p>
      </Spot></a>
      <a href="#buy" className="fork-link"><Spot onDark className="fork-card">
        <span className="bg" aria-hidden="true"><svg viewBox="0 0 400 180" preserveAspectRatio="xMaxYMax slice" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 164H392" />
          <g transform="translate(18,100) scale(1.55)"><use href="#car" /></g>
          <circle cx="262" cy="92" r="9" fill="currentColor" /><circle cx="332" cy="92" r="9" fill="currentColor" />
          <path d="M252 108Q252 102 262 102Q272 102 272 108V150H252Z" fill="currentColor" /><path d="M322 108Q322 102 332 102Q342 102 342 108V150H322Z" fill="currentColor" />
          <path d="M256 150V164M268 150V164M326 150V164M338 150V164" />
          <path d="M272 116L297 120M322 116L302 120" strokeWidth="5" />
          <circle cx="300" cy="126" r="4.5" /><path d="M300 131V142M300 137H305M300 142H305" />
        </svg></span>
        <h2>Buy a car</h2><p>Browse without an account. See the full price up front.</p>
      </Spot></a>
    </div>

  </div><aside className="promo" id="promo" aria-label="Hot deal"></aside>
  </div></div>
  <section className="gains" aria-labelledby="gains-h"><div className="wrap">
    <Reveal className="gains-head">
      <p className="eyebrow">Biggest savings right now</p>
      <h2 id="gains-h">Furthest below retail value</h2>
      <p className="muted">The cars priced furthest under their Auto Trader retail value today. <a className="lnk" href="#buy">See all cars</a></p>
    </Reveal>
    <div className="grid gain-grid" id="gain-grid"></div>
  </div></section>
  <section className="alt handsec"><Reveal className="wrap cols">
    <div><h3>If you’re selling</h3><ul className="pts">
      <li><b>Free basic listing.</b> No mandatory preparation spend.</li>
      <li><b>Sell to retail buyers, not the trade.</b> Your car is priced against the retail market and shown to cash and finance buyers.</li>
      <li><b>Keep and use your car</b> until you accept an offer.</li>
      <li><b>Guided photos and advert</b>, plus market-value guidance.</li>
      <li><b>Help settling existing finance.</b></li>
      <li><b>Optional Retail Ready Upgrade</b> to support a stronger price. <a className="lnk" href="#packages">See packages</a></li>
    </ul></div>
    <div><h3>If you’re buying</h3><ul className="pts">
      <li><b>Verified seller, history and condition information</b> on every listing.</li>
      <li><b>One clear total price</b>, with optional extras kept separate.</li>
      <li><b>Optional independent inspection</b> before delivery.</li>
      <li><b>Cash or finance</b>, with finance and settlement handled in one journey.</li>
      <li><b>Optional delivery to your door</b>, with live tracking of your car, or collect it yourself. <a className="lnk" href="#packages">See packages</a></li>
      <li><b>Hot deals</b> on selected cars. <a className="lnk" href="#deals">See this month’s deals</a></li>
    </ul></div>
  </Reveal></section>
  <DealStory />
</div>
    </>
  )
}
