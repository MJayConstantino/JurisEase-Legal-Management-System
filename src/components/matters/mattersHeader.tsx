"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddMatterDialog } from "./addMatterDialog";

interface MattersHeaderProps {
  onSearch: (term: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
}

export function MattersHeader({
  onSearch,
  onStatusChange,
  onSortChange,
}: MattersHeaderProps) {
  const [isAddMatterOpen, setIsAddMatterOpen] = useState(false);

  return (
    <div className="p-4 border-b">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Tabs
            defaultValue="all"
            className="w-full md:w-auto"
            onValueChange={onStatusChange}
          >
            <TabsList>
              <TabsTrigger value="all">All Matters</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative md:ml-4 w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search matters..."
              onChange={(e) => onSearch(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="desc" onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest first</SelectItem>
              <SelectItem value="asc">Oldest first</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => setIsAddMatterOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Matter
          </Button>
        </div>
      </div>

      <AddMatterDialog
        open={isAddMatterOpen}
        onOpenChange={setIsAddMatterOpen}
      />
    </div>
  );
}
