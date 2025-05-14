'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChangeAvatar } from '@/components/userprofile/editAvatar';
import { EditUsername } from '@/components/userprofile/editUserNameDialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserProfileStates } from '@/components/userprofile/userProfileStates';
import { UserProfileActionHandlers } from '@/action-handlers/userProfile';
import { useEffect } from 'react';

export interface UserData {
  user_id: string
  user_name: string
  user_email?: string
  avatar_url?: string
}

interface UserProfileProps {
  user: {
    user_id: string;
    user_name: string;
    user_email: string;
    avatar_url?: string;
    full_name: string;
  };
}

export default function UserProfileInterface({ user }: UserProfileProps) {
  const router = useRouter()

  const { userList, setUserList, userEmail, setUserEmail, setLoading, setUserName, userData, setUserData,
    isDeleteDialogOpen, setIsDeleteDialogOpen 
  } = UserProfileStates()

  const { updateProfile, deleteProfile } = UserProfileActionHandlers()

  useEffect(() => {
    setUserList([user]);
    setUserData(user);
    setUserName(user.user_name);
    setUserEmail(user.user_email || '');
  }, [user, setUserList, setUserData, setUserName, setUserEmail]);


  return (
    <div className="h-screen w-screen bg-white dark:bg-gray-800 relative">
      <div className="absolute inset-0">
        <div className="h-1/2 relative bg-indigo-900 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white opacity-10 text-6xl font-bold leading-loose rotate-[-20deg] whitespace-nowrap">
              {Array.from({ length: 8 }).map((_, index) => (
                <p key={index}>
                  JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase 
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center h-full w-full relative z-10 px-4">
        <div className="overflow-hidden w-full max-w-4xl max-h-[80vh] bg-white dark:bg-gray-800 shadow-md rounded-xl p-3 flex flex-col">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.back()}
              className="bg-transparent hover:bg-transparent text-muted-foreground border-none p-2"
            >
              <ArrowLeft className="w-9 h-9 md:w-10 md:h-10" />
            </Button>
          </div>

          <div className="flex justify-center">
            <ChangeAvatar
              userName={user.user_name}
              metadataAvatarUrl={user.avatar_url || '/placeholder.svg'}
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-2">
            <EditUsername user={user} onSave={updateProfile} />
          </div>

          <p className="text-center text-muted-foreground mt-1">
            {user.user_email}
          </p>

          <div className="flex-grow" />
          <div className="flex items-center justify-center pt-2">
            <Button
              variant="outline"
              className="h-8 px-4 md:h-10 md:px-6 bg-red-600 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700 hover:text-white text-white font-semibold"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Profile
            </Button>

            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg md:text-xl">
                    Are you sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm md:text-base">
                    This will permanently delete your profile.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600"
                    onClick={async () => {
                      await deleteProfile(user);
                      router.push("/login")
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}