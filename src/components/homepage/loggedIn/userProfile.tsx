import { User, Loader2 } from "lucide-react";

interface UserData {
  full_name: string;
  avatar_url: string;
}

interface UserProfileProps {
  userData: UserData | null;
  loadingUser: boolean;
}

export default function UserProfile({
  userData,
  loadingUser,
}: UserProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2">
        {loadingUser ? (
          <Loader2 className="w-6 h-6 animate-spin text-[#2D336B] dark:text-[#8A91D9] transition-colors duration-200" />
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
              {userData && userData.avatar_url ? (
                <img
                  src={userData.avatar_url}
                  alt={userData.full_name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#2D336B] dark:border-[#8A91D9] transition-colors duration-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#2D336B]/10 dark:bg-[#8A91D9]/20 flex items-center justify-center transition-colors duration-200">
                  <User className="w-8 h-8 text-[#2D336B] dark:text-[#8A91D9] transition-colors duration-200" />
                </div>
              )}
            </div>
            <div className="text-center sm:text-left mt-2 sm:mt-0">
              <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
                We're glad to see you again
              </p>
              <div className="text-xl sm:text-2xl font-bold text-[#2D336B] dark:text-[#8A91D9] transition-colors duration-200">
                {loadingUser ? "Loading..." : userData?.full_name || "User"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
