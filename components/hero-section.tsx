'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import React, { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

interface HeroContent {
  title: string
  subtitle: string
  buttonText: string
}

interface ImagesSliderProps {
  images: string[]
  heroContent: HeroContent[]
  children?: React.ReactNode
  overlay?: boolean
  overlayClassName?: string
  className?: string
  autoplay?: boolean
  direction?: "up" | "down"
}

const ImagesSlider = ({
  images,
  heroContent,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: ImagesSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadedImages, setLoadedImages] = useState<string[]>([])

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    )
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    )
  }

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = () => {
    setLoading(true)
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    })

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[])
        setLoading(false)
      })
      .catch((error) => console.error("Failed to load images", error))
  }
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext()
      } else if (event.key === "ArrowLeft") {
        handlePrevious()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // autoplay
    let interval: any
    if (autoplay) {
      interval = setInterval(() => {
        handleNext()
      }, 6000)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearInterval(interval)
    }
  }, [])

  const slideVariants = {
    initial: {
      opacity: 0,
      scale: 1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  const textVariants = {
    initial: {
      opacity: 0,
      y: -40,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
      },
    },
    exit: {
      opacity: 0,
      y: 40,
      transition: {
        duration: 2,
      },
    },
  }

  const areImagesLoaded = loadedImages.length > 0

  // Multiple fade variants for more interesting transitions
  const fadeVariants = [
    {
      initial: { opacity: 0, scale: 1, filter: "blur(8px)" },
      visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 2, ease: "easeInOut" } },
      exit: { opacity: 0, scale: 1, filter: "blur(8px)", transition: { duration: 2, ease: "easeInOut" } },
    },
    {
      initial: { opacity: 0, scale: 1.05 },
      visible: { opacity: 1, scale: 1, transition: { duration: 2, ease: "easeInOut" } },
      exit: { opacity: 0, scale: 0.95, transition: { duration: 2, ease: "easeInOut" } },
    },
    {
      initial: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 2, ease: "easeInOut" } },
      exit: { opacity: 0, y: -30, transition: { duration: 2, ease: "easeInOut" } },
    },
    {
      initial: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0, transition: { duration: 2, ease: "easeInOut" } },
      exit: { opacity: 0, x: 30, transition: { duration: 2, ease: "easeInOut" } },
    },
  ];

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {areImagesLoaded && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={textVariants}
            className="z-50 flex flex-col justify-center items-center"
          >
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {/* {heroContent[currentIndex].title}  */}
          Four <span className="text-secondary">Quarter</span> Bar
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200">
                {heroContent[currentIndex].subtitle}
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild size="lg" className="min-w-[150px]">
                  <Link href="/events">{heroContent[currentIndex].buttonText}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[150px] border-white text-white hover:bg-white/10">
            <Link href="/about">About Us</Link>
          </Button>
        </div>
      </div>
          </motion.div>
        </AnimatePresence>
      )}
      
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit="exit"
            variants={fadeVariants[currentIndex % fadeVariants.length]}
            className="image h-full w-full absolute inset-0 object-cover object-center"
          />
        </AnimatePresence>
      )}
    </div>
  )
}

const HeroSection = () => {
  const images = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
  ]

  const heroContent = [
    {
      title: "Four Quarter Bar",
      subtitle: "Best Bar, Best Bar Food, and Best Bloody Mary in Arkansas.",
      buttonText: "View Events",
    },
    {
      title: "Four Quarter Bar",
      subtitle: "WINNER: Best New Bar (Arkansas Times)",
      buttonText: "View Events",
    },
    {
      title: "Four Quarter Bar",
      subtitle: "Local Beer on Tap.",
      buttonText: "View Events",
    },
    {
      title: "Four Quarter Bar",
      subtitle: "Live Music Friday and Saturday nights.",
      buttonText: "View Events",
    },
  ]

  return (
    <ImagesSlider 
      className="h-[40rem]" 
      images={images} 
      heroContent={heroContent}
      direction="up"
    />
  )
}

export default HeroSection 