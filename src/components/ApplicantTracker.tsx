// src/components/ApplicantTracker.tsx

import React, { useState, useEffect } from 'react';
import { Application, ApplicationStatus, Job } from '../types/data';
import { 
  getApplicationsByJob, 
  getApplicationsByStatus, 
  updateApplicationStatus, 
  mockJobs 
} from '../data/mockAtsData';
import ApplicantCard from './ApplicantCard';
import styles from './ApplicantTracker.module.css';

interface ApplicantTrackerProps {
  jobId: string;
  onBack?: () => void; // Optional callback for navigating back
}

/**
 * ApplicantTracker component
 * 
 * Displays a Kanban-style board of applicants for a specific job,
 * organized by application status.
 */
const ApplicantTracker: React.FC<ApplicantTrackerProps> = ({ 
  jobId,
  onBack
}) => {
  // State for applications and job details
  const [applications, setApplications] = useState<Application[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  
  // State for loading and error handling
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch job and applications data on component mount
  useEffect(() => {
    // Simulate API call with timeout
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Short timeout to simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get job details
        const jobData = mockJobs.find(j => j.id === jobId);
        if (!jobData) {
          throw new Error(`Job with ID ${jobId} not found`);
        }
        setJob(jobData);
        
        // Get applications for this job
        const applicationsData = getApplicationsByJob(jobId);
        setApplications(applicationsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [jobId]);
  
  // Handler for updating an application's status
  const handleStatusUpdate = (applicationId: string, newStatus: ApplicationStatus) => {
    // Log the action (as required by the prompt)
    const application = applications.find(app => app.id === applicationId);
    console.log(`Updating application ${applicationId} for ${application?.applicantName} to status ${newStatus}`);
    
    // Update the application status in our mock data
    const updatedApp = updateApplicationStatus(applicationId, newStatus);
    
    // Update our local state if the update was successful
    if (updatedApp) {
      setApplications(prevApps => 
        prevApps.map(app => 
          app.id === applicationId ? updatedApp : app
        )
      );
    }
  };
  
  // Group applications by status
  const getApplicationsByStatusGroup = (status: ApplicationStatus) => {
    return applications.filter(app => app.status === status);
  };
  
  // Define all possible statuses for our columns
  const statusColumns = [
    ApplicationStatus.APPLIED,
    ApplicationStatus.REVIEWING,
    ApplicationStatus.INTERVIEW_SCHEDULED,
    ApplicationStatus.OFFERED,
    ApplicationStatus.REJECTED
  ];
  
  // Helper to format status for display
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ');
  };
  
  // Return loading state while fetching data
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading applicant data...</p>
      </div>
    );
  }
  
  // Return error state if there was a problem
  if (error || !job) {
    return (
      <div className={styles.error}>
        <p>Error: {error || 'Job not found'}</p>
        {onBack && (
          <button onClick={onBack} className={styles.backButton}>
            Back to Jobs
          </button>
        )}
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{job.title}</h2>
          <div className={styles.details}>
            <span className={styles.location}>{job.location}</span>
            <span className={styles.count}>{applications.length} Applicants</span>
          </div>
        </div>
        {onBack && (
          <button onClick={onBack} className={styles.backButton}>
            Back to Jobs
          </button>
        )}
      </div>
      
      <div className={styles.board}>
        {statusColumns.map(status => (
          <div key={status} className={styles.column}>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>{formatStatus(status)}</h3>
              <span className={styles.columnCount}>
                {getApplicationsByStatusGroup(status).length}
              </span>
            </div>
            
            <div className={styles.cards}>
              {getApplicationsByStatusGroup(status).map(application => (
                <ApplicantCard
                  key={application.id}
                  application={application}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
              
              {getApplicationsByStatusGroup(status).length === 0 && (
                <div className={styles.emptyState}>
                  No applicants in this stage
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantTracker;