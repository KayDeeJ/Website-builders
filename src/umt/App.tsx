import { useEffect } from 'react'
import engineUrl from './engine/engine.js?url'
import { useCinema } from './cinema'
import { useTactile } from './tactile'
import { useEngineFx } from './fx'
import { useSiteMotion } from './hooks'
import { useArrivals } from './arrive'
import Receptionist from './receptionist/Receptionist'
import Intro from './Intro'
import QuickBar from './QuickBar'
import Footer from './markup/Footer'
import Header from './markup/Header'
import Sprite from './markup/Sprite'
import Strip from './markup/Strip'
import BuyView from './views/BuyView'
import DealsView from './views/DealsView'
import FeesView from './views/FeesView'
import GoneView from './views/GoneView'
import HomeView from './views/HomeView'
import HowView from './views/HowView'
import LegalView from './views/LegalView'
import PackagesView from './views/PackagesView'
import ProtectView from './views/ProtectView'
import SellView from './views/SellView'
import CarView from './markup/CarView'
import DeliverView from './markup/DeliverView'
import FinView from './markup/FinView'
import HelpView from './markup/HelpView'
import PayView from './markup/PayView'
import ProfileView from './markup/ProfileView'
import PxView from './markup/PxView'
import ReferView from './markup/ReferView'
import RevenueView from './markup/RevenueView'
import SettingsView from './markup/SettingsView'
import VerifyView from './markup/VerifyView'

declare global {
  interface Window {
    __umtEngine?: boolean
  }
}

/**
 * Union Motor Trade. React renders every screen once; the original engine (a classic script,
 * loaded after the first render) then routes between them on the URL hash and fills the
 * engine-built screens. Nothing here re-renders, so the engine's DOM changes are never undone.
 */
export default function App() {
  useSiteMotion()
  useEngineFx()
  useArrivals()
  useCinema()
  useTactile()

  useEffect(() => {
    if (window.__umtEngine) return
    window.__umtEngine = true
    const s = document.createElement('script')
    s.src = engineUrl
    document.body.appendChild(s)
  }, [])

  return (
    <>
      <Sprite />
      <Header />
      <QuickBar />
      <Strip />
      <main>
        <HomeView />
        <SellView />
        <BuyView />
        <DealsView />
        <CarView />
        <PackagesView />
        <HowView />
        <FeesView />
        <ProtectView />
        <LegalView />
        <VerifyView />
        <FinView />
        <DeliverView />
        <SettingsView />
        <HelpView />
        <ReferView />
        <GoneView />
        <PayView />
        <RevenueView />
        <PxView />
        <ProfileView />
      </main>
      <Footer />
      <Receptionist />
      <Intro />
    </>
  )
}
