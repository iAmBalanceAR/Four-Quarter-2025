'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className={cn("border-t border-muted/20 bg-black", className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">Four Quarter Bar</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>415 Main St., North Little Rock, AR 72201</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary" />
                <a href="tel:+15015555555" className="hover:text-secondary">(501) 555-5555</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <a href="mailto:info@fourquarterbar.com" className="hover:text-secondary">info@fourquarterbar.com</a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/events" className="hover:text-secondary">Upcoming Shows</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for updates on upcoming events
              </p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full rounded-l-md border border-muted bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                  aria-label="Email for newsletter"
                />
                <button 
                  type="button"
                  className="rounded-r-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-muted/20 pt-6 text-center text-xs text-muted-foreground">
          <p>© {currentYear} Four Quarter Bar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 