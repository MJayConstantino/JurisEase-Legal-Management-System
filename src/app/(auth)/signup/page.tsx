"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { InputField } from "@/components/ui/input-field"
import { UserIcon, MailIcon, KeyIcon } from "lucide-react"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password) {
      setError("All fields are required")
      return
    }

    console.log("Sign up data:", { name, email, password })
    alert("Account created successfully! Please log in.")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 font-aileron">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-8 text-center font-aileron">
          <h1 className="text-3xl font-bold tracking-tight text-[#2D336B] md:text-4xl">Create an Account</h1>
          <h2 className="text-2xl font-black tracking-tight text-[#1B1E4B] md:text-3xl">Dianson Law Office</h2>
          <p className="mt-2 text-[#2a3563]">Sign up to access our legal services and resources.</p>
        </div>

        <div className="rounded-lg bg-[#e1e5f2] p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputField
                id="name"
                type="text"
                label="Full Name"
                icon={UserIcon}
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <InputField
                id="email"
                type="email"
                label="Email"
                icon={MailIcon}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <InputField
                id="password"
                type="password"
                label="Password"
                icon={KeyIcon}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="flex flex-col space-y-4">
              <Button type="submit" className="bg-[#2a3563] hover:bg-[#1e2547] text-white">
                Sign Up
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-center text-sm">
          <span className="text-[#2a3563]">Already have an account? </span>
          <Link href="/login" className="font-medium text-[#2a3563] hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}

