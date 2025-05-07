import { z } from "zod";

// Zod schema for validation
export const matterSchema = z.object({
  name: z.string().min(1, "Matter name is required"),
  client: z.string().optional(),
  case_number: z.string().min(1, "Case number is required"),
  status: z.enum(["open", "pending", "closed"]),
});

// Case Details Schema
export const caseSchema = z.object({
  name: z
    .string()
    .min(1, "Case title is required")
    .max(100, "Max 100 characters"),
  case_number: z
    .string()
    .min(1, "Case number is required")
    .max(15, "Max 15 characters"),
  status: z.enum(["open", "pending", "closed"]),
  description: z.string().max(200, "Max 200 characters").optional(),
  client: z.string().max(50, "Max 50 characters").optional(),
  client_phone: z.string().max(30, "Max 30 characters").optional(),
  client_email: z.string().email("Invalid email").optional(),
  client_address: z.string().max(200, "Max 200 characters").optional(),
});

// Opposing Council Schema
export const opposingCouncilSchema = z.object({
  name: z.string().max(50, "Max 50 characters").optional(),
  phone: z.string().max(20, "Max 20 characters").optional(),
  email: z.string().email("Invalid email").optional(),
  address: z.string().max(200, "Max 200 characters").optional(),
});

// Court Schema
export const courtSchema = z.object({
  name: z.string().max(50, "Max 50 characters").optional(),
  phone: z.string().max(20, "Max 20 characters").optional(),
  email: z.string().email("Invalid email").optional(),
});
