import { Metadata } from "next"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { VenueInfo } from "@/components/venue-info"

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase
    .from("content_pages")
    .select("seo_title, seo_description")
    .eq("slug", "about")
    .single()
  return {
    title: data?.seo_title || "About Us | Four Quarter Bar",
    description: data?.seo_description || "Learn about Four Quarter Bar, Little Rock's premier live music venue and nightclub.",
  }
}

export default async function AboutPage() {
  const supabase = createClient()
  const { data } = await supabase
    .from("content_pages")
    .select("main_content, images")
    .eq("slug", "about")
    .single()

  if (!data) return notFound()

  // Main image (aspect-square, hover effect)
  const mainImage = data.images?.main

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">About Four Quarter Bar</h1>
      <div className="grid gap-12 md:grid-cols-2">
        <div className="rounded-xl bg-card p-8 shadow-lg">
          {/* Main content and mission, rendered as HTML (from React Quill) */}
          <div className="prose prose-lg max-w-none text-muted-foreground [&_h2]:text-secondary [&_h2]:text-xl [&_h2]:font-bold" dangerouslySetInnerHTML={{ __html: data.main_content || "" }} />
        </div>
        <div>
          {mainImage && (
            <div className="relative mb-8 aspect-square overflow-hidden rounded-xl shadow-lg">
              <Image 
                src={mainImage}
                alt="Four Quarter Bar"
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          )}
          <VenueInfo />
        </div>
      </div>
    </div>
  )
} 