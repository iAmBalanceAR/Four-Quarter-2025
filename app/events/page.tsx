import { Metadata } from "next"
import { EventCard } from "@/components/events/event-card"
import { getEvents } from "@/lib/supabase/api"
import { Tables } from "@/types/database.types"
import { Event } from "@/types/event"

export const metadata: Metadata = {
  title: "Events | Four Quarter Bar",
  description: "Browse upcoming shows and events at Four Quarter Bar.",
}

// Convert database event to frontend event format
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

export default async function EventsPage() {
  // Fetch all published events
  const allDbEvents = await getEvents();
  
  // Filter published events and sort by date
  const publishedEvents = allDbEvents
    .filter(event => event.status === "published")
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  
  // Get current date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Filter for upcoming events (events that haven't happened yet)
  const upcomingDbEvents = publishedEvents.filter(
    event => new Date(event.start_date) >= today
  );
  
  // Take the next two closest events for the featured section
  const featuredDbEvents = upcomingDbEvents.slice(0, 2);
  
  // Map database events to frontend event format
  const featuredEvents = featuredDbEvents.map(mapDbEventToEvent);
  
  // Filter out featured events from all published events to get upcoming events
  const featuredIds = new Set(featuredDbEvents.map(event => event.id));
  const upcomingEvents = publishedEvents
    .filter(event => !featuredIds.has(event.id))
    .map(mapDbEventToEvent);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Upcoming Shows</h1>
      
      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">This Weekend</h2>
          <div className="space-y-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} variant="featured" />
            ))}
          </div>
        </div>
      )}
      
      {/* Upcoming Events */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Calendar</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
} 