import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export function VenueInfo() {
  return (
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
  )
} 