'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu as MenuIcon, X, Music, Calendar, Utensils, Info, Mail } from 'lucide-react'
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
    href: '/menu',
    label: 'Menu',
    icon: <Utensils className="h-5 w-5" />
  },
  {
    href: '/about',
    label: 'About',
    icon: <Info className="h-5 w-5" />
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: <Mail className="h-5 w-5" />
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
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#FFA726] hover:underline hover:underline-offset-4 focus:text-[#FFA726]  active:text-[#FFA726]",
                isActive ? "text-[#FFA726] font-bold u" : "text-foreground/80"
              )}
            >
              {route.icon && <span>{route.icon}</span>}
              <span>{route.label}</span>
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
          <MenuIcon className="h-6 w-6" />
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
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#FFA726] hover:underline hover:underline-offset-4 focus:text-[#FFA726] focus:underline-offset-4 active:text-[#FFA726]",
                  isActive ? "text-[#FFA726] font-bold " : "text-foreground/80"
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