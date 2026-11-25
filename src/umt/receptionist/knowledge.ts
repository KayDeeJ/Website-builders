/*
 * What the receptionist knows. Every answer is written from the site's own pages (fees, how it
 * works, packages, protection, sell), so it never promises more than the site does. Placeholders
 * the site still carries ("to be confirmed") are reflected honestly rather than invented.
 */
import { site } from '@/lib/site'

export type Link = { label: string; href: string }
export type Reply = { text: string; links?: Link[] }

/** One entry per screen: its name (shown on the transition curtain and in the panel), what the
 * receptionist says when you arrive there, and the questions it offers on that screen. */
export type Page = { title: string; nudge: string; asks: string[] }

export const pages: Record<string, Page> = {
  home: {
    title: 'Home',
    nudge: 'Hi, I’m Ruby at the front desk. Selling or buying today?',
    asks: ['I want to sell my car', 'I want to buy a car', 'How does it work?', 'Is it safe?'],
  },
  sell: {
    title: 'Sell your car',
    nudge: 'Selling? The car check takes a minute and listing is free.',
    asks: ['Which cars do you accept?', 'What does selling cost?', 'I still have finance on it', 'What photos do I need?'],
  },
  buy: {
    title: 'Buy a car',
    nudge: 'Browsing? Every price here is the full price, up front.',
    asks: ['What’s in the price?', 'Can I get finance?', 'Do you deliver?', 'Can I have it inspected?'],
  },
  deals: {
    title: 'Hot deals',
    nudge: 'These are the sharpest prices on the site right now.',
    asks: ['Why are these cheaper?', 'Can I reserve one?', 'Can I get finance?'],
  },
  car: {
    title: 'Car details',
    nudge: 'Like this one? I can explain reserving, finance or delivery.',
    asks: ['How do I reserve?', 'Can I get finance?', 'Do you deliver?', 'Can I have it inspected?'],
  },
  packages: {
    title: 'Packages',
    nudge: 'Everything here is optional and never pre-ticked.',
    asks: ['Tell me about inspections', 'Is there a warranty?', 'How does delivery tracking work?'],
  },
  how: {
    title: 'How it works',
    nudge: 'Cash or finance, both sides see the same progress tracker.',
    asks: ['How does a cash purchase work?', 'How does finance work?', 'Which cars do you accept?'],
  },
  fees: {
    title: 'Fees and pricing',
    nudge: 'No surprises: the price you see is the price you start with.',
    asks: ['What does selling cost?', 'What’s in the price?', 'How do you make money?'],
  },
  protect: {
    title: 'Buyer protection',
    nudge: 'Your legal rights always come first. Ask me what that means.',
    asks: ['Is it safe?', 'What if something goes wrong?', 'Is there a warranty?'],
  },
  legal: { title: 'Legal', nudge: 'Legal pages can be dense. Ask me anything in plain words.', asks: ['Is it safe?', 'Talk to a person'] },
  verify: { title: 'Verify your ID', nudge: 'ID checks keep fake sellers off the site.', asks: ['Why do you need my ID?', 'Talk to a person'] },
  fin: { title: 'Finance', nudge: 'Your deposit, monthly cost and total are shown before you apply.', asks: ['How does finance work?', 'Talk to a person'] },
  deliver: { title: 'Delivery', nudge: 'You can follow your car live, stop by stop.', asks: ['How does delivery tracking work?', 'Talk to a person'] },
  settings: { title: 'Settings', nudge: 'Need a hand with your settings?', asks: ['Talk to a person'] },
  help: { title: 'Help', nudge: 'You’re in the right place. What can I help with?', asks: ['Talk to a person', 'What if something goes wrong?'] },
  refer: { title: 'Refer a friend', nudge: 'Know someone selling? Share your link.', asks: ['How does referring work?'] },
  gone: { title: 'No longer available', nudge: 'That one’s gone, but I can show you similar cars.', asks: ['I want to buy a car', 'Show me hot deals'] },
  pay: { title: 'Payment', nudge: 'Full balances go by bank only, through a regulated provider.', asks: ['Is my payment safe?', 'Talk to a person'] },
  revenue: { title: 'Offers and payout', nudge: 'You see your net amount before you accept anything.', asks: ['What does selling cost?', 'Talk to a person'] },
  px: { title: 'Part exchange', nudge: 'Trading in? I can walk you through it.', asks: ['Talk to a person'] },
  profile: { title: 'Your profile', nudge: 'Your deals, offers and tracking live here.', asks: ['Where is my car?', 'Talk to a person'] },
}

export const pageOf = (hash: string) => {
  const h = (hash || '#home').slice(1)
  if (/^car-\d+$/.test(h)) return 'car'
  if (h === 'packs') return 'packages'
  return pages[h] ? h : 'home'
}

