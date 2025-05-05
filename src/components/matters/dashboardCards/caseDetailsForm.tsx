import React from "react";
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
  onChange: (field: string, value: any) => void;
}

export const CaseDetailsForm: React.FC<CaseDetailsFormProps> = ({
  matter,
  users,
  isEditing,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Main Case Information */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Case Title
          </h4>
          {isEditing ? (
            <Input
              value={matter.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder={matter.name}
              maxLength={100}
            />
          ) : (
            <p className="truncate max-w-[500px]">{matter.name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Case Number
            </h4>
            {isEditing ? (
              <Input
                value={matter.case_number}
                onChange={(e) => onChange("case_number", e.target.value)}
                placeholder={matter.case_number}
                maxLength={50}
              />
            ) : (
              <p>{matter.case_number}</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Status
            </h4>
            {isEditing ? (
              <Select
                value={matter.status}
                onValueChange={(value) => onChange("status", value)}
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
                variant="outline"
                className={getStatusColor(matter.status)}
              >
                {matter.status.charAt(0).toUpperCase() + matter.status.slice(1)}
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
              value={matter.description || ""}
              onChange={(e) => onChange("description", e.target.value)}
              rows={3}
              maxLength={500}
            />
          ) : (
            <p className="text-sm line-clamp-3">
              {matter.description || "N/A"}
            </p>
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
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
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
      </div>

      {/* Client Information */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground mb-2">
          Client Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm text-muted-foreground mb-1">Client Name</h5>
            {isEditing ? (
              <Input
                value={matter.client || ""}
                onChange={(e) => onChange("client", e.target.value)}
                maxLength={100}
              />
            ) : (
              <p className="font-medium truncate">{matter.client || "N/A"}</p>
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
                  value={matter.client_phone || ""}
                  onChange={(e) => onChange("client_phone", e.target.value)}
                  placeholder="Phone"
                  maxLength={30}
                />
              ) : (
                <p className="truncate max-w-full">
                  {matter.client_phone || "N/A"}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              {isEditing ? (
                <Input
                  type="email"
                  value={matter.client_email || ""}
                  onChange={(e) => onChange("client_email", e.target.value)}
                  placeholder="Email"
                />
              ) : (
                <p className="truncate max-w-full">
                  {matter.client_email || "N/A"}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={matter.client_address || ""}
                  onChange={(e) => onChange("client_address", e.target.value)}
                  placeholder="Address"
                  maxLength={200}
                />
              ) : (
                <p className="truncate max-w-full">
                  {matter.client_address || "N/A"}
                </p>
              )}
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
          <div>
            <h5 className="text-sm text-muted-foreground mb-1">
              Assigned Attorney
            </h5>
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
              {isEditing ? (
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
                        <SelectItem key={user.user_id} value={user.user_id}>
                          {user.user_name || user.user_email}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="truncate max-w-full">
                  {getUserDisplayName(matter.assigned_attorney || "", users) ||
                    "N/A"}
                </p>
              )}
            </div>
          </div>

          <div>
            <h5 className="text-sm text-muted-foreground mb-1">
              Assigned Staff
            </h5>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              {isEditing ? (
                <Select
                  value={matter.assigned_staff || ""}
                  onValueChange={(value) => onChange("assigned_staff", value)}
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
                <p className="truncate max-w-full">
                  {getUserDisplayName(matter.assigned_staff || "", users) ||
                    "N/A"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
