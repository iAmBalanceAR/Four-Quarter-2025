import { Metadata } from "next"
import Link from "next/link"
import { Calendar, MessageSquare, Users, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Admin Dashboard | Four Quarter Bar",
  description: "Admin dashboard for Four Quarter Bar",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Events"
          value="24"
          description="Live events this month"
          icon={<Calendar className="h-6 w-6" />}
          linkHref="/admin/events"
        />
        <DashboardCard
          title="Messages"
          value="18"
          description="Unread contact form messages"
          icon={<MessageSquare className="h-6 w-6" />}
          linkHref="/admin/messages"
        />
        <DashboardCard
          title="Users"
          value="543"
          description="Total registered users"
          icon={<Users className="h-6 w-6" />}
          linkHref="/admin/users"
        />
        <DashboardCard
          title="Content"
          value="8"
          description="Content items to review"
          icon={<FileText className="h-6 w-6" />}
          linkHref="/admin/content"
        />
      </div>
      
      <div className="rounded-xl bg-card p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Welcome to Admin Dashboard</h2>
        <p className="mb-4 text-muted-foreground">
          This is a development version of the admin dashboard. In this version, authentication is bypassed,
          allowing you to explore and test the admin interface without needing to set up a database or user accounts.
        </p>
        <p className="mb-4 text-muted-foreground">
          Use the sidebar to navigate between different sections. You can manage events, content, and social media posts.
          Any changes made here would typically be stored in your Supabase database when connected.
        </p>
        <div className="mt-6 flex justify-end">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/events" className="flex items-center gap-1">
              Manage Events <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-card p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Recent Events</h2>
          <ul className="space-y-2">
            <li className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted/50">
              <span>Summer Music Festival</span>
              <span className="text-sm text-muted-foreground">Aug 15, 2023</span>
            </li>
            <li className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted/50">
              <span>Rock Night with The Amplifiers</span>
              <span className="text-sm text-muted-foreground">Aug 10, 2023</span>
            </li>
            <li className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted/50">
              <span>Jazz Evening with Sarah Davis</span>
              <span className="text-sm text-muted-foreground">Aug 5, 2023</span>
            </li>
          </ul>
          <div className="mt-4 flex justify-end">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/events">View all events</Link>
            </Button>
          </div>
        </div>
        
        <div className="rounded-xl bg-card p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/events/new" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Create New Event</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/content/new" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Add New Content</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/social/new" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Create Social Post</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  linkHref: string
}

function DashboardCard({ title, value, description, icon, linkHref }: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-card p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="rounded-full bg-secondary/10 p-2 text-secondary">
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4">
        <Button asChild variant="ghost" size="sm" className="px-0">
          <Link href={linkHref} className="flex items-center gap-1">
            View Details <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
} 