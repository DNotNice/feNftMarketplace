import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { BackgroundBeams } from './ui/background-beams';
export const  HomePage = ()=> {

    const navigate = useNavigate();
    return (
      <main className="flex min-h-screen flex-col items-center justify-center relative">
        <div className="max-w-5xl mx-auto p-4 z-20">
          <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-8">
            Welcome to minTunes
          </h1>
          
          <div className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center mb-8">
            <p>Create NFT&apos;s with your voice</p>
            <p>
              Just record yourself singing your favourite song, a movie dialogue or just how you are feeling today
              <br />
              we&apos;ll create an image for that and list at our marketplace.
              <br />
              We won&apos;t judge you, trust me 🤗
            </p>
          </div>
  
          <div className="flex flex-col md:flex-row justify-around gap-6 mt-8">
            <Card className="w-full md:w-[350px]">
              <CardHeader>
                <CardTitle>Record</CardTitle>
                <CardDescription>Create your voice NFT</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-500 text-sm">
                  Record your voice and turn it into a unique NFT artwork
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  onClick={() => navigate('/sell')}
                  className="bg-black hover:bg-neutral-800 text-white font-bold py-2 px-10 rounded"
                >
                  Start Recording
                </Button>
              </CardFooter>
            </Card>
  
            <Card className="w-full md:w-[350px]">
              <CardHeader>
                <CardTitle>Marketplace</CardTitle>
                <CardDescription>Buy & Sell NFTs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-500 text-sm">
                  Browse and trade voice NFTs in our marketplace
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  onClick={() => navigate('/buy')}
                  className="bg-black hover:bg-neutral-800 text-white font-bold py-2 px-10 rounded"
                >
                  Enter Marketplace
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
  
        <div className="absolute inset-0 z-10">
          <BackgroundBeams />
        </div>
      </main>
    );
  };
