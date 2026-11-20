import CountUp from '@/components/CountUp'
import { CoralButton, Headline, Reveal } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function SellView() {
  return (
    <>
<div id="view-sell" className="view" hidden>
  <section><div className="wrap">
    <a className="back" href="#home">Back</a>
    <Headline parts={["Sell your car"]} />
    <p className="lede">Check your car against what we can list. It takes a minute and it’s free.</p>
    <ul className="rules"><li><CountUp to={10} duration={1.2} /> years or under</li><li>Under <CountUp to={120000} separator="," duration={1.6} /> miles</li><li>No write-offs</li></ul>
    <form className="check" id="check" noValidate>
      <label>Registration<input name="reg" maxLength={12} autoComplete="off" style={{textTransform: 'uppercase', letterSpacing: '.1em'}} /></label>
      <label>Year of first registration<input name="year" inputMode="numeric" maxLength={4} placeholder="e.g. 2019" /></label>
      <label>Mileage<input name="miles" inputMode="numeric" placeholder="e.g. 48000" /></label>
      <label>Asking price (£)<input name="price" inputMode="numeric" /></label>
      <label>Has it ever been written off?<select name="wo"><option value="">Choose</option><option value="no">No</option><option value="yes">Yes</option></select></label>
      <label>Is it roadworthy?<select name="rw"><option value="">Choose</option><option value="yes">Yes</option><option value="no">No</option></select></label>
      <label>Is there finance on it?<select name="fin"><option value="">Choose</option><option value="no">No</option><option value="yes">Yes</option></select></label>
      <label id="settle-l" hidden>Exact settlement figure (£)<input name="settle" inputMode="decimal" placeholder="e.g. 6240.18" /></label>
      <label id="settlepdf-l" hidden>Settlement letter from your lender (PDF)<input type="file" name="settlepdf" accept="application/pdf,.pdf" /></label>
      <p className="note full" id="settle-n" hidden style={{margin: '0'}}>The letter tells us exactly who your finance is with and how much clears it, so we can settle it directly. Preview only: the file isn’t uploaded yet.</p>
      <div className="full"><CoralButton type="submit">Check my car</CoralButton></div>
    </form>
    <div className="result" id="result" aria-live="polite" hidden></div>
  </div></section>
  <section className="alt"><div className="wrap">
    <Headline parts={["After the check"]} />
    <p className="lede">Your car passes the first check, then you build your listing.</p>
    <Reveal><ol className="steps">
      <li><h3>Verify</h3><p>Confirm your identity, and that you’re the owner or registered keeper.</p></li>
      <li><h3>Price</h3><p>See market valuation, a suggested price range, and the net amount you need. We explain how the advertised price is worked out.</p></li>
      <li><h3>Photos and condition</h3><p>Guided photos and a condition questionnaire. Be thorough: buyers rely on both.</p></li>
      <li><h3>Declare</h3><p>Sign a declaration that the advert and photos are accurate, and update us if anything changes.</p></li>
      <li><h3>Preview and publish</h3><p>Approve your final listing, then follow your offer and payout progress in your <a className="lnk" href="#profile">profile</a>.</p></li>
      <li><h3>Hand over and get paid</h3><p>Handover checklist, final photos, then payout and finance settlement tracking.</p></li>
    </ol></Reveal>
  </div></section>
  <section><div className="wrap cols">
    <div><h3>Photos we’ll ask for</h3><ul className="pts">
      <li>Every exterior panel, all wheels and tyres</li>
      <li>Windscreen, glass, interior and seats</li>
      <li>Dashboard with the engine running, and mileage</li>
      <li>Engine bay, boot and VIN</li>
      <li>Keys, service book and documents</li>
      <li>Close-ups of every known defect</li>
    </ul></div>
    <div><h3>If there’s finance on your car</h3><ul className="pts">
      <li>Upload your current settlement statement and its expiry date</li>
      <li>We calculate any negative equity</li>
      <li>If you owe more than your price, you’ll need to show proof of funds for the shortfall</li>
      <li>Your finance company owns the car until it’s settled. We help coordinate settlement from the sale.</li>
    </ul></div>
  </div></section>
  <section className="alt"><div className="wrap">
    <Headline parts={["Straight answers"]} />
    <details><summary>What does it cost me?</summary><p>Listing is free. Our fees are set out on the <a className="lnk" href="#fees">Fees page</a>, and you see your agreed net amount before you accept any deal.</p></details>
    <details><summary>Do I have to pay for preparation?</summary><p>No. You can sell as it is. The Retail Ready Upgrade is optional, and it does not guarantee a particular selling price. <a className="lnk" href="#packages">Details</a></p></details>
    <details><summary>What happens if I get something wrong in my advert?</summary><p>Tell us as soon as you know. Buyers rely on your photos and declaration, and you’re responsible for their accuracy.</p></details>
    <details><summary>What if it doesn’t sell?</summary><p>You can take it down at any time. If you’ve ordered a paid pack, what’s refundable is set out in that pack’s terms before you order.</p></details>
  </div></section>
</div>
    </>
  )
}
