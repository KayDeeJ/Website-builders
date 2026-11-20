import { Headline } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function FeesView() {
  return (
    <>
<div id="view-fees" className="view" hidden>
  <section><div className="wrap">
    <a className="back" href="#home">Back</a>
    <Headline parts={["Fees and pricing"]} />
    <p className="lede">No surprises at checkout. The price you see is the price you start with.</p>
    <div className="cols">
      <div><h3>Buyers</h3><ul className="pts">
        <li><b>Advertised total</b> includes the vehicle price and any compulsory buyer fee.</li>
        <li><b>Delivery</b> is optional. If you add it, the cost is shown in your total before you reserve.</li>
        <li><b>Optional products</b> (inspection, packs, warranty) are listed separately and never pre-ticked.</li>
        <li><b>Finance:</b> deposit, monthly payment and any commission we may receive are shown before you apply.</li></ul></div>
      <div><h3>Sellers</h3><ul className="pts">
        <li><b>Listing is free.</b></li>
        <li><b>Your agreed net amount</b> is set before you accept an offer.</li>
        <li><b>How the advertised price is calculated</b> is explained on your listing preview.</li>
        <li><b>Paid packs</b> only when you choose them, with terms shown first.</li></ul></div>
    </div>
  </div></section>
  <section className="alt"><div className="wrap">
    <Headline parts={["How we earn"]} />
    <p className="lede" style={{marginBottom: '20px'}}>We’re open about it. Our income can include:</p>
    <ul className="pts" style={{maxWidth: '640px'}}><li>A buyer fee, included in the advertised total</li><li>An agreed uplift or commission on the sale</li><li>Commission from finance and warranty providers, disclosed before you commit</li><li>Margin on optional inspection and preparation services, and on delivery</li></ul>
    <p className="muted todo" style={{marginTop: '22px'}}>[Fee amounts and VAT treatment to be confirmed.]</p>
  </div></section>
</div>
    </>
  )
}
