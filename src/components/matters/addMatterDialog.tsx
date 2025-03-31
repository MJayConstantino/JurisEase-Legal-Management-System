"use client";

import type React from "react";

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
import { createMatter } from "@/actions/matters";
import { toast } from "sonner";
import type { MatterStatus } from "@/types/matter.type";

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

    if (!matterData.name.trim()) {
      toast.error("Matter name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await createMatter({
        name: matterData.name,
        client: matterData.client || "To be determined",
        case_number: matterData.case_number || "",
        status: matterData.status,
        description: "",
        created_at: new Date(),
        date_opened: new Date(),
      });

      toast.success("New matter has been created successfully.");

      setMatterData({
        name: "",
        client: "",
        case_number: "",
        status: "open" as MatterStatus,
      });

      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create matter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
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
              placeholder="Case Name"
              value={matterData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="case-number">Case Number</Label>
            <Input
              id="case-number"
              placeholder="Case Number"
              value={matterData.case_number}
              onChange={(e) => handleChange("case_number", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-name">Client Name</Label>
            <Input
              id="client-name"
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
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
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
