'use client'

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchUserInfoAction, fetchUsersAction } from '@/actions/users';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChangeAvatar } from './editAvatar';
import { UserProfileActionHandlers } from '@/action-handlers/userProfile';
import { EditUsername } from './editUserNameDialog';
import { ThemeProvider } from "@/components/theme-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserProfileStates } from './userProfileStates';

export interface UserData {
  full_name: string;
  user_email?: string;
  avatar_url?: string;
}

export default function UserProfilePage() {
  const { userId } = useParams();
  const router = useRouter();

  const {
    userList, setUserList, userEmail, setUserEmail, setLoading, setUserName,
    userData, setUserData, isDeleteDialogOpen, setIsDeleteDialogOpen
  } = UserProfileStates()
  
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
  }, [userId, setLoading, setUserData, setUserEmail, setUserList, setUserName]);
  

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-screen w-screen bg-white dark:bg-gray-800 relative">
        <div className="absolute inset-0">
          <div className="h-1/2 relative bg-indigo-900  overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white opacity-10 text-6xl font-bold leading-loose rotate-[-20deg] whitespace-nowrap">
              {Array.from({ length: 8 }).map((_, index) => (
                <p key={index}>JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase JurisEase</p>
              ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-full w-full relative z-10 px-4">
          <div className="overflow-hidden w-full max-w-4xl max-h-[80vh] max-w-[95vh] bg-white dark:bg-gray-800 dark:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.4)] shadow-md rounded-xl p-3 flex flex-col">
            <div className="flex items-center justify-between z-10">
              <Button
                onClick={() => router.back()}
                className="bg-transparent hover:bg-transparent text-muted-foreground hover:text-foreground border-none p-2"
              >
                <ArrowLeft className="w-9 h-9 md:w-10 md:h-10" />
              </Button>
            </div>

            <div className="flex justify-center">
              <ChangeAvatar userName={currentUser?.user_name || "User"} metadataAvatarUrl={userData?.avatar_url || "/placeholder.svg"}/>
              
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              {currentUser && (
                <EditUsername user={currentUser} onSave={updateProfile} />
              )}
            </div>

            <p className="text-center text-muted-foreground mt-1">{userEmail}</p>

            <div className="flex-grow" />
            <div className="flex items-center justify-center pt-2">
              <Button
                variant="outline"
                className="h-8 px-4 md:h-10 md:px-6 bg-red-600 hover:bg-red-700 text-white font-semibold dark:bg-red-600"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete Profile
              </Button>

              {currentUser && (
                <AlertDialog
                  open={isDeleteDialogOpen}
                  onOpenChange={setIsDeleteDialogOpen}
                >
                  <AlertDialogContent className="max-w-md dark:bg-gray-800 dark:border-gray-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-lg md:text-xl">
                        Are you sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-sm md:text-base dark:text-gray-300">
                        This will permanently delete your profile.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-sm md:text-base dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="text-sm md:text-base bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                        onClick={async () => {
                          await deleteProfile(currentUser);
                          window.location.href = '/login';
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}