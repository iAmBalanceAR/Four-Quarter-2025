"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useAuth } from "@/lib/supabase/auth/auth-context"

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Partial<SignupFormValues>>({})
  const [authError, setAuthError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  const { signUp, isLoading } = useAuth()
  const router = useRouter()

  const validateForm = () => {
    try {
      signupSchema.parse(formValues)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<SignupFormValues> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof SignupFormValues] = err.message
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
    if (errors[name as keyof SignupFormValues]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
    // Clear auth error when user types
    if (authError) {
      setAuthError(null)
    }
    // Clear success message when user continues typing
    if (successMessage) {
      setSuccessMessage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setAuthError(null)
    setSuccessMessage(null)
    
    try {
      await signUp(formValues.email, formValues.password, formValues.fullName)
      setSuccessMessage("Sign up successful! Please check your email to confirm your account.")
      // Clear form
      setFormValues({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      
      // Redirect to login page after a delay
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    } catch (error: any) {
      setAuthError(error.message || "An error occurred during signup. Please try again.")
      console.error("Signup error:", error)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-card rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground">Enter your information to create an account</p>
      </div>
      
      {authError && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {authError}
        </div>
      )}
      
      {successMessage && (
        <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium leading-none">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formValues.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName}</p>
          )}
        </div>
        
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
          <label htmlFor="password" className="text-sm font-medium leading-none">
            Password
          </label>
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
        
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link 
          href="/auth/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  )
} 