import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function MatterNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <FileQuestion className="h-20 w-20 text-muted-foreground mb-6" />
      <h1 className="text-3xl font-bold mb-2">Matter Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The matter you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/matters">Return to Matters</Link>
      </Button>
    </div>
  );
}
