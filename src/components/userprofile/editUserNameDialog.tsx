"use client"

import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/types/user.type"
import { PencilIcon } from "lucide-react"
import { UserProfileStates } from "./userProfileStates"
import { useState } from "react"

interface UsernameProps {
  username: string;
}

export function EditUsername({ 
  user,
  onSave
}: {
  user: User;
  onSave: (updatedUser: User) => void; 
}) {
  const {isEditing, setIsEditing} = UserProfileStates()
  const [newName, setNewName] = useState(user.user_name)

  const handleSave = () => {
    if (!newName) {
      toast.error("Name cannot be empty.")
      return
    }

    onSave({
      ...user,
      user_name: newName
    })

    setIsEditing(false)
  }

  const handleCancel = () => {
    setNewName(user.user_name)
    setIsEditing(false)
  }

  
  const truncateUsername = (username: string, maxLength: number): string => {
    return username.length > maxLength ? `${username.slice(0, maxLength)}...` : username;
  };

  function UsernameDisplay({ username }: UsernameProps) {
    const maxLength = typeof window !== "undefined" && window.innerWidth < 600 ? 15 : 35;
  
    return (
      <h1 title={username} className="text-2xl font-bold">
        {truncateUsername(username, maxLength)}
      </h1>
    );
  }
  
  return (
    <div className="flex items-center gap-4 mt-4">
      {isEditing ? (
        <>
          <div className="flex-1 flex flex-col md:flex-row justify-center items-center md:items-center gap-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-64"
            />
            <div>
              <Button onClick={handleSave} className="bg-[#1B1E4B] text-white rounded-t-md cursor-pointer pr-4 hover:bg-[#25305B]">
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel} className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                Cancel
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex flex-col md:flex-row justify-center items-center md:items-center gap-2">
            <div className="max-w-auto truncate pr-5" title={user.user_name}>
              <UsernameDisplay username={user.user_name}/>
            </div>
          
            <Button className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsEditing(true)}>
              <PencilIcon className="text-black dark:text-white"/>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
