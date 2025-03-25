'use client'
import { LoginPage } from '@/components/auth/Login'
import { useRouter } from 'next/navigation'
import Header from "@/components/homepage/header"

export default function Login() {
  const router = useRouter()
  // Handle successful login
  const handleLoginSuccess = () => {
    router.push('/loggedIn')
  }

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#" },
    { label: "About", href: "#" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">

    <Header logoText="Dianson Law Office" navItems={navItems} />
    <LoginPage
      onLoginSuccess={handleLoginSuccess}
      onGoogleLoginSuccess={handleLoginSuccess}
    />
    </div>
  )
}
