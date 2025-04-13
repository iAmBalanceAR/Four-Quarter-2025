"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Home, Calendar, Settings, FileText, MessageSquare, Users, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModalProvider } from "@/components/admin/modal-context"
import { Modal } from "@/components/admin/modal"
import { useModal } from "@/components/admin/modal-context"
import { Toaster } from "@/components/ui/toaster"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthCheck>
      <ModalProvider>
        <div className="flex min-h-screen flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="bg-card text-card-foreground w-full border-r md:w-64">
            <div className="flex h-16 items-center border-b px-6">
              <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/admin" className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/admin/events" className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>Events</span>
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/admin/content" className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      <span>Content</span>
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/admin/social" className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Social</span>
                    </Link>
                  </Button>
                </li>
                <li className="pt-4">
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/" className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>View Site</span>
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/admin/settings" className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                  </Button>
                </li>
                <li className="pt-4">
                  <LogoutButton />
                </li>
              </ul>
            </nav>
          </aside>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto p-8">
            {children}
          </main>
        </div>
        <Modal />
        <Toaster />
      </ModalProvider>
    </AuthCheck>
  )
}

// Logout button that uses modal for confirmation
function LogoutButton() {
  const { openConfirmation } = useModal()

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    window.location.reload()
  }

  const confirmLogout = () => {
    openConfirmation(
      "Confirm Logout", 
      "Are you sure you want to log out?", 
      handleLogout,
      { confirmLabel: "Logout", cancelLabel: "Cancel" }
    )
  }

  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start text-destructive hover:text-destructive"
      onClick={confirmLogout}
    >
      <div className="flex items-center gap-2">
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </div>
    </Button>
  )
}

function AuthCheck({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if admin is authenticated
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth === 'admin:admin') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const username = (document.getElementById('username') as HTMLInputElement).value
    const password = (document.getElementById('password') as HTMLInputElement).value

    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('adminAuth', 'admin:admin')
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials. Use admin/admin to login.')
    }
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="w-full max-w-md rounded-xl bg-card p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="admin"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="admin"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/90"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Use username: <strong>admin</strong> and password: <strong>admin</strong></p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 