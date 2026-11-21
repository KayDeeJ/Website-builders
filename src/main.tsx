import { createRoot } from 'react-dom/client'
import './index.css'
import { site } from './lib/site'
import App from './umt/App'

// No StrictMode: the original engine owns parts of the DOM, and React must render it exactly once.
document.title = `${site.name} | ${site.tagline}`

createRoot(document.getElementById('root')!).render(<App />)
