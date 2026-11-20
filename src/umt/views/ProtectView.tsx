import { Headline, Reveal } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function ProtectView() {
  return (
    <>
<div id="view-protect" className="view" hidden>
  <section><div className="wrap">
    <a className="back" href="#home">Back</a>
    <Headline parts={["Buyer protection"]} />
    <p className="lede">Your legal rights as a buyer are not reduced by any warranty, inspection or pack. Where consumer law applies, they apply in addition. [Which rights apply to each journey to be confirmed with your solicitor.]</p>
    <div className="cols">
      <div><h3>Before you buy</h3><ul className="pts"><li>Verified seller, history and condition information</li><li>Disclosed defects, MOT, advisories, keys and service history</li><li>Optional independent inspection before delivery</li><li>Secure messaging that doesn’t share addresses or phone numbers</li></ul></div>
      <div><h3>After you buy</h3><ul className="pts"><li>Warranty options, additional to your legal rights</li><li>A clear route to report a fault, with photos and video</li><li>Safety issues escalated immediately</li><li>Human support throughout</li></ul></div>
    </div>
  </div></section>
  <section className="alt"><div className="wrap">
    <Headline parts={["If something goes wrong"]} />
    <Reveal><ol className="steps">
      <li><h3>Report it</h3><p>Tell us what’s wrong, with photos or video. Anything affecting safety comes first.</p></li>
      <li><h3>We review it</h3><p>We may arrange an inspection, and we’ll explain your options, including any repair, refund or return rights.</p></li>
      <li><h3>Still not right?</h3><p>Use our <a className="lnk" href="#legal">complaints process</a>, and escalate externally if you’re still unhappy.</p></li>
    </ol></Reveal>
  </div></section>
</div>
    </>
  )
}
