import { CoralButton, Headline } from '../ui'

/* From the original Union Motor Trade markup, upgraded with React Bits. Ids and classes are hooks for the engine. */
export default function GoneView() {
  return (
    <>
<div id="view-gone" className="view" hidden>
  <section><div className="wrap"><a className="back" href="#buy">Back to cars</a><Headline parts={["This car is no longer available"]} /><p className="lede">It may have sold, or the seller may have taken it off sale. The link might also be mistyped.</p><p className="umt-actions"><CoralButton href="#buy">See cars for sale</CoralButton> <CoralButton href="#deals" ghost>See hot deals</CoralButton></p></div></section>
</div>
    </>
  )
}
