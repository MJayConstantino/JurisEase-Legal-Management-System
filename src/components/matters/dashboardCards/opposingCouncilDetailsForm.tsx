import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OpposingCouncil } from "@/types/matter.type";
import { opposingCouncilSchema } from "@/validation/matter";

export interface OpposingCouncilDetailsFormProps {
  opposingCouncil: OpposingCouncil;
  isEditing: boolean;
  onChange: (field: keyof OpposingCouncil, value: string) => void;
  onSubmit?: () => void;
}

export const OpposingCouncilDetailsForm: React.FC<
  OpposingCouncilDetailsFormProps
> = ({ opposingCouncil, isEditing, onChange, onSubmit }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFieldChange = (field: keyof OpposingCouncil, value: string) => {
    onChange(field, value);
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = opposingCouncilSchema.safeParse(opposingCouncil);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSubmit?.();
  };

  return (
    <form
      className="space-y-4"
      onSubmit={isEditing ? handleValidate : undefined}
    >
      <div className="w-full">
        <h4 className="text-sm font-medium text-muted-foreground mb-1">Name</h4>
        {isEditing ? (
          <>
            <Input
              value={opposingCouncil.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="w-full"
              placeholder="Opposing council name"
              maxLength={100}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name}</span>
            )}
          </>
        ) : (
          <p className="font-medium truncate max-w-full">
            {opposingCouncil.name || "N/A"}
          </p>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Contact Phone
        </h4>
        <div className="flex items-center w-full">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
          {isEditing ? (
            <>
              <Input
                value={opposingCouncil.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                className="w-full"
                placeholder="Phone number"
                maxLength={30}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">{errors.phone}</span>
              )}
            </>
          ) : (
            <p className="truncate max-w-full">
              {opposingCouncil.phone || "N/A"}
            </p>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Contact Email
        </h4>
        <div className="flex items-center w-full">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
          {isEditing ? (
            <>
              <Input
                type="email"
                value={opposingCouncil.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                className="w-full"
                placeholder="Email address"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </>
          ) : (
            <p className="truncate max-w-full">
              {opposingCouncil.email || "N/A"}
            </p>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Address
        </h4>
        <div className="flex items-start w-full">
          <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground flex-shrink-0" />
          {isEditing ? (
            <>
              <Input
                value={opposingCouncil.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                className="w-full"
                placeholder="Address"
                maxLength={200}
              />
              {errors.address && (
                <span className="text-red-500 text-xs">{errors.address}</span>
              )}
            </>
          ) : (
            <p className="truncate max-w-full">
              {opposingCouncil.address || "N/A"}
            </p>
          )}
        </div>
      </div>
      {isEditing && onSubmit && (
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      )}
    </form>
  );
};
