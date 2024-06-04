import './App.css'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
function App() {

  return (
          <div className='bg-zinc-950 dark:bg-white flex jusitfy-center items-center h-screen '>
          <div className='flex justify-around max w-screen-lg w-full px-5'>

          <div className=' rounded-lg shadow'>

      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle> Sell </CardTitle>
          <CardDescription> Sell your assests here</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Input id="name" placeholder='name of your proj'/>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex display-flex justify-center'>
        <Button className='bg-black hover:bg-radiantOrange text-white font-bold py-1 px-10 rounded flex '> Sell assests </Button>
        </CardFooter>
      </Card>

        </div>
        
        <div className=' rounded-lg shadow'>

<Card className='w-[350px]'>
  <CardHeader>
    <CardTitle> Buy </CardTitle>
    <CardDescription> Buy assests here</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className='grid w-full items center gap-4'>
        <div className='flex flex-col space-y-1.5'>
          <Input id="name" placeholder='name of your proj'/>
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className='flex display-flex justify-center'>
  <Button className='bg-black hover:bg-radiantOrange text-white font-bold py-1 px-10 rounded flex '> Buy assests </Button>
  </CardFooter>
</Card>

  </div>

      
             </div>
             </div>
    
    
  )
}

export default App
