import React from "react";
import { Building, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Court } from "@/types/matter.type";

export interface CourtDetailsFormProps {
  court: Court;
  isEditing: boolean;
  onChange: (field: keyof Court, value: string) => void;
  errors?: Record<string, string>;
}

export const CourtDetailsForm: React.FC<CourtDetailsFormProps> = ({
  court,
  isEditing,
  onChange,
  errors = {},
}) => {
  const handleChange = (field: keyof Court, v: string) => onChange(field, v);

  return (
    <form className="space-y-4">
      {/* Court Name */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Court Name
        </h4>
        <div className="flex items-start w-full">
          <Building className="h-4 w-4 mr-2 mt-1" />
          {isEditing ? (
            <div className="flex-grow">
              <Input
                value={court.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Court Name"
                maxLength={50}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>
          ) : (
            <p className="truncate max-w-full">{court.name || "N/A"}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Phone
        </h4>
        <div className="flex items-center w-full">
          <Phone className="h-4 w-4 mr-2" />
          {isEditing ? (
            <div className="flex-grow">
              <Input
                value={court.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Phone"
                maxLength={30}
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
          ) : (
            <p className="truncate max-w-full">{court.phone || "N/A"}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Email
        </h4>
        <div className="flex items-center w-full">
          <Mail className="h-4 w-4 mr-2" />
          {isEditing ? (
            <div className="flex-grow">
              <Input
                type="email"
                value={court.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          ) : (
            <p className="truncate max-w-full">{court.email || "N/A"}</p>
          )}
        </div>
      </div>
    </form>
  );
};
