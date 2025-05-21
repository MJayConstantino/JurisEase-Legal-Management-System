"use client";

import { useState } from "react";
import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Check, X, Loader2 } from "lucide-react";

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
  const [isSaving, setIsSaving] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleSaveClick = async () => {
    if (onSave) {
      setIsSaving(true);
      try {
        const ok = await onSave();
        if (ok) setIsEditing(false);
      } finally {
        setIsSaving(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsCancelling(true);
    try {
      onCancel?.();
      setIsEditing(false);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Card className="dark:bg-gray-800">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        {editable && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  aria-label="Save"
                  onClick={handleSaveClick}
                  disabled={isSaving || isCancelling}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label="Cancel"
                  onClick={handleCancel}
                  disabled={isSaving || isCancelling}
                >
                  {isCancelling ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
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
