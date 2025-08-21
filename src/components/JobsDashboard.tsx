// src/components/JobsDashboard.tsx

import React, { useState, useEffect } from 'react';
import { Job, JobStatus } from '../types/data';
import { getJobsByOrganization } from '../data/mockAtsData';
import ApplicantTracker from './ApplicantTracker';
import styles from './JobsDashboard.module.css';

interface JobsDashboardProps {
  organizationId: string; // Critical for multi-tenancy siloing
  onJobSelect?: (jobId: string) => void; // Callback for job selection
}

/**
 * JobsDashboard component
 * 
 * Displays all job postings for a specific organization.
 * Implements multi-tenancy by filtering jobs based on organizationId.
 */
const JobsDashboard: React.FC<JobsDashboardProps> = ({ 
  organizationId,
  onJobSelect 
}) => {
  // State for jobs and selected job
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  
  // State for loading and error handling
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch jobs data when component mounts or organizationId changes
  useEffect(() => {
    // Simulate API call with timeout
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Short timeout to simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Get jobs for this organization (implementing multi-tenancy)
        const orgJobs = getJobsByOrganization(organizationId);
        setJobs(orgJobs);
        
        // Reset selected job when organization changes
        setSelectedJobId(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, [organizationId]);
  
  // Handle job selection
  const handleJobClick = (jobId: string) => {
    if (onJobSelect) {
      // Use the callback if provided (URL-based routing)
      onJobSelect(jobId);
    } else {
      // Fallback to internal state (for backwards compatibility)
      setSelectedJobId(jobId);
    }
  };
  
  // Handle back button click from ApplicantTracker
  const handleBackClick = () => {
    setSelectedJobId(null);
  };
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Posted yesterday';
    } else if (diffDays < 7) {
      return `Posted ${diffDays} days ago`;
    } else {
      return `Posted on ${new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }).format(date)}`;
    }
  };
  
  // Get CSS class for job status
  const getStatusClass = (status: JobStatus): string => {
    switch (status) {
      case JobStatus.ACTIVE:
        return styles.active;
      case JobStatus.PAUSED:
        return styles.paused;
      case JobStatus.CLOSED:
        return styles.closed;
      case JobStatus.DRAFT:
      case JobStatus.EXPIRED:
      default:
        return styles.draft;
    }
  };
  
  // If a job is selected and we're NOT using URL-based routing, show the ApplicantTracker
  if (selectedJobId && !onJobSelect) {
    return <ApplicantTracker jobId={selectedJobId} onBack={handleBackClick} />;
  }
  
  // Return loading state while fetching data
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Job Postings</h1>
        </div>
        <p>Loading jobs...</p>
      </div>
    );
  }
  
  // Return error state if there was a problem
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Job Postings</h1>
        </div>
        <p>Error: {error}</p>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Job Postings</h1>
        <p className={styles.subtitle}>
          Showing jobs for your organization
        </p>
      </div>
      
      {jobs.length === 0 ? (
        <div className={styles.noJobs}>
          <p>No job postings found for your organization.</p>
        </div>
      ) : (
        <div className={styles.jobsList}>
          {jobs.map(job => (
            <div 
              key={job.id} 
              className={styles.jobCard}
              onClick={() => handleJobClick(job.id)}
            >
              <h3 className={styles.jobTitle}>{job.title}</h3>
              
              <div className={styles.jobMeta}>
                <div className={styles.jobLocation}>📍 {job.location}</div>
                <div className={styles.jobDate}>{formatDate(job.postedDate)}</div>
              </div>
              
              <div className={styles.jobDescription}>{job.description}</div>
              
              <div className={styles.jobSalary}>{job.salary}</div>
              
              <div className={styles.jobFooter}>
                <div className={styles.applicantsCount}>
                  👤 {job.applicantCount} {job.applicantCount === 1 ? 'Applicant' : 'Applicants'}
                </div>
                
                <div className={`${styles.statusIndicator} ${getStatusClass(job.status as JobStatus)}`}>
                  {job.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsDashboard;