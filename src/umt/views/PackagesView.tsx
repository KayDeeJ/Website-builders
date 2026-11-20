import { Headline, Spot } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function PackagesView() {
  return (
    <>
<div id="view-packages" className="view" hidden>
  <section><div className="wrap">
    <a className="back" href="#home">Back</a>
    <Headline parts={["Packages"]} />
    <p className="lede">Everything we can add to a car, what it includes, who delivers it and why you can trust them. All of it is optional, never pre-selected, and shown separately from the price of the car.</p>
    <div className="pkgs">
      <Spot className="pkg"><h3>Independent inspection</h3><div className="for">Buyers: Pre-Delivery Assurance Pack</div>
        <dl className="dl"><dt>Includes</dt><dd>A check of the car before the deal completes, with a written report and photos</dd><dt>Who with</dt><dd>AA or RAC inspectors</dd><dt>Why trust them</dt><dd>Independent of the seller and of us. The AA and the RAC are long-established UK motoring organisations.</dd><dt>Worth knowing</dt><dd>An inspection is not a guarantee of a fault-free car</dd></dl></Spot>
      <Spot className="pkg"><h3>Warranty</h3><div className="for">Buyers</div>
        <dl className="dl"><dt>Includes</dt><dd><span className="todo">[Cover level, limits, claim limits and excess to be added]</span></dd><dt>Who with</dt><dd><span className="todo">[Warranty provider to be named]</span></dd><dt>Why trust them</dt><dd><span className="todo">[How they’re regulated, how claims are paid and their claims record]</span></dd><dt>Worth knowing</dt><dd>Additional to your legal rights, never a replacement for them</dd></dl></Spot>
      <Spot className="pkg"><h3>Delivery with live tracking</h3><div className="for">Buyers</div>
        <dl className="dl"><dt>Includes</dt><dd>National delivery. Follow your car in your profile: where it is, your ETA and how many stops come before yours.</dd><dt>Who with</dt><dd><span className="todo">[Transport partner to be named]</span></dd><dt>Why trust them</dt><dd><span className="todo">[Insurance and goods-in-transit cover to be confirmed]</span> Condition photos at collection and delivery.</dd><dt>Worth knowing</dt><dd>Delivery is optional. Add it on the car page and the cost shows in your total before you reserve, or collect the car yourself.</dd></dl></Spot>
      <Spot className="pkg"><h3>Cosmetic packs</h3><div className="for">Sellers: Retail Ready Upgrade. Buyers: optional preparation.</div>
        <dl className="dl"><dt>Includes</dt><dd>Bodywork, alloy wheel, interior or full cosmetic work, with before-and-after photos</dd><dt>Who with</dt><dd>Local partners near the car. <span className="todo">[Partner list and coverage to be confirmed]</span></dd><dt>Why trust them</dt><dd>Partners must be insured and meet our quality standards, and can be suspended after poor ratings</dd><dt>Worth knowing</dt><dd>A pack doesn’t guarantee a selling price</dd></dl></Spot>
      <Spot className="pkg"><h3>Finance</h3><div className="for">Buyers</div>
        <dl className="dl"><dt>Includes</dt><dd>Application, the total cost, deposit and monthly payment shown up front, and settlement of any finance on the car</dd><dt>Who with</dt><dd><span className="todo">[Lenders to be named]</span></dd><dt>Why trust them</dt><dd><span className="todo">[Our FCA status and each lender’s authorisation to be added]</span> We are a broker, not a lender, and we show any commission we may receive before you apply.</dd><dt>Worth knowing</dt><dd>Subject to status</dd></dl></Spot>
      <Spot className="pkg"><h3>Secure payment</h3><div className="for">Buyers and sellers</div>
        <dl className="dl"><dt>Includes</dt><dd>Payments held and passed on by a regulated payment provider, with receipts and payout tracking</dd><dt>Who with</dt><dd><span className="todo">[Payment provider to be named]</span></dd><dt>Why trust them</dt><dd><span className="todo">[Their regulatory status to be added]</span></dd><dt>Worth knowing</dt><dd>Your money doesn’t go through an ordinary business account</dd></dl></Spot>
    </div>
    <p className="muted todo" style={{marginTop: '34px'}}>Provider names, trust details and review scores are placeholders until each partner is confirmed.</p>
  </div></section>
  <section className="alt"><div className="wrap">
    <h2>Two packs, two names</h2>
    <p className="lede">So nobody mixes them up.</p>
    <table className="tbl">
      <thead><tr><th></th><th>Seller Retail Ready Upgrade</th><th>Buyer Pre-Delivery Assurance Pack</th></tr></thead>
      <tbody>
        <tr><td>Purpose</td><td>Supports a stronger asking price</td><td>Adds buyer confidence before delivery</td></tr>
        <tr><td>Ordered</td><td>Before listing, or after valuation</td><td>Before delivery</td></tr>
        <tr><td>Who pays</td><td>Seller, taken from the sale proceeds, so nothing to pay up front</td><td>Buyer, at checkout</td></tr>
        <tr><td>What it can’t do</td><td>Guarantee a selling price</td><td>Guarantee a fault-free car</td></tr>
      </tbody>
    </table>
  </div></section>
  <section><div className="wrap">
    <h2>What every pack spells out before you order</h2>
    <div className="cols"><ul className="pts"><li>Exactly what’s included, and what isn’t</li><li>A fixed price or a quotation</li><li>Who pays, and when payment stops being refundable</li><li>Who authorises extra work, and the maximum spend</li></ul>
    <ul className="pts"><li>Before-and-after photos and the timescale</li><li>What happens if the car doesn’t sell, or the seller withdraws</li><li>What happens if inspection finds a major fault</li><li>Who’s responsible for work done by a partner</li></ul></div>
  </div></section>
</div>
    </>
  )
}
