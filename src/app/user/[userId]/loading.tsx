
import { Skeleton } from "@/components/ui/skeleton"

export default function UserProfileLoading(){
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
                <div className="flex items-center justify-center gap-2 mt-2">
                <Skeleton className="h-7 w-7 "/>
            </div>
            </div>

            <div className="flex justify-center">
                <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-72 xl:h-72 rounded-full"/>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
                <Skeleton className="h-4 w-24"/>
            </div>
              
            <div className="flex flex-row items-start justify-center gap-2 mt-2">
                <div className="flex flex-col items-center">
                        <Skeleton className="h-6 w-70 max-w-auto pr-5" />
                    <div className="mt-1">
                        <Skeleton className="h-6 w-60" />
                    </div>
                </div>

                <Skeleton className="h-6 w-6" />
            </div>

            <div className="flex-grow" />
            <div className="flex items-center justify-center pt-2">
            <Skeleton className="h-10 w-25"/>
          </div>
        </div>
      </div>
    </div>
  );
}