    import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
    import { useWallet } from '@solana/wallet-adapter-react';
    import { useToast } from './ui/use-toast';
    import { useEffect } from 'react';
    export const AppBar =()=>{
    const {connected , publicKey} = useWallet();
        const {toast} = useToast();
            useEffect(()=>{
            if(connected && publicKey)toast({ description : "Connected to address"+publicKey.toBase58()})
                else toast({description:"Disconnected Wallet"})  
            }, [connected])
        return  <div className="flex justify-between border-b pb-2 pt-2 ">
        <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl ml-4">
            MarketSpace
        </div>
        <div className='mr-4'>    
        <WalletMultiButton/>
        </div>
    
    </div>

}