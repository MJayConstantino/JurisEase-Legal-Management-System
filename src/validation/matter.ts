import { z } from "zod";

// Regex: allow only numbers and symbols (no letters), max 15 chars
const phoneRegex = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,15}$/;

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
  case_number: z.string().min(1, "Case number is required"),
  status: z.enum(["open", "pending", "closed"]),
  description: z.string().max(200, "Max 200 characters").optional(),
  client: z.string().max(50, "Max 50 characters").optional(),
  client_phone: z
    .string()
    .regex(
      phoneRegex,
      "Phone can only contain numbers and symbols, max 15 characters"
    )
    .optional()
    .nullable(),
  client_email: z.string().email("Invalid email").optional().nullable(),
  client_address: z
    .string()
    .max(200, "Max 200 characters")
    .optional()
    .nullable(),
});

// Opposing Council Schema
export const opposingCouncilSchema = z.object({
  name: z.string().max(50, "Max 50 characters").optional(),
  phone: z
    .string()
    .regex(
      phoneRegex,
      "Phone can only contain numbers and symbols, max 15 characters"
    )
    .optional(),
  email: z.string().email("Invalid email").optional(),
  address: z.string().max(200, "Max 200 characters").optional(),
});

// Court Schema
export const courtSchema = z.object({
  name: z.string().max(50, "Max 50 characters").optional(),
  phone: z
    .string()
    .regex(
      phoneRegex,
      "Phone can only contain numbers and symbols, max 15 characters"
    )
    .optional(),
  email: z.string().email("Invalid email").optional(),
});
