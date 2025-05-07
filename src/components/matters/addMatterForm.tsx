import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MatterStatus } from "@/types/matter.type";

export interface MatterData {
  name: string;
  client: string;
  case_number: string;
  status: MatterStatus;
}

export interface MatterFormProps {
  data: MatterData;
  errors?: Partial<Record<keyof MatterData, string>>;
  isSubmitting?: boolean;
  onChange: (field: keyof MatterData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

export const MatterForm: React.FC<MatterFormProps> = ({
  data,
  errors = {},
  isSubmitting = false,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="matter-name">Matter Name *</Label>
        <Input
          id="matter-name"
          className="dark:bg-gray-700 dark:border-gray-600"
          placeholder="Case Name"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          maxLength={50}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name}</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="case-number">Case Number *</Label>
        <Input
          id="case-number"
          className="dark:bg-gray-700 dark:border-gray-600"
          placeholder="Case Number"
          value={data.case_number}
          onChange={(e) => onChange("case_number", e.target.value)}
          maxLength={20}
        />
        {errors.case_number && (
          <span className="text-red-500 text-xs">{errors.case_number}</span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="client-name">Client Name</Label>
        <Input
          id="client-name"
          className="dark:bg-gray-700 dark:border-gray-600"
          placeholder="Client name (this can be updated later)"
          value={data.client}
          onChange={(e) => onChange("client", e.target.value)}
          maxLength={50}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={data.status}
          onValueChange={(value) => onChange("status", value)}
        >
          <SelectTrigger
            id="status"
            className="dark:bg-gray-700 dark:border-gray-600"
          >
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {onCancel && (
          <Button
            type="button"
            className="text-sm md:text-base h-9 md:h-10 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Matter"}
        </Button>
      </div>
    </form>
  );
};
