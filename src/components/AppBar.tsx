    import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
    import { useWallet } from '@solana/wallet-adapter-react';
    import { useToast } from './ui/use-toast';
    import { useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    export const AppBar =()=>{

        const {toast} = useToast();
        const {connected} = useWallet();
        const navigate = useNavigate();
        useEffect(()=>{
            if(connected)toast({ description : "Wallet Connected"})
                else toast({description:"Wallet Disconnected"})
        }, [connected])

        return (
            <div className="flex justify-between items-center border-b pb-2 pt-2 px-4 sm:px-6 lg:px-8">
            <div
              onClick={() => { navigate('/') }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight cursor-pointer"
            >
              MarketSpace
            </div>
            <div className='mr-4'>
              <WalletMultiButton />
            </div>
          </div>
        );

}