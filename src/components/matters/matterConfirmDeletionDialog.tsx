"use client";

import { useRouter } from "next/navigation";
import { DeleteConfirmationDialog } from "@/components/deleteConfirmationDialog";
import type { Matter } from "@/types/matter.type";
import { handleDeleteMatter } from "@/action-handlers/matters";

interface MatterConfirmDeletionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  matter: Matter;
  onSuccess?: () => void;
}

export function MatterConfirmDeletionDialog({
  isOpen,
  onOpenChange,
  matter,
  onSuccess,
}: MatterConfirmDeletionDialogProps) {
  const router = useRouter();
  const handleDelete = async () => {
    const { error } = await handleDeleteMatter(matter.matter_id);
    if (!error) {
      console.log(`"${matter.name}" has been deleted successfully.`);
      if (onSuccess) {
        onSuccess();
      }
      router.refresh();
    } else {
      console.log("Failed to delete matter. Please try again.");
    }
  };

  return (
    <DeleteConfirmationDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onConfirm={handleDelete}
      title="Delete Matter"
      description={`Are you sure you want to delete "${matter.name}"? This action cannot be undone and will remove all associated data.`}
      confirmText="Delete Matter"
    />
  );
}
