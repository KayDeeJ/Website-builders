import { createRoot } from 'react-dom/client'
import './index.css'
import App from './umt/App'

// No StrictMode: the original engine owns parts of the DOM, and React must render it exactly once.
createRoot(document.getElementById('root')!).render(<App />)
