// src/lib/candidateMatchingEngine.test.ts

// FIX: Import enums to avoid using 'as any'
import { Job, UserProfile, JobType, JobStatus, UserRole } from '../types/data';
// FIX: Removed unused JobSeekerProfile import
import { calculateMatchScore, generateStrengthsAndGaps, getRecommendationsForJob } from './candidateMatchingEngine';

// Mock data for testing
const mockJob: Job = {
  id: 'job1',
  title: 'Lead Preschool Teacher',
  description: 'We are looking for an experienced and passionate Lead Preschool Teacher to join our team.',
  requirements: [
    'Bachelor\'s degree in Early Childhood Education or related field',
    'Minimum 3 years of experience in early childhood education',
    'CPR and First Aid certification required',
  ],
  location: 'San Francisco, CA',
  salary: '$50,000 - $60,000',
  type: JobType.FULL_TIME,
  organizationId: 'org1',
  organizationName: 'Sunshine Daycare Center',
  postedDate: '2025-08-01',
  status: JobStatus.ACTIVE, // FIX: Used JobStatus enum
  applicantCount: 12
};

const mockCandidate: UserProfile = {
  id: 'user1',
  email: 'sarah.johnson@example.com',
  firstName: 'Sarah',
  lastName: 'Johnson',
  phone: '(555) 123-4567',
  role: UserRole.SEEKER, // FIX: Used UserRole enum
  bio: 'Experienced childcare professional with over 5 years working in early childhood education.',
  createdAt: '2025-01-15',
  updatedAt: '2025-07-20',
  avatar: 'https://example.com/avatar.jpg',
  location: 'San Francisco, CA',
  skills: ['Child Development', 'Classroom Management', 'First Aid & CPR'],
  certifications: ['Early Childhood Education License', 'CPR & First Aid Certification'],
  education: [
    {
      id: 'edu1',
      degree: 'Bachelor of Arts in Early Childhood Education',
      institution: 'San Francisco State University',
      graduationYear: '2020'
    }
  ],
  experience: [
    {
      id: 'exp1',
      title: 'Lead Preschool Teacher',
      company: 'Sunshine Daycare Center',
      startDate: 'Jan 2022',
      endDate: 'Present',
    }
  ],
  yearsOfExperience: 5,
  minSalary: 45000,
  preferredJobTypes: [JobType.FULL_TIME]
};

describe('Candidate Matching Engine', () => {
  
  describe('calculateMatchScore', () => {
    it('should calculate a high match score for a well-matched candidate', () => {
      const score = calculateMatchScore(mockJob, mockCandidate);
      expect(score).toBeGreaterThan(80);
    });
    
    it('should calculate a lower score for a poorly matched candidate', () => {
      // FIX: Ensure the test object conforms to the UserProfile type
      const poorMatchCandidate: UserProfile = {
        ...mockCandidate,
        skills: ['Cooking', 'Gardening'],
        education: [{ id: 'edu2', degree: 'High School Diploma', institution: 'Local High', graduationYear: '2015' }],
        yearsOfExperience: 1,
        preferredJobTypes: [JobType.PART_TIME]
      };
      
      const score = calculateMatchScore(mockJob, poorMatchCandidate);
      expect(score).toBeLessThan(50);
    });
  });
  
  describe('generateStrengthsAndGaps', () => {
    it('should identify relevant strengths for a matched candidate', () => {
      const { strengths } = generateStrengthsAndGaps(mockJob, mockCandidate);
      expect(strengths.length).toBeGreaterThan(0);
      const strengthText = strengths.join(' ').toLowerCase();
      expect(strengthText).toContain('experience');
      expect(strengthText).toContain('meets'); // For years of experience
    });
    
    it('should identify gaps for a mismatched candidate', () => {
      // FIX: Spread the original mock to ensure all required properties are present
      const poorMatchCandidate: UserProfile = {
        ...mockCandidate,
        skills: ['Cooking', 'Gardening'],
        location: 'New York, NY',
        yearsOfExperience: 1
      };
      
      const { gaps } = generateStrengthsAndGaps(mockJob, poorMatchCandidate);
      expect(gaps.length).toBeGreaterThan(0);
      const gapText = gaps.join(' ').toLowerCase();
      expect(gapText).toContain('skills');
      expect(gapText).toContain('located');
    });
  });
  
  describe('getRecommendationsForJob', () => {
    it('should return recommendations sorted by match score', () => {
      const recommendations = getRecommendationsForJob(mockJob, 3);
      
      expect(recommendations.length).toBeLessThanOrEqual(3);
      
      if (recommendations.length > 1) {
        // FIX: Safely access optional 'matchScore' property
        for (let i = 0; i < recommendations.length - 1; i++) {
          const currentScore = recommendations[i].matchScore ?? 0;
          const nextScore = recommendations[i+1].matchScore ?? 0;
          expect(currentScore).toBeGreaterThanOrEqual(nextScore);
        }
      }
    });
  });
});