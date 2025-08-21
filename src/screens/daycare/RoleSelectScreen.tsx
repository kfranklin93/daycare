import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, Button } from '../../components/ui';

// Types
interface RoleSelectScreenProps {
  onRoleSelect: (role: 'daycare' | 'seeker') => void;
}

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.dark} 0%,
    ${props => props.theme.colors.primary.main} 100%
  );
`;

const ContentCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.primary.main},
      ${props => props.theme.colors.secondary.main}
    );
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  h1 {
    font-size: ${props => props.theme.typography.sizes['3xl']};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
    background: linear-gradient(
      45deg,
      ${props => props.theme.colors.primary.main},
      ${props => props.theme.colors.secondary.main}
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${props => props.theme.spacing.xs};
  }
  
  p {
    color: ${props => props.theme.colors.neutral.gray600};
    font-size: ${props => props.theme.typography.sizes.lg};
  }
`;

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RoleCard = styled.div`
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borders.radius.lg};
  border: 2px solid ${props => props.theme.colors.neutral.gray200};
  transition: all ${props => props.theme.transitions.normal};
  cursor: pointer;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const RoleIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary.main}15;
  color: ${props => props.theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: 32px;
`;

const RoleTitle = styled.h3`
  font-size: ${props => props.theme.typography.sizes.xl};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.neutral.gray900};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const RoleDescription = styled.p`
  color: ${props => props.theme.colors.neutral.gray600};
  font-size: ${props => props.theme.typography.sizes.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.5;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${props => props.theme.spacing.xl} 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.neutral.gray700};
  font-size: ${props => props.theme.typography.sizes.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &::before {
    content: '✓';
    color: ${props => props.theme.colors.success.main};
    font-weight: ${props => props.theme.typography.fontWeights.bold};
  }
`;

// Role Select Screen Component
const RoleSelectScreen: React.FC<RoleSelectScreenProps> = ({ onRoleSelect }) => {
  return (
    <PageContainer>
      <ContentCard>
        <CardBody>
          <Header>
            <h1>Choose Your Role</h1>
            <p>Select how you'd like to use TalentHub</p>
          </Header>
          
          <RoleGrid>
            <RoleCard onClick={() => onRoleSelect('daycare')}>
              <RoleIcon>👥</RoleIcon>
              <RoleTitle>Daycare Provider</RoleTitle>
              <RoleDescription>
                Post jobs and find qualified candidates for your daycare center
              </RoleDescription>
              <FeatureList>
                <FeatureItem>Post and manage job listings</FeatureItem>
                <FeatureItem>Review applicant profiles</FeatureItem>
                <FeatureItem>Schedule interviews</FeatureItem>
                <FeatureItem>Manage your organization</FeatureItem>
              </FeatureList>
              <Button variant="primary" fullWidth>
                Continue as Provider
              </Button>
            </RoleCard>
            
            <RoleCard onClick={() => onRoleSelect('seeker')}>
              <RoleIcon>👤</RoleIcon>
              <RoleTitle>Job Seeker</RoleTitle>
              <RoleDescription>
                Find and apply to daycare positions that match your skills
              </RoleDescription>
              <FeatureList>
                <FeatureItem>Browse job opportunities</FeatureItem>
                <FeatureItem>Create your professional profile</FeatureItem>
                <FeatureItem>Track your applications</FeatureItem>
                <FeatureItem>Connect with employers</FeatureItem>
              </FeatureList>
              <Button variant="gold" fullWidth>
                Continue as Seeker
              </Button>
            </RoleCard>
          </RoleGrid>
        </CardBody>
      </ContentCard>
    </PageContainer>
  );
};

export default RoleSelectScreen;