"use client";

import type React from "react";
import { useEffect } from "react";
import { Building, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Court } from "@/types/matter.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courtSchema } from "@/validation/matter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { z } from "zod";

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
  const form = useForm<z.infer<typeof courtSchema>>({
    resolver: zodResolver(courtSchema),
    defaultValues: {
      name: court.name || "",
      phone: court.phone || "",
      email: court.email || "",
    },
    mode: "onChange",
  });

  // Reset form when isEditing changes to false (cancel was clicked)
  useEffect(() => {
    if (!isEditing) {
      form.reset({
        name: court.name || "",
        phone: court.phone || "",
        email: court.email || "",
      });
    }
  }, [isEditing, court, form]);

  // Update parent component when form values change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name && value[name as keyof typeof value] !== undefined) {
        onChange(
          name as keyof Court,
          value[name as keyof typeof value] as string
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  // Format values for title display
  const displayName = court.name || "N/A";
  const displayPhone = court.phone || "N/A";
  const displayEmail = court.email || "N/A";

  return (
    <Form {...form}>
      <form
        title={`
        Court Name: ${displayName}
        Phone: ${displayPhone}
        Email: ${displayEmail}`}
        className="space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Court Name */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Court Name
          </h4>
          <div className="flex items-start w-full">
            <Building className="h-4 w-4 mr-2 mt-1" />
            {isEditing ? (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-grow space-y-1">
                    <FormControl>
                      <Input
                        {...field}
                        className={`${
                          form.formState.errors.name || errors.name
                            ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                        placeholder="Court Name"
                        maxLength={50}
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-grow space-y-1">
                    <FormControl>
                      <Input
                        {...field}
                        className={`${
                          form.formState.errors.phone || errors.phone
                            ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                        placeholder="Phone (8-10 digits or leave empty)"
                      />
                    </FormControl>
                    <FormMessage />
                    {errors.phone && !form.formState.errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow space-y-1">
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className={`${
                          form.formState.errors.email || errors.email
                            ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                        placeholder="Email address (or leave empty)"
                      />
                    </FormControl>
                    <FormMessage />
                    {errors.email && !form.formState.errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </FormItem>
                )}
              />
            ) : (
              <p className="truncate max-w-full">{court.email || "N/A"}</p>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
