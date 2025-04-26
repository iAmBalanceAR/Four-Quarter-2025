'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex h-[80vh] min-h-[600px] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
      
      {/* High-quality hero image from Unsplash */}
      <Image 
        src="/images/hero-band.jpg" 
        alt="Live music at Four Quarter Bar"
        fill
        priority
        className="absolute inset-0 z-[-1] object-cover object-center"
      />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
        
          Four <span className="text-secondary">Quarter</span> Bar
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200">
        Best Bar, Best Bar Food, and Best Bloody Mary in Arkansas.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild size="lg" className="min-w-[150px]">
            <Link href="/events">View Events</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[150px] border-white text-white hover:bg-white/10">
            <Link href="/about">About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 