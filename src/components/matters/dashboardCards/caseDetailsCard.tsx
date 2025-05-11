"use client";

import React, { useState } from "react";
import { EditableCard } from "../editableCard";
import type { Matter } from "@/types/matter.type";
import type { User as UserType } from "@/types/user.type";
import {
  handleSaveMatter,
  handleCancelMatter,
} from "@/action-handlers/matters";
import { CaseDetailsForm } from "./caseDetailsForm";
import { caseSchema } from "@/validation/matter";

interface CaseDetailsCardProps {
  matter: Matter;
  users: UserType[];
  onUpdate?: (matter: Matter) => void;
}

export function CaseDetailsCard({
  matter,
  users,
  onUpdate,
}: CaseDetailsCardProps) {
  const [editedMatter, setEditedMatter] = useState<Matter>({
    ...matter,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Matter, value: any) => {
    setEditedMatter((prev) => {
      if (field === "status") {
        const newDateClosed =
          value === "closed" && prev.status !== "closed"
            ? new Date()
            : value !== "closed" && prev.status === "closed"
            ? undefined
            : prev.date_closed;
        return { ...prev, status: value, date_closed: newDateClosed };
      }
      return { ...prev, [field]: value };
    });
  };

  const saveChanges = async (): Promise<boolean> => {
    // If client name is empty or only whitespace, set it to "To be determined"
    const matterToSave = {
      ...editedMatter,
      client:
        !editedMatter.client || editedMatter.client.trim() === ""
          ? "To be determined"
          : editedMatter.client,
    };

    const result = caseSchema.safeParse(matterToSave);
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

    const { matter: updated, error } = await handleSaveMatter(matterToSave);
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
      title="Case Details"
      onSave={saveChanges}
      onCancel={cancelChanges}
    >
      {(isEditing) => (
        <CaseDetailsForm
          matter={editedMatter}
          users={users}
          isEditing={isEditing}
          onChange={handleChange}
          errors={errors}
        />
      )}
    </EditableCard>
  );
}
