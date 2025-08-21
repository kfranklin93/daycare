import { z } from 'zod';

// Auth related schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// User profile schemas
export const userProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  jobTitle: z.string().optional()
});

export const experienceSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional()
});

export const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  location: z.string().optional(),
  startDate: z.string().optional(),
  graduationYear: z.string().optional(),
  description: z.string().optional()
});

// Job related schemas
export const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(1, 'Job description is required'),
  requirements: z.array(z.string()).optional(),
  location: z.string().min(1, 'Location is required'),
  salary: z.string().optional(),
  type: z.string().min(1, 'Job type is required'),
  organizationId: z.string().min(1, 'Organization is required'),
  status: z.string().min(1, 'Status is required')
});

// Application related schemas
export const applicationSchema = z.object({
  jobId: z.string().min(1, 'Job is required'),
  applicantId: z.string().min(1, 'Applicant is required'),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
  status: z.string().min(1, 'Status is required')
});

// Organization related schemas
export const organizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  licenseNumber: z.string().optional(),
  foundedYear: z.number().optional(),
  capacity: z.number().optional(),
  ageRange: z.string().optional(),
  hours: z.string().optional(),
  facilities: z.array(z.string()).optional(),
  programs: z.array(z.string()).optional()
});