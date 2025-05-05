"use client";
import { useState } from "react";
import { EditableCard } from "../editableCard";
import { CourtDetailsForm } from "./courtDetailsForm";
import type { Matter } from "@/types/matter.type";
import { courtSchema } from "@/validation/matter";
import {
  handleSaveMatter,
  handleCancelMatter,
} from "@/action-handlers/matters";

interface CourtDetailsCardProps {
  matter: Matter;
  onUpdate?: (m: Matter) => void;
}

export function CourtDetailsCard({ matter, onUpdate }: CourtDetailsCardProps) {
  const [editedMatter, setEditedMatter] = useState({ ...matter });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNestedChange = (
    field: keyof NonNullable<Matter["court"]>,
    value: string
  ) => {
    setEditedMatter((prev) => ({
      ...prev,
      court: {
        ...prev.court!,
        [field]: value,
      },
    }));
  };

  const saveChanges = async (): Promise<boolean> => {
    const result = courtSchema.safeParse(editedMatter.court);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const key = String(err.path[0]);
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});

    const { matter: updated, error } = await handleSaveMatter(editedMatter);
    if (!error && updated) {
      onUpdate?.(updated);
      return true;
    }

    setEditedMatter(handleCancelMatter(matter).matter);
    return false;
  };

  const cancelChanges = () => {
    setEditedMatter(handleCancelMatter(matter).matter);
    setErrors({});
  };

  return (
    <EditableCard
      title="Court Details"
      onSave={saveChanges}
      onCancel={cancelChanges}
    >
      {(isEditing) => (
        <CourtDetailsForm
          court={editedMatter.court!}
          isEditing={isEditing}
          onChange={handleNestedChange}
          errors={errors}
        />
      )}
    </EditableCard>
  );
}
