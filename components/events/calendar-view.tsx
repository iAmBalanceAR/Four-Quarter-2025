'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { Button } from '@/components/ui/button'
import { type Event } from '@/types/event'
import { cn } from '@/lib/utils'

interface CalendarViewProps {
  events: Event[]
}

export function CalendarView({ events }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Get events for the current month
  const eventsInMonth = events.filter((event) => {
    const eventDate = new Date(event.date)
    return isSameMonth(eventDate, currentMonth)
  })
  
  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }
  
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }
  
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border/50 bg-card p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePreviousMonth}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Weekday headers */}
      <div className="mb-4 grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: monthStart.getDay() }).map((_, index) => (
          <div 
            key={`empty-start-${index}`} 
            className="h-20 border border-border/10 bg-muted/20 p-1"
          ></div>
        ))}
        
        {/* Days of the month */}
        {monthDays.map((day) => {
          // Find events for this day
          const dayEvents = eventsInMonth.filter((event) => {
            const eventDate = new Date(event.date)
            return isSameDay(eventDate, day)
          })
          
          const isToday = isSameDay(day, new Date())
          
          return (
            <div 
              key={day.toString()}
              className={cn(
                "relative h-20 overflow-hidden border p-1",
                isToday ? "border-secondary/50 bg-secondary/5" : "border-border/10 hover:bg-muted/10"
              )}
            >
              <div className={cn(
                "mb-1 text-right text-sm font-medium",
                isToday ? "text-secondary" : "text-foreground"
              )}>
                {format(day, 'd')}
              </div>
              
              <div className="flex flex-col space-y-1 overflow-y-auto text-xs">
                {dayEvents.slice(0, 2).map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="truncate rounded bg-primary/10 px-1 py-0.5 text-xs hover:bg-primary/20"
                    title={event.title}
                  >
                    {event.title}
                  </Link>
                ))}
                
                {dayEvents.length > 2 && (
                  <div className="text-center text-xs text-muted-foreground">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
        
        {/* Empty cells for days after the last of the month */}
        {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
          <div 
            key={`empty-end-${index}`} 
            className="h-20 border border-border/10 bg-muted/20 p-1"
          ></div>
        ))}
      </div>
    </div>
  )
} 