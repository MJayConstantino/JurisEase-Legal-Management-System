
import { toast } from "sonner";
import { updateProfileName, deleteUser} from "@/actions/userProfile";
import { useState } from "react";
import { User } from "@/types/user.type";

export function UserProfileActionHandlers(){
    const [isLoading, setIsLoading] = useState(false)
    const [newProfileName, setNewProfileName] = useState<User[]>([])
    const [deleteUserProfile, setDeleteUserProfile] = useState<User[]>([])
    
    const updateProfile = async (newProfileName: User) => {
        setIsLoading(true);
        try {
            const result = await updateProfileName(newProfileName);
            if (result) {
            setNewProfileName((users) =>
                    users.map((u) =>
                        u.user_id === newProfileName.user_id ? newProfileName : u
                    )
                );
            }
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    
    };


    const deleteProfile = async (userId: string) => {
        setIsLoading(true);
        try {
            const success = await deleteUser(userId);
            if (success) {
                setDeleteUserProfile((u) => u.filter((user) => user.user_id !== userId));
                toast.success("Profile deleted successfully!");
            }
        } catch (error) {
            console.error("Failed to delete profile:", error);
            toast.error("Failed to delete profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return{updateProfile, deleteProfile}
}