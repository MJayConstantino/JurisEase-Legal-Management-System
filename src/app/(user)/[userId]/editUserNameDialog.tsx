"use client"

import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/types/user.type"
import { PencilIcon } from "lucide-react"
import { UserProfileStates } from "./userProfileStates"
import { useState } from "react"

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

    toast.success("Name updated!")
    setIsEditing(false)
  }

  const handleCancel = () => {
    setNewName(user.user_name)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      {isEditing ? (
        <>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-64"
          />
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500">
            Save
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <div className="flex-1 flex flex-col md:flex-row justify-center items-center md:items-center gap-2">
            <div className="max-w-auto truncate pr-5">
              <h1 title={user.user_name} className="text-2xl font-bold">
              {user.user_name.length > 35? `${user.user_name.slice(0, 35)}...`: user.user_name}
              </h1>
            </div>
          
            <Button className="bg-transparent hover:bg-indigo-500" onClick={() => setIsEditing(true)}>
              <PencilIcon className="text-black dark:text-white"/>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
