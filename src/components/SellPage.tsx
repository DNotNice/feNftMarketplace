import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export const SellPage = ()=>{


    return (
        <div>
            <Card className="">
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
              <Button className='bg-black hover:bg-radiantOrange text-white font-bold py-1 px-10 rounded'> Sell </Button>
            </CardFooter>
            </Card>
        </div>
    )
}