// src/screens/ats/ATSDemoScreen.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { organizationA, organizationB } from '../../data/mockAtsData';
import JobsDashboard from '../../components/JobsDashboard';
import ApplicantTracker from '../../components/ApplicantTracker';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #4a90e2;
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const OrgSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const OrgLabel = styled.span`
  font-weight: 500;
`;

const OrgSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  background-color: white;
  color: #212529;
  font-size: 14px;
`;

const Content = styled.main`
  flex-grow: 1;
  background-color: #f8f9fa;
`;

/**
 * ATSDemoScreen
 * 
 * Main screen for the ATS demo that handles routing between
 * the job dashboard and applicant tracker.
 */
const ATSDemoScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract jobId from URL params if present
  const params = new URLSearchParams(location.search);
  const jobId = params.get('jobId');
  
  // Get organizationId from the URL or default to organizationA
  const orgParam = params.get('org') || organizationA.id;
  const [selectedOrgId, setSelectedOrgId] = useState<string>(orgParam);
  
  // Update URL when organization changes
  useEffect(() => {
    if (orgParam !== selectedOrgId) {
      navigate(`/ats-demo?org=${selectedOrgId}${jobId ? `&jobId=${jobId}` : ''}`);
    }
  }, [selectedOrgId, jobId, orgParam, navigate]);
  
  // Handle organization change
  const handleOrgChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrgId(e.target.value);
    // Reset job selection when org changes
    navigate(`/ats-demo?org=${e.target.value}`);
  };
  
  // Handle job selection
  const handleJobSelect = (selectedJobId: string) => {
    navigate(`/ats-demo?org=${selectedOrgId}&jobId=${selectedJobId}`);
  };
  
  // Handle back navigation from applicant tracker
  const handleBackToJobs = () => {
    navigate(`/ats-demo?org=${selectedOrgId}`);
  };
  
  return (
    <Container>
      <Header>
        <HeaderTitle>
          Multi-Tenant Applicant Tracking System
        </HeaderTitle>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <OrgSelector>
            <OrgLabel>Organization:</OrgLabel>
            <OrgSelect 
              value={selectedOrgId}
              onChange={handleOrgChange}
            >
              <option value={organizationA.id}>{organizationA.name}</option>
              <option value={organizationB.id}>{organizationB.name}</option>
            </OrgSelect>
          </OrgSelector>
          
          <Link to="/" style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '14px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '6px 12px',
            borderRadius: '4px'
          }}>
            Back to Main App
          </Link>
        </div>
      </Header>
      
      <Content>
        {jobId ? (
          <ApplicantTracker 
            jobId={jobId} 
            onBack={handleBackToJobs} 
          />
        ) : (
          <JobsDashboard 
            organizationId={selectedOrgId} 
            onJobSelect={handleJobSelect}
          />
        )}
      </Content>
    </Container>
  );
};

export default ATSDemoScreen;