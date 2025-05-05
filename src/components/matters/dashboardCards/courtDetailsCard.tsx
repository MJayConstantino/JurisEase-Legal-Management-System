"use client";

import { useState } from "react";
import { EditableCard } from "../editableCard";
import type { Matter } from "@/types/matter.type";
import {
  handleSaveMatter,
  handleCancelMatter,
} from "@/action-handlers/matters";
import { CourtDetailsForm } from "./courtDetailsForm";

interface CourtDetailsCardProps {
  matter: Matter;
  onUpdate?: (matter: Matter) => void;
}

export function CourtDetailsCard({ matter, onUpdate }: CourtDetailsCardProps) {
  const [editedMatter, setEditedMatter] = useState({ ...matter });

  const handleNestedChange = (
    field: keyof NonNullable<Matter["court"]>,
    value: string
  ) => {
    setEditedMatter((prev) => ({
      ...prev,
      court: {
        name: prev.court?.name ?? "N/A",
        phone: prev.court?.phone ?? "N/A",
        email: prev.court?.email ?? "N/A",
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

  const court = editedMatter.court || {
    name: "N/A",
    phone: "N/A",
    email: "N/A",
  };

  return (
    <EditableCard
      title="Court Details"
      onSave={saveChanges}
      onCancel={cancelChanges}
    >
      {(isEditing) => (
        <CourtDetailsForm
          court={editedMatter.court || { name: "", phone: "", email: "" }}
          isEditing={isEditing}
          onChange={handleNestedChange}
        />
      )}
    </EditableCard>
  );
}
