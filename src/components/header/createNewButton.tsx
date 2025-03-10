import React from "react";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function CreateNewButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#1B1E4B] text-white hover:bg-[#1B1E4B]/90 gap-2">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>New Matter</DropdownMenuItem>
        <DropdownMenuItem>New Task</DropdownMenuItem>
        <DropdownMenuItem>New Document</DropdownMenuItem>
        <DropdownMenuItem>New Event</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CreateNewButton;
