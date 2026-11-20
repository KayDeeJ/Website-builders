import { CoralButton, Headline } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function LegalView() {
  return (
    <>
<div id="view-legal" className="view" hidden>
  <section><div className="wrap">
    <a className="back" href="#home">Back</a>
    <Headline parts={["Legal, complaints and disclosures"]} />
    <p className="lede">These documents are in preparation and will each be linked here before launch.</p>
    <div className="cols">
      <ul className="pts"><li>Cash-sale terms</li><li>Finance-sale terms</li><li>Seller agreement</li><li>Buyer agreement</li><li>Warranty terms</li></ul>
      <ul className="pts"><li>Inspection and delivery terms</li><li>Cancellation policy</li><li>Privacy policy and cookie controls</li><li>Accessibility statement</li><li>Complaints policy</li></ul>
    </div>
  </div></section>
  <section className="alt"><div className="wrap">
    <h2>Regulatory and commission disclosures</h2>
    <ul className="pts" style={{maxWidth: '700px'}}>
      <li>Who we are, and our FCA status: <span className="todo">[firm name, reference number and permissions to be confirmed]</span></li>
      <li>We act as a credit broker, not a lender. <span className="todo">[Confirm]</span></li>
      <li>We may receive commission from lenders and warranty providers. We’ll tell you before you apply.</li>
      <li>Whether each seller is a private seller or a trader is shown on every listing.</li>
    </ul>
    <h2 style={{marginTop: '44px'}}>Making a complaint</h2>
    <p className="muted" style={{maxWidth: '62ch'}}>Tell us what happened and what you’d like us to do. We’ll acknowledge your complaint and send a final response within the timescales we publish here. <span className="todo">[Complaints contact and timescales to be added.]</span></p>
    <p><CoralButton href="#help">Raise a problem or complaint</CoralButton></p>
  </div></section>
</div>
    </>
  )
}
