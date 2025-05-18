import { fetchUsersData } from '@/actions/userProfile';
import { fetchUserInfoAction } from '@/actions/users';
import { ThemeProvider } from '@/components/theme-provider'
import UserProfileInterface from '@/components/userprofile/userProfileInterface';
import { notFound } from 'next/navigation';
import UserProfileLoading from './loading';
import { Suspense } from 'react';

export default async function UserProfilePage({ 
  params
}: {
  params: Promise<{ userId: string }> 
}) {
  try {
    const { userId } = await params;

    const userData = await fetchUsersData(userId);
    const userAvatar = await fetchUserInfoAction();

    if (!userData || !userAvatar) {
      notFound();
    }

    const user = {
      user_id: userData.user_id,
      user_name: userData.user_name,
      user_email: userData.user_email,
      avatar_url: userAvatar.avatar_url,
      full_name: userAvatar.full_name,
    };

    return (
      <ThemeProvider
        attribute="class" 
        defaultTheme="light" 
        enableSystem 
        disableTransitionOnChange
      >
        <div className="flex flex-col gap-6 h-full">
          <Suspense fallback={<UserProfileLoading/>}/>
          <UserProfileInterface user={user} />
        </div>
      </ThemeProvider>
    );
  } catch (error) {
    console.error('Error loading user details:', error);
    notFound();
  }
}