/** `weight` scales a match: general words ("how") count for less, money words for more. */
type Intent = { words: string[]; reply: Reply; weight?: number }

const intents: Intent[] = [
  {
    words: ['sell', 'selling', 'list', 'listing', 'value', 'valuation', 'worth'],
    reply: {
      text: 'Great. Start with the free car check: registration, year, mileage and asking price. If it passes, you verify yourself, set your price with a market valuation, add guided photos and publish. Listing is free.',
      links: [{ label: 'Check my car', href: '#sell' }],
    },
  },
  {
    words: ['buy', 'buying', 'browse', 'looking', 'find', 'search', 'similar'],
    reply: {
      text: 'You can browse without an account. Every advert shows the full price up front, and you can buy outright or on finance.',
      links: [
        { label: 'Browse cars', href: '#buy' },
        { label: 'Hot deals', href: '#deals' },
      ],
    },
  },
  {
    words: ['hot', 'deal', 'deals', 'cheap', 'cheaper', 'discount', 'saving', 'savings'],
    reply: {
      text: 'Hot deals are cars priced furthest below their retail value. They tend to go quickly, so reserve if one catches your eye.',
      links: [{ label: 'Show hot deals', href: '#deals' }],
    },
  },
  {
    words: ['accept', 'criteria', 'eligible', 'qualify', 'old', 'age', 'miles', 'mileage', 'write-off', 'writeoff'],
    reply: {
      text: 'We list cars 10 years old or under, with under 120,000 miles, no write-off or salvage history, roadworthy, with a V5C and clear ownership. Finance on the car is fine with a settlement statement.',
      links: [{ label: 'Run the car check', href: '#sell' }],
    },
  },
  {
    words: ['cost', 'costs', 'fee', 'fees', 'charge', 'charges', 'free', 'commission', 'pay me'],
    weight: 2,
    reply: {
      text: 'Listing is free for sellers, and your agreed net amount is set before you accept any offer. Buyers see an advertised total that already includes any compulsory buyer fee. Paid extras are only ever added when you choose them.',
      links: [{ label: 'Fees and pricing', href: '#fees' }],
    },
  },
  {
    words: ['price', 'total', 'included', 'hidden', 'extra', 'extras'],
    reply: {
      text: 'The advertised total includes the vehicle price and any compulsory buyer fee. Delivery, inspection, packs and warranty are listed separately and never pre-ticked.',
      links: [{ label: 'See fees', href: '#fees' }],
    },
  },
  {
    words: ['money', 'income', 'earn', 'profit', 'make'],
    reply: {
      text: `We’re open about it. ${site.name}’s income can include a buyer fee (inside the advertised total), an agreed uplift or commission on the sale, commission from finance and warranty providers (disclosed before you commit) and margin on optional services.`,
      links: [{ label: 'Fees and pricing', href: '#fees' }],
    },
  },
  {
    words: ['finance', 'loan', 'monthly', 'deposit', 'apr', 'lender', 'settlement', 'owe', 'outstanding'],
    reply: {
      text: 'Buying: apply on the car page and you see the deposit, monthly payment, total cost and any commission we may receive before you apply. We’re a broker, not a lender, and finance is subject to status. Selling with finance owed: upload your settlement letter and we coordinate paying it off from the sale.',
      links: [{ label: 'How it works', href: '#how' }],
    },
  },
  {
    words: ['deliver', 'delivery', 'collect', 'collection', 'track', 'tracking', 'where', 'eta'],
    reply: {
      text: 'Delivery is optional. Add it on the car page and its cost shows in your total before you reserve, or collect the car yourself. Once it’s on the way, follow it in your profile: where it is, your ETA and how many stops come before yours.',
      links: [{ label: 'Your profile', href: '#profile' }],
    },
  },
  {
    words: ['inspect', 'inspected', 'inspection', 'inspections', 'check', 'aa', 'rac', 'mechanic', 'report'],
    reply: {
      text: 'You can add an independent inspection by AA or RAC inspectors before the deal completes, with a written report and photos. It’s independent of the seller and of us, though no inspection can guarantee a fault-free car.',
      links: [{ label: 'Packages', href: '#packages' }],
    },
  },
  {
    words: ['warranty', 'guarantee', 'cover'],
    reply: {
      text: 'Warranty options are on the way, and they always sit on top of your legal rights, never in place of them. The cover levels and provider will be listed on the Packages page.',
      links: [{ label: 'Packages', href: '#packages' }],
    },
  },
  {
    words: ['safe', 'safety', 'scam', 'trust', 'protect', 'protection', 'secure', 'rights'],
    reply: {
      text: 'Sellers are verified, history and condition are disclosed, messaging never shares your address or phone number, and payments go through a regulated provider. Your legal rights as a buyer are never reduced by any pack or warranty.',
      links: [{ label: 'Buyer protection', href: '#protect' }],
    },
  },
  {
    words: ['wrong', 'fault', 'problem', 'broken', 'complain', 'complaint', 'refund', 'return'],
    reply: {
      text: 'Tell us what’s wrong with photos or video, and anything affecting safety comes first. We review it, may arrange an inspection, and explain your options including repair, refund or return rights. If it’s still not right, there’s a complaints process.',
      links: [
        { label: 'Buyer protection', href: '#protect' },
        { label: 'Get help', href: '#help' },
      ],
    },
  },
  {
    words: ['reserve', 'reservation', 'hold', 'secure it'],
    reply: {
      text: 'Open the car and choose Reserve. You’ll see the full total, including any delivery you add, before you pay a reservation. Progress then appears in your profile.',
      links: [{ label: 'Browse cars', href: '#buy' }],
    },
  },
  {
    words: ['cash', 'outright'],
    reply: {
      text: 'Cash purchase: reserve or buy at the fixed price, the car is inspected and you confirm, payment reaches the seller through a regulated payment route, then delivery or collection and the change of keeper.',
      links: [{ label: 'How it works', href: '#how' }],
    },
  },
  {
    words: ['payment', 'bank', 'card', 'transfer'],
    reply: {
      text: 'Payments are held and passed on by a regulated payment provider, with receipts and payout tracking. The full balance is paid by bank; cards and wallets can be used for reservations, deposits and extras.',
    },
  },
  {
    words: ['photo', 'photos', 'pictures', 'images'],
    reply: {
      text: 'We’ll guide you through every exterior panel, wheels and tyres, glass, interior and seats, the dashboard with the engine running, the engine bay, boot and VIN, keys and documents, plus close-ups of any known defect.',
      links: [{ label: 'Start selling', href: '#sell' }],
    },
  },
  {
    words: ['id', 'identity', 'verify', 'verification', 'passport', 'licence'],
    reply: { text: 'We confirm who you are, and that sellers own the car or are its registered keeper. It keeps fake listings and payment fraud off the site.', links: [{ label: 'Verify ID', href: '#verify' }] },
  },
  {
    words: ['refer', 'referring', 'referral', 'friend', 'invite'],
    reply: { text: 'Share your referral link from the Refer page. When a friend sells or buys through it, you’ll both see the reward there.', links: [{ label: 'Refer a friend', href: '#refer' }] },
  },
  {
    words: ['how', 'work', 'works', 'process', 'steps'],
    weight: 0.5,
    reply: {
      text: `${site.name} connects private sellers with buyers paying cash or finance. Cars are checked before they’re listed, inspected before a deal completes, and both sides follow the same tracker: reserved, finance approved, inspection, preparation, ready for delivery, completed.`,
      links: [{ label: 'How it works', href: '#how' }],
    },
  },
  {
    words: ['person', 'human', 'agent', 'call', 'phone', 'speak', 'talk', 'contact', 'help', 'support'],
    reply: { text: 'Of course. Our team handles anything I can’t, and there’s human support all the way through a deal.', links: [{ label: 'Contact the team', href: '#help' }] },
  },
]

const greetings = ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening', 'hiya']
const thanks = ['thanks', 'thank', 'cheers', 'ta', 'great', 'perfect', 'brilliant']

/** Scores each intent by matching words (whole words, or phrases as substrings). */
export function answer(q: string): Reply {
  const s = q.toLowerCase().replace(/[’']/g, '')
  const words = s.split(/[^a-z0-9-]+/).filter(Boolean)
  const has = (w: string) => (w.includes(' ') ? s.includes(w) : words.includes(w))
  if (words.length <= 3 && words.some((w) => greetings.includes(w)))
    return { text: 'Hello! I can help you sell your car, find one to buy, or explain fees, finance and delivery.' }
  if (words.length <= 4 && words.some((w) => thanks.includes(w))) return { text: 'Any time. Anything else I can help with?' }

  let best: Intent | null = null
  let top = 0
  for (const it of intents) {
    const score = it.words.reduce((n, w) => n + (has(w) ? 1 : 0), 0) * (it.weight ?? 1)
    if (score > top) {
      top = score
      best = it
    }
  }
  if (best) return best.reply
  return {
    text: 'I’m not sure I’ve got that one. I can help with selling, buying, fees, finance, delivery and protection, or put you through to the team.',
    links: [{ label: 'Contact the team', href: '#help' }],
  }
}
