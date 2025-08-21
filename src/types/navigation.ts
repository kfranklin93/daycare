// Navigation types for the application

// Common routes used across the app
export const ROUTES = {
  // Auth routes
  AUTH: '/auth',
  ROLE_SELECT: '/role-select',
  
  // Daycare routes
  DAYCARE_DASHBOARD: '/daycare/dashboard',
  DAYCARE_JOBS: '/daycare/jobs',
  DAYCARE_APPLICANTS: '/daycare/applicants',
  DAYCARE_ORGANIZATION: '/daycare/organization',
  
  // Job Seeker routes
  SEEKER_JOBS: '/seeker/jobs',
  SEEKER_APPLICATIONS: '/seeker/applications',
  SEEKER_PROFILE: '/seeker/profile',
  SEEKER_PROFILE_PERSONAL: '/seeker/profile/personal',
  SEEKER_PROFILE_EXPERIENCE: '/seeker/profile/experience',
  SEEKER_PROFILE_EDUCATION: '/seeker/profile/education',
  SEEKER_PROFILE_SKILLS: '/seeker/profile/skills',
  
  // Development routes
  COMPONENT_SHOWCASE: '/components',
  
  // ATS Demo
  ATS_DEMO: '/ats-demo'
};

// Daycare navigation items
export const DAYCARE_NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DAYCARE_DASHBOARD, icon: 'dashboard' },
  { label: 'Jobs', path: ROUTES.DAYCARE_JOBS, icon: 'work' },
  { label: 'Applicants', path: ROUTES.DAYCARE_APPLICANTS, icon: 'people' },
  { label: 'Organization', path: ROUTES.DAYCARE_ORGANIZATION, icon: 'business' }
];

// Job Seeker navigation items
export const SEEKER_NAV_ITEMS = [
  { label: 'Jobs', path: ROUTES.SEEKER_JOBS, icon: 'work' },
  { label: 'My Applications', path: ROUTES.SEEKER_APPLICATIONS, icon: 'description' },
  { label: 'Profile', path: ROUTES.SEEKER_PROFILE, icon: 'person' }
];