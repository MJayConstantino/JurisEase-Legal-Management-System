'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchUserInfoAction, fetchUsersAction } from '@/actions/users';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/types/user.type';
import { UserProfileActionHandlers } from '@/action-handlers/userProfile';
import { EditUsername } from './editUserNameDialog';

export interface UserData {
  full_name: string;
  avatar_url: string;
  user_email?: string;
}

export default function UserProfilePage() {
  const { userId } = useParams();
  const router = useRouter();

  const [userList, setUserList] = useState<User[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)

  const { updateProfile, deleteProfile } = UserProfileActionHandlers();

  const currentUser = userList.find((u) => u.user_id === userId);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const users = await fetchUsersAction();
        setUserList(users);

        const data = await fetchUserInfoAction()
        setUserData(data)
        

        const user = users.find((user) => user.user_id === userId);
        if (user) {
          setUserName(user.user_name);
          setUserEmail(user.user_email);
        } else {
          setUserEmail('Email not found');
        }
      } catch (error) {
        console.log(error);
        setUserEmail('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
        // uploadAvatar(file)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="h-screen w-screen bg-white dark:bg-gray-800 relative">
      <div className="absolute inset-0">
        <div className="h-1/2 relative bg-indigo-900  overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white opacity-10 text-6xl font-bold leading-loose rotate-[-20deg] whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, index) => (
              <p key={index}>JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase</p>
            ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-[50px] gap-6 w-full bg-transparent z-10">
        <div className="overflow-hidden w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl dark:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.4)] shadow-md p-6 flex flex-col max-h-[90vh] overflow-y-auto z-10">
          <div className="flex items-center justify-between z-10">
            <Button
              onClick={() => router.back()}
              className="bg-transparent hover:bg-transparent text-muted-foreground hover:text-foreground border-none p-2"
            >
              <ArrowLeft className="w-9 h-9 md:w-10 md:h-10" />
            </Button>
          </div>

          <div className="flex justify-center mt-6">
            <Avatar className="h-72 w-72">
              <AvatarImage
                src={avatarPreview || userData?.avatar_url || "/placeholder.svg?height=40&width=40"}
                alt={userData?.full_name || "User"}
              />
              <AvatarFallback>{userData?.full_name?.[0] ?? '?'}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col items-center mt-4">
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer text-blue-500 hover:text-blue-600"
            >
              Change Avatar
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            {currentUser && (
              <EditUsername user={currentUser} onSave={updateProfile} />
            )}
          </div>

          <p className="text-center text-muted-foreground mt-1">{userEmail}</p>

          <div className="flex-grow" />
          <div className="flex items-center justify-center pt-8">
            <Button
              variant="outline"
              className="h-8 px-4 md:h-10 md:px-6 bg-red-600 hover:bg-red-700 text-white font-semibold dark:bg-red-600"
              onClick={() => currentUser && deleteProfile(currentUser)}
            >
              Delete Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}