"use client"

import { useEffect, useState } from "react"
import { createSupabaseClient } from "@/utils/supabase/client"
import { User } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface UserInfoProps {
  showImage?: boolean
}

export default function UserInfo({ showImage = false }: UserInfoProps) {
  const [userName, setUserName] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const displayName = user?.user_metadata?.full_name || user?.email || <Skeleton className="w-24 h-4 rounded" />
      setUserName(displayName)

      // Try to get avatar from user metadata first
      let avatar = user?.user_metadata?.avatar_url

      // If not in metadata, try to fetch from profiles table
      if (!avatar && user) {
        const { data: profileData } = await supabase.from("profiles").select("avatar_url").eq("id", user.id).single()

        if (profileData?.avatar_url) {
          avatar = profileData.avatar_url
        }
      }

      setAvatarUrl(avatar)
      setIsLoading(false)
    }

    getUserInfo()
  }, [supabase])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-6">
        <div className="animate-pulse flex items-center gap-2">
          <User className="w-5 h-5 text-[#2D336B]/50" />
          <div className="h-4 w-24 bg-[#2D336B]/20 rounded"></div>
        </div>
      </div>
    )
  }

  if (showImage) {
    return avatarUrl
  }

  return <span className="font-semibold text-[#1B1E4B]">{userName}</span>
}

