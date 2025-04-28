"use client"

import { Metadata } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FileText, Home, Info, Calendar, MessageSquare, Save, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// Mock content data for About page
const aboutContent = {
  title: "About Four Quarter Bar",
  description: "Learn about Four Quarter Bar, Little Rock's premier live music venue and nightclub.",
  mainContent: `Four Quarter Bar is Little Rock's premier destination for live music, 
    cold drinks, and unforgettable nights. Located in the heart of downtown, 
    we've been bringing the best local and touring acts to our stage since 2018.
    
    Our venue features a state-of-the-art sound system, spacious dance floor, 
    and a full-service bar with craft beers, signature cocktails, and top-shelf spirits. 
    Whether you're here for an intimate acoustic set or a high-energy rock show, 
    Four Quarter Bar offers an unparalleled live music experience.`,
  mission: `To create a welcoming space where music lovers can gather to experience 
    exceptional live performances while enjoying quality drinks in a vibrant atmosphere. 
    We aim to support both established artists and emerging talent, enriching 
    Little Rock's music scene and cultural landscape.`,
  address: "415 Main St, North Little Rock, AR 72114",
  phone: "(501) 555-5555",
  email: "info@fourquarterbar.com",
  hours: "Mon-Thu: 4pm-12am • Fri-Sat: 4pm-2am • Sun: 4pm-10pm",
}

type ContentPageData = {
  seo_title: string
  seo_description: string
  main_content: string
  images: {
    main?: string
    additional?: string[]
  }
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function ContentAdminPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState<ContentPageData>({
    seo_title: "",
    seo_description: "",
    main_content: "",
    images: {}
  })
  const [originalContent, setOriginalContent] = useState<ContentPageData | null>(null)
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/content?slug=about')
      if (!response.ok) throw new Error('Failed to fetch content')
      const data = await response.json()
      setContent(data || {
        seo_title: "",
        seo_description: "",
        main_content: "",
        images: {}
      })
      setOriginalContent(data)
    } catch (error) {
      console.error('Error fetching content:', error)
      toast({
        title: "Error",
        description: "Failed to load page content. Please try again.",
        variant: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/content?slug=about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })
      
      if (!response.ok) throw new Error('Failed to save content')
      
      const savedData = await response.json()
      setContent(savedData)
      setOriginalContent(savedData)
      
      toast({
        title: "Success",
        description: "Content saved successfully!",
      })
    } catch (error) {
      console.error('Error saving content:', error)
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "error"
      })
    } finally {
      setSaving(false)
    }
  }

  function handleReset() {
    if (originalContent) {
      setContent(originalContent)
      toast({
        description: "Changes reset to last saved version.",
      })
    }
  }

  function handleContentChange(field: keyof ContentPageData, value: string) {
    setContent(prev => ({
      ...prev,
      [field]: value
    }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, slot: 'main' | number) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading((prev) => ({ ...prev, [slot]: true }))
    try {
      const formData = new FormData()
      formData.append('file', file)
      // Use /api/upload for local file uploads (like events section)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }
      const data = await response.json()
      const url = data.url
      console.log('Uploaded image URL:', url)
      setContent((prev) => {
        if (slot === 'main') {
          return { ...prev, images: { ...prev.images, main: url } }
        } else {
          const additional = prev.images.additional ? [...prev.images.additional] : []
          additional[Number(slot)] = url
          return { ...prev, images: { ...prev.images, additional } }
        }
      })
      toast({ title: 'Image Uploaded', description: 'Image uploaded successfully.' })
    } catch (error: any) {
      toast({ title: 'Upload Error', description: error.message, variant: 'error' })
    } finally {
      setUploading((prev) => ({ ...prev, [slot]: false }))
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading content...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleReset}
            disabled={saving}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset Changes</span>
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Saving..." : "Save All Changes"}</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr]">
        {/* Content navigation sidebar */}
        <div className="space-y-2">
          <Button variant="secondary" className="w-full justify-start">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>About Page</span>
            </div>
          </Button>
          {/*
          <Button variant="ghost" className="w-full justify-start">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Home Page</span>
            </div>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Events Page</span>
            </div>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Contact Page</span>
            </div>
          </Button>
          */}
        </div>
        
        {/* Content editing area */}
        <div className="rounded-xl bg-card p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">About Page Content</h2>
          </div>
          
          <div className="space-y-6">
            {/* SEO Section */}
            <div className="space-y-4 rounded-lg bg-muted/30 p-4">
              <h3 className="font-medium">SEO Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input 
                  id="title" 
                  value={content.seo_title} 
                  onChange={(e) => handleContentChange('seo_title', e.target.value)}
                  className="max-w-lg" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Textarea 
                  id="description" 
                  value={content.seo_description} 
                  onChange={(e) => handleContentChange('seo_description', e.target.value)}
                  className="max-w-lg" 
                  rows={3} 
                />
                <p className="text-xs text-muted-foreground">
                  This description appears in search engine results. Keep it under 160 characters.
                </p>
              </div>
            </div>
            
            {/* Main Content Section */}
            <div className="space-y-4">
              <h3 className="font-medium">Page Content</h3>
              <div>
                <ReactQuill
                  value={content.main_content}
                  onChange={val => handleContentChange('main_content', val)}
                  className="bg-background"
                  theme="snow"
                />
              </div>
            </div>
            
            {/* Images Section */}
            <div className="space-y-4">
              <h3 className="font-medium">Images</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="mainImage">Main Image</Label>
                  <div className="aspect-video overflow-hidden rounded-md bg-muted">
                    {content.images?.main ? (
                      <img 
                        src={content.images.main} 
                        alt="Main" 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                          console.error('Failed to load main image:', content.images.main)
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <FileText className="h-8 w-8 text-muted-foreground/70" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="mainImageInput"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'main')}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('mainImageInput')?.click()}
                    disabled={uploading['main']}
                    aria-label="Change main image"
                  >
                    {uploading['main'] ? 'Uploading...' : 'Change Image'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 