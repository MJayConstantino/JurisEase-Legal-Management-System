import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OpposingCouncil } from "@/types/matter.type";

export interface OpposingCouncilDetailsFormProps {
  opposingCouncil: OpposingCouncil;
  isEditing: boolean;
  onChange: (field: keyof OpposingCouncil, value: string) => void;
  errors?: { [key: string]: string };
}

export const OpposingCouncilDetailsForm: React.FC<
  OpposingCouncilDetailsFormProps
> = ({ opposingCouncil, isEditing, onChange, errors = {} }) => {
  const handleFieldChange = (field: keyof OpposingCouncil, value: string) => {
    onChange(field, value);
  };

  return (
    <form
      title={`
      Opposing Council: ${opposingCouncil.name}
      Phone: ${opposingCouncil.phone}
      Email: ${opposingCouncil.email}
    `}
      className="space-y-4"
    >
      {/* Name */}
      <div className="w-full">
        <h4 className="text-sm font-medium text-muted-foreground mb-1">Name</h4>
        {isEditing ? (
          <div className="space-y-1">
            <Input
              value={opposingCouncil.name ?? ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="w-full"
              placeholder="Opposing council name"
              maxLength={50}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name}</span>
            )}
          </div>
        ) : (
          <p className="font-medium truncate max-w-full">
            {opposingCouncil.name || "N/A"}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Contact Phone
        </h4>
        <div className="flex items-start w-full space-x-2">
          <Phone className="h-4 w-4 mt-2 text-muted-foreground flex-shrink-0" />
          {isEditing ? (
            <div className="flex-1 space-y-1">
              <Input
                value={opposingCouncil.phone ?? ""}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                className="w-full"
                placeholder="Phone number"
                maxLength={30}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">{errors.phone}</span>
              )}
            </div>
          ) : (
            <p className="truncate max-w-full">
              {opposingCouncil.phone || "N/A"}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Contact Email
        </h4>
        <div className="flex items-start w-full space-x-2">
          <Mail className="h-4 w-4 mt-2 text-muted-foreground flex-shrink-0" />
          {isEditing ? (
            <div className="flex-1 space-y-1">
              <Input
                type="email"
                value={opposingCouncil.email ?? ""}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                className="w-full"
                placeholder="Email address"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>
          ) : (
            <p className="truncate max-w-full">
              {opposingCouncil.email || "N/A"}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">
          Address
        </h4>
        <div className="flex items-start w-full space-x-2">
          <MapPin className="h-4 w-4 mt-2 text-muted-foreground flex-shrink-0" />
          {isEditing ? (
            <div className="flex-1 space-y-1">
              <Input
                value={opposingCouncil.address ?? ""}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                className="w-full"
                placeholder="Address"
                maxLength={200}
              />
              {errors.address && (
                <span className="text-red-500 text-xs">{errors.address}</span>
              )}
            </div>
          ) : (
            <p className="truncate max-w-full">
              {opposingCouncil.address || "N/A"}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
