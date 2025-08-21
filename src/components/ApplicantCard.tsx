// src/components/ApplicantCard.tsx

import React from 'react';
import { Application, ApplicationStatus } from '../types/data';
import styles from './ApplicantCard.module.css';

interface ApplicantCardProps {
  application: Application;
  onStatusUpdate: (applicationId: string, newStatus: ApplicationStatus) => void;
}

/**
 * ApplicantCard component
 * 
 * Displays information about a job applicant and allows status updates
 */
const ApplicantCard: React.FC<ApplicantCardProps> = ({ 
  application, 
  onStatusUpdate 
}) => {
  // Function to determine the next status based on current status
  const getNextStatus = (currentStatus: ApplicationStatus): ApplicationStatus => {
    switch (currentStatus) {
      case ApplicationStatus.APPLIED:
        return ApplicationStatus.REVIEWING;
      case ApplicationStatus.REVIEWING:
        return ApplicationStatus.INTERVIEW_SCHEDULED;
      case ApplicationStatus.INTERVIEW_SCHEDULED:
        return ApplicationStatus.OFFERED;
      case ApplicationStatus.OFFERED:
        // If offered, no automatic next step (could be accepted or rejected)
        return ApplicationStatus.OFFERED;
      case ApplicationStatus.REJECTED:
        // If rejected, no automatic next step
        return ApplicationStatus.REJECTED;
      default:
        return currentStatus;
    }
  };

  // Function to format the application date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Handler for moving to next stage
  const handleMoveToNextStage = () => {
    const nextStatus = getNextStatus(application.status);
    
    // Only update if the status would actually change
    if (nextStatus !== application.status) {
      onStatusUpdate(application.id, nextStatus);
    }
  };

  // Handler for rejecting an application
  const handleReject = () => {
    onStatusUpdate(application.id, ApplicationStatus.REJECTED);
  };

  // Determine if we can move to next stage (not applicable for OFFERED or REJECTED)
  const canMoveToNextStage = ![ApplicationStatus.OFFERED, ApplicationStatus.REJECTED].includes(application.status);
  
  // Determine if we can reject (not applicable if already rejected)
  const canReject = application.status !== ApplicationStatus.REJECTED;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{application.applicantName}</h3>
        <div className={styles.status}>{application.status.replace(/_/g, ' ')}</div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Email:</span>
          <a href={`mailto:${application.applicantEmail}`} className={styles.value}>
            {application.applicantEmail}
          </a>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.label}>Phone:</span>
          <a href={`tel:${application.applicantPhone}`} className={styles.value}>
            {application.applicantPhone}
          </a>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.label}>Applied:</span>
          <span className={styles.value}>{formatDate(application.appliedDate)}</span>
        </div>
        
        <div className={styles.detailItem}>
          <span className={styles.label}>Last Updated:</span>
          <span className={styles.value}>{formatDate(application.lastUpdated)}</span>
        </div>
      </div>
      
      {application.notes && (
        <div className={styles.notes}>
          <p>{application.notes}</p>
        </div>
      )}
      
      <div className={styles.actions}>
        {canMoveToNextStage && (
          <button 
            className={`${styles.button} ${styles.nextButton}`}
            onClick={handleMoveToNextStage}
          >
            Move to Next Stage
          </button>
        )}
        
        {canReject && (
          <button 
            className={`${styles.button} ${styles.rejectButton}`}
            onClick={handleReject}
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicantCard;