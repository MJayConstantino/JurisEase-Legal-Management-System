"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/deleteConfirmationDialog";
import type { Matter } from "@/types/matter.type";
import { handleDeleteMatter } from "@/action-handlers/matters";

interface MatterConfirmDeletionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  matter: Matter;
  onSuccess?: () => void;
  redirectToList?: boolean;
}

export function MatterConfirmDeletionDialog({
  isOpen,
  onOpenChange,
  matter,
  onSuccess,
  redirectToList = false,
}: MatterConfirmDeletionDialogProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const { error } = await handleDeleteMatter(matter.matter_id);
    if (!error) {
      toast.success(`"${matter.name}" has been deleted successfully.`);
      if (onSuccess) {
        onSuccess();
      }
      if (redirectToList) {
        router.push("/matters");
      }
    } else {
      toast.error("Failed to delete matter. Please try again.");
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
