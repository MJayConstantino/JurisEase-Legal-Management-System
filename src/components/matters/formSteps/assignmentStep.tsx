"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { User } from "@/types/user.type";

interface AssignmentStepProps {
  data: {
    assignedAttorney: string;
    assignedStaff: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AssignmentStep({ data, onChange }: AssignmentStepProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openAttorney, setOpenAttorney] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        // Fetch users from Supabase with the correct field names
        const { data: userData, error } = await supabase
          .from("users")
          .select("user_id, user_name, user_email");

        if (error) {
          console.error("Error fetching users:", error);
          return;
        }

        setUsers(userData || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="assigned-attorney">Assigned Attorney</Label>
          <div className="flex gap-2">
            <Popover open={openAttorney} onOpenChange={setOpenAttorney}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openAttorney}
                  className="w-full justify-between"
                >
                  {data.assignedAttorney
                    ? users.find(
                        (user) =>
                          user.user_name === data.assignedAttorney ||
                          user.user_email === data.assignedAttorney
                      )?.user_name || data.assignedAttorney
                    : "Select attorney..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search users..." />
                  <CommandList>
                    <CommandEmpty>
                      {isLoading ? "Loading..." : "No users found."}
                    </CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.user_id}
                          value={user.user_name || user.user_email}
                          onSelect={() => {
                            onChange(
                              "assignedAttorney",
                              user.user_name || user.user_email
                            );
                            setOpenAttorney(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              data.assignedAttorney === user.user_name ||
                                data.assignedAttorney === user.user_email
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {user.user_name || user.user_email}
                        </CommandItem>
                      ))}
                      <CommandItem
                        value="custom"
                        onSelect={() => {
                          setOpenAttorney(false);
                        }}
                        className="border-t"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Enter custom name
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Input
              id="assigned-attorney"
              placeholder="Or enter attorney name"
              value={data.assignedAttorney}
              onChange={(e) => onChange("assignedAttorney", e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assigned-staff">Assigned Staff</Label>
          <div className="flex gap-2">
            <Popover open={openStaff} onOpenChange={setOpenStaff}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openStaff}
                  className="w-full justify-between"
                >
                  {data.assignedStaff
                    ? users.find(
                        (user) =>
                          user.user_name === data.assignedStaff ||
                          user.user_email === data.assignedStaff
                      )?.user_name || data.assignedStaff
                    : "Select staff member..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search users..." />
                  <CommandList>
                    <CommandEmpty>
                      {isLoading ? "Loading..." : "No users found."}
                    </CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.user_id}
                          value={user.user_name || user.user_email}
                          onSelect={() => {
                            onChange(
                              "assignedStaff",
                              user.user_name || user.user_email
                            );
                            setOpenStaff(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              data.assignedStaff === user.user_name ||
                                data.assignedStaff === user.user_email
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {user.user_name || user.user_email}
                        </CommandItem>
                      ))}
                      <CommandItem
                        value="custom"
                        onSelect={() => {
                          setOpenStaff(false);
                        }}
                        className="border-t"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Enter custom name
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Input
              id="assigned-staff"
              placeholder="Or enter staff name"
              value={data.assignedStaff}
              onChange={(e) => onChange("assignedStaff", e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
