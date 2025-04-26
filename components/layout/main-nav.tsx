'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Music, Calendar } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const routes = [
  {
    href: '/',
    label: 'Home',
    icon: <Music className="h-5 w-5" />
  },
  {
    href: '/events',
    label: 'Upcoming Shows',
    icon: <Calendar className="h-5 w-5" />
  },
  {
    href: '/about',
    label: 'About',
    icon: null
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: null
  }
]

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="flex w-full items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-secondary">
          {/* Replace with your actual logo */}
          <span className="absolute inset-0 flex items-center justify-center font-bold text-secondary-foreground">FQ</span>
        </div>
        <span className="hidden text-xl font-bold text-foreground sm:inline-block">Four Quarter Bar</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex md:items-center md:space-x-8">
        {routes.map((route) => {
          const isActive = pathname === route.href || (route.href !== '/' && pathname.startsWith(route.href))
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                isActive ? "text-secondary font-bold underline underline-offset-4" : "text-foreground/80"
              )}
            >
              {route.label}
            </Link>
          )
        })}
      </div>

      {/* Mobile Navigation Button */}
      <button 
        onClick={toggleMenu}
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "absolute inset-x-0 top-16 z-50 w-full transform overflow-hidden bg-background/95 backdrop-blur transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "flex flex-col h-auto opacity-100" : "h-0 opacity-0"
        )}
      >
        <div className="flex flex-col space-y-4 px-6 py-8">
          {routes.map((route) => {
            const isActive = pathname === route.href || (route.href !== '/' && pathname.startsWith(route.href))
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center space-x-2 border-b border-muted pb-2 text-base font-medium transition-colors hover:text-secondary",
                  isActive ? "text-secondary font-bold underline underline-offset-4" : "text-foreground/80"
                )}
                onClick={() => setIsOpen(false)}
              >
                {route.icon && <span>{route.icon}</span>}
                <span>{route.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
} 