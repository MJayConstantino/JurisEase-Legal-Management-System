"use client"

import { toast } from "sonner";
import { updateUsername, deleteUser, uploadAvatar} from "@/actions/userProfile";
import { useState } from "react";
import { User } from "@/types/user.type";
import { fetchUserName } from "@/actions/userProfile";

export function UserProfileActionHandlers(){
    const [isLoading, setIsLoading] = useState(false)
    const [newProfileName, setNewProfileName] = useState<User[]>([])

    const updateProfile = async (newProfileName: User) => {
        setIsLoading(true);
        try {
            await updateUsername(newProfileName); 
            setNewProfileName((users) =>
                    users.map((u) =>
                        u.user_id === newProfileName.user_id ? newProfileName : u
                    )
                );
                window.location.reload();
                toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    
    };


    const deleteProfile = async (userId: User) => {
        setIsLoading(true);
        try {
            await deleteUser(userId);
            toast.success("Profile deleted successfully!");
        } catch (error) {
            console.error("Failed to delete profile:", error);
            toast.error("Failed to delete profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return{updateProfile, deleteProfile}
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