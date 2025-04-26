import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { TodaysSpecial } from "@/components/todays-special"
import { getEvents } from "@/lib/supabase/api"
import { formatDate } from "@/lib/utils"

// Type for homepage events
type HomepageEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  slug: string;
}

export default async function Home() {
  // Fetch published events from the database
  const allEvents = await getEvents();
  
  // Get current date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Filter for upcoming published events and sort by date
  const upcomingEvents = allEvents
    .filter(event => 
      event.status === "published" && 
      new Date(event.start_date) >= today
    )
    .sort((a, b) => 
      new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    )
    .slice(0, 3); // Take only the next 3 events
  
  // Convert to homepage event format
  const featuredEvents: HomepageEvent[] = upcomingEvents.map(event => ({
    id: event.id,
    title: event.title,
    date: event.start_date,
    time: event.start_date.split('T')[1].substring(0, 5),
    location: event.location || "",
    image: event.image_url || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop",
    slug: event.id, // Using ID as slug
  }));

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
                <div className="relative h-48 w-full overflow-hidden bg-muted min-h-[200px]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
                      <span>{formatDate(event.date)}</span>
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

      {/* Today's Special Section */}
      <TodaysSpecial />
    </div>
  )
} 