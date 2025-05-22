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
    <div className="max-w-screenp-4 sm:p-6 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm border dark:shadow-sm">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <Link href="/matters">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 flex-shrink-0 hover:bg-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer" 
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to matters</span>
          </Button>
        </Link>

        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <h1
            title={`Matter Name: ${matter.name}`}
            className="text-xl sm:text-2xl font-bold truncate max-w-[60vw] sm:max-w-[40vw]"
          >
            {matter.name}
          </h1>
          <Badge className={getStatusColor(matter.status)} variant="outline">
            {matter.status}
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
