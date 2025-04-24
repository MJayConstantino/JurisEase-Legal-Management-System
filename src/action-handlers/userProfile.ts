"use server"

import { toast } from "sonner";
import { updateProfileName } from "@/actions/userProfile";
import { useState } from "react";
import { User } from "@/types/user.type";


// export function UserProfileActionHandlers(){
//     const [isLoading, setIsLoading] = useState(false)
//     const [newProfileNwme, setNewProfileName] = useState<User[]>([])
    
//     const updateProfile = async (newProfileName: User) => {
//         setIsLoading(true);
//         try {
//             const result = await updateProfileName(newProfileName);
//             if (result) {
//             setNewProfileName((prev) => 
//                 prev.map(() =>
//                 bill.bill_id === updatedBill.bill_id ? updatedBill : bill
//                 )
//                 );
//             }
//             toast.success("Profile updated successfully!");
//         } catch (error) {
//             console.error("Failed to update profile:", error);
//             toast.error("Failed to update profile. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
    
//     };
    
//     return{updateProfile}
}