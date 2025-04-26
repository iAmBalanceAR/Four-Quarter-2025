import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, MapPin, Ticket, User, ArrowLeft, Share2, Facebook, Twitter, Instagram } from "lucide-react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { getEventById, getEvents } from "@/lib/supabase/api"
import { formatDate, formatTime } from "@/lib/utils"
import { Event } from "@/types/event"
import { Tables } from "@/types/database.types"

interface EventPageProps {
  params: {
    slug: string
  }
}

// Function to convert database event to frontend event format
function mapDbEventToEvent(dbEvent: Tables<'events'>): Event {
  return {
    id: dbEvent.id,
    title: dbEvent.title,
    description: dbEvent.description,
    date: dbEvent.start_date,
    startTime: dbEvent.start_date.split('T')[1].substring(0, 5),
    endTime: dbEvent.end_date ? dbEvent.end_date.split('T')[1].substring(0, 5) : undefined,
    location: dbEvent.location || "",
    coverImage: dbEvent.image_url || undefined,
    isPublished: dbEvent.status === "published",
    price: dbEvent.price ? `$${dbEvent.price}` : undefined,
    performerName: dbEvent.title, // Using title as performer name since we don't have separate fields
    performerDescription: dbEvent.notes || undefined,
    ticketUrl: dbEvent.url || undefined,
    socialShareEnabled: false,
    createdAt: dbEvent.created_at,
    updatedAt: dbEvent.updated_at,
    slug: dbEvent.id, // Using id as slug for now
  }
}

// Dynamic metadata
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  try {
    const dbEvent = await getEventById(params.slug)
    const event = mapDbEventToEvent(dbEvent)
    
    return {
      title: `${event.title} | Four Quarter Bar`,
      description: event.description,
      openGraph: {
        title: event.title,
        description: event.description,
        images: event.coverImage ? [event.coverImage] : [],
      },
    }
  } catch (error) {
    return {
      title: "Event Not Found | Four Quarter Bar",
    }
  }
}

export default async function EventPage({ params }: EventPageProps) {
  try {
    const dbEvent = await getEventById(params.slug)
    const event = mapDbEventToEvent(dbEvent)
    
    if (!event.isPublished) {
      notFound()
    }
    
    return (
      <div className="bg-background pb-16">
        {/* Hero Image with Title */}
        <div className="relative h-[50vh] min-h-[400px] w-full bg-muted md:h-[60vh]">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover object-center"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-md">
                  {event.title}
                </h1>
                
                {event.performerName && (
                  <div className="mt-4 flex items-center text-xl text-secondary drop-shadow-md">
                    <User className="mr-2 h-6 w-6" />
                    <span className="font-medium">{event.performerName}</span>
                  </div>
                )}
                
                <div className="mt-4 flex flex-wrap gap-4 text-white">
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 h-5 w-5 text-secondary" />
                    <span>{formatDate(event.date as string)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-secondary" />
                    <span>
                      {formatTime(event.startTime)}
                      {event.endTime && ` - ${formatTime(event.endTime)}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mt-6">
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href="/events">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mt-6 text-muted-foreground">
                <p className="whitespace-pre-line text-base">{event.description}</p>
              </div>
              
              {event.performerDescription && (
                <div className="mt-8">
                  <h2 className="mb-3 text-xl font-bold">About the Performer</h2>
                  <p className="text-muted-foreground">{event.performerDescription}</p>
                </div>
              )}
              
              {/* Social Sharing */}
              {event.socialShareEnabled && (
                <div className="mt-8">
                  <h2 className="mb-3 text-xl font-bold">Share This Event</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" aria-label="Share on Facebook">
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" aria-label="Share on Twitter">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" aria-label="Share on Instagram">
                      <Instagram className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" aria-label="Share via link">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-xl font-bold">Event Details</h2>
                
                <div className="mt-4 flex flex-col space-y-4">
                  <div className="flex items-start">
                    <CalendarDays className="mr-3 mt-1 h-5 w-5 text-secondary" />
                    <div>
                      <h3 className="font-medium">Date</h3>
                      <p className="text-muted-foreground">{formatDate(event.date as string)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="mr-3 mt-1 h-5 w-5 text-secondary" />
                    <div>
                      <h3 className="font-medium">Time</h3>
                      <p className="text-muted-foreground">
                        {formatTime(event.startTime)}
                        {event.endTime && ` - ${formatTime(event.endTime)}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="mr-3 mt-1 h-5 w-5 text-secondary" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  
                  {event.price && (
                    <div className="flex items-start">
                      <Ticket className="mr-3 mt-1 h-5 w-5 text-secondary" />
                      <div>
                        <h3 className="font-medium">Price</h3>
                        <p className="text-muted-foreground">{event.price}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.ticketUrl && (
                    <Button asChild variant="default" className="w-full mt-2">
                      <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                        Buy Tickets
                      </a>
                    </Button>
                  )}
                </div>
                
                {event.coverImage && (
                  <div className="mt-6 border-t border-border pt-4">
                    <h2 className="text-xl font-bold mb-3">Event Flyer</h2>
                    <div className="relative w-full h-auto max-h-[400px] overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={event.coverImage}
                        alt={`Promo flyer for ${event.title}`}
                        width={300}
                        height={400}
                        className="object-contain w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
} 