import { Headline } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function DealsView() {
  return (
    <>
<div id="view-deals" className="view" hidden>
  <section><div className="wrap">
    <a className="back" href="#home">Back</a>
    <Headline parts={[{ hl: "Hot" }, "deals"]} />
    <p className="lede">A handful of cars each month come with an extra: a warranty offer, a finance contribution or a free inspection. Limited time only.</p>
    <div className="grid" id="deal-grid"></div>
    <p className="note" style={{marginTop: '30px'}}>Sample deals. <span className="todo">[Who funds each deal, the exact terms and any conditions to be confirmed. Finance contributions apply to finance purchases, subject to status.]</span></p>
  </div></section>
</div>
    </>
  )
}
