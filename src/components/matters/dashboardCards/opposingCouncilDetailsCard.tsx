"use client";

import { useState } from "react";
import { EditableCard } from "../editableCard";
import type { Matter } from "@/types/matter.type";
import {
  handleSaveMatter,
  handleCancelMatter,
} from "@/action-handlers/matters";
import { OpposingCouncilDetailsForm } from "./opposingCouncilDetailsForm";
import { opposingCouncilSchema } from "@/validation/matter";

interface OpposingCouncilDetailsCardProps {
  matter: Matter;
  onUpdate?: (matter: Matter) => void;
}

export function OpposingCouncilDetailsCard({
  matter,
  onUpdate,
}: OpposingCouncilDetailsCardProps) {
  const [editedMatter, setEditedMatter] = useState({ ...matter });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleNestedChange = (
    field: keyof NonNullable<Matter["opposing_council"]>,
    value: string
  ) => {
    setEditedMatter((prev) => ({
      ...prev,
      opposing_council: {
        ...prev.opposing_council,
        [field]: value,
      },
    }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const saveChanges = async (): Promise<boolean> => {
    const result = opposingCouncilSchema.safeParse(
      editedMatter.opposing_council
    );

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setFormErrors(fieldErrors);
      return false; // Validation failed
    }

    const { matter: updatedMatter, error } = await handleSaveMatter(
      editedMatter
    );
    if (!error && updatedMatter) {
      onUpdate?.(updatedMatter);
      return true; // Save succeeded
    } else {
      const { matter: original } = handleCancelMatter(matter);
      setEditedMatter(original);
      return false; // Save failed
    }
  };

  const cancelChanges = () => {
    const { matter: original } = handleCancelMatter(matter);
    setEditedMatter(original);
    setFormErrors({});
  };

  return (
    <EditableCard
      title="Opposing Council"
      onSave={saveChanges}
      onCancel={cancelChanges}
    >
      {(isEditing) => (
        <OpposingCouncilDetailsForm
          opposingCouncil={
            editedMatter.opposing_council || {
              name: "",
              phone: "",
              email: "",
              address: "",
            }
          }
          isEditing={isEditing}
          onChange={handleNestedChange}
          errors={formErrors}
        />
      )}
    </EditableCard>
  );
}
