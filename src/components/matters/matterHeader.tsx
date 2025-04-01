import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Matter } from "@/types/matter.type";
import { getStatusColor } from "@/utils/getStatusColor";

interface MatterHeaderProps {
  matter: Matter;
}

export function MatterHeader({ matter }: MatterHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border shadow p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Link href="/matters">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to matters</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{matter.name}</h1>
            <Badge className={getStatusColor(matter.status)} variant="outline">
              {matter.status.charAt(0).toUpperCase() + matter.status.slice(1)}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
            <span>Matter ID: {matter.matter_id}</span>
            <span className="hidden sm:inline">•</span>
            <span>Case Number: {matter.case_number}</span>
            <span className="hidden sm:inline">•</span>
            <span>Client: {matter.client}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                Delete Matter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
