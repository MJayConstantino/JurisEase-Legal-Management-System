"use client";

import React, { useState, useEffect } from "react";
import { EditableCard } from "../editableCard";
import type { Matter } from "@/types/matter.type";
import { fetchUsersAction } from "@/actions/users";
import type { User as UserType } from "@/types/user.type";
import { CaseDetailsCardSkeleton } from "./caseDetailsCardSkeleton";
import {
  handleSaveMatter,
  handleCancelMatter,
} from "@/action-handlers/matters";
import { CaseDetailsForm } from "./caseDetailsForm";
import { caseSchema } from "@/validation/matter";

interface CaseDetailsCardProps {
  matter: Matter;
  onUpdate?: (matter: Matter) => void;
}

export function CaseDetailsCard({ matter, onUpdate }: CaseDetailsCardProps) {
  // 1) Initialize editedMatter with safe defaults for nullable fields:
  const [editedMatter, setEditedMatter] = useState<Matter>({
    ...matter,
    client: matter.client ?? "",
    client_phone: matter.client_phone ?? "",
    client_email: matter.client_email ?? "",
    client_address: matter.client_address ?? "",
  });

  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchUsersAction()
      .then((data) => setUsers(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

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
    // 2) Validate against your Zod schema first:
    const result = caseSchema.safeParse(editedMatter);
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

    // 3) Only call your save handler if validation passed
    const { matter: updated, error } = await handleSaveMatter(editedMatter);
    if (!error && updated) {
      onUpdate?.(updated);
      return true;
    }

    // 4) On failure, revert
    setEditedMatter(handleCancelMatter(matter).matter);
    return false;
  };

  const cancelChanges = () => {
    setEditedMatter(handleCancelMatter(matter).matter);
    setErrors({});
  };

  if (isLoading) return <CaseDetailsCardSkeleton />;

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
