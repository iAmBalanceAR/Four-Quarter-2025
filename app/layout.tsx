import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/layout/footer"
import { AuthProvider } from "@/lib/supabase/auth/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteNav } from "@/components/navigation/site-nav"
import { Toaster } from "@/components/ui/toaster"
import { NotificationProvider } from "@/components/ui/notification-context"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Four Quarter Bar | Live Music Venue & Nightclub",
  description: "Four Quarter Bar is Little Rock's premier live music venue and nightclub featuring local and national acts in an intimate setting.",
  keywords: ["live music", "nightclub", "concert venue", "Little Rock", "bands", "events", "shows"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NotificationProvider>
            <AuthProvider>
              <SiteNav />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <Toaster />
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 