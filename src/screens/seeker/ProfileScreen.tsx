import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardHeader, Button, Input, TextArea } from '../../components/ui';
import Navbar from '../../components/layout/Navbar';
import PageHeader from '../../components/layout/PageHeader';
import { ROUTES, SEEKER_NAV_ITEMS } from '../../types/navigation';
import { Link, useLocation } from 'react-router-dom';

// --- Styled Components ---

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.neutral.gray100};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const ProfileSubNav = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.neutral.gray200};
  background-color: ${props => props.theme.colors.neutral.white};
  border-radius: ${props => props.theme.borders.radius.lg};
  padding: ${props => props.theme.spacing.sm};
`;

const ProfileSubNavItem = styled(Link)<{ active?: boolean }>`
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.active ? props.theme.colors.primary.main : props.theme.colors.neutral.gray600};
  font-weight: ${props => props.active ? props.theme.typography.fontWeights.semiBold : props.theme.typography.fontWeights.medium};
  text-decoration: none;
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.primary.main : 'transparent'};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary.main};
    background-color: ${props => props.theme.colors.primary.main}10;
    border-radius: ${props => props.theme.borders.radius.md};
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const ProfileCard = styled(Card)`
  position: relative;
  overflow: hidden;
  
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

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.neutral.gray200};
  background-color: ${props => props.theme.colors.neutral.white};
`;

const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 4px solid ${props => props.theme.colors.neutral.white};
  box-shadow: ${props => props.theme.shadows.lg};
  position: relative;
  
  &:hover .avatar-overlay {
    opacity: 1;
  }
`;

const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${props => props.theme.transitions.fast};
  cursor: pointer;
  
  span {
    color: white;
    font-size: ${props => props.theme.typography.sizes.sm};
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.h2`
  font-size: ${props => props.theme.typography.sizes['2xl']};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.neutral.gray900};
  margin-bottom: ${props => props.theme.spacing.xs};
  text-align: center;
`;

const ProfileTitle = styled.p`
  font-size: ${props => props.theme.typography.sizes.lg};
  color: ${props => props.theme.colors.neutral.gray600};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

const ProfileProgress = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ProgressLabelText = styled.span`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.neutral.gray600};
`;

const ProgressLabelValue = styled.span`
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.primary.main};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${props => props.theme.colors.neutral.gray200};
  border-radius: ${props => props.theme.borders.radius.full};
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ value: number }>`
  width: ${({ value }) => `${value}%`};
  height: 100%;
  background: linear-gradient(
    to right,
    ${props => props.theme.colors.primary.main},
    ${props => props.theme.colors.secondary.main}
  );
  border-radius: ${props => props.theme.borders.radius.full};
  transition: width ${props => props.theme.transitions.normal};
`;

const ProfileSection = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.neutral.gray900};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const DetailLabel = styled.div`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.neutral.gray600};
`;

const DetailValue = styled.div`
  font-size: ${props => props.theme.typography.sizes.md};
  color: ${props => props.theme.colors.neutral.gray900};
`;

const FormSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormSectionTitle = styled.h4`
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.neutral.gray900};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const FormSectionDescription = styled.p`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.neutral.gray600};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FormLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthField = styled.div`
  grid-column: span 2;
  
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.neutral.gray200};
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const ExperienceItem = styled.div`
  padding-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.neutral.gray200};
  
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ExperienceTitle = styled.h4`
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  color: ${props => props.theme.colors.neutral.gray900};
  margin: 0;
`;

const ExperienceCompany = styled.div`
  font-size: ${props => props.theme.typography.sizes.md};
  color: ${props => props.theme.colors.neutral.gray700};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ExperienceDuration = styled.div`
  font-size: ${props => props.theme.typography.sizes.sm};
  color: ${props => props.theme.colors.neutral.gray600};
`;

const ExperienceDescription = styled.p`
  font-size: ${props => props.theme.typography.sizes.md};
  color: ${props => props.theme.colors.neutral.gray700};
  line-height: 1.5;
  margin: ${props => props.theme.spacing.md} 0;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const Tag = styled.span`
  background-color: ${props => props.theme.colors.primary.main}15;
  color: ${props => props.theme.colors.primary.main};
  padding: ${props => `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
  border-radius: ${props => props.theme.borders.radius.full};
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
`;

const ActionButton = styled(Button)`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.sizes.sm};
`;

// Mock data
const mockProfile = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@example.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Experienced childcare professional with over 5 years working in early childhood education. Passionate about child development and creating engaging learning environments.',
  jobTitle: 'Early Childhood Educator',
  avatar: 'https://placehold.co/400',
  experience: [
    {
      id: '1',
      title: 'Lead Preschool Teacher',
      company: 'Sunshine Daycare Center',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: 'Developed and implemented age-appropriate curriculum for preschoolers. Maintained a safe and engaging classroom environment. Communicated effectively with parents and colleagues.'
    },
    {
      id: '2',
      title: 'Assistant Teacher',
      company: 'Little Stars Childcare',
      location: 'Oakland, CA',
      startDate: 'Mar 2020',
      endDate: 'Dec 2021',
      description: 'Assisted lead teachers with daily activities and lessons. Supervised children during indoor and outdoor play. Helped maintain classroom cleanliness and organization.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Arts in Early Childhood Education',
      institution: 'San Francisco State University',
      location: 'San Francisco, CA',
      graduationYear: '2020'
    }
  ],
  skills: ['Curriculum Development', 'Child Development', 'Classroom Management', 'Communication', 'First Aid & CPR', 'Activity Planning', 'Parent Relations'],
  certifications: ['Early Childhood Education License', 'CPR & First Aid Certification', 'Child Development Associate (CDA)']
};

// ProfileScreen component
const ProfileScreen: React.FC<{ initialSection?: 'personal' | 'experience' | 'education' | 'skills' }> = ({ 
  initialSection = 'personal' 
}) => {
  const [profile, setProfile] = useState(mockProfile);
  const location = useLocation();
  const profileCompletionPercentage = 85;

  return (
    <PageContainer>
      <Navbar 
        navItems={SEEKER_NAV_ITEMS}
        appName="TalentHub"
      />
      
      <ContentContainer>
        <PageHeader
          title="My Profile"
          subtitle="Manage your personal information and resume"
        />
        
        <ProfileSubNav>
          <ProfileSubNavItem 
            to={ROUTES.SEEKER_PROFILE_PERSONAL} 
            active={initialSection === 'personal'}
          >
            Personal Info
          </ProfileSubNavItem>
          <ProfileSubNavItem 
            to={ROUTES.SEEKER_PROFILE_EXPERIENCE} 
            active={initialSection === 'experience'}
          >
            Work Experience
          </ProfileSubNavItem>
          <ProfileSubNavItem 
            to={ROUTES.SEEKER_PROFILE_EDUCATION} 
            active={initialSection === 'education'}
          >
            Education
          </ProfileSubNavItem>
          <ProfileSubNavItem 
            to={ROUTES.SEEKER_PROFILE_SKILLS} 
            active={initialSection === 'skills'}
          >
            Skills & Certifications
          </ProfileSubNavItem>
        </ProfileSubNav>
        
        <ProfileGrid>
          <Sidebar>
            <ProfileCard>
              <ProfileHeader>
                <AvatarContainer>
                  <Avatar src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                  <AvatarOverlay className="avatar-overlay">
                    <span>Change Photo</span>
                  </AvatarOverlay>
                </AvatarContainer>
                <ProfileName>{profile.firstName} {profile.lastName}</ProfileName>
                <ProfileTitle>{profile.jobTitle}</ProfileTitle>
                
                <ProfileProgress>
                  <ProgressLabel>
                    <ProgressLabelText>Profile Completion</ProgressLabelText>
                    <ProgressLabelValue>{profileCompletionPercentage}%</ProgressLabelValue>
                  </ProgressLabel>
                  <ProgressBar>
                    <ProgressBarFill value={profileCompletionPercentage} />
                  </ProgressBar>
                </ProfileProgress>
                
                <Button variant="outline" size="small" fullWidth>
                  View Public Profile
                </Button>
              </ProfileHeader>
              
              <ProfileSection>
                <SectionTitle>Contact Details</SectionTitle>
                <DetailsList>
                  <DetailItem>
                    <DetailLabel>Email</DetailLabel>
                    <DetailValue>{profile.email}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Phone</DetailLabel>
                    <DetailValue>{profile.phone}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Location</DetailLabel>
                    <DetailValue>{profile.location}</DetailValue>
                  </DetailItem>
                </DetailsList>
              </ProfileSection>
            </ProfileCard>
            
            <Card>
              <CardHeader>Resume</CardHeader>
              <CardBody>
                <Button variant="primary" fullWidth>Upload Resume</Button>
              </CardBody>
            </Card>
          </Sidebar>
          
          <MainContent>
            {initialSection === 'personal' && (
              <Card>
                <CardHeader>Personal Information</CardHeader>
                <CardBody>
                  <FormSection>
                    <FormSectionTitle>About Me</FormSectionTitle>
                    <FormSectionDescription>
                      Tell employers about yourself and why you're a great fit for their team.
                    </FormSectionDescription>
                    
                    <FormLayout>
                      <Input 
                        label="First Name" 
                        value={profile.firstName} 
                        onChange={() => {}} 
                        fullWidth 
                      />
                      <Input 
                        label="Last Name" 
                        value={profile.lastName} 
                        onChange={() => {}} 
                        fullWidth 
                      />
                      <Input 
                        label="Job Title" 
                        value={profile.jobTitle} 
                        onChange={() => {}} 
                        fullWidth 
                      />
                      <Input 
                        label="Location" 
                        value={profile.location} 
                        onChange={() => {}} 
                        fullWidth 
                      />
                      <FullWidthField>
                        <TextArea 
                          label="Bio" 
                          value={profile.bio} 
                          onChange={() => {}} 
                          rows={4}
                          fullWidth 
                        />
                      </FullWidthField>
                    </FormLayout>
                  </FormSection>
                  
                  <FormFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="primary">Save Changes</Button>
                  </FormFooter>
                </CardBody>
              </Card>
            )}
            
            {initialSection === 'experience' && (
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Work Experience</span>
                    <Button variant="primary" size="small">Add Experience</Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <ExperienceList>
                    {profile.experience.map(exp => (
                      <ExperienceItem key={exp.id}>
                        <ExperienceHeader>
                          <div>
                            <ExperienceTitle>{exp.title}</ExperienceTitle>
                            <ExperienceCompany>
                              {exp.company} • {exp.location}
                            </ExperienceCompany>
                            <ExperienceDuration>
                              {exp.startDate} - {exp.endDate}
                            </ExperienceDuration>
                          </div>
                          <div>
                            <ActionButton variant="text">Edit</ActionButton>
                            <ActionButton variant="text">Delete</ActionButton>
                          </div>
                        </ExperienceHeader>
                        <ExperienceDescription>
                          {exp.description}
                        </ExperienceDescription>
                      </ExperienceItem>
                    ))}
                  </ExperienceList>
                </CardBody>
              </Card>
            )}
            
            {initialSection === 'education' && (
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Education</span>
                    <Button variant="primary" size="small">Add Education</Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <ExperienceList>
                    {profile.education.map(edu => (
                      <ExperienceItem key={edu.id}>
                        <ExperienceHeader>
                          <div>
                            <ExperienceTitle>{edu.degree}</ExperienceTitle>
                            <ExperienceCompany>
                              {edu.institution} • {edu.location}
                            </ExperienceCompany>
                            <ExperienceDuration>
                              Graduated {edu.graduationYear}
                            </ExperienceDuration>
                          </div>
                          <div>
                            <ActionButton variant="text">Edit</ActionButton>
                            <ActionButton variant="text">Delete</ActionButton>
                          </div>
                        </ExperienceHeader>
                      </ExperienceItem>
                    ))}
                  </ExperienceList>
                </CardBody>
              </Card>
            )}
            
            {initialSection === 'skills' && (
              <Card>
                <CardHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Skills & Certifications</span>
                    <Button variant="primary" size="small">Add Skills</Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <FormSection>
                    <FormSectionTitle>Skills</FormSectionTitle>
                    <TagsContainer>
                      {profile.skills.map((skill, index) => (
                        <Tag key={index}>{skill}</Tag>
                      ))}
                    </TagsContainer>
                  </FormSection>
                  
                  <FormSection>
                    <FormSectionTitle>Certifications</FormSectionTitle>
                    <TagsContainer>
                      {profile.certifications.map((cert, index) => (
                        <Tag key={index}>{cert}</Tag>
                      ))}
                    </TagsContainer>
                  </FormSection>
                </CardBody>
              </Card>
            )}
          </MainContent>
        </ProfileGrid>
      </ContentContainer>
    </PageContainer>
  );
};

export default ProfileScreen;