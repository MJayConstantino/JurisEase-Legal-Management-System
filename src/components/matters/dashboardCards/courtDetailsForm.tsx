import React, { useState } from "react";
import { Phone, Mail, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Court } from "@/types/matter.type";
import { courtSchema } from "@/validation/matter";

export interface CourtDetailsFormProps {
  court: Court;
  isEditing: boolean;
  onChange: (field: keyof Court, value: string) => void;
  onSubmit?: () => void;
}

export const CourtDetailsForm: React.FC<CourtDetailsFormProps> = ({
  court,
  isEditing,
  onChange,
  onSubmit,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFieldChange = (field: keyof Court, value: string) => {
    onChange(field, value);
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = courtSchema.safeParse(court);
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
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Court Name
        </h4>
        <div className="flex items-start w-full">
          <Building className="h-4 w-4 mr-2 mt-1 text-muted-foreground flex-shrink-0" />
          <div className="flex-grow">
            {isEditing ? (
              <>
                <Input
                  value={court.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="w-full"
                  placeholder="Court name"
                  maxLength={100}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">{errors.name}</span>
                )}
              </>
            ) : (
              <p className="font-medium truncate max-w-full">
                {court.name || "N/A"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Contact Phone
        </h4>
        <div className="flex items-center w-full">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
          <div className="flex-grow">
            {isEditing ? (
              <>
                <Input
                  value={court.phone}
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
              <p className="truncate max-w-full">{court.phone || "N/A"}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Contact Email
        </h4>
        <div className="flex items-center w-full">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
          <div className="flex-grow">
            {isEditing ? (
              <>
                <Input
                  type="email"
                  value={court.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className="w-full"
                  placeholder="Email address"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email}</span>
                )}
              </>
            ) : (
              <p className="truncate max-w-full">{court.email || "N/A"}</p>
            )}
          </div>
        </div>
      </div>
      {/* Only show submit button if editing and onSubmit is provided */}
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
