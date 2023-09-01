import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import CharacterContextProvider from './Context/CharacterContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CharacterContextProvider>
      <App />
    </CharacterContextProvider>
  </React.StrictMode>
)
