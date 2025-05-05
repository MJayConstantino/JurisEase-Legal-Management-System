"use client";

import { useState, useEffect } from "react";
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

interface CaseDetailsCardProps {
  matter: Matter;
  onUpdate?: (matter: Matter) => void;
}

export function CaseDetailsCard({ matter, onUpdate }: CaseDetailsCardProps) {
  const [editedMatter, setEditedMatter] = useState({ ...matter });
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const userData = await fetchUsersAction();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (field: string, value: any) => {
    setEditedMatter((prev) => {
      if (
        field === "status" &&
        value === "closed" &&
        prev.status !== "closed"
      ) {
        return { ...prev, [field]: value, date_closed: new Date() };
      } else if (
        field === "status" &&
        value !== "closed" &&
        prev.status === "closed"
      ) {
        return { ...prev, [field]: value, date_closed: undefined };
      }
      return { ...prev, [field]: value };
    });
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

  if (isLoading) {
    return <CaseDetailsCardSkeleton />;
  }

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
        />
      )}
    </EditableCard>
  );
}
