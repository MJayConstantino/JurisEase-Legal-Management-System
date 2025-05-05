import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Matter } from "@/types/matter.type";
import { getStatusColor } from "@/utils/getStatusColor";

interface MatterHeaderProps {
  matter: Matter;
}

export function MatterHeader({ matter }: MatterHeaderProps) {
  return (
    <div className="max-w-screen bg-white dark:bg-gray-800 rounded-lg border shadow p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <Link href="/matters">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to matters</span>
          </Button>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold truncate">
            {matter.name}
          </h1>
          <Badge className={getStatusColor(matter.status)} variant="outline">
            {matter.status.charAt(0).toUpperCase() + matter.status.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="font-medium">Case:</span>
          <span className="truncate max-w-[200px]">{matter.case_number}</span>
        </div>

        <span className="hidden sm:inline">•</span>

        <div className="flex items-center gap-1">
          <span className="font-medium">Client:</span>
          <span className="truncate max-w-[200px]">{matter.client}</span>
        </div>
      </div>
    </div>
  );
}
