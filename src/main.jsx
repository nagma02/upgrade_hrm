import './index.css'
// main.tsx is used in the TypeScript architecture; keep this file minimal for backwards compatibility
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element #root was not found.')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
