import { Metadata } from "next"
import { CalendarView } from "@/components/events/calendar-view"
import { allEvents } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Event Calendar | Four Quarter Bar",
  description: "View our upcoming events in calendar format.",
}

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Event Calendar</h1>
      
      <p className="mb-8 text-muted-foreground">
        Browse our upcoming events in a calendar format. Click on any event to view more details.
      </p>
      
      <CalendarView events={allEvents} />
    </div>
  )
} 