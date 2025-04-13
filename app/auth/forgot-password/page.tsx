"use client"

import { useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { z } from "zod"
import { useAuth } from "@/lib/supabase/auth/auth-context"

// export const metadata: Metadata = {
//   title: "Forgot Password | Four Quarter Bar",
//   description: "Reset your Four Quarter Bar account password",
// }

const resetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type ResetFormValues = z.infer<typeof resetSchema>

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  const { resetPassword } = useAuth()

  const validateEmail = () => {
    try {
      resetSchema.parse({ email })
      setError(null)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateEmail()) return
    
    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)
    
    try {
      await resetPassword(email)
      setSuccessMessage("Check your email for a password reset link")
      setEmail("")
    } catch (error: any) {
      setError(error.message || "Failed to send reset password email")
      console.error("Password reset error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex h-[calc(100vh-200px)] w-full max-w-3xl flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-6 p-6 bg-card rounded-lg shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">Enter your email to reset your password</p>
        </div>
        
        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError(null)
              }}
              placeholder="name@example.com"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link 
            href="/auth/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
} 