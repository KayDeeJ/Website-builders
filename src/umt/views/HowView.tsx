import { site } from '@/lib/site'
import { Headline, TrackerFill } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function HowView() {
  return (
    <>
<div id="view-how" className="view" hidden>
  <section><div className="wrap">
    <a className="back" href="#home">Back</a>
    <Headline parts={["How it works"]} />
    <p className="lede">{site.name} connects private sellers with buyers who pay cash or use finance. Where a purchase is on finance, we step in to handle the finance side. [Final wording to follow your legal advice.]</p>
    <div className="cols">
      <div><h3>Cash purchase</h3><ul className="pts"><li>Buyer buys or reserves the car at its fixed price.</li><li>The car is inspected, and the buyer confirms.</li><li>Payment reaches the seller through a regulated payment route. [Provider to be confirmed.]</li><li>Delivery to your door or collection, then the change of keeper.</li></ul></div>
      <div><h3>Finance purchase</h3><ul className="pts"><li>Buyer applies for finance, shown with the total cost and any commission we may receive.</li><li>On approval, the lender pays out and any finance owed on the car is settled from the proceeds.</li><li>The car is inspected before the deal completes.</li><li>If the car fails inspection after approval, the buyer’s options are explained before anything is signed.</li></ul></div>
    </div>
  </div></section>
  <section className="alt"><div className="wrap">
    <Headline parts={["Track every deal"]} />
    <p className="lede">Buyers and sellers see the same progress, in their <a className="lnk" href="#profile">profile</a>.</p>
    <TrackerFill><ol className="tracker">
      <li>Reserved</li><li>Finance approved<small>finance purchases</small></li><li>Inspection</li><li>Preparation<small>if ordered</small></li><li>Ready for delivery</li><li>Completed</li>
    </ol></TrackerFill>
  </div></section>
  <section><div className="wrap cols">
    <div><h3>Vehicles we accept</h3><ul className="pts"><li>10 years old or under, under 120,000 miles</li><li>No write-offs or salvage history</li><li>Roadworthy, with V5C and clear ownership</li><li>Finance is fine, with a settlement statement</li><li>Cars we wouldn’t retail ourselves are declined</li></ul></div>
    <div><h3>We may suspend a listing if</h3><ul className="pts"><li>The advert or photos don’t match the car</li><li>Ownership or finance details can’t be verified</li><li>Condition changes and isn’t updated</li><li>Vehicle history checks raise a concern</li></ul></div>
  </div></section>
</div>
    </>
  )
}
