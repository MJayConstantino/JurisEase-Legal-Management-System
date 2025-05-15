'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useParams } from 'next/navigation'
import { findExistingAvatar, uploadAvatar } from '@/actions/userProfile'
import { UserProfileStates } from './userProfileStates'
import { toast } from 'sonner'

interface ChangeAvatarProps {
  userName: string
  metadataAvatarUrl: string
}

export function ChangeAvatar({ userName, metadataAvatarUrl }: ChangeAvatarProps) {
  const {avatarPreview, setAvatarPreview, setIsLoading} = UserProfileStates()
  
  const { userId } = useParams();

    async function handleAvatarChange( event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file || !userId) return

        const fileSizeLimit = 5
        const screenSizePixels = 1024
        const convertFileSizeToMB = file.size / (screenSizePixels * screenSizePixels);

        if(convertFileSizeToMB <= fileSizeLimit){
          try {
            setIsLoading(true);

            await uploadAvatar(file, userId as string);
        
            const newAvatarUrl = await findExistingAvatar(userId as string);
        
            if (newAvatarUrl) {
              setAvatarPreview(newAvatarUrl);
            }
            // router.refresh()
            toast.success("User Avatar updated successfully")
          } catch (error) {
            console.error('Error uploading avatar:', error);
          } finally {
            setIsLoading(false);
          }
        }else{
          toast.error("File is too large. Cannot upload avatar.")
        }

       }

  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-72 xl:h-72">
        <AvatarImage
          src={avatarPreview || metadataAvatarUrl || '/placeholder.svg'}
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
