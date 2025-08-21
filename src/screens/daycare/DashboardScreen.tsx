import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardHeader, Button } from '../../components/ui';
import { mockJobs } from '../../data/mockJobs';
import { ROUTES, DAYCARE_NAV_ITEMS } from '../../types/navigation';
import { Link } from 'react-router-dom';

interface DashboardScreenProps {
  onLogout: () => void;
}

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Navbar = styled.nav`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4361ee;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#4361ee' : '#4a5568')};
  text-decoration: none;
  font-weight: ${({ active }) => (active ? '600' : '500')};
  padding: 0.5rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #4361ee;
    transform: ${({ active }) => (active ? 'scaleX(1)' : 'scaleX(0)')};
    transform-origin: bottom left;
    transition: transform 0.2s ease-in-out;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #718096;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div<{ span?: number }>`
  grid-column: span ${({ span }) => span || 12};
  
  @media (max-width: 768px) {
    grid-column: span 12;
  }
`;

const StatCard = styled(Card)`
  height: 100%;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #718096;
`;

const StatChange = styled.span<{ positive?: boolean }>`
  font-size: 0.875rem;
  color: ${({ positive }) => (positive ? '#48bb78' : '#f56565')};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f7fafc;
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e2e8f0;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #4a5568;
`;

const JobStatusBadge = styled.span<{ status: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  text-transform: lowercase;
  
  ${({ status }) => {
    switch (status) {
      case 'ACTIVE':
        return `
          background-color: rgba(72, 187, 120, 0.1);
          color: #48bb78;
        `;
      case 'PAUSED':
        return `
          background-color: rgba(237, 137, 54, 0.1);
          color: #ed8936;
        `;
      case 'CLOSED':
        return `
          background-color: rgba(160, 174, 192, 0.1);
          color: #a0aec0;
        `;
      case 'DRAFT':
        return `
          background-color: rgba(102, 126, 234, 0.1);
          color: #667eea;
        `;
      default:
        return `
          background-color: rgba(160, 174, 192, 0.1);
          color: #a0aec0;
        `;
    }
  }}
`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const DashboardScreen = ({ onLogout }: DashboardScreenProps) => {
  // Get active jobs count
  const activeJobsCount = mockJobs.filter(job => job.status === 'ACTIVE').length;
  
  // Get total applicants count
  const totalApplicants = mockJobs.reduce((sum, job) => sum + job.applicantCount, 0);
  
  // For this demo, we'll use the mockJobs array for the organization
  const organizationJobs = mockJobs.filter(job => job.organizationId === '1');
  
  return (
    <>
      <Navbar>
        <Logo>JobBoard</Logo>
        <NavMenu>
          {DAYCARE_NAV_ITEMS.map(item => (
            <NavLink 
              key={item.path} 
              to={item.path}
              active={item.path === ROUTES.DAYCARE_DASHBOARD}
            >
              {item.label}
            </NavLink>
          ))}
        </NavMenu>
        <UserMenu>
          <Button variant="outline" size="small" onClick={onLogout}>Logout</Button>
        </UserMenu>
      </Navbar>
      
      <DashboardContainer>
        <PageHeader>
          <div>
            <Title>Dashboard</Title>
            <Subtitle>Overview of your organization's job listings and applicants</Subtitle>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/ats-demo">
              <Button variant="outline">Try ATS Demo</Button>
            </Link>
            <Link to={ROUTES.DAYCARE_JOBS}>
              <Button>Post a New Job</Button>
            </Link>
          </div>
        </PageHeader>
        
        <GridContainer>
          <GridItem span={3}>
            <StatCard>
              <CardBody>
                <StatValue>{activeJobsCount}</StatValue>
                <StatLabel>Active Job Listings</StatLabel>
                <StatChange positive>↑ 2 from last month</StatChange>
              </CardBody>
            </StatCard>
          </GridItem>
          
          <GridItem span={3}>
            <StatCard>
              <CardBody>
                <StatValue>{totalApplicants}</StatValue>
                <StatLabel>Total Applicants</StatLabel>
                <StatChange positive>↑ 15 from last month</StatChange>
              </CardBody>
            </StatCard>
          </GridItem>
          
          <GridItem span={3}>
            <StatCard>
              <CardBody>
                <StatValue>24</StatValue>
                <StatLabel>Pending Reviews</StatLabel>
                <StatChange>↑ 5 from last week</StatChange>
              </CardBody>
            </StatCard>
          </GridItem>
          
          <GridItem span={3}>
            <StatCard>
              <CardBody>
                <StatValue>3</StatValue>
                <StatLabel>New Hires</StatLabel>
                <StatChange positive>↑ 1 from last month</StatChange>
              </CardBody>
            </StatCard>
          </GridItem>
          
          <GridItem span={12}>
            <Card>
              <CardHeader>Featured Demo</CardHeader>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Multi-Tenant Applicant Tracking System
                    </h3>
                    <p style={{ color: '#718096', marginBottom: '1rem' }}>
                      Try out our new multi-tenant ATS that ensures organizations only see their own jobs and applicants.
                    </p>
                  </div>
                  <Link to="/ats-demo">
                    <Button>Launch Demo</Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </GridItem>
          
          <GridItem span={12}>
            <Card>
              <CardHeader>Recent Job Listings</CardHeader>
              <CardBody padding="none">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Job Title</TableHeaderCell>
                        <TableHeaderCell>Posted Date</TableHeaderCell>
                        <TableHeaderCell>Applicants</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <tbody>
                      {organizationJobs.map(job => (
                        <TableRow key={job.id}>
                          <TableCell>
                            <div style={{ fontWeight: 500 }}>{job.title}</div>
                            <div style={{ fontSize: '0.875rem', color: '#718096' }}>{job.location}</div>
                          </TableCell>
                          <TableCell>{formatDate(job.postedDate)}</TableCell>
                          <TableCell>{job.applicantCount}</TableCell>
                          <TableCell>
                            <JobStatusBadge status={job.status}>{job.status}</JobStatusBadge>
                          </TableCell>
                          <TableCell>
                            <Button variant="text" size="small">View</Button>
                            <Button variant="text" size="small">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </DashboardContainer>
    </>
  );
};

export default DashboardScreen;