"use client";

import type React from "react";
import { useEffect } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { caseSchema } from "@/validation/matter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { z } from "zod";

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

  const form = useForm<z.infer<typeof caseSchema>>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      name: matter.name,
      case_number: matter.case_number,
      status: matter.status,
      description: matter.description || "",
      client: matter.client || "",
      client_phone: matter.client_phone || "",
      client_email: matter.client_email || "",
      client_address: matter.client_address || "",
    },
    mode: "onChange",
  });

  // Reset form when isEditing changes to false (cancel was clicked)
  useEffect(() => {
    if (!isEditing) {
      form.reset({
        name: matter.name,
        case_number: matter.case_number,
        status: matter.status,
        description: matter.description || "",
        client: matter.client || "",
        client_phone: matter.client_phone || "",
        client_email: matter.client_email || "",
        client_address: matter.client_address || "",
      });
    }
  }, [isEditing, matter, form]);

  // Update parent component when form values change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name && value[name as keyof typeof value] !== undefined) {
        onChange(name as keyof Matter, value[name as keyof typeof value]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  // Format values for title display
  const displayClientPhone = matter.client_phone || "No phone provided";
  const displayClientEmail = matter.client_email || "No email provided";
  const displayClientAddress = matter.client_address || "No address provided";

  return (
    <Form {...form}>
      <form
        title={`
          Name: ${matter.name}
          Case Number: ${matter.case_number}
          Status: ${matter.status}
          Open Date: ${formatDateForDisplay(matter.date_opened)}
          Close Date: ${formatDateForDisplay(matter.date_closed)}
          Client: ${matter.client}
          Client Phone: ${displayClientPhone}
          Client Email: ${displayClientEmail}
          Client Address: ${displayClientAddress}
          Assigned Attorney: ${getUserDisplayName(
            matter.assigned_attorney || "",
            users
          )}
          Assigned Staff: ${getUserDisplayName(
            matter.assigned_staff || "",
            users
          )}`}
        className="space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Main Case Information */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Case Title
            </h4>
            {isEditing ? (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input
                        {...field}
                        className={`${
                          form.formState.errors.name || errors.name
                            ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                        maxLength={100}
                      />
                    </FormControl>
                    <FormMessage />
                    {errors.name && !form.formState.errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </FormItem>
                )}
              />
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
                <FormField
                  control={form.control}
                  name="case_number"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input
                          {...field}
                          className={`${
                            form.formState.errors.case_number ||
                            errors.case_number
                              ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                              : ""
                          }`}
                          maxLength={15}
                        />
                      </FormControl>
                      <FormMessage />
                      {errors.case_number &&
                        !form.formState.errors.case_number && (
                          <p className="text-xs text-red-500">
                            {errors.case_number}
                          </p>
                        )}
                    </FormItem>
                  )}
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
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          field.onChange(val);
                          // Update date_closed based on status
                          if (val === "closed" && matter.status !== "closed") {
                            onChange("date_closed", new Date());
                          } else if (
                            val !== "closed" &&
                            matter.status === "closed"
                          ) {
                            onChange("date_closed", undefined);
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`w-full ${
                              form.formState.errors.status || errors.status
                                ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                                : ""
                            }`}
                          >
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      {errors.status && !form.formState.errors.status && (
                        <p className="text-xs text-red-500">{errors.status}</p>
                      )}
                    </FormItem>
                  )}
                />
              ) : (
                <Badge
                  variant="outline"
                  className={getStatusColor(matter.status)}
                >
                  {matter.status.charAt(0).toUpperCase() +
                    matter.status.slice(1)}
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Textarea
                        {...field}
                        className={`${
                          form.formState.errors.description ||
                          errors.description
                            ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                        rows={3}
                        maxLength={200}
                      />
                    </FormControl>
                    <FormMessage />
                    {errors.description &&
                      !form.formState.errors.description && (
                        <p className="text-xs text-red-500">
                          {errors.description}
                        </p>
                      )}
                  </FormItem>
                )}
              />
            ) : (
              <p className="text-sm line-clamp-3">
                {matter.description || "No case description provided."}
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
                      onChange("date_closed", e.target.value ?? null)
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
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <Input
                            {...field}
                            className={`${
                              form.formState.errors.client || errors.client
                                ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                                : ""
                            }`}
                            maxLength={50}
                            placeholder="Client Name"
                          />
                        </FormControl>
                        <FormMessage />
                        {errors.client && !form.formState.errors.client && (
                          <p className="text-xs text-red-500">
                            {errors.client}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className="font-medium truncate">{matter.client}</p>
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
                      <FormField
                        control={form.control}
                        name="client_phone"
                        render={({ field }) => (
                          <FormItem className="flex-1 space-y-1">
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value ?? ""}
                                className={`${
                                  form.formState.errors.client_phone ||
                                  errors.client_phone
                                    ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                                    : ""
                                }`}
                                placeholder="Client Phone"
                              />
                            </FormControl>
                            <FormMessage />
                            {errors.client_phone &&
                              !form.formState.errors.client_phone && (
                                <p className="text-xs text-red-500">
                                  {errors.client_phone}
                                </p>
                              )}
                          </FormItem>
                        )}
                      />
                    ) : (
                      <p className="truncate max-w-full">
                        {displayClientPhone}
                      </p>
                    )}
                  </div>
                  <h5 className="text-sm text-muted-foreground mb-1">
                    Contact Email
                  </h5>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <FormField
                        control={form.control}
                        name="client_email"
                        render={({ field }) => (
                          <FormItem className="flex-1 space-y-1">
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                value={field.value ?? ""}
                                className={`${
                                  form.formState.errors.client_email ||
                                  errors.client_email
                                    ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                                    : ""
                                }`}
                                placeholder="Client Email"
                              />
                            </FormControl>
                            <FormMessage />
                            {errors.client_email &&
                              !form.formState.errors.client_email && (
                                <p className="text-xs text-red-500">
                                  {errors.client_email}
                                </p>
                              )}
                          </FormItem>
                        )}
                      />
                    ) : (
                      <p className="truncate max-w-full">
                        {displayClientEmail}
                      </p>
                    )}
                  </div>
                  <h5 className="text-sm text-muted-foreground mb-1">
                    Address
                  </h5>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <FormField
                        control={form.control}
                        name="client_address"
                        render={({ field }) => (
                          <FormItem className="flex-1 space-y-1">
                            <FormControl>
                              <Input
                                {...field}
                                value={field.value ?? ""}
                                className={`${
                                  form.formState.errors.client_address ||
                                  errors.client_address
                                    ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                                    : ""
                                }`}
                                maxLength={200}
                                placeholder="Client Address"
                              />
                            </FormControl>
                            <FormMessage />
                            {errors.client_address &&
                              !form.formState.errors.client_address && (
                                <p className="text-xs text-red-500">
                                  {errors.client_address}
                                </p>
                              )}
                          </FormItem>
                        )}
                      />
                    ) : (
                      <p className="truncate max-w-full">
                        {displayClientAddress}
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
                          <Badge className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 max-w-full">
                            <Briefcase className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">
                              {assignedAttorney.user_name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 flex-shrink-0"
                              onClick={() =>
                                onChange("assigned_attorney", null)
                              }
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
                      <Briefcase className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                      <p className="truncate max-w-full">
                        {getUserDisplayName(
                          matter.assigned_attorney ?? "",
                          users
                        ) || "No attorney assigned"}
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
                          <Badge className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 max-w-full">
                            <User className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">
                              {assignedStaff.user_name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-green-200 dark:hover:bg-green-800 flex-shrink-0"
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
                      <User className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                      <p className="truncate max-w-full">
                        {getUserDisplayName(
                          matter.assigned_staff ?? "",
                          users
                        ) || "No staff assigned"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
