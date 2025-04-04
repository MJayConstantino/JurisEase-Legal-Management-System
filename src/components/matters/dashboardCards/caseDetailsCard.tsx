"use client";

import { useState, useEffect } from "react";
import { Calendar, Phone, Mail, MapPin, User, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditableCard } from "../editableCard";
import { updateMatter } from "@/actions/matters";
import { Matter } from "@/types/matter.type";
import { toast } from "sonner";
import { fetchUsersAction } from "@/actions/users";
import { getUserDisplayName } from "@/utils/getUserDisplayName";
import { getStatusColor } from "@/utils/getStatusColor";
import { User as UserType } from "@/types/user.type";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateForDisplay } from "@/utils/formatDateForDisplay";
import { formatDateForInput } from "@/utils/formatDateForInput";

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
      // If changing status to closed, update date_closed to today as a Date object
      if (
        field === "status" &&
        value === "closed" &&
        prev.status !== "closed"
      ) {
        return {
          ...prev,
          [field]: value,
          date_closed: new Date(),
        };
      }
      // If changing status from closed to something else, clear date_closed
      else if (
        field === "status" &&
        value !== "closed" &&
        prev.status === "closed"
      ) {
        return {
          ...prev,
          [field]: value,
          date_closed: undefined,
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSave = async () => {
    try {
      const updatedMatter = await updateMatter(editedMatter);
      onUpdate?.(updatedMatter);
      toast.success("Case details have been updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update case details. Please try again.");
      setEditedMatter({ ...matter });
    }
  };

  const handleCancel = () => {
    setEditedMatter({ ...matter });
  };

  if (isLoading) {
    return (
      <EditableCard
        title="Case Details"
        onSave={handleSave}
        onCancel={handleCancel}
      >
        <div className="space-y-6">
          {/* Main info skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/3" />
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </div>

          {/* Client info skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-2">
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-6 flex-1" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-6 flex-1" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-6 flex-1" />
              </div>
            </div>
          </div>

          {/* Assignment skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-6 flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-6 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </EditableCard>
    );
  }

  return (
    <EditableCard
      title="Case Details"
      onSave={handleSave}
      onCancel={handleCancel}
    >
      {(isEditing) => (
        <div className="space-y-6">
          {/* Main Case Information */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Case Title
              </h4>
              {isEditing ? (
                <Input
                  value={editedMatter.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              ) : (
                <p className="font-medium">{editedMatter.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Case Number
                </h4>
                {isEditing ? (
                  <Input
                    value={editedMatter.case_number || ""}
                    onChange={(e) =>
                      handleChange("case_number", e.target.value)
                    }
                  />
                ) : (
                  <p>{editedMatter.case_number || "N/A"}</p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Status
                </h4>
                {isEditing ? (
                  <Select
                    value={editedMatter.status}
                    onValueChange={(value) => handleChange("status", value)}
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
                ) : (
                  <Badge
                    className={getStatusColor(editedMatter.status)}
                    variant="outline"
                  >
                    {editedMatter.status.charAt(0).toUpperCase() +
                      editedMatter.status.slice(1)}
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Case Description
              </h4>
              {isEditing ? (
                <Textarea
                  value={editedMatter.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={3}
                />
              ) : (
                <p className="text-sm">{editedMatter.description || "N/A"}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Open Date
                </h4>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      type="date"
                      value={formatDateForInput(editedMatter.date_opened)}
                      onChange={(e) =>
                        handleChange("date_opened", e.target.value)
                      }
                      className="w-full"
                    />
                  ) : (
                    <p>{formatDateForDisplay(editedMatter.date_opened)}</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Close Date
                </h4>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      type="date"
                      value={formatDateForInput(editedMatter.date_closed)}
                      onChange={(e) =>
                        handleChange("date_closed", e.target.value || null)
                      }
                      className="w-full"
                      disabled={editedMatter.status !== "closed"}
                    />
                  ) : (
                    <p>{formatDateForDisplay(editedMatter.date_closed)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Client Information */}
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
                  <Input
                    value={editedMatter.client}
                    onChange={(e) => handleChange("client", e.target.value)}
                  />
                ) : (
                  <p className="font-medium">{editedMatter.client}</p>
                )}
              </div>

              <div className="space-y-2">
                <h5 className="text-sm text-muted-foreground mb-1">
                  Client Contact Information
                </h5>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedMatter.client_phone || ""}
                      onChange={(e) =>
                        handleChange("client_phone", e.target.value)
                      }
                      placeholder="Phone"
                    />
                  ) : (
                    <p>{editedMatter.client_phone || "N/A"}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedMatter.client_email || ""}
                      onChange={(e) =>
                        handleChange("client_email", e.target.value)
                      }
                      placeholder="Email"
                    />
                  ) : (
                    <p>{editedMatter.client_email || "N/A"}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {isEditing ? (
                    <Input
                      value={editedMatter.client_address || ""}
                      onChange={(e) =>
                        handleChange("client_address", e.target.value)
                      }
                      placeholder="Address"
                      className="w-full"
                    />
                  ) : (
                    <p>{editedMatter.client_address || "N/A"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Section - All in one row */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              Case Assignment
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
  <h5 className="text-sm text-muted-foreground mb-1">Assigned Attorney</h5>
  <div className="flex items-center">
    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
    {isEditing ? (
      <Select
        value={editedMatter.assigned_attorney || ""}
        onValueChange={(value) => handleChange("assigned_attorney", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select attorney..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {users.map((user) => (
              <SelectItem key={user.user_id} value={user.user_id}>
                {user.user_name || user.user_email}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    ) : (
      <p>
        {getUserDisplayName(editedMatter.assigned_attorney || "", users) ||
          "N/A"}
      </p>
    )}
  </div>
</div>

              <div>
  <h5 className="text-sm text-muted-foreground mb-1">Assigned Staff</h5>
  <div className="flex items-center">
    <User className="h-4 w-4 mr-2 text-muted-foreground" />
    {isEditing ? (
      <Select
        value={editedMatter.assigned_staff || ""}
        onValueChange={(value) => handleChange("assigned_staff", value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select staff member..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {users.map((user) => (
              <SelectItem key={user.user_id} value={user.user_id}>
                {user.user_name || user.user_email}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    ) : (
      <p>
        {getUserDisplayName(editedMatter.assigned_staff || "", users) || "N/A"}
      </p>
    )}
  </div>
</div>
            </div>
          </div>
        </div>
      )}
    </EditableCard>
  );
}
