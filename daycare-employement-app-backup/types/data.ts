export type Profile = {
  fullName: string;
  email: string;
  phone: string;
  experienceYears: number;
  bio: string;
  skills: string[];
  certifications: string[];
  availability: {
    fullTime: boolean;
    partTime: boolean;
    temporary: boolean;
  };
  preferredLocations: string[];
};

export type Job = {
  id: string;
  title: string;
  organization: {
    name: string;
    location: string;
    logo?: string;
  };
  type: 'full-time' | 'part-time' | 'temporary';
  salary: {
    min: number;
    max: number;
    rate: 'hourly' | 'yearly';
  };
  requirements: string[];
  description: string;
  skills: string[];
  postedAt: string;
  applications: number;
};