import { Job, JobStatus, JobType } from '../types/data';

// export const mockJobs: Job[] = [
//   {
//     id: '1',
//     title: 'Lead Preschool Teacher',
//     description: 'We are seeking an experienced Lead Preschool Teacher to join our team. The ideal candidate will be responsible for creating and implementing age-appropriate curriculum, maintaining a safe learning environment, and communicating effectively with parents.',
//     requirements: [
//       'Bachelor\'s degree in Early Childhood Education or related field',
//       'Minimum 3 years of experience in a preschool setting',
//       'Current CPR and First Aid certification',
//       'Strong communication and organizational skills'
//     ],
//     location: 'San Francisco, CA',
//     salary: '$50,000 - $60,000',
//     type: JobType.FULL_TIME,
//     organizationId: '1',
//     organizationName: 'Sunshine Daycare Center',
//     organizationLogo: 'https://placehold.co/100',
//     postedDate: new Date('2025-07-20').toISOString(),
//     status: JobStatus.ACTIVE,
//     applicantCount: 12
//   },
//   {
//     id: '2',
//     title: 'Assistant Teacher',
//     description: 'Join our team as an Assistant Teacher to support our lead teachers in daily classroom activities. You will help implement curriculum, supervise children, and assist with maintaining a clean and organized classroom.',
//     requirements: [
//       'Associate\'s degree in Early Childhood Education or related field',
//       'At least 1 year of experience working with young children',
//       'Patience and enthusiasm for working with children',
//       'Ability to work as part of a team'
//     ],
//     location: 'Oakland, CA',
//     salary: '$35,000 - $42,000',
//     type: JobType.FULL_TIME,
//     organizationId: '1',
//     organizationName: 'Sunshine Daycare Center',
//     organizationLogo: 'https://placehold.co/100',
//     postedDate: new Date('2025-08-05').toISOString(),
//     status: JobStatus.ACTIVE,
//     applicantCount: 8
//   },
//   {
//     id: '3',
//     title: 'Part-time Infant Caregiver',
//     description: 'We are looking for a caring and reliable Infant Caregiver to join our team on a part-time basis. You will be responsible for providing quality care to infants, maintaining safe and clean environments, and communicating with parents.',
//     requirements: [
//       'High school diploma or equivalent',
//       'Experience caring for infants',
//       'CPR and First Aid certification',
//       'Flexible schedule including some afternoons'
//     ],
//     location: 'San Francisco, CA',
//     salary: '$18 - $22 per hour',
//     type: JobType.PART_TIME,
//     organizationId: '2',
//     organizationName: 'Little Stars Childcare',
//     organizationLogo: 'https://placehold.co/100',
//     postedDate: new Date('2025-08-10').toISOString(),
//     status: JobStatus.ACTIVE,
//     applicantCount: 5
//   },
//   {
//     id: '4',
//     title: 'Daycare Director',
//     description: 'We are seeking an experienced Daycare Director to oversee all aspects of our center operations. The ideal candidate will be responsible for staff management, curriculum development, budget administration, and ensuring compliance with all regulations.',
//     requirements: [
//       'Bachelor\'s degree in Early Childhood Education, Business Administration, or related field',
//       'Minimum 5 years of experience in childcare with at least 2 years in management',
//       'Knowledge of state licensing requirements and regulations',
//       'Strong leadership and communication skills'
//     ],
//     location: 'Berkeley, CA',
//     salary: '$65,000 - $80,000',
//     type: JobType.FULL_TIME,
//     organizationId: '3',
//     organizationName: 'Growing Minds Preschool',
//     organizationLogo: 'https://placehold.co/100',
//     postedDate: new Date('2025-07-15').toISOString(),
//     status: JobStatus.ACTIVE,
//     applicantCount: 4
//   },
//   {
//     id: '5',
//     title: 'After-School Program Leader',
//     description: 'Join our team as an After-School Program Leader to supervise and engage school-age children in educational and recreational activities. You will be responsible for implementing curriculum, ensuring child safety, and fostering a positive learning environment.',
//     requirements: [
//       'Associate\'s degree or some college coursework in Education or related field',
//       'Experience working with school-age children',
//       'Creativity and enthusiasm for developing engaging activities',
//       'Available to work weekday afternoons during the school year'
//     ],
//     location: 'San Jose, CA',
//     salary: '$20 - $25 per hour',
//     type: JobType.PART_TIME,
//     organizationId: '4',
//     organizationName: 'Bright Futures Learning Center',
//     organizationLogo: 'https://placehold.co/100',
//     postedDate: new Date('2025-08-01').toISOString(),
//     status: JobStatus.ACTIVE,
//     applicantCount: 7
//   },
//   {
//     id: '6',
//     title: 'Substitute Teacher',
//     description: 'We are seeking reliable Substitute Teachers to join our on-call team. You will fill in for absent teachers across various age groups, implement prepared lesson plans, and maintain classroom routines.',
//     requirements: [
//       'High school diploma or equivalent',
//       'Some experience working with children',
//       'Flexibility and adaptability',
//       'Ability to follow lesson plans and classroom routines'
//     ],
//     location: 'San Francisco, CA',
//     salary: '$18 - $22 per hour',
//     type: JobType.CONTRACT,
//     organizationId: '1',
//     organizationName: 'Sunshine Daycare Center',
//     organizationLogo: 'https://placehold.co/100',
//     postedDate: new Date('2025-08-12').toISOString(),
//     status: JobStatus.ACTIVE,
//     applicantCount: 3
//   },
//   {
//     id: '7',
//     title: 'Special Needs Assistant',
//     description: 'We are looking for a compassionate Special Needs Assistant to support children with diverse learning needs. You will work one-on-one or in small groups to implement individualized education plans and assist with daily activities.',
//     requirements: [
//       'Associate\'s or Bachelor\'s degree in Special Education or related field',
//       'Experience working with children with special needs',
//       'Patience, empathy, and strong communication skills',
//       'Knowledge of various learning and behavioral strategies'
//     ],
//     location: 'Oakland, CA',
//     salary: '$40,000 - $48,000',
//     type: JobType.FULL_TIME,
//     organizationId: '2',
//     organizationName: 'Little Stars Childcare',
//     organizationLogo: 'https://placehold.co/100',
//     postedDate: new Date('2025-07-25').toISOString(),
//     status: JobStatus.ACTIVE,
//     applicantCount: 6
//   },
//   {
//     id: '8',
//     title: 'Curriculum Coordinator',
//     description: 'We are seeking a Curriculum Coordinator to develop and oversee educational programs across all age groups. You will train teachers, evaluate program effectiveness, and ensure alignment with educational standards and center philosophy.',
//     requirements: [
//       'Bachelor\'s or Master\'s degree in Early Childhood Education or related field',
//       'Minimum 4 years of teaching experience',
//       'Strong knowledge of child development and various curriculum approaches',
//       'Excellent leadership and communication skills'
//     ],
//     location: 'San Mateo, CA',
//     salary: '$55,000 - $65,000',
//     type: JobType.FULL_TIME,
//     organizationId: '5',
//     organizationName: 'Discovery Kids Academy',
//     organizationLogo: 'https://placehold.co/100',
//     postedDate: new Date('2025-07-10').toISOString(),
//     status: JobStatus.ACTIVE,
//     applicantCount: 9
//   }
// ];
export const mockJobs: Job[] = [
  // Organization A Jobs
  {
    id: 'job_a1',
    organizationId: 'org_sunshine',
    organizationName: 'Sunshine Daycare',
    title: 'Lead Preschool Teacher',
    location: 'San Francisco, CA',
    description: 'Seeking an experienced lead teacher for our preschool program.',
    salary: '$50,000 - $60,000',
    postedDate: '2025-06-15',
    status: JobStatus.ACTIVE,
    applicantCount: 4,
    type: JobType.FULL_TIME, // <-- FIX
    requirements: ['Bachelors in ECE', '3+ years experience', 'CPR Certified'],
  },
  {
    id: 'job_a2',
    organizationId: 'org_sunshine',
    organizationName: 'Sunshine Daycare',
    title: 'Infant Caregiver',
    location: 'San Francisco, CA',
    description: 'Caring individual needed for our infant room.',
    salary: '$45,000 - $52,000',
    postedDate: '2025-07-01',
    status: JobStatus.ACTIVE,
    applicantCount: 2,
    type: JobType.FULL_TIME, // <-- FIX
    requirements: ['Experience with infants', 'First Aid Certified'],
  },
  {
    id: 'job_a3',
    organizationId: 'org_sunshine',
    organizationName: 'Sunshine Daycare',
    title: 'Assistant Director',
    location: 'San Francisco, CA',
    description: 'Seeking an experienced assistant director to help manage our center.',
    salary: '$65,000 - $75,000',
    postedDate: '2025-07-10',
    status: JobStatus.ACTIVE,
    applicantCount: 3,
    type: JobType.FULL_TIME, // <-- FIX
    requirements: ['5+ years in childcare', 'Management experience'],
  },
  
  // Organization B Jobs
  {
    id: 'job_b1',
    organizationId: 'org_rainbow',
    organizationName: 'Rainbow Learning Center',
    title: 'Toddler Teacher',
    location: 'Oakland, CA',
    description: 'Join our team as a dedicated toddler teacher.',
    salary: '$48,000 - $55,000',
    postedDate: '2025-06-20',
    status: JobStatus.ACTIVE,
    applicantCount: 5,
    type: JobType.FULL_TIME, // <-- FIX
    requirements: ['Experience with toddlers', 'CDA Certification'],
  },
  {
    id: 'job_b2',
    organizationId: 'org_rainbow',
    organizationName: 'Rainbow Learning Center',
    title: 'After-School Program Coordinator',
    location: 'Oakland, CA',
    description: 'Lead our after-school program for elementary students.',
    salary: '$52,000 - $58,000',
    postedDate: '2025-07-05',
    status: JobStatus.ACTIVE,
    applicantCount: 2,
    type: JobType.PART_TIME, // <-- FIX
    requirements: ['Experience with school-age children', 'Clean driving record'],
  },
];