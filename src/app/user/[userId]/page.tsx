'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { fetchUsersAction } from '@/actions/users';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UserProfilePage {
  onEdit: () => void
  onDelete: () => void
}

export default function UserProfilePage({ onEdit, onDelete }: UserProfilePage) {
  const { userId } = useParams();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const users = await fetchUsersAction();

        const user = users.find((user) => user.user_id === userId);

        if (user) {
          setUserName(user.user_name);
          setUserEmail(user.user_email)
        } else {
          setUserName('User not found');
          setUserEmail('Email not found');
        }
      } catch (error) {
        console.log(error)
        setUserName('Error fetching user data');
        setUserEmail('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col pt-[25vh] gap-6 w-full h-full">
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col max-h-[50vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <Button  onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
    
        <div className="flex justify-center mt-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userName || 'U'} alt="Profile picture" />
            <AvatarFallback>{userName?.[0] ?? '?'}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <h1 className="text-2xl font-semibold">{userName}</h1>
          <Button variant="outline" size="icon" className="h-7 w-7 md:h-9 md:w-9" onClick={onEdit}>
            <Edit className="h-3 w-3 md:h-4 md:w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </div>
    
        <p className="text-center text-muted-foreground mt-1">{userEmail}</p>
        <div className="flex-grow" />
        <div className="flex justify-end pt-10">
        <Button variant="outline" size="icon" className="h-7 w-7 md:h-9 md:w-9" onClick={onDelete}>
          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
          <span className="sr-only">Delete</span>
        </Button>
          </div>
      </div>
    </div>
  );
  
}
