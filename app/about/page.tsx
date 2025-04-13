import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us | Four Quarter Bar",
  description: "Learn about Four Quarter Bar, Little Rock's premier live music venue and nightclub.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">About Four Quarter Bar</h1>
      
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="mb-6 text-lg text-muted-foreground">
            Four Quarter Bar is Little Rock's premier destination for live music, 
            cold drinks, and unforgettable nights. Located in the heart of downtown, 
            we've been bringing the best local and touring acts to our stage since 2018.
          </p>
          
          <p className="mb-6 text-lg text-muted-foreground">
            Our venue features a state-of-the-art sound system, spacious dance floor, 
            and a full-service bar with craft beers, signature cocktails, and top-shelf spirits. 
            Whether you're here for an intimate acoustic set or a high-energy rock show, 
            Four Quarter Bar offers an unparalleled live music experience.
          </p>
          
          <h2 className="mb-4 mt-8 text-2xl font-bold">Our Mission</h2>
          <p className="text-muted-foreground">
            To create a welcoming space where music lovers can gather to experience 
            exceptional live performances while enjoying quality drinks in a vibrant atmosphere. 
            We aim to support both established artists and emerging talent, enriching 
            Little Rock's music scene and cultural landscape.
          </p>
          
          <h2 className="mb-4 mt-8 text-2xl font-bold">Visit Us</h2>
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-secondary" />
              <span>415 Main St, North Little Rock, AR 72114</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-secondary" />
              <span>(501) 555-5555</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-secondary" />
              <span>info@fourquarterbar.com</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-secondary" />
              <span>Mon-Thu: 4pm-12am • Fri-Sat: 4pm-2am • Sun: 4pm-10pm</span>
            </div>
          </div>
          
          <div className="mt-8 space-x-4">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/events">View Events</Link>
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image 
              src="https://images.unsplash.com/photo-1566981731417-d4c8e17a9e82?q=80&w=2070&auto=format&fit=crop" 
              alt="Four Quarter Bar interior"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop" 
                alt="Live performance at Four Quarter Bar"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image 
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop" 
                alt="Bar area at Four Quarter Bar"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 