import { useEffect, useState } from "react"
import axios from "axios";
import CarouselCard from "./ui/caraouselcard";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Buffer } from 'buffer';

// Add Buffer to window object
window.Buffer = Buffer;

export const BuyPage = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState<Array<Object>>([]);
  const { publicKey, sendTransaction, signMessage } = useWallet();
  
  // Initialize connection to Solana devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  const handlePayment = async (amount: number) => {
    try {
      if (!publicKey) {
        toast.error("Please connect your wallet first");
        return false;
      }

      // Replace this with your actual recipient wallet address
      const recipientAddress = "GsbwXfJraMomNxBcpR3DBBwh4ZdKGrjwqB1UU2ZpFbGN";

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: amount * LAMPORTS_PER_SOL
        })
      );

      // Get latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      try {
        const signature = await sendTransaction(transaction, connection);
        
        // Wait for transaction confirmation
        const confirmation = await connection.confirmTransaction(signature, 'confirmed');
        
        if (confirmation.value.err) {
          toast.error("Transaction failed!");
          return false;
        }

        toast.success("Payment successful!");
        console.log('Transaction confirmed. Signature:', signature);
        return true;
        
      } catch (error) {
        toast.error("Transaction failed! Please try again.");
        console.error('Error:', error);
        return false;
      }
    } catch (error) {
      toast.error("Error processing payment!");
      console.error('Error:', error);
      return false;
    }
  };

  const signMessageFunction = async (): Promise<boolean> => {
    if (!publicKey) {
      toast.error("Wallet not connected. Please connect your wallet to continue.", { duration: 3000 });
      return false;
    }

    const message = new TextEncoder().encode("Sign into MarketSpace");

    try {
      const signature = await signMessage?.(message);
      if (!signature) {
        toast.error("Failed to sign message");
        return false;
      }

      const response = await axios.post(`${backendURL}signin`, {
        signature,
        publicKey: publicKey.toString(),
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        return true;
      } else {
        toast.error("Failed to authenticate");
        return false;
      }
    } catch (error) {
      console.error("Error during signing or backend call:", error);
      toast.error("An error occurred while signing the message");
      return false;
    }
  };

  const handleBuy = async (id: number , price : number) => {
    console.log(`Purchasing asset with id: ${id}`);
    
    try {
      // First, sign the message
      const signatureReceived = await signMessageFunction();
      if (!signatureReceived) {
        return;
      }

      // If signature successful, proceed with payment
      // Replace 1 with the actual price from your item data
      const paymentSuccess = await handlePayment(price); // 1 SOL as example
      
      if (paymentSuccess) {
        // Handle successful purchase (e.g., update backend, show confirmation)
        toast.success("Purchase completed successfully!");
      }
      
    } catch (error) {
      console.error("Error in handleBuy:", error);
      toast.error("An error occurred during purchase");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendURL}v1/buy/all`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load items");
      }
    };
    fetchData();
  }, []);

  return (
    data.length === 0 ? (
      <h1>Thank You for Supporting MarketSpace</h1>
    ) : (
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {data.map((item: any) => (
          <CarouselCard
            key={item.id}
            carouselData={item.Image_urls}
            cardData={{
              name: item.name,
              description: item.description,
              price: item.price,
              status: item.status,
              id: item.id
            }}
            onBuy={handleBuy}
          />
        ))}
      </div>
    )
  );
};