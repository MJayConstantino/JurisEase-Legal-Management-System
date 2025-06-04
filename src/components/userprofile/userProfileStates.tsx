import { useState } from "react";
import { UserData } from "./userProfileInterface";
import { User } from "@/types/user.type";

export function UserProfileStates(){
    // page
    const [userList, setUserList] = useState<User[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userName, setUserName] = useState<string | null>(null)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    
    // edit avatar
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    //edit username
    const [isEditing, setIsEditing] = useState(false)
    
    
    return{
        userList, setUserList, userEmail, setUserEmail, loading, setLoading, userName, setUserName,
        userData, setUserData, isDeleteDialogOpen, setIsDeleteDialogOpen,

        avatarPreview, setAvatarPreview, isLoading, setIsLoading,

        isEditing, setIsEditing
    }
}