"use client";

import type React from "react";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  Briefcase,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Matter } from "@/types/matter.type";
import type { User as UserType } from "@/types/user.type";
import { getUserDisplayName } from "@/utils/getUserDisplayName";
import { getStatusColor } from "@/utils/getStatusColor";
import { formatDateForDisplay } from "@/utils/formatDateForDisplay";
import { formatDateForInput } from "@/utils/formatDateForInput";

export interface CaseDetailsFormProps {
  matter: Matter;
  users: UserType[];
  isEditing: boolean;
  onChange: (field: keyof Matter, value: any) => void;
  errors?: Record<string, string>;
}

export const CaseDetailsForm: React.FC<CaseDetailsFormProps> = ({
  matter,
  users,
  isEditing,
  onChange,
  errors = {},
}) => {
  // Find the user objects for the assigned attorney and staff
  const assignedAttorney = matter.assigned_attorney
    ? users.find((user) => user.user_id === matter.assigned_attorney)
    : null;

  const assignedStaff = matter.assigned_staff
    ? users.find((user) => user.user_id === matter.assigned_staff)
    : null;

  return (
    <form className="space-y-6">
      {/* Main Case Information */}
      <div className="space-y-4">
        {/* Title */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Case Title
          </h4>
          {isEditing ? (
            <div className="space-y-1">
              <Input
                value={matter.name}
                onChange={(e) => onChange("name", e.target.value)}
                maxLength={100}
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>
          ) : (
            <p className="truncate max-w-[500px]">{matter.name}</p>
          )}
        </div>

        {/* Number & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Case Number
            </h4>
            {isEditing ? (
              <div className="space-y-1">
                <Input
                  value={matter.case_number}
                  onChange={(e) => onChange("case_number", e.target.value)}
                  maxLength={15}
                />
                {errors.case_number && (
                  <p className="text-xs text-red-500">{errors.case_number}</p>
                )}
              </div>
            ) : (
              <p>{matter.case_number}</p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Status
            </h4>
            {isEditing ? (
              <div className="space-y-1">
                <Select
                  value={matter.status}
                  onValueChange={(val) => onChange("status", val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-xs text-red-500">{errors.status}</p>
                )}
              </div>
            ) : (
              <Badge
                variant="outline"
                className={getStatusColor(matter.status)}
              >
                {matter.status.charAt(0).toUpperCase() + matter.status.slice(1)}
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Case Description
          </h4>
          {isEditing ? (
            <div className="space-y-1">
              <Textarea
                value={matter.description || ""}
                onChange={(e) => onChange("description", e.target.value)}
                rows={3}
                maxLength={200}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>
          ) : (
            <p className="text-sm line-clamp-3">
              {matter.description || "N/A"}
            </p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Open Date
            </h4>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  type="date"
                  value={formatDateForInput(matter.date_opened)}
                  onChange={(e) => onChange("date_opened", e.target.value)}
                  className="w-full"
                />
              ) : (
                <p>{formatDateForDisplay(matter.date_opened)}</p>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Close Date
            </h4>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  type="date"
                  value={formatDateForInput(matter.date_closed)}
                  onChange={(e) =>
                    onChange("date_closed", e.target.value || null)
                  }
                  className="w-full"
                  disabled={matter.status !== "closed"}
                />
              ) : (
                <p>{formatDateForDisplay(matter.date_closed)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">
            Client Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm text-muted-foreground mb-1">
                Client Name
              </h5>
              {isEditing ? (
                <div className="space-y-1">
                  <Input
                    value={matter.client ?? ""}
                    onChange={(e) => onChange("client", e.target.value)}
                    maxLength={50}
                    placeholder="Client Name"
                  />
                  {errors.client && (
                    <p className="text-xs text-red-500">{errors.client}</p>
                  )}
                </div>
              ) : (
                <p className="font-medium truncate">{matter.client || "N/A"}</p>
              )}
            </div>
            <div>
              <div className="space-y-2">
                <h5 className="text-sm text-muted-foreground mb-1">
                  Contact Phone
                </h5>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <div className="flex-1 space-y-1">
                      <Input
                        value={matter.client_phone ?? ""}
                        placeholder="Client Phone"
                        onChange={(e) =>
                          onChange("client_phone", e.target.value ?? "")
                        }
                        maxLength={30}
                      />
                      {errors.client_phone && (
                        <p className="text-xs text-red-500">
                          {errors.client_phone}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="truncate max-w-full">
                      {matter.client_phone || "N/A"}
                    </p>
                  )}
                </div>
                <h5 className="text-sm text-muted-foreground mb-1">
                  Contact Email
                </h5>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <div className="flex-1 space-y-1">
                      <Input
                        type="email"
                        value={matter.client_email ?? ""}
                        onChange={(e) =>
                          onChange("client_email", e.target.value ?? "")
                        }
                        placeholder="Client Email"
                      />
                      {errors.client_email && (
                        <p className="text-xs text-red-500">
                          {errors.client_email}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="truncate max-w-full">
                      {matter.client_email || "N/A"}
                    </p>
                  )}
                </div>
                <h5 className="text-sm text-muted-foreground mb-1">Address</h5>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {isEditing ? (
                    <div className="flex-1 space-y-1">
                      <Input
                        value={matter.client_address ?? ""}
                        onChange={(e) =>
                          onChange("client_address", e.target.value)
                        }
                        maxLength={200}
                        placeholder="Client Address"
                      />
                      {errors.client_address && (
                        <p className="text-xs text-red-500">
                          {errors.client_address}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="truncate max-w-full">
                      {matter.client_address || "N/A"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment Section */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">
            Case Assignment
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assigned Attorney */}
            <div>
              <h5 className="text-sm text-muted-foreground mb-1">
                Assigned Attorney
              </h5>
              <div className="flex flex-col space-y-2">
                {isEditing ? (
                  <>
                    {/* Show selected attorney as a badge with remove button */}
                    {assignedAttorney && (
                      <div className="flex items-center mb-2">
                        <Badge className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          <Briefcase className="h-3 w-3" />
                          <span>
                            {assignedAttorney.user_name ||
                              assignedAttorney.user_email}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                            onClick={() => onChange("assigned_attorney", null)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </Badge>
                      </div>
                    )}

                    {/* Only show select if no attorney is assigned */}
                    {!assignedAttorney && (
                      <Select
                        value={matter.assigned_attorney || ""}
                        onValueChange={(value) =>
                          onChange("assigned_attorney", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select attorney..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Users</SelectLabel>
                            {users.map((user) => (
                              <SelectItem
                                key={user.user_id}
                                value={user.user_id}
                              >
                                {user.user_name || user.user_email}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </>
                ) : (
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="truncate max-w-full">
                      {getUserDisplayName(
                        matter.assigned_attorney || "",
                        users
                      ) || "N/A"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Assigned Staff */}
            <div>
              <h5 className="text-sm text-muted-foreground mb-1">
                Assigned Staff
              </h5>
              <div className="flex flex-col space-y-2">
                {isEditing ? (
                  <>
                    {/* Show selected staff as a badge with remove button */}
                    {assignedStaff && (
                      <div className="flex items-center mb-2">
                        <Badge className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          <User className="h-3 w-3" />
                          <span>
                            {assignedStaff.user_name ||
                              assignedStaff.user_email}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-green-200 dark:hover:bg-green-800"
                            onClick={() => onChange("assigned_staff", null)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </Badge>
                      </div>
                    )}

                    {/* Only show select if no staff is assigned */}
                    {!assignedStaff && (
                      <Select
                        value={matter.assigned_staff || ""}
                        onValueChange={(value) =>
                          onChange("assigned_staff", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select staff member..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Users</SelectLabel>
                            {users.map((user) => (
                              <SelectItem
                                key={user.user_id}
                                value={user.user_id}
                              >
                                {user.user_name || user.user_email}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </>
                ) : (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="truncate max-w-full">
                      {getUserDisplayName(matter.assigned_staff || "", users) ||
                        "N/A"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
