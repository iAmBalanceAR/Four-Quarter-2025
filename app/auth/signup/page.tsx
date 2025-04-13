import { Metadata } from "next"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Sign Up | Four Quarter Bar",
  description: "Create a new Four Quarter Bar account",
}

export default function SignupPage() {
  return (
    <div className="container flex h-[calc(100vh-200px)] w-full max-w-3xl flex-col items-center justify-center py-12">
      <SignupForm />
    </div>
  )
} 