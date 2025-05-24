import { MatterNotFoundPage } from "@/components/matters/matterNotFound";
import { MatterNotFoundSkeleton } from "@/components/matters/matterNotFoundSkeleton";
import { Suspense } from "react";

export default function MatterNotFound() {
  return (
    <div>
      <Suspense fallback={<MatterNotFoundSkeleton />}>
        <MatterNotFoundPage />
      </Suspense>
    </div>
  );
}
