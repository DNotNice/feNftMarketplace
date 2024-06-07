    import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
    import { useWallet } from '@solana/wallet-adapter-react';
    import { useToast } from './ui/use-toast';
    import { useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    export const AppBar =()=>{

        const {toast} = useToast();
        const {connected , publicKey } = useWallet();
        const navigate = useNavigate();
        useEffect(()=>{
            if(connected)toast({ description : "Connected to wallet" + publicKey})
                else toast({description:"disconnected"})
        }, [connected])

        return  <div className="flex justify-between border-b pb-2 pt-2 ">
        <div onClick={()=>{navigate('/')}} className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl ml-4  cursor-pointer">
            MarketSpace
        </div>
        <div className='mr-4'>    
        <WalletMultiButton/>
        </div>
    
    </div>

}