import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import WalletContext from './components/WalletContext.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { ConnectionProvider } from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConnectionProvider endpoint={clusterApiUrl('devnet')}>

    <WalletModalProvider>
    <WalletContext>    
    <App />
    <Toaster/>
    </WalletContext>
    </WalletModalProvider>
    </ConnectionProvider>
  </React.StrictMode>,
)
