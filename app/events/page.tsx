import { Metadata } from "next"
import { EventCard } from "@/components/events/event-card"
// Import mock data
import { featuredEvents, upcomingEvents } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Events | Four Quarter Bar",
  description: "Browse upcoming shows and events at Four Quarter Bar.",
}

export default function EventsPage() {
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