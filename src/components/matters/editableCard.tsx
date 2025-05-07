"use client";

import { useState } from "react";
import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Check, X } from "lucide-react";

interface EditableCardProps {
  title: string;
  children: React.ReactNode | ((isEditing: boolean) => React.ReactNode);
  onSave?: () => Promise<boolean>;
  onCancel?: () => void;
  editable?: boolean;
}

export function EditableCard({
  title,
  children,
  onSave,
  onCancel,
  editable = true,
}: EditableCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = async () => {
    if (onSave) {
      const ok = await onSave();
      if (ok) setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    onCancel?.();
  };

  return (
    <Card className="dark:bg-gray-800">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        {editable && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                {/* this button triggers saveChanges directly */}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  aria-label="Save"
                  onClick={handleSaveClick}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label="Cancel"
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                aria-label="Edit"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {typeof children === "function" ? children(isEditing) : children}
      </CardContent>
    </Card>
  );
}
