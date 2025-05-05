"use client";

import { useState } from "react";
import { EditableCard } from "../editableCard";
import type { Matter } from "@/types/matter.type";
import {
  handleSaveMatter,
  handleCancelMatter,
} from "@/action-handlers/matters";
import { OpposingCouncilDetailsForm } from "./opposingCouncilDetailsForm";

interface OpposingCouncilDetailsCardProps {
  matter: Matter;
  onUpdate?: (matter: Matter) => void;
}

export function OpposingCouncilDetailsCard({
  matter,
  onUpdate,
}: OpposingCouncilDetailsCardProps) {
  const [editedMatter, setEditedMatter] = useState({ ...matter });

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
  };

  const saveChanges = async () => {
    const { matter: updatedMatter, error } = await handleSaveMatter(
      editedMatter
    );
    if (!error && updatedMatter) {
      onUpdate?.(updatedMatter);
    } else {
      const { matter: original } = handleCancelMatter(matter);
      setEditedMatter(original);
    }
  };

  const cancelChanges = () => {
    const { matter: original } = handleCancelMatter(matter);
    setEditedMatter(original);
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
        />
      )}
    </EditableCard>
  );
}
