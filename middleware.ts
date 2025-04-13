import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Create Supabase client
  const requestUrl = new URL(request.url)
  
  // DEVELOPMENT MODE - bypass auth checks
  const isDevelopment = process.env.NODE_ENV === 'development'
  const bypassAuth = isDevelopment
  
  // Skip middleware for public routes and API routes
  if (
    requestUrl.pathname.startsWith('/_next') ||
    requestUrl.pathname.startsWith('/api') ||
    requestUrl.pathname.startsWith('/static') ||
    requestUrl.pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }
  
  // Check if the route is protected
  if (isProtectedRoute(requestUrl.pathname)) {
    if (bypassAuth) {
      // In development mode, bypass auth checks
      return NextResponse.next()
    }
    
    // Get session from cookie
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
  
    // If user is not signed in and accessing a protected route, redirect to login
    if (!session) {
      const redirectUrl = new URL('/auth/login', requestUrl.origin)
      redirectUrl.searchParams.set('redirectedFrom', requestUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }
  
  // If user is signed in and accessing auth pages, redirect to dashboard
  if (isAuthRoute(requestUrl.pathname)) {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
      return NextResponse.redirect(new URL('/', requestUrl.origin))
    }
  }

  return NextResponse.next()
}

// Check if the route should be protected (require authentication)
function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = [
    '/admin',
    '/profile',
    '/account'
  ]
  
  return protectedRoutes.some(route => pathname.startsWith(route))
}

// Check if the route is an auth route (login, signup, etc.)
function isAuthRoute(pathname: string): boolean {
  const authRoutes = [
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password'
  ]
  
  return authRoutes.includes(pathname)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}