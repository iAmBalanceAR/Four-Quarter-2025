"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { CalendarPlus, Edit, MoreHorizontal, Search, Trash2, ArrowLeft, Save, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getEvents, createEvent, updateEvent, deleteEvent, fallbackCreateEvent } from "@/lib/supabase/api"
import { adminCreateEvent, adminUpdateEvent, adminDeleteEvent } from "@/lib/supabase/admin"
import { formatDate, formatTime } from "@/lib/utils"
import { Database } from "@/types/database.types"
import { Tables } from "@/types/database.types"
import { useToast } from "@/components/ui/use-toast"
import { useNotification } from "@/components/ui/notification-context"

// Type for event with notes
type EventWithNotes = Tables<'events'> & {
  notes?: string | null
  status: string
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<EventWithNotes[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddEventForm, setShowAddEventForm] = useState(false)
  const [editingEventId, setEditingEventId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()
  const [uploadingImage, setUploadingImage] = useState(false)
  const { showNotification } = useNotification()

  // Function to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const [newEvent, setNewEvent] = useState<{
    title: string
    description: string
    start_date: string
    end_date: string
    location: string
    image_url: string
    price: string
    url: string
    artist: string
    time: string
    imageFile?: File | null
    status: string
  }>({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    image_url: "",
    price: "",
    url: "",
    artist: "",
    time: "19:00", // Default time
    imageFile: null,
    status: "draft"
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    setLoading(true)
    try {
      const data = await getEvents()
      setEvents(data || [])
    } catch (error) {
      console.error("Error fetching events:", error)
      toast({
        title: "Error",
        description: "Failed to load events. Please try again later.",
        variant: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setNewEvent(prev => ({
        ...prev,
        [name]: checked
      }))
    } else if (type === 'file') {
      const files = (e.target as HTMLInputElement).files
      if (files && files.length > 0) {
        setNewEvent(prev => ({
          ...prev,
          imageFile: files[0]
        }))
      }
    } else {
      setNewEvent(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageUpload = async () => {
    if (!newEvent.imageFile) return null

    setUploadingImage(true)
    try {
      // Simulate image upload - in a real app, you would upload to a storage service like Supabase Storage
      // This is just a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000)) // simulate network request
      
      // Create a fake URL for demo purposes
      const imageUrl = URL.createObjectURL(newEvent.imageFile)
      
      toast({
        title: "Success",
        description: "Image uploaded successfully!"
      })
      
      setNewEvent(prev => ({
        ...prev,
        image_url: imageUrl
      }))
      
      return imageUrl
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "error"
      })
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Handle image upload if a file was selected
      let finalImageUrl = newEvent.image_url
      if (newEvent.imageFile) {
        const uploadedUrl = await handleImageUpload()
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl
        }
      }
      
      // Prepare event data for submission - only use fields that exist in the database
      const eventData = {
        title: newEvent.title,
        description: newEvent.description,
        start_date: new Date(`${newEvent.start_date}T${newEvent.time}`).toISOString(),
        end_date: newEvent.end_date ? new Date(`${newEvent.end_date}T${newEvent.time}`).toISOString() : null,
        location: newEvent.location,
        image_url: finalImageUrl || null,
        price: newEvent.price ? parseFloat(newEvent.price) : null,
        url: newEvent.url || null,
        notes: newEvent.artist, // Use artist field for notes
        status: newEvent.status // Use the status field directly now
      }

      console.log('Submitting event data:', eventData);

      try {
        if (editingEventId) {
          // Update existing event using admin function
          await adminUpdateEvent(editingEventId, eventData)
        } else {
          // Create new event using admin function
          await adminCreateEvent(eventData)
        }
      } catch (adminError) {
        console.error("Admin method failed:", adminError)
        
        // Try fallback method if admin method fails
        if (editingEventId) {
          await updateEvent(editingEventId, eventData)
        } else {
          await fallbackCreateEvent(eventData)
        }
      }

      showNotification({
        title: editingEventId ? "Event Updated" : "Event Created",
        description: editingEventId
          ? "Your event has been successfully updated."
          : "Your new event has been successfully created.",
        variant: "success",
        confirmLabel: "OK"
      })
      
      // Reset form and fetch updated events
      setShowAddEventForm(false)
      setEditingEventId(null)
      resetEventForm()
      fetchEvents()
      scrollToTop()
    } catch (error) {
      console.error("Error saving event:", error)
      showNotification({
        title: "Error",
        description: `Failed to save event: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
        confirmLabel: "OK"
      })
    }
  }

  const handleDeleteEvent = async (id: string) => {
    showNotification({
      title: "Delete Event",
      description: "Are you sure you want to delete this event? This action cannot be undone.",
      variant: "destructive",
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          // Try admin delete first
          await adminDeleteEvent(id);
          toast({
            title: "Success",
            description: "Event deleted successfully!"
          });
          fetchEvents();
        } catch (error) {
          console.error("Error deleting event:", error);
          
          // If admin delete fails, try regular delete as fallback
          try {
            await deleteEvent(id);
            toast({
              title: "Success",
              description: "Event deleted successfully!"
            });
            fetchEvents();
          } catch (fallbackError) {
            console.error("Fallback delete also failed:", fallbackError);
            toast({
              title: "Error",
              description: "Failed to delete event. Please try again.",
              variant: "error"
            });
          }
        }
      }
    });
  }

  const handleEditEvent = (event: EventWithNotes) => {
    // Extract time from ISO date string
    const startDate = new Date(event.start_date)
    const timeString = startDate.toTimeString().slice(0, 5) // Get HH:MM

    setNewEvent({
      title: event.title,
      description: event.description,
      start_date: event.start_date.split('T')[0], // Get YYYY-MM-DD part
      end_date: event.end_date ? event.end_date.split('T')[0] : "",
      location: event.location || "",
      image_url: event.image_url || "",
      price: event.price ? event.price.toString() : "",
      url: event.url || "",
      artist: event.notes || "", // Use notes field instead of artists.name
      time: timeString,
      imageFile: null,
      status: event.status || "draft" // Default to draft if no status
    })
    
    setEditingEventId(event.id)
    setShowAddEventForm(true)
  }

  const resetEventForm = () => {
    setNewEvent({
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      location: "",
      image_url: "",
      price: "",
      url: "",
      artist: "",
      time: "19:00",
      imageFile: null,
      status: "draft"
    })
  }

  const filteredEvents = events.filter(event => {
    // Filter by search query
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by status (published/draft/incomplete)
    let matchesStatus = true;
    if (statusFilter === "published") {
      matchesStatus = event.status === "published";
    } else if (statusFilter === "draft") {
      matchesStatus = event.status === "draft";
    } else if (statusFilter === "incomplete") {
      matchesStatus = event.status === "incomplete";
    }

    return matchesSearch && matchesStatus;
  });

  // Get event status - now simply returns the status field
  function getEventStatus(event: EventWithNotes): string {
    return event.status || "draft";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events Management</h1>
        {!showAddEventForm ? (
          <Button onClick={() => setShowAddEventForm(true)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Add New Event
          </Button>
        ) : (
          <Button variant="outline" onClick={() => {
            setShowAddEventForm(false);
            setEditingEventId(null);
            resetEventForm();
            scrollToTop();
          }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        )}
      </div>
      
      {!showAddEventForm ? (
        // Events Table View
        <div className="rounded-xl bg-card p-6 shadow-md">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="border-secondary/20 bg-background/50 focus-visible:ring-secondary pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="status-filter" className="text-sm font-medium whitespace-nowrap">
                  Status:
                </Label>
                <select
                  id="status-filter"
                  className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="published">Published</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <p>Loading events...</p>
            </div>
          ) : (
            <>
              {filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="mb-4 text-muted-foreground">No events found</p>
                  <Button onClick={() => setShowAddEventForm(true)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Add Your First Event
                  </Button>
                </div>
              ) : (
                <div className="overflow-auto rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Artist</th>
                        <th className="px-4 py-3 text-left font-medium">Date & Time</th>
                        <th className="px-4 py-3 text-left font-medium">Notes</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-left font-medium">Price</th>
                        <th className="px-4 py-3 text-center font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event) => (
                        <tr key={event.id} className="border-b">
                          <td className="px-4 py-3">
                            <div className="font-medium">{event.title}</div>
                            <div className="max-w-xs truncate text-xs text-muted-foreground">
                              {event.description}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              {formatDate(event.start_date)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatTime(event.start_date.split('T')[1].substring(0, 5))}
                            </div>
                          </td>
                          <td className="px-4 py-3">{event.notes || "No notes"}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              event.status === "published"
                                ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300" 
                                : event.status === "incomplete" 
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300"
                            }`}>
                              {event.status === "published" 
                                ? "Published" 
                                : event.status === "incomplete" 
                                  ? "Incomplete" 
                                  : "Draft"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {event.price ? `$${event.price}` : "Free"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditEvent(event)}
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteEvent(event.id)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredEvents.length}</strong> of <strong>{events.length}</strong> events
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        // Add/Edit Event Form View
        <div className="rounded-xl bg-card p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-bold text-secondary">
            {editingEventId ? "Edit Event" : "Add New Event"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="font-medium text-secondary">Event Information</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Artist*</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    placeholder="Artist or Band Name"
                    className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="artist" className="text-sm font-medium">Notes</Label>
                  <Input 
                    id="artist" 
                    name="artist"
                    value={newEvent.artist}
                    onChange={handleInputChange}
                    placeholder="Additional information"
                    className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Description*</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Describe the event"
                  className="min-h-64 border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                  required
                />
              </div>
              
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="start_date" className="text-sm font-medium">Date*</Label>
                  <Input 
                    id="start_date" 
                    name="start_date"
                    type="date" 
                    value={newEvent.start_date}
                    onChange={handleInputChange}
                    className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium">Time*</Label>
                  <Input 
                    id="time" 
                    name="time"
                    type="time" 
                    value={newEvent.time}
                    onChange={handleInputChange}
                    className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                    required
                  />
                </div>
                
                <div className="space-y-2 flex-1">
                  <Label htmlFor="status" className="text-sm font-medium">Status*</Label>
                  <select
                    id="status"
                    name="status"
                    value={newEvent.status}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewEvent(prev => ({
                        ...prev,
                        status: value,
                      }));
                    }}
                    className="w-full rounded-sm border border-secondary/20 bg-card px-3 py-2 text-sm focus:border-secondary focus:ring-1 focus:ring-secondary"
                    required
                  >
                    <option value="draft">Draft</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">Location*</Label>
                  <Input 
                    id="location" 
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    placeholder="Event location"
                    className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">Price ($)</Label>
                  <Input 
                    id="price" 
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newEvent.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                  />
                </div>
              </div>
              
              {/* Hidden fields for URL and image URL */}
              <input
                type="hidden"
                id="url"
                name="url"
                value={newEvent.url || ""}
                onChange={handleInputChange}
              />
              <input
                type="hidden"
                id="image_url"
                name="image_url"
                value={newEvent.image_url || ""}
                onChange={handleInputChange}
              />
              
              {/* Image Upload Section */}
              <div className="mt-4 space-y-4 rounded-lg border border-secondary/20 bg-background/50 p-4">
                <h3 className="font-medium text-secondary">Event Image</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="imageFile" className="text-sm font-medium">Upload Image</Label>
                  <Input 
                    id="imageFile" 
                    name="imageFile"
                    type="file" 
                    accept="image/*"
                    onChange={handleInputChange}
                    className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Select an image file to upload (.jpg, .png, .gif)
                  </p>
                </div>
                
                {newEvent.imageFile && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">Selected file: {newEvent.imageFile.name}</p>
                  </div>
                )}
                
                {newEvent.image_url && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Current Image:</Label>
                    <div className="mt-2 flex justify-center">
                      <div className="w-1/5 overflow-hidden rounded-md border border-border bg-muted">
                        <img 
                          src={newEvent.image_url} 
                          alt="Event preview" 
                          className="h-auto w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleImageUpload}
                    disabled={!newEvent.imageFile || uploadingImage}
                    className="border-secondary/20 hover:bg-secondary/10"
                  >
                    {uploadingImage ? (
                      <>Uploading...</>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowAddEventForm(false);
                  setEditingEventId(null);
                  resetEventForm();
                  scrollToTop();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Save className="mr-2 h-4 w-4" />
                {editingEventId ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
} 