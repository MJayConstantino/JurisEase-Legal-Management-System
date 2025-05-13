import Link from "next/link"
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button"

export default function BillNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <FileQuestion className="h-20 w-20 text-muted-foreground mb-6" />
      <h1 className="text-3xl font-bold mb-2">Bills Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The bill you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/billings">Return to Bills</Link>
      </Button>
    </div>
  );
}

