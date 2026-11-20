import { Headline } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function BuyView() {
  return (
    <>
<div id="view-buy" className="view" hidden>
  <section><div className="wrap">
    <a className="back" href="#home">Back</a>
    <Headline parts={["Cars", { hl: "available now" }]} />
    <p className="lede" style={{marginBottom: '26px'}}>Browse freely. You’ll need an account to buy, reserve or apply for finance. Every car is 10 years old or under, under 120,000 miles, and not a write-off.</p>
    <div className="look">
      <h3 id="look-h">I’m looking for</h3>
      <div className="chips" id="chips" role="group" aria-labelledby="look-h"></div>
    </div>
    <details className="vf" id="vf">
      <summary>Vehicle filters <span className="muted" id="fcount" style={{fontFamily: 'var(--body)', fontSize: '.9rem'}}></span></summary>
      <div className="filters">
        <div className="cas">
          <label>Make<select id="f-make"></select></label>
          <label id="l-model" hidden>Model<select id="f-model"></select></label>
          <label id="l-spec" hidden>Specification<select id="f-spec"></select></label>
        </div>
        <label>Max price<select id="f-price"><option value="">Any</option><option value="10000">£10,000</option><option value="15000">£15,000</option><option value="20000">£20,000</option><option value="25000">£25,000</option><option value="30000">£30,000</option></select></label>
        <label>Max mileage<select id="f-miles"><option value="">Any</option><option value="20000">20,000</option><option value="40000">40,000</option><option value="60000">60,000</option><option value="80000">80,000</option><option value="100000">100,000</option><option value="120000">120,000</option></select></label>
        <label>Fuel<select id="f-fuel"></select></label>
        <label>Gearbox<select id="f-trans"><option value="">Any</option><option>Manual</option><option>Automatic</option></select></label>
        <label>Colour<select id="f-col"></select></label>
      </div>
    </details>
    <div className="pcbar"><form className="pcform" id="pc-buy" noValidate><label>Your postcode<input id="pc-buy-in" autoComplete="postal-code" placeholder="e.g. LS1 4AB" aria-describedby="pc-buy-msg" /></label><button className="btn ghost" type="submit">Update</button><p className="pcmsg" id="pc-buy-msg" aria-live="polite">Add your postcode to see distances and sort nearest first.</p></form></div>
    <div className="bar2"><span id="count" aria-live="polite"></span><div className="bar3"><label className="sortl">Sort by<select id="f-sort" aria-label="Sort cars"></select></label><button type="button" id="clear">Clear all</button></div></div>
    <p className="note">Sample listings are shown until live stock is loaded. Prices shown are the vehicle price; the full total price is on each car’s page. Enter your postcode to see how far each car is from you (approximate, by postcode area). Delivery to your door is an optional extra.</p>
    <div className="grid" id="grid"></div>
    <p className="muted" id="none" hidden>No cars match those choices. Try clearing a filter.</p>
    <nav className="pager" id="pager" aria-label="Pages of cars"></nav><p className="pagenote" id="pagenote"></p>
  </div></section>
</div>
    </>
  )
}
