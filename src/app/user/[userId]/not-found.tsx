import { UserNotFoundPage } from "@/components/userprofile/userNotFound";
import { UserNotFoundSkeleton } from "@/components/userprofile/userNotFoundSkeleton";
import { Suspense } from "react";

export default function UserNotFound() {
  return (
    <div>
      <Suspense fallback={<UserNotFoundSkeleton />}>
        <UserNotFoundPage />
      </Suspense>
    </div>
  );
}
