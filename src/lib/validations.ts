import { z } from 'zod';

export const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format"),
  experienceYears: z
    .number()
    .min(0, "Experience years cannot be negative")
    .max(50, "Please check experience years"),
  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional(),
  skills: z
    .array(z.string())
    .optional(),
  certifications: z
    .array(z.string())
    .optional(),
});

export const organizationSchema = z.object({
  name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name cannot exceed 100 characters"),
  address: z
    .string()
    .min(5, "Please enter a valid address")
    .max(200, "Address is too long"),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format"),
  email: z
    .string()
    .email("Invalid email address"),
  licenseNumber: z
    .string()
    .min(3, "Please enter a valid license number")
    .max(50, "License number is too long"),
  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type OrganizationFormData = z.infer<typeof organizationSchema>;