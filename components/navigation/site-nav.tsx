'use client'

import Link from 'next/link'
import { MainNav } from '@/components/layout/main-nav'

export function SiteNav() {
  return (
    <header className="border-secondary/50 border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4 py-4">
        <MainNav />
      </div>
    </header>
  )
} 