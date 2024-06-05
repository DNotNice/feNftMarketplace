// src/WalletContext.tsx
import  { FC, ReactNode, useMemo } from 'react';
import {
    ConnectionProvider,
    WalletProvider
} from '@solana/wallet-adapter-react';
import '@solana/wallet-adapter-react-ui/styles.css';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';


const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
    // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContext;
