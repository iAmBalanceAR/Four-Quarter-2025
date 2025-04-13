import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | Four Quarter Bar",
  description: "Sign in to your Four Quarter Bar account",
}

export default function LoginPage() {
  return (
    <div className="container flex h-[calc(100vh-200px)] w-full max-w-3xl flex-col items-center justify-center py-12">
      <LoginForm />
    </div>
  )
}