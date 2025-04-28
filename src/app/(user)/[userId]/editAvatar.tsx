'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useParams } from 'next/navigation'
import { findExistingAvatar, uploadAvatar } from '@/actions/userProfile'
import { UserProfileStates } from './userProfileStates'

interface ChangeAvatarProps {
  userName: string
  metadataAvatarUrl: string
}

export function ChangeAvatar({ userName, metadataAvatarUrl }: ChangeAvatarProps) {
  const {avatarUrl, setAvatarUrl, avatarPreview, setAvatarPreview, setIsLoading} = UserProfileStates()
  
  const { userId } = useParams();

  useEffect(() => {
    const loadAvatar = async () => {
      if (!userId) return;
  
      try {
        const { data: files, error } = await supabase
          .storage
          .from('user')
          .list(userId as string, { limit: 1 });
  
        if (error) {
          console.error('Error listing avatar files:', error);
          setAvatarUrl(null);
          setAvatarPreview(null);
          return;
        }
  
        if (!files || files.length === 0) {
          console.log('No avatar file found.');
          setAvatarUrl(null);
          setAvatarPreview(null);
          return;
        }
  
        const firstFile = files[0];
        const filePath = `${userId}/${firstFile.name}`;
  
        const { data } = supabase.storage.from('user').getPublicUrl(filePath);
        const publicUrl = data?.publicUrl;
  
        if (publicUrl) {
          setAvatarUrl(publicUrl);
          setAvatarPreview(publicUrl);
        } else {
          setAvatarUrl(null);
          setAvatarPreview(null);
        }
  
      } catch (error) {
        console.error('Error loading avatar:', error);
        setAvatarUrl(null);
        setAvatarPreview(null);
      }
    };
  
    loadAvatar();
  }, [userId, setAvatarPreview, setAvatarUrl]);

    async function handleAvatarChange( event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file || !userId) return

          try {
            setIsLoading(true);

            await uploadAvatar(file, userId as string);
        
            const newAvatarUrl = await findExistingAvatar(userId as string);
        
            if (newAvatarUrl) {
              setAvatarPreview(newAvatarUrl);
            }
        
          } catch (error) {
            console.error('Error uploading avatar:', error);
          } finally {
            setIsLoading(false);
          }

       }

  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-72 w-72">
        <AvatarImage
          src={avatarPreview || avatarUrl || metadataAvatarUrl || '/placeholder.svg'}
          alt={userName}
        />
        <AvatarFallback>{userName[0] ?? '?'}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center mt-4">
        <label htmlFor="avatar-upload" className="cursor-pointer text-blue-500 hover:text-blue-600">
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
    </div>
  );
}
