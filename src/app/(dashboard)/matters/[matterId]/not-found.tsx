"use client";

import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MatterNotFound() {
  const router = useRouter();

  const handleReturnToMatters = () => {
    try {
      window.location.href = "/matters";
    } catch (error) {
      console.error("Error redirecting to matters:", error);
      router.push("/matters");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <FileQuestion className="h-20 w-20 text-muted-foreground mb-6" />
      <h1 className="text-3xl font-bold mb-2">Matter Not Found</h1>
      <p className="text-muted-foreground mb-6 text-center">
        The matter you are looking for does not exist or has been removed.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Button onClick={handleReturnToMatters} size="lg">
          🏠 Return to Matters
        </Button>
      </div>
    </div>
  );
}
