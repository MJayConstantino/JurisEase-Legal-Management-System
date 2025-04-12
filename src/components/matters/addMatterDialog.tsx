"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MatterStatus } from "@/types/matter.type";
import { handleCreateMatter } from "@/action-handlers/matters";

interface AddMatterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMatterDialog({ open, onOpenChange }: AddMatterDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matterData, setMatterData] = useState({
    name: "",
    client: "",
    case_number: "",
    status: "open" as MatterStatus,
  });

  const handleChange = (field: string, value: string) => {
    setMatterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await handleCreateMatter(matterData);
    if (!error) {
      setMatterData({
        name: "",
        client: "",
        case_number: "",
        status: "open" as MatterStatus,
      });
      onOpenChange(false);
      window.location.reload();
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle>Add New Matter</DialogTitle>
          <DialogDescription>
            Create a new legal matter. You can add more details later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="matter-name">Matter Name *</Label>
            <Input
              id="matter-name"
              className="dark:bg-gray-700 dark:border-gray-600"
              placeholder="Case Name"
              value={matterData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="case-number">Case Number *</Label>
            <Input
              id="case-number"
              className="dark:bg-gray-700 dark:border-gray-600"
              placeholder="Case Number"
              value={matterData.case_number}
              onChange={(e) => handleChange("case_number", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-name">Client Name</Label>
            <Input
              id="client-name"
              className="dark:bg-gray-700 dark:border-gray-600"
              placeholder="Client name"
              value={matterData.client}
              onChange={(e) => handleChange("client", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={matterData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger
                id="status"
                className="dark:bg-gray-700 dark:border-gray-600"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Matter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
