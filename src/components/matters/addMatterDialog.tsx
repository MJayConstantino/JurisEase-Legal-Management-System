"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MatterForm, type MatterData } from "./addMatterForm";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { handleCreateMatter } from "@/action-handlers/matters";

interface AddMatterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMatterDialog({ open, onOpenChange }: AddMatterDialogProps) {
  const router = useRouter();
  const initialData = useMemo<MatterData>(
    () => ({
      name: "",
      client: "",
      case_number: "",
      status: "open",
    }),
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsSubmitting(false);
    }
  }, [open]);

  const handleSubmit = async (data: MatterData) => {
    setIsSubmitting(true);
    const { error } = await handleCreateMatter(data);
    if (!error) {
      onOpenChange(false);
      router.refresh();
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
        <MatterForm
          data={initialData}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
