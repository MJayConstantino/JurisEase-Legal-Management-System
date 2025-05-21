"use client";

import type React from "react";
import { useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { OpposingCouncil } from "@/types/matter.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { opposingCouncilSchema } from "@/validation/matter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { z } from "zod";

export interface OpposingCouncilDetailsFormProps {
  opposingCouncil: OpposingCouncil;
  isEditing: boolean;
  onChange: (field: keyof OpposingCouncil, value: string) => void;
  errors?: { [key: string]: string };
}

export const OpposingCouncilDetailsForm: React.FC<
  OpposingCouncilDetailsFormProps
> = ({ opposingCouncil, isEditing, onChange, errors = {} }) => {
  const form = useForm<z.infer<typeof opposingCouncilSchema>>({
    resolver: zodResolver(opposingCouncilSchema),
    defaultValues: {
      name: opposingCouncil.name || "",
      phone: opposingCouncil.phone || "",
      email: opposingCouncil.email || "",
      address: opposingCouncil.address || "",
    },
    mode: "onChange",
  });

  // Reset form when isEditing changes to false (cancel was clicked)
  useEffect(() => {
    if (!isEditing) {
      form.reset({
        name: opposingCouncil.name || "",
        phone: opposingCouncil.phone || "",
        email: opposingCouncil.email || "",
        address: opposingCouncil.address || "",
      });
    }
  }, [isEditing, opposingCouncil, form]);

  // Update parent component when form values change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name && value[name as keyof typeof value] !== undefined) {
        onChange(
          name as keyof OpposingCouncil,
          value[name as keyof typeof value] as string
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  // Format values for title display
  const displayName = opposingCouncil.name || "N/A";
  const displayPhone = opposingCouncil.phone || "N/A";
  const displayEmail = opposingCouncil.email || "N/A";

  return (
    <Form {...form}>
      <form
        title={`
        Opposing Counse;: ${displayName}
        Phone: ${displayPhone}
        Email: ${displayEmail}
      `}
        className="space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Name */}
        <div className="w-full">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">
            Name
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
                      className={`w-full ${
                        form.formState.errors.name || errors.name
                          ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                      placeholder="Opposing council name"
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-1">
                    <FormControl>
                      <Input
                        {...field}
                        className={`w-full ${
                          form.formState.errors.phone || errors.phone
                            ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                        placeholder="Phone number (8-10 digits or leave empty)"
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-1">
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className={`w-full ${
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
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-1">
                    <FormControl>
                      <Input
                        {...field}
                        className={`w-full ${
                          form.formState.errors.address || errors.address
                            ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                        placeholder="Address"
                        maxLength={200}
                      />
                    </FormControl>
                    <FormMessage />
                    {errors.address && !form.formState.errors.address && (
                      <p className="text-xs text-red-500">{errors.address}</p>
                    )}
                  </FormItem>
                )}
              />
            ) : (
              <p className="truncate max-w-full">
                {opposingCouncil.address || "N/A"}
              </p>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
