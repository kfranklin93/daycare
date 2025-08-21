import { Job, UserProfile, JobType, Experience, Education } from '../types/data';
import { JobSeekerProfile, mockJobSeekers } from '../data/mockJobSeekers';

/**
 * This file is a combined version of candidateMatching.ts and recommendationEngine.ts.
 * It merges the functionality of both files to resolve conflicts and provide a unified
 * candidate matching and recommendation system.
 * 
 * The combined file handles both UserProfile and JobSeekerProfile types, and includes
 * improved algorithms for matching candidates to jobs based on various criteria.
 */

// --- Helper Functions ---

/**
 * Parses a location string into city, state, and country.
 */
const parseLocation = (locationStr: string): { city: string; state: string; country: string } => {
  if (!locationStr) return { city: '', state: '', country: '' };
  const parts = locationStr.split(',').map(p => p.trim());
  return {
    city: parts[0] || '',
    state: parts[1] || '',
    country: parts[2] || '',
  };
};

/**
 * Parses a salary string (e.g., "$50k-$70k") into a min/max range.
 */
const parseSalaryRange = (salaryStr: string): { min: number; max: number } | null => {
  if (!salaryStr) return null;
  
  // Handle hourly rates
  if (salaryStr.includes('per hour') || salaryStr.includes('hourly') || salaryStr.includes('hour')) {
    const hourlyMatch = salaryStr.match(/\$(\d+(\.\d+)?)\s*-\s*\$?(\d+(\.\d+)?)/);
    if (hourlyMatch) {
      const minHourly = parseFloat(hourlyMatch[1]);
      const maxHourly = parseFloat(hourlyMatch[3]);
      // Convert to annual (assuming 2000 hours/year)
      return {
        min: minHourly * 2000,
        max: maxHourly * 2000
      };
    }
  }
  
  // Handle salary ranges like "$50,000 - $60,000"
  const rangeMatch = salaryStr.match(/\$?([\d,]+)\s*-\s*\$?([\d,]+)/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1].replace(/,/g, ''), 10);
    const max = parseInt(rangeMatch[2].replace(/,/g, ''), 10);
    return { min, max };
  }
  
  // Handle K notation (e.g., "$50k-$70k")
  const numbers = salaryStr.replace(/[^0-9-]/g, '').split('-').map(Number);
  if (numbers.length === 2) {
    return { min: numbers[0] * 1000, max: numbers[1] * 1000 };
  }
  if (numbers.length === 1) {
    return { min: numbers[0] * 1000, max: numbers[0] * 1000 };
  }
  
  return null;
};

/**
 * Extract keywords from text
 */
const extractKeywords = (text: string): string[] => {
  // Remove common words and split into keywords
  const commonWords = ['and', 'the', 'of', 'to', 'a', 'in', 'for', 'with', 'on', 'at', 'from', 'by'];
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word));
};

// --- Scoring Functions ---

/**
 * Calculates a score based on skill match.
 * Works with both UserProfile and JobSeekerProfile types.
 */
const calculateSkillsMatch = (job: Job, candidate: UserProfile | JobSeekerProfile): number => {
  // Handle case where candidate has no skills
  if (!candidate.skills || candidate.skills.length === 0) return 0.2; // Low score if no skills listed

  // Extract keywords from job description and requirements
  const jobKeywords = new Set([
    ...job.title.toLowerCase().split(' '), 
    ...(job.requirements ? job.requirements.map(r => r.toLowerCase()) : []),
    ...(job.description ? extractKeywords(job.description) : [])
  ]);
  
  const matchingSkills = candidate.skills.filter(skill => 
    Array.from(jobKeywords).some(keyword => 
      skill.toLowerCase().includes(keyword) || 
      keyword.includes(skill.toLowerCase())
    )
  );
  
  const score = Math.min(1.0, matchingSkills.length / 5); // Score based on number of matching skills, capped at 5
  return score;
};

/**
 * Calculates a score based on experience relevance.
 * Works with both UserProfile and JobSeekerProfile types.
 */
const calculateExperienceMatch = (job: Job, candidate: UserProfile | JobSeekerProfile): number => {
  if (!candidate.experience || candidate.experience.length === 0) return 0.2;

  // Check if job title appears in experience
  const hasRelevantExperience = Array.isArray(candidate.experience) && candidate.experience.some((exp: any) => {
    if (typeof exp === 'string') {
      return job.title.toLowerCase().includes(exp.toLowerCase()) || 
             exp.toLowerCase().includes(job.title.toLowerCase());
    } else if (typeof exp === 'object' && exp && exp.title) {
      return job.title.toLowerCase().includes(exp.title.toLowerCase()) || 
             exp.title.toLowerCase().includes(job.title.toLowerCase());
    }
    return false;
  });

  return hasRelevantExperience ? 0.6 : 0.2;
};

/**
 * Calculates a score based on total years of experience.
 * Works with both UserProfile and JobSeekerProfile types.
 */
const calculateYearsOfExperienceMatch = (job: Job, candidate: UserProfile | JobSeekerProfile): number => {
  // Extract required years from job requirements
  const yearsRequiredMatch = job.requirements?.join(' ').match(/(\d+)\s*(\+)?\s*years/);
  const yearsRequired = yearsRequiredMatch ? parseInt(yearsRequiredMatch[1], 10) : 3; // Default to 3 years if not specified

  if (candidate.yearsOfExperience === undefined) return 0.5; // Neutral score if not provided

  if (candidate.yearsOfExperience >= yearsRequired) return 1.0;
  
  // Prorated score if less than required
  return 0.5 + (0.5 * (candidate.yearsOfExperience / yearsRequired));
};

/**
 * Calculates a score based on education level and field.
 * Works with both UserProfile and JobSeekerProfile types.
 */
const calculateEducationScore = (job: Job, candidate: UserProfile | JobSeekerProfile): number => {
  if (!candidate.education || candidate.education.length === 0) return 0.5; // Neutral if no education listed

  const educationLevels: { [key: string]: number } = {
    'high school': 1,
    'associate': 2,
    'bachelor': 3,
    'master': 4,
    'phd': 5,
    'doctorate': 5
  };
  
  // Check education requirements in job
  const educationReq = job.requirements?.find(req => 
    req.toLowerCase().includes('degree') || 
    req.toLowerCase().includes('education') ||
    req.toLowerCase().includes('bachelor') ||
    req.toLowerCase().includes('master') ||
    req.toLowerCase().includes('associate')
  );
  
  // Find job's required degree level
  let jobDegreeLevel = 1; // Default to High School
  if (educationReq) {
    if (educationReq.toLowerCase().includes('associate')) jobDegreeLevel = 2;
    if (educationReq.toLowerCase().includes('bachelor')) jobDegreeLevel = 3;
    if (educationReq.toLowerCase().includes('master')) jobDegreeLevel = 4;
    if (educationReq.toLowerCase().includes('phd') || educationReq.toLowerCase().includes('doctorate')) jobDegreeLevel = 5;
  }
  
  // Find candidate's highest degree
  const candidateDegreeLevel = Math.max(...candidate.education.map(edu => {
    const degree = edu.degree.toLowerCase();
    for (const [key, value] of Object.entries(educationLevels)) {
      if (degree.includes(key)) return value;
    }
    return 0;
  }), 0);

  let score = candidateDegreeLevel >= jobDegreeLevel ? 1.0 : (candidateDegreeLevel / jobDegreeLevel * 0.7);
  
  // Check for relevant field match
  const hasFieldMatch = candidate.education.some(edu => 
    edu.degree.toLowerCase().includes('early childhood') || 
    edu.degree.toLowerCase().includes('child development') ||
    edu.degree.toLowerCase().includes('education')
  );

  if (hasFieldMatch) {
    score = Math.min(1.0, score + 0.2); // Bonus for relevant field
  }

  return score;
};

/**
 * Calculates a score based on certifications.
 * Handles cases where certifications might not be present.
 */
const calculateCertificationsMatch = (job: Job, candidate: UserProfile | JobSeekerProfile): number => {
  // If candidate doesn't have a certifications property
  if (!('certifications' in candidate) || !candidate.certifications) return 0.5;
  
  // Extract certification keywords from job requirements
  const certKeywords = job.requirements
    ?.filter(req => req.toLowerCase().includes('certif') || req.toLowerCase().includes('license'))
    .flatMap(req => extractKeywords(req)) || [];
  
  if (certKeywords.length === 0) {
    // If no specific certifications required, check if candidate has any certifications
    return candidate.certifications.length > 0 ? 0.8 : 0.5;
  }
  
  // Count matching certifications
  const matchingCerts = candidate.certifications.filter(cert => 
    certKeywords.some(keyword => 
      cert.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  
  // Common certifications that are almost always valuable
  const hasCommonCerts = candidate.certifications.some(cert => 
    cert.toLowerCase().includes('cpr') ||
    cert.toLowerCase().includes('first aid') ||
    cert.toLowerCase().includes('cda')
  );
  
  // Calculate score
  return matchingCerts.length > 0 ? 1.0 : (hasCommonCerts ? 0.7 : 0.3);
};

/**
 * Calculates a score based on location proximity.
 * Works with both UserProfile and JobSeekerProfile types.
 */
const calculateLocationMatch = (job: Job, candidate: UserProfile | JobSeekerProfile): number => {
  if (!candidate.location) return 0;
  
  const jobLocation = parseLocation(job.location);
  const candidateLocation = parseLocation(candidate.location);
  
  if (jobLocation.city.toLowerCase() === candidateLocation.city.toLowerCase()) {
    return 1.0; // Perfect match - same city
  }
  if (jobLocation.state.toLowerCase() === candidateLocation.state.toLowerCase()) {
    return 0.7; // Partial match - same state
  }
  
  return 0.3; // Mismatch
};

/**
 * Calculates a score based on salary expectations.
 * Works with both UserProfile and JobSeekerProfile types.
 */
const calculateSalaryMatch = (job: Job, candidate: UserProfile | JobSeekerProfile): number => {
  // If candidate has no salary requirements, assume any salary is acceptable
  if (!candidate.minSalary) return 1.0;
  
  const salaryRange = parseSalaryRange(job.salary);
  if (!salaryRange) return 0.5; // Can't parse, neutral score
  
  if (salaryRange.min >= candidate.minSalary) {
    return 1.0; // Minimum salary meets candidate's requirements
  } else if (salaryRange.max >= candidate.minSalary) {
    return 0.8; // Maximum salary meets candidate's requirements
  } else {
    // Calculate percentage of candidate's minimum
    return Math.max(0.3, Math.min(salaryRange.max / candidate.minSalary, 0.6));
  }
};

/**
 * Calculates a score based on job type preference.
 * Works with both UserProfile and JobSeekerProfile types.
 */
const calculateJobTypeMatch = (job: Job, candidate: UserProfile | JobSeekerProfile): number => {
  if (!candidate.preferredJobTypes || candidate.preferredJobTypes.length === 0) {
    return 0.5; // Neutral if no preferences
  }
  
  // Convert job types to strings for comparison
  const jobTypeStr = job.type.toString();
  
  // Handle different types of preferredJobTypes (JobType[] vs string[])
  let preferredTypeMatch = false;
  
  if (candidate.preferredJobTypes.some(t => typeof t === 'string')) {
    // JobSeekerProfile case - string[]
    const preferredJobTypes = candidate.preferredJobTypes as string[];
    preferredTypeMatch = preferredJobTypes.includes(jobTypeStr);
  } else {
    // UserProfile case - JobType[]
    const typedPreferredJobTypes = candidate.preferredJobTypes as JobType[];
    preferredTypeMatch = typedPreferredJobTypes.some(t => t === job.type);
  }
  
  if (preferredTypeMatch) {
    return 1.0; // Perfect match
  }
  
  // For full-time seekers who might accept part-time
  if (job.type === JobType.PART_TIME) {
    const preferredJobTypes = candidate.preferredJobTypes as (string | JobType)[];
    if (preferredJobTypes.includes(JobType.FULL_TIME) || preferredJobTypes.includes('FULL_TIME')) {
      return 0.5;
    }
  }
  
  return 0.4; // Mismatch
};

// --- Main Matching and Report Generation ---

/**
 * Default scoring weights
 */
const DEFAULT_WEIGHTS = {
  skills: 0.25,
  experience: 0.20,
  yearsOfExperience: 0.15,
  education: 0.15,
  certifications: 0.10,
  location: 0.05,
  salary: 0.05,
  jobType: 0.05,
};

/**
 * Calculates a final match score for a candidate against a job.
 * Works with both UserProfile and JobSeekerProfile types.
 */
export const calculateMatchScore = (
  job: Job, 
  candidate: UserProfile | JobSeekerProfile, 
  weights = DEFAULT_WEIGHTS
): number => {
  const scores = {
    skills: calculateSkillsMatch(job, candidate),
    experience: calculateExperienceMatch(job, candidate),
    yearsOfExperience: calculateYearsOfExperienceMatch(job, candidate),
    education: calculateEducationScore(job, candidate),
    certifications: 'certifications' in candidate ? calculateCertificationsMatch(job, candidate) : 0.5,
    location: calculateLocationMatch(job, candidate),
    salary: calculateSalaryMatch(job, candidate),
    jobType: calculateJobTypeMatch(job, candidate),
  };

  const totalScore = 
    scores.skills * weights.skills +
    scores.experience * weights.experience +
    scores.yearsOfExperience * weights.yearsOfExperience +
    scores.education * weights.education +
    scores.certifications * weights.certifications +
    scores.location * weights.location +
    scores.salary * weights.salary +
    scores.jobType * weights.jobType;

  return Math.round(totalScore * 100); // Return score out of 100
};

/**
 * Generates a human-readable list of strengths and gaps for a candidate.
 * Works with both UserProfile and JobSeekerProfile types.
 */
export const generateStrengthsAndGaps = (job: Job, candidate: UserProfile | JobSeekerProfile): { strengths: string[]; gaps: string[] } => {
  const strengths: string[] = [];
  const gaps: string[] = [];

  // Check skills
  const jobKeywords = new Set([
    ...job.title.toLowerCase().split(' '), 
    ...(job.requirements ? job.requirements.map(r => r.toLowerCase()) : []),
    ...(job.description ? extractKeywords(job.description) : [])
  ]);
  
  const matchingSkills = candidate.skills ? candidate.skills.filter(skill => 
    Array.from(jobKeywords).some(keyword => skill.toLowerCase().includes(keyword))
  ) : [];

  if (matchingSkills.length > 2) {
    strengths.push(`Strong skill match: ${matchingSkills.slice(0, 3).join(', ')}...`);
  } else if (candidate.skills && candidate.skills.length > 0) {
    gaps.push('May need additional training in key required skills');
  }

  // Check experience title
  const hasRelevantExperience = candidate.experience && Array.isArray(candidate.experience) && candidate.experience.some((exp: any) => {
    if (typeof exp === 'string') {
      return job.title.toLowerCase().includes(exp.toLowerCase()) ||
             exp.toLowerCase().includes(job.title.toLowerCase());
    } else if (typeof exp === 'object' && exp && exp.title) {
      return job.title.toLowerCase().includes(exp.title.toLowerCase()) ||
             exp.title.toLowerCase().includes(job.title.toLowerCase());
    }
    return false;
  });

  if (hasRelevantExperience) {
    strengths.push('Direct experience in a similar role');
  } else if (candidate.experience && candidate.experience.length > 0) {
    gaps.push('Limited direct experience in this specific role');
  }
  
  // Check years of experience
  const yearsRequiredMatch = job.requirements?.join(' ').match(/(\d+)\s*(\+)?\s*years/);
  const yearsRequired = yearsRequiredMatch ? parseInt(yearsRequiredMatch[1], 10) : 3;

  if (candidate.yearsOfExperience !== undefined) {
      if (candidate.yearsOfExperience >= yearsRequired) {
        strengths.push(`Meets ${yearsRequired}+ years of experience requirement`);
      } else if (candidate.yearsOfExperience > 0) {
        gaps.push(`Has ${candidate.yearsOfExperience} years experience (${yearsRequired} required)`);
      }
  }

  // Check education
  const educationReq = job.requirements?.find(r => 
    r.toLowerCase().includes('degree') || 
    r.toLowerCase().includes('bachelor') ||
    r.toLowerCase().includes('education')
  );

  if (educationReq && candidate.education && candidate.education.length > 0) {
    const educationMatch = candidate.education.some(edu => 
      educationReq.toLowerCase().includes(edu.degree.toLowerCase().split(' ')[0])
    );
    
    if (educationMatch) {
      strengths.push('Educational background aligns with requirements');
    } else {
      gaps.push('Educational background may not align with requirements');
    }
  }

  // Check certifications
  if ('certifications' in candidate && candidate.certifications && candidate.certifications.length > 0) {
    const certReq = job.requirements?.find(r => 
      r.toLowerCase().includes('certif') || 
      r.toLowerCase().includes('license')
    );
    
    if (certReq) {
      const hasRelevantCert = candidate.certifications.some(cert => 
        certReq.toLowerCase().includes(cert.toLowerCase())
      );
      
      if (hasRelevantCert) {
        strengths.push('Has required certifications');
      } else {
        gaps.push('May need to obtain specific certifications');
      }
    } else {
      strengths.push('Has additional certifications');
    }
  }

  // Check location
  if (job.location && candidate.location) {
    const sameCity = job.location.split(',')[0].trim().toLowerCase() === 
                    (candidate.location?.split(',')[0].trim().toLowerCase() || '');

    if (sameCity) {
      strengths.push(`Located in ${job.location.split(',')[0].trim()}`);
    } else {
      gaps.push(`Not located in ${job.location.split(',')[0].trim()}`);
    }
  }

  return { strengths, gaps };
};

/**
 * Generate recommendations for a specific job
 */
export const getRecommendationsForJob = (job: Job, limit: number = 5): any[] => {
  // Calculate match scores for all job seekers
  const profilesWithScores = mockJobSeekers.map(seeker => ({
    ...seeker,
    matchScore: calculateMatchScore(job, seeker)
  }));
  
  // Sort by match score (descending)
  profilesWithScores.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  
  // Return top matches
  return profilesWithScores.slice(0, limit);
};