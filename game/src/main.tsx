import './index.css'

import App from './App.tsx'
import { GameContextProvider } from './ContextProvider/ContextProvider.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>,
)
