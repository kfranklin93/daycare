import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, Button } from '../../components/ui';
import Navbar from '../../components/layout/Navbar';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES, SEEKER_NAV_ITEMS } from '../../types/navigation';

// Mock data for applications
const mockApplications = [
  {
    id: '1',
    jobTitle: 'Lead Preschool Teacher',
    company: 'Sunshine Daycare Center',
    location: 'San Francisco, CA',
    appliedDate: '2025-08-15',
    status: 'Under Review',
    nextStep: 'Interview Scheduled',
    interviewDate: '2025-08-25'
  },
  {
    id: '2',
    jobTitle: 'Early Childhood Educator',
    company: 'Little Stars Academy',
    location: 'Oakland, CA',
    appliedDate: '2025-08-10',
    status: 'Application Received',
    nextStep: 'Initial Review',
    interviewDate: null
  },
  {
    id: '3',
    jobTitle: 'Assistant Teacher',
    company: 'Rainbow Kids Daycare',
    location: 'Berkeley, CA',
    appliedDate: '2025-08-05',
    status: 'Rejected',
    nextStep: null,
    interviewDate: null
  }
];

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.neutral.gray100};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const ApplicationsGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.lg};
`;

const ApplicationCard = styled(Card)`
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ApplicationHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const JobTitle = styled.h3`
  color: ${props => props.theme.colors.neutral.black};
  font-size: ${props => props.theme.typography.sizes.xl};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const CompanyInfo = styled.div`
  color: ${props => props.theme.colors.neutral.gray700};
  font-size: ${props => props.theme.typography.sizes.md};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Location = styled.div`
  color: ${props => props.theme.colors.neutral.gray600};
  font-size: ${props => props.theme.typography.sizes.sm};
`;

const ApplicationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.neutral.gray200};
`;

const DetailItem = styled.div``;

const DetailLabel = styled.div`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.neutral.gray600};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const DetailValue = styled.div`
  font-size: ${props => props.theme.typography.sizes.md};
  color: ${props => props.theme.colors.neutral.gray900};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: ${props => `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
  border-radius: ${props => props.theme.borders.radius.full};
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  
  ${props => {
    switch (props.status.toLowerCase()) {
      case 'under review':
        return `
          background-color: ${props.theme.colors.primary.main}15;
          color: ${props.theme.colors.primary.main};
        `;
      case 'application received':
        return `
          background-color: ${props.theme.colors.info.main}15;
          color: ${props.theme.colors.info.main};
        `;
      case 'rejected':
        return `
          background-color: ${props.theme.colors.error.main}15;
          color: ${props.theme.colors.error.main};
        `;
      default:
        return `
          background-color: ${props.theme.colors.neutral.gray200};
          color: ${props.theme.colors.neutral.gray600};
        `;
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
`;

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric' 
  }).format(date);
};

const ApplicationsScreen = () => {
  return (
    <PageContainer>
      <Navbar 
        navItems={SEEKER_NAV_ITEMS}
        appName="TalentHub"
      />
      
      <ContentContainer>
        <PageHeader
          title="My Applications"
          subtitle="Track and manage your job applications"
        />
        
        <ApplicationsGrid>
          {mockApplications.map(application => (
            <ApplicationCard key={application.id}>
              <CardBody>
                <ApplicationHeader>
                  <JobTitle>{application.jobTitle}</JobTitle>
                  <CompanyInfo>{application.company}</CompanyInfo>
                  <Location>{application.location}</Location>
                </ApplicationHeader>
                
                <StatusBadge status={application.status}>
                  {application.status}
                </StatusBadge>
                
                <ApplicationDetails>
                  <DetailItem>
                    <DetailLabel>Applied On</DetailLabel>
                    <DetailValue>{formatDate(application.appliedDate)}</DetailValue>
                  </DetailItem>
                  
                  <DetailItem>
                    <DetailLabel>Next Step</DetailLabel>
                    <DetailValue>{application.nextStep || 'N/A'}</DetailValue>
                  </DetailItem>
                  
                  {application.interviewDate && (
                    <DetailItem>
                      <DetailLabel>Interview Date</DetailLabel>
                      <DetailValue>{formatDate(application.interviewDate)}</DetailValue>
                    </DetailItem>
                  )}
                </ApplicationDetails>
                
                <ActionButtons>
                  <Button variant="primary">View Details</Button>
                  <Button variant="outline">Withdraw Application</Button>
                </ActionButtons>
              </CardBody>
            </ApplicationCard>
          ))}
        </ApplicationsGrid>
        
        {mockApplications.length === 0 && (
          <Card>
            <CardBody>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>No applications found</h3>
                <p>Start applying to jobs to see your applications here</p>
                <Button variant="primary" style={{ marginTop: '1rem' }}>
                  Browse Jobs
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default ApplicationsScreen;