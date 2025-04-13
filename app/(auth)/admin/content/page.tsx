import { Metadata } from "next"
import Link from "next/link"
import { useState } from "react"
import { FileText, Home, Info, Calendar, MessageSquare, Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Content Management | Four Quarter Bar",
  description: "Manage website content for Four Quarter Bar",
}

// Mock content data for About page
const aboutContent = {
  title: "About Four Quarter Bar",
  description: "Learn about Four Quarter Bar, Little Rock's premier live music venue and nightclub.",
  mainContent: `Four Quarter Bar is Little Rock's premier destination for live music, 
    cold drinks, and unforgettable nights. Located in the heart of downtown, 
    we've been bringing the best local and touring acts to our stage since 2018.
    
    Our venue features a state-of-the-art sound system, spacious dance floor, 
    and a full-service bar with craft beers, signature cocktails, and top-shelf spirits. 
    Whether you're here for an intimate acoustic set or a high-energy rock show, 
    Four Quarter Bar offers an unparalleled live music experience.`,
  mission: `To create a welcoming space where music lovers can gather to experience 
    exceptional live performances while enjoying quality drinks in a vibrant atmosphere. 
    We aim to support both established artists and emerging talent, enriching 
    Little Rock's music scene and cultural landscape.`,
  address: "415 Main St, North Little Rock, AR 72114",
  phone: "(501) 555-5555",
  email: "info@fourquarterbar.com",
  hours: "Mon-Thu: 4pm-12am • Fri-Sat: 4pm-2am • Sun: 4pm-10pm",
}

export default function ContentAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Reset Changes</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>Save All Changes</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr]">
        {/* Content navigation sidebar */}
        <div className="space-y-2">
          <Button variant="secondary" className="w-full justify-start">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>About Page</span>
            </div>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Home Page</span>
            </div>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Events Page</span>
            </div>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Page</span>
            </div>
          </Button>
        </div>
        
        {/* Content editing area */}
        <div className="rounded-xl bg-card p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">About Page Content</h2>
            <Button size="sm">Save Changes</Button>
          </div>
          
          <div className="space-y-6">
            {/* SEO Section */}
            <div className="space-y-4 rounded-lg bg-muted/30 p-4">
              <h3 className="font-medium">SEO Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input 
                  id="title" 
                  defaultValue={aboutContent.title} 
                  className="max-w-lg" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue={aboutContent.description} 
                  className="max-w-lg" 
                  rows={3} 
                />
                <p className="text-xs text-muted-foreground">
                  This description appears in search engine results. Keep it under 160 characters.
                </p>
              </div>
            </div>
            
            {/* Main Content Section */}
            <div className="space-y-4">
              <h3 className="font-medium">Main Content</h3>
              <div className="space-y-2">
                <Label htmlFor="mainContent">About Text</Label>
                <Textarea 
                  id="mainContent" 
                  defaultValue={aboutContent.mainContent} 
                  rows={6} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea 
                  id="mission" 
                  defaultValue={aboutContent.mission} 
                  rows={4} 
                />
              </div>
            </div>
            
            {/* Contact Information Section */}
            <div className="space-y-4">
              <h3 className="font-medium">Contact Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue={aboutContent.address} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue={aboutContent.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={aboutContent.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours</Label>
                  <Input id="hours" defaultValue={aboutContent.hours} />
                </div>
              </div>
            </div>
            
            {/* Images Section */}
            <div className="space-y-4">
              <h3 className="font-medium">Images</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="mainImage">Main Image</Label>
                  <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    <div className="flex h-full w-full items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground/70" />
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Change Image
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image2">Additional Image 1</Label>
                  <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    <div className="flex h-full w-full items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground/70" />
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Change Image
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image3">Additional Image 2</Label>
                  <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    <div className="flex h-full w-full items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground/70" />
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Change Image
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 