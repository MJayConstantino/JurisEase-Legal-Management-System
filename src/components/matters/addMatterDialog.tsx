import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MatterForm, MatterData } from "./addMatterForm";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { matterSchema } from "@/validation/matter";
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
  const [data, setData] = useState<MatterData>(initialData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof MatterData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setData(initialData);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [open, initialData]);

  const handleChange = (field: keyof MatterData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = matterSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof MatterData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0])
          fieldErrors[err.path[0] as keyof MatterData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

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
          data={data}
          errors={errors}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
