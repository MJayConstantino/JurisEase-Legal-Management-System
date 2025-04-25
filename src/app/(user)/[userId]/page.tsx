'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchUsersAction } from '@/actions/users';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/types/user.type';
import { UserProfileActionHandlers } from '@/action-handlers/userProfile';
import { EditUsername } from './editUserNameDialog';

export default function UserProfilePage() {
  const { userId } = useParams();
  const router = useRouter();

  const [userList, setUserList] = useState<User[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { updateProfile, deleteProfile } = UserProfileActionHandlers();

  const currentUser = userList.find((u) => u.user_id === userId);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const users = await fetchUsersAction();
        setUserList(users);

        const user = users.find((user) => user.user_id === userId);
        if (user) {
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

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col pt-[50px] gap-6 w-full bg-transparent">
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.back()}
              className="bg-transparent hover:bg-transparent text-muted-foreground hover:text-foreground border-none p-2"
            >
              <ArrowLeft className="w-9 h-9 md:w-10 md:h-10" />
            </Button>
          </div>

          <div className="flex justify-center mt-6">
            <Avatar className="h-72 w-72">
              <AvatarImage src={currentUser?.user_name || 'U'} alt="Profile picture" />
              <AvatarFallback>{currentUser?.user_name?.[0] ?? '?'}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            {currentUser && (
              <EditUsername user={currentUser} onSave={updateProfile} />
            )}
          </div>

          <p className="text-center text-muted-foreground mt-1">{userEmail}</p>

          <div className="flex-grow" />
          <div className="flex items-center justify-center pt-10">
            <Button
              variant="outline"
              className="h-10 px-6 md:h-12 md:px-8 bg-red-600 hover:bg-red-700 text-white font-semibold dark:bg-red-600"
              // onClick={() => currentUser && deleteProfile(currentUser.user_id)}
            >
              Delete Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}