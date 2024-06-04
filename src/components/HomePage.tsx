import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
export const HomePage = ()=> {
    return <div className='flex justify-center items-center h-screen'>
        
      <div className='flex flex-col md:flex-row justify-around max-w-screen-lg w-full px-4'>
      <div> 
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome to  MarketSpace</h1>
        </div>
          <Card className='w-full md:w-[350px] mx-5'>
            <CardHeader>
              <CardTitle> Sell </CardTitle>
              <CardDescription> Sell assets here</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className='grid w-full gap-4'>
                  <div className='flex flex-col space-y-1.5'>
                    
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Button className='bg-black hover:bg-radiantOrange text-white font-bold py-1 px-10 rounded'> Sell assets </Button>
            </CardFooter>
          </Card>
          <Card className='w-full md:w-[350px]'>
            <CardHeader>
              <CardTitle> Buy </CardTitle>
              <CardDescription> Buy assets here</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className='grid w-full gap-4'>
                  <div className='flex flex-col space-y-1.5'>
                   
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Button className='bg-black hover:bg-radiantOrange text-white font-bold py-1 px-10 rounded'> Buy assets </Button>
            </CardFooter>
          </Card>
      </div>
    </div>   
   
}
