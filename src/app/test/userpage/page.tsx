"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import UserInfo from "./user-info"
import { createSupabaseClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function UserLoggedIn() {
  const supabase = createSupabaseClient()
  const router = useRouter()

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevent form submission

    try {
      const { error } = await supabase.auth.signOut() // Wait for sign-out to complete [^1][^3]

      if (error) {
        console.error("Error signing out:", error.message)
        router.push("/documents?message=Failed to sign out")
        return
      }

      // Only redirect after successful sign-out
      router.push("/login")
    } catch (error) {
      console.error("Exception during sign out:", error)
      router.push("/documents?message=Failed to sign out")
    }
  }

  const handleMatters = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push("/matters")
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#2D336B]">User Homepage</h1>
        <Button type="button" variant="outline" className="bg-white" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>

      <div className="bg-[#e1e5f2] p-6 rounded-lg shadow">
        <UserInfo />
        <p className="text-[#2a3563]">You have successfully logged in and been redirected to the user page.</p>
        <Button type="button" variant="outline" className="bg-white" onClick={handleMatters }>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}