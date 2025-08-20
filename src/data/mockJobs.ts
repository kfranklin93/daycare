import { Job } from '../types/data';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Lead Infant Teacher',
    organization: {
      name: 'Bright Horizons Daycare',
      location: 'Atlanta, GA',
      logo: 'https://example.com/logo1.png',
    },
    type: 'full-time',
    salary: {
      min: 40000,
      max: 50000,
      rate: 'yearly',
    },
    requirements: [
      'Bachelor\'s degree in Early Childhood Education or related field',
      '3+ years experience with infants',
      'CPR and First Aid Certification',
      'State teaching certification',
    ],
    description: 'We are seeking an experienced Lead Infant Teacher to join our team. The ideal candidate will have a passion for early childhood development and experience creating nurturing environments for infants.',
    skills: [
      'Infant Care',
      'Curriculum Planning',
      'Parent Communication',
      'Team Leadership',
    ],
    postedAt: '2025-08-15T14:30:00Z',
    applications: 12,
  },
  {
    id: '2',
    title: 'Pre-K Assistant Teacher',
    organization: {
      name: 'Little Learners Academy',
      location: 'Decatur, GA',
      logo: 'https://example.com/logo2.png',
    },
    type: 'part-time',
    salary: {
      min: 18,
      max: 22,
      rate: 'hourly',
    },
    requirements: [
      'Associate\'s degree in Early Childhood Education preferred',
      '1+ year experience with pre-school age children',
      'CPR and First Aid Certification',
    ],
    description: 'Join our growing team as a Pre-K Assistant Teacher. You will work closely with the lead teacher to implement our curriculum and ensure a safe, engaging learning environment.',
    skills: [
      'Pre-K Education',
      'Classroom Management',
      'Activity Planning',
      'Child Development',
    ],
    postedAt: '2025-08-17T09:15:00Z',
    applications: 8,
  },
  {
    id: '3',
    title: 'Floating Teacher',
    organization: {
      name: 'Sunshine Kids Daycare',
      location: 'Marietta, GA',
      logo: 'https://example.com/logo3.png',
    },
    type: 'temporary',
    salary: {
      min: 16,
      max: 20,
      rate: 'hourly',
    },
    requirements: [
      'High school diploma required',
      'Experience with multiple age groups',
      'Flexible schedule',
      'CPR and First Aid Certification',
    ],
    description: 'We\'re looking for a flexible, adaptable teacher who can work with different age groups as needed. Perfect opportunity for someone who enjoys variety in their work day.',
    skills: [
      'Multi-age Experience',
      'Adaptability',
      'Basic Child Care',
      'Time Management',
    ],
    postedAt: '2025-08-18T11:45:00Z',
    applications: 5,
  },
];