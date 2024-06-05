    import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
    import { useWallet } from '@solana/wallet-adapter-react';
    import { useToast } from './ui/use-toast';
    import { useEffect } from 'react';
    export const AppBar =()=>{

        const {toast} = useToast();
        const { connected , publicKey , signMessage} = useWallet();

        async function signAndSend(){
        if(!publicKey) return;
        const message = new TextEncoder().encode("Sign into MarketSpace");
        const signature = await signMessage?.(message);
        }
        useEffect(()=>{
            signAndSend();
            if(connected)toast({ description : "Connected to wallet"})
                else toast({description:"disconnected"})
        }, [publicKey])

        return  <div className="flex justify-between border-b pb-2 pt-2 ">
        <div className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl ml-4">
            MarketSpace
        </div>
        <div className='mr-4'>    
        <WalletMultiButton/>
        </div>
    
    </div>

}