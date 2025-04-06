"use client";

import { useRouter } from "next/navigation";
import { deleteMatter } from "@/actions/matters";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/deleteConfirmationDialog";
import type { Matter } from "@/types/matter.type";

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
    try {
      await deleteMatter(matter.matter_id);
      toast.success(`"${matter.name}" has been deleted successfully.`);

      if (onSuccess) {
        onSuccess();
      }

      if (redirectToList) {
        router.push("/matters");
      }
    } catch (error) {
      console.error(error);
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
