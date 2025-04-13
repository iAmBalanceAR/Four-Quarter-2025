import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"

// Mock data for featured events (in a real app, this would come from the database)
const featuredEvents = [
  {
    id: "1",
    title: "Live Jazz Night",
    date: "2023-04-20",
    time: "8:00 PM",
    location: "Main Stage",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop",
    slug: "live-jazz-night",
  },
  {
    id: "2",
    title: "Rock Band Showcase",
    date: "2023-04-22",
    time: "9:00 PM",
    location: "Main Stage",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1170&auto=format&fit=crop",
    slug: "rock-band-showcase",
  },
  {
    id: "3",
    title: "Electronic Music Festival",
    date: "2023-04-25",
    time: "10:00 PM",
    location: "Main Stage",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1170&auto=format&fit=crop",
    slug: "electronic-music-festival",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Events Section */}
      <section className="py-16 border-secondary/50 border-t">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Upcoming Events</h2>
            <Button asChild variant="ghost" className="gap-1">
              <Link href="/events">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <Link 
                href={`/events/${event.slug}`} 
                key={event.id}
                className="group overflow-hidden rounded-lg border border-border/50 bg-card transition-all duration-300 hover:border-secondary/50 hover:shadow-md hover:bg-black"
              >
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground group-hover:text-secondary ">
                    {event.title}
                  </h3>
                  <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarDays className="mr-2 h-4 w-4 text-secondary" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-secondary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-secondary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-black py-16">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background/90 to-background/70"></div>
        <Image 
          src="https://images.unsplash.com/photo-1566981731417-d4c8e17a9e82?q=80&w=2070&auto=format&fit=crop"
          alt="Four Quarter Bar venue"
          fill
          className="absolute inset-0 z-[-1] object-cover object-center opacity-30"
        />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
            Book Your Next Event With Us
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Looking for a venue for your next band, private party, or corporate event? 
            Four Quarter Bar offers a unique atmosphere and professional sound system.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
} 