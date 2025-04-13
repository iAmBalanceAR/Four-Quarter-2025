import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Contact Us | Four Quarter Bar",
  description: "Get in touch with Four Quarter Bar for bookings, inquiries, or general information.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Contact Us</h1>
      
      <div className="grid gap-12 md:grid-cols-2">
        <div className="rounded-xl bg-card p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-secondary">Get in Touch</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Have questions about upcoming events, interested in booking our venue, 
            or want to join our team? Fill out the form below or reach out to us directly.
          </p>
          
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Your email" 
                  className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
              <Input 
                id="subject" 
                placeholder="What is this regarding?" 
                className="border-secondary/20 bg-background/50 focus-visible:ring-secondary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Tell us how we can help" 
                className="min-h-[150px] border-secondary/20 bg-background/50 focus-visible:ring-secondary" 
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 md:w-auto"
            >
              Send Message
            </Button>
          </form>
        </div>
        
        <div>
          <div className="relative mb-8 aspect-square overflow-hidden rounded-xl shadow-lg">
            <Image 
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1074&auto=format&fit=crop" 
              alt="Four Quarter Bar exterior"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          <div className="rounded-xl bg-card p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-secondary">Venue Information</h2>
            <div className="mb-6 space-y-4 text-muted-foreground">
              <div className="flex items-center gap-3 rounded-md bg-background/20 p-3 transition-colors hover:bg-background/30">
                <MapPin className="h-6 w-6 text-secondary" />
                <span>415 Main St, North Little Rock, AR 72114</span>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-background/20 p-3 transition-colors hover:bg-background/30">
                <Phone className="h-6 w-6 text-secondary" />
                <a href="tel:+15015555555" className="hover:text-secondary">(501) 555-5555</a>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-background/20 p-3 transition-colors hover:bg-background/30">
                <Mail className="h-6 w-6 text-secondary" />
                <a href="mailto:info@fourquarterbar.com" className="hover:text-secondary">info@fourquarterbar.com</a>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-background/20 p-3 transition-colors hover:bg-background/30">
                <Clock className="h-6 w-6 text-secondary" />
                <span>Mon-Thu: 4pm-12am • Fri-Sat: 4pm-2am • Sun: 4pm-10pm</span>
              </div>
            </div>
            
            <h2 className="mb-4 text-2xl font-bold text-secondary">Follow Us</h2>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background/20 text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background/20 text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background/20 text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 