import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React from "react"

interface LoginButtonProps extends React.ComponentProps<typeof Button> {
  href: string
  text?: string
  className?: string
}

export default function LoginButton({ href, text, className, ...props }: LoginButtonProps) {
  return (
    <Button
      asChild
      className={cn("bg-[#2a3563] hover:bg-[#1e2547] text-white text-lg px-8 py-3", className)}
      {...props}
    >
      <Link href={href}>{text || "Log In"}</Link>
    </Button>
  )
}

