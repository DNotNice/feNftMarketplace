/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wA0CfkyMo5R
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <Card className="w-full max-w-md rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <Carousel className="h-64 sm:h-80">
          <CarouselContent>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                alt="Product Image"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                alt="Product Image"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                alt="Product Image"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/75 rounded-full p-2 cursor-pointer">
            <ChevronLeftIcon className="w-6 h-6" />
          </CarouselPrevious>
          <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/75 rounded-full p-2 cursor-pointer">
            <ChevronRightIcon className="w-6 h-6" />
          </CarouselNext>
        </Carousel>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Cozy Mountain Retreat</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Escape to our serene mountain oasis, where nature and comfort converge.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">$199</div>
          <Button size="lg">Buy Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ChevronLeftIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}