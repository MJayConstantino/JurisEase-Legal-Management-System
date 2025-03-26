"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUsersAction } from "@/actions/users";
import { getUserDisplayName } from "@/utils/getUserDisplayName";
import { User } from "@/types/user.type";

interface AssignmentStepProps {
  data: {
    assigned_attorney: string;
    assigned_staff: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AssignmentStep({ data, onChange }: AssignmentStepProps) {
  const [users, setUsers] = useState<User[]>([]);
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

  const selectedAttorneyName = getUserDisplayName(
    data.assigned_attorney,
    users
  );
  const selectedStaffName = getUserDisplayName(
    data.assigned_staff, 
    users
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Assigned Attorney */}
        <div className="space-y-2">
          <Label htmlFor="assigned-attorney">Assigned Attorney</Label>
          <Select
            value={data.assigned_attorney || ""}
            onValueChange={(value) => {
              onChange("assigned_attorney", value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={selectedAttorneyName} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Users</SelectLabel>
                {isLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading users...
                  </SelectItem>
                ) : (
                  users.map((user) => (
                    <SelectItem key={user.user_id} value={user.user_id}>
                      {user.user_name || user.user_email}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Assigned Staff */}
        <div className="space-y-2">
          <Label htmlFor="assigned-staff">Assigned Staff</Label>
          <Select
            value={data.assigned_staff || ""}
            onValueChange={(value) => {
              onChange("assigned_staff", value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={selectedStaffName} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Users</SelectLabel>
                {isLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading users...
                  </SelectItem>
                ) : (
                  users.map((user) => (
                    <SelectItem key={user.user_id} value={user.user_id}>
                      {user.user_name || user.user_email}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
