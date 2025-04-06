"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Check, X } from "lucide-react";

interface EditableCardProps {
  title: string;
  children: React.ReactNode | ((isEditing: boolean) => React.ReactNode);
  onSave?: () => void;
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

  const handleSave = () => {
    setIsEditing(false);
    onSave?.();
  };

  const handleCancel = () => {
    setIsEditing(false);
    onCancel?.();
  };

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        {editable && (
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleSave}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
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
