"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MatterStatus } from "@/types/matter.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { matterSchema } from "@/validation/matter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { z } from "zod";

export interface MatterData {
  name: string;
  client: string;
  case_number: string;
  status: MatterStatus;
}

export interface MatterFormProps {
  data: MatterData;
  isSubmitting?: boolean;
  onSubmit: (data: MatterData) => void;
  onCancel?: () => void;
}

export const MatterForm: React.FC<MatterFormProps> = ({
  data,
  isSubmitting = false,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<z.infer<typeof matterSchema>>({
    resolver: zodResolver(matterSchema),
    defaultValues: {
      name: data.name,
      client: data.client,
      case_number: data.case_number,
      status: data.status,
    },
  });

  const handleSubmit = (values: z.infer<typeof matterSchema>) => {
    onSubmit({
      ...values,
      client: values.client ?? "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="matter-name">Matter Name *</FormLabel>
              <FormControl>
                <Input
                  id="matter-name"
                  placeholder="Case Name"
                  maxLength={50}
                  {...field}
                  className={`${
                    form.formState.errors.name
                      ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                      : ""
                  } dark:bg-gray-700 dark:border-gray-600`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="case_number"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="case-number">Case Number *</FormLabel>
              <FormControl>
                <Input
                  id="case-number"
                  placeholder="Case Number"
                  maxLength={20}
                  {...field}
                  className={`${
                    form.formState.errors.case_number
                      ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                      : ""
                  } dark:bg-gray-700 dark:border-gray-600`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="client-name">Client Name</FormLabel>
              <FormControl>
                <Input
                  id="client-name"
                  placeholder="Client name (this can be updated later)"
                  maxLength={50}
                  {...field}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel htmlFor="status">Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    id="status"
                    className={`${
                      form.formState.errors.status
                        ? "border-red-500 ring-1 ring-red-500 focus-visible:ring-red-500"
                        : ""
                    } dark:bg-gray-700 dark:border-gray-600`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
    </Form>
  );
};
