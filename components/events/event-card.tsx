'use client'

import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react"
import { type Event } from "@/types/event"
import { formatDate, formatTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

interface EventCardProps {
  event: Event
  variant?: "default" | "featured"
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const isFeatured = variant === "featured"
  const eventDate = new Date(event.date)
  const month = format(eventDate, 'MMM')
  const day = format(eventDate, 'd')
  
  return (
    <div className={`group relative border border-border/50 bg-card transition-all duration-300 hover:border-secondary/50 hover:shadow-lg ${
      isFeatured ? "lg:flex" : ""
    }`}>
      <div className={`relative overflow-hidden bg-muted ${
        isFeatured ? "lg:h-auto lg:w-2/5 min-h-[300px]" : "h-48 w-full min-h-[200px]"
      }`}>
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="rounded-sm object-cover object-top-left transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-sm bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-sm"></div>
      </div>
      
      {/* Date Badge - moved out of image container */}
      <div className="absolute -left-2 -top-2 z-20 flex h-16 w-16 flex-col items-center justify-center rounded-sm bg-secondary text-center text-secondary-foreground shadow-md border border-black">
        <span className="text-xs font-medium uppercase">{month}</span>
        <span className="text-xl font-bold">{day}</span>
      </div>
      
      <div className={`p-6 ${isFeatured ? "lg:w-3/5" : ""}`}>
        <h3 className={`mb-3 font-bold text-foreground group-hover:text-secondary ${
          isFeatured ? "text-2xl" : "text-xl"
        }`}>
          {event.title}
        </h3>
        
        {isFeatured && event.description && (
          <p className="mb-4 text-muted-foreground">
            {event.description.length > 120 
              ? `${event.description.substring(0, 120)}...` 
              : event.description
            }
          </p>
        )}
        
        <div className="mb-4 flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-secondary" />
            <span>{formatDate(event.date as string)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-secondary" />
            <span>{formatTime(event.startTime)}{event.endTime ? ` - ${formatTime(event.endTime)}` : ""}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-secondary" />
            <span>{event.location}</span>
          </div>
          {event.price && (
            <div className="flex items-center">
              <Ticket className="mr-2 h-4 w-4 text-secondary" />
              <span>{event.price}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="default" size="sm">
            <Link href={`/events/${event.slug}`}>Event Details</Link>
          </Button>
          
          {/* {event.ticketUrl && (
            <Button asChild variant="outline" size="sm">
              <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                Buy Tickets
              </a>
            </Button>
          )} */}
        </div>
      </div>
    </div>
  )
} 