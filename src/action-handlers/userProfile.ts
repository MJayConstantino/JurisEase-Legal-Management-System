"use client"

import { toast } from "sonner";
import { updateUsername, deleteUser} from "@/actions/userProfile";
import { User } from "@/types/user.type";
import { fetchUserName } from "@/actions/userProfile";
import { fetchUserInfoAction, fetchUsersAction } from "@/actions/users";

export function UserProfileActionHandlers() {
  const updateProfile = async (newProfileName: User) => {
    try {
      await updateUsername(newProfileName);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const deleteProfile = async (user: User) => {
    try {
      await deleteUser(user);
      toast.success("Profile deleted successfully!");
    } catch (error) {
      console.error("Failed to delete profile:", error);
      toast.error("Failed to delete profile. Please try again.");
    }
  };

  return { updateProfile, deleteProfile };
}

export function handleFetchUserName(userId: string) {
    return fetchUserName(userId)
        .then((user) => {
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        })
        .catch((error) => {
            console.error("Error fetching user name:", error);
            throw error;
        });
}


export const handleFetchUserData = async (
  userId: string | undefined,
  {
    setUserList,
    setUserData,
    setUserName,
    setUserEmail,
    setLoading,
  }: {
    setUserList: (users: any[]) => void
    setUserData: (data: any) => void
    setUserName: (name: string) => void
    setUserEmail: (email: string) => void
    setLoading: (value: boolean) => void
  }
) => {
  if (!userId) return

  try {
    const users = await fetchUsersAction()
    setUserList(users)

    const data = await fetchUserInfoAction()
    setUserData(data)

    const user = users.find((user) => user.user_id === userId)
    if (user) {
      setUserName(user.user_name)
      setUserEmail(user.user_email)
    } else {
      setUserEmail('Email not found')
    }
  } catch (error) {
    console.error(error)
    toast.error('Failed to fetch user data.')
    setUserEmail('Error fetching user data')
  } finally {
    setLoading(false)
  }
}