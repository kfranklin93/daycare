// src/components/ATSDemo.tsx

import React, { useState } from 'react';
import JobsDashboard from './JobsDashboard';
import { organizationA, organizationB } from '../data/mockAtsData';
import styles from './ATSDemo.module.css';

/**
 * ATSDemo component
 * 
 * Demonstrates the multi-tenant applicant tracking system with organization switching.
 */
const ATSDemo: React.FC = () => {
  // State for selected organization
  const [selectedOrgId, setSelectedOrgId] = useState<string>(organizationA.id);
  
  // Handle organization change
  const handleOrgChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrgId(e.target.value);
  };
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          Multi-Tenant Applicant Tracking System
        </div>
        
        <div className={styles.orgSelector}>
          <span className={styles.orgLabel}>Organization:</span>
          <select 
            className={styles.orgSelect}
            value={selectedOrgId}
            onChange={handleOrgChange}
          >
            <option value={organizationA.id}>{organizationA.name}</option>
            <option value={organizationB.id}>{organizationB.name}</option>
          </select>
        </div>
      </header>
      
      <main className={styles.content}>
        <JobsDashboard organizationId={selectedOrgId} />
      </main>
      
      <footer className={styles.footer}>
        <p>
          Multi-Tenant Applicant Tracking System &copy; 2025 | 
          <a href="#privacy"> Privacy Policy</a> | 
          <a href="#terms"> Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default ATSDemo;