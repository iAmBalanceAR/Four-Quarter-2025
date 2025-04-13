"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useAuth } from "@/lib/supabase/auth/auth-context"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({})
  const [authError, setAuthError] = useState<string | null>(null)
  
  const { signIn, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectedFrom") || "/admin/events"

  const validateForm = () => {
    try {
      loginSchema.parse(formValues)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<LoginFormValues> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormValues] = err.message
          }
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear field error when user types
    if (errors[name as keyof LoginFormValues]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
    // Clear auth error when user types
    if (authError) {
      setAuthError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setAuthError(null)
    
    try {
      await signIn(formValues.email, formValues.password)
      // Redirect will happen automatically through the auth state change
      router.push(redirectTo)
    } catch (error: any) {
      console.error("Login error:", error)
      setAuthError(error.message || "Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-card rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">Enter your credentials to access your account</p>
      </div>
      
      {authError && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {authError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium leading-none">
              Password
            </label>
            <Link 
              href="/auth/forgot-password"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link 
          href="/auth/signup"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
} 