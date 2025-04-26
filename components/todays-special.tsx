"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ZoomIn } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog"

export function TodaysSpecial() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <section className="relative bg-black py-16">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-background/90 to-background/70"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          {/* Image Side */}
          {/* <Dialog open={isOpen} onOpenChange={setIsOpen}> */}
            {/* <DialogTrigger asChild> */}
              <div className="relative h-80 w-full max-w-md overflow-hidden rounded-lg border border-secondary/30 shadow-xl transition-all duration-500 hover:border-secondary/60 hover:shadow-secondary/20 md:w-2/5">
                <Image
                  src="/images/taco-bowl-special.jpg"
                  alt="Today's Special - Taco Bowl"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  priority
                />
                </div>
                  {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <ZoomIn className="relative z-10 h-10 w-10 text-white" />
                  </div>
                </div> */}
              {/* </DialogTrigger> */}
              {/* <DialogOverlay className=" bg-black/10 backdrop-blur-smw-[100%]" /> */}
            {/* 
              <DialogContent className="absolute min-h-[580px] border border-secondary/20 bg-black/95 p-8 mt-[40%] ml-[40%] w-auto top-0 h-auto">
                <div className="relative  h-[450px] sm:h-[500px] md:h-[550px] h-auto w-auto  p-0 ">
                  <Image 
                    src="/images/taco-bowl-special.jpg" 
                    alt="Today's Special - Taco Bowl"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 85vw, 75vw"
                    priority
                  />
                </div>
              </DialogContent>  */}
            {/* </Dialog> */}

          {/* Content Side */}
          <div className="w-full space-y-4 md:w-3/5 md:pl-6 md:space-y-5 md:text-left">
            <div className="text-center md:text-left">
              <h2 className="mb-2 inline-block border-b-2 border-secondary/50 pb-1 text-3xl font-bold tracking-tight text-foreground">
                Today's Special
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Handmade Taco Bowl with Beef, Cheese, Lettuce, Jalapeños, Pico, Corn, 
              Black Beans, Sour Cream, and Cholula.
            </p>
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-3xl font-bold text-secondary">$12.50</span>
              <span className="ml-2 text-sm text-muted-foreground">(Tax included)</span>
            </div>
            <div>
              <Button asChild size="lg" className="group bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="/menu">
                  Order Now
                  <ShoppingBag className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 