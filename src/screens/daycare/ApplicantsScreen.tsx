import React, { useState } from 'react';
import styled from 'styled-components';
import { mockJobs } from '../../data/mockJobs';
import { mockJobSeekers } from '../../data/mockJobSeekers';
import { 
  calculateMatchScore, 
  generateStrengthsAndGaps, 
  getRecommendationsForJob 
} from '../../lib/candidateMatchingEngine';
import MatchScoreBreakdown from '../../components/MatchScoreBreakdown';

const ApplicantsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const JobSelector = styled.div`
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  width: 100%;
  max-width: 500px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2b6cb0;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  background-color: #f7fafc;
  border-bottom: 2px solid #e2e8f0;
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
`;

const TableRow = styled.tr<{ isTopCandidate?: boolean }>`
  background-color: ${props => props.isTopCandidate ? '#f0fff4' : 'transparent'};
  &:hover {
    background-color: ${props => props.isTopCandidate ? '#dcfce7' : '#f8fafc'};
  }
`;

const RankBadge = styled.span<{ rank: number }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => 
    props.rank === 1 ? '#ffd700' :  // Gold
    props.rank === 2 ? '#c0c0c0' :  // Silver
    props.rank === 3 ? '#cd7f32' :  // Bronze
    '#e2e8f0'                       // Default
  };
  color: ${props => 
    props.rank <= 3 ? '#1a202c' : '#4a5568'
  };
  font-weight: ${props => 
    props.rank <= 3 ? 'bold' : 'normal'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const MatchScore = styled.div<{ score: number }>`
  background-color: ${props => 
    props.score >= 80 ? '#c6f6d5' : 
    props.score >= 60 ? '#fefcbf' : 
    '#fed7d7'
  };
  color: ${props => 
    props.score >= 80 ? '#276749' : 
    props.score >= 60 ? '#975a16' : 
    '#9b2c2c'
  };
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
`;

const TabContainer = styled.div`
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: ${props => props.active ? '#fff' : 'transparent'};
  color: ${props => props.active ? '#4a5568' : '#a0aec0'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border: none;
  border-bottom: ${props => props.active ? '2px solid #4299e1' : 'none'};
  cursor: pointer;
  margin-right: 1rem;
  
  &:hover {
    color: #4a5568;
  }
`;

const ScoreMeter = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e2e8f0;
  border-radius: 10px;
  margin-top: 8px;
  overflow: hidden;
`;

const ScoreFill = styled.div<{ score: number }>`
  height: 100%;
  width: ${props => props.score}%;
  background-color: ${props => 
    props.score >= 80 ? '#48bb78' : 
    props.score >= 60 ? '#ecc94b' : 
    '#f56565'
  };
`;

const MatchInsight = styled.div`
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 6px;
  background-color: #ebf8ff;
  border-left: 4px solid #4299e1;
`;

const DetailCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const DetailSection = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 6px;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

type ApplicantTabs = 'all' | 'matched' | 'details';

const ApplicantsScreen = () => {
  const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
  const [activeTab, setActiveTab] = useState<ApplicantTabs>('all');
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  
  // Get recommendations for the selected job
  const matchedApplicants = getRecommendationsForJob(selectedJob, 10);
  
  // Function to calculate individual scores for the MatchScoreBreakdown component
  const calculateDetailedScores = (job: any, candidate: any) => {
    // These calculations are simplified approximations based on candidateMatchingEngine.ts
    // For a real application, you would export these individual functions from the engine
    
    // Calculate skills score
    const skillsScore = candidate.skills ? 
      Math.min(1.0, candidate.skills.filter((skill: string) => 
        job.requirements.some((req: string) => req.toLowerCase().includes(skill.toLowerCase()))
      ).length / 5) : 0.2;
    
    // Experience score based on title match
    const expScore = candidate.experience && candidate.experience.some((exp: any) => 
      job.title.toLowerCase().includes(exp.title?.toLowerCase()) || 
      exp.title?.toLowerCase().includes(job.title.toLowerCase())
    ) ? 0.6 : 0.2;
    
    // Years of experience score
    const yearsRequired = 3; // Default
    const yearsScore = candidate.yearsOfExperience >= yearsRequired ? 
      1.0 : 0.5 + (0.5 * (candidate.yearsOfExperience / yearsRequired));
    
    // Education score
    const educationScore = candidate.education && candidate.education.some((edu: any) =>
      edu.degree.toLowerCase().includes('bachelor') || 
      edu.degree.toLowerCase().includes('master')
    ) ? 0.8 : 0.5;
    
    // Certifications score
    const certScore = candidate.certifications && candidate.certifications.some((cert: string) =>
      cert.toLowerCase().includes('cpr') || 
      cert.toLowerCase().includes('first aid')
    ) ? 0.7 : 0.4;
    
    // Location score
    const locationScore = job.location.split(',')[0].trim().toLowerCase() === 
      candidate.location.split(',')[0].trim().toLowerCase() ? 1.0 : 0.4;
    
    // Salary score
    const salaryScore = !candidate.minSalary ? 1.0 : 
      parseInt(job.salary.replace(/[^0-9]/g, '')) >= candidate.minSalary ? 1.0 : 0.5;
    
    // Job type score
    const jobTypeScore = candidate.preferredJobTypes && 
      candidate.preferredJobTypes.includes(job.type.toString()) ? 1.0 : 0.5;
    
    return {
      skills: skillsScore,
      experience: expScore,
      yearsOfExperience: yearsScore,
      education: educationScore,
      certifications: certScore,
      location: locationScore,
      salary: salaryScore,
      jobType: jobTypeScore
    };
  };
  
  // Handle applicant selection for details view
  const handleApplicantSelect = (applicant: any) => {
    setSelectedApplicant(applicant);
    setActiveTab('details');
  };
  
  return (
    <ApplicantsContainer>
      <Title>Applicants</Title>
      <Subtitle>Review and manage job applications</Subtitle>
      
      <Card>
        <JobSelector>
          <h2>Select Job</h2>
          <Select 
            value={selectedJob.id}
            onChange={(e) => {
              const job = mockJobs.find(j => j.id === e.target.value);
              if (job) {
                setSelectedJob(job);
                setSelectedApplicant(null);
                setActiveTab('all');
              }
            }}
          >
            {mockJobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.title} at {job.organizationName}
              </option>
            ))}
          </Select>
          
          <h3 style={{ marginTop: '1rem' }}>Selected Job Details</h3>
          <p><strong>Title:</strong> {selectedJob.title}</p>
          <p><strong>Organization:</strong> {selectedJob.organizationName}</p>
          <p><strong>Location:</strong> {selectedJob.location}</p>
          <p><strong>Salary:</strong> {selectedJob.salary}</p>
          <p><strong>Type:</strong> {selectedJob.type || 'Not specified'}</p>
        </JobSelector>
        
        <TabContainer>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All Applicants
          </Tab>
          <Tab 
            active={activeTab === 'matched'} 
            onClick={() => setActiveTab('matched')}
          >
            Best Matches
          </Tab>
          {selectedApplicant && (
            <Tab 
              active={activeTab === 'details'} 
              onClick={() => setActiveTab('details')}
            >
              Applicant Details
            </Tab>
          )}
        </TabContainer>
        
        {activeTab === 'all' && (
          <>
            <h2>All Applicants</h2>
            <p>Showing all potential candidates in the system, sorted by match score</p>
            
            <Table>
              <thead>
                <tr>
                  <TableHeader>Rank</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Position</TableHeader>
                  <TableHeader>Experience</TableHeader>
                  <TableHeader>Location</TableHeader>
                  <TableHeader>Match Score</TableHeader>
                  <TableHeader>Action</TableHeader>
                </tr>
              </thead>
              <tbody>
                {mockJobSeekers
                  .map(applicant => ({
                    ...applicant,
                    matchScore: calculateMatchScore(selectedJob, applicant)
                  }))
                  .sort((a, b) => b.matchScore - a.matchScore)
                  .map((applicant, index) => (
                    <TableRow 
                      key={applicant.id} 
                      isTopCandidate={index < 3}
                    >
                      <TableCell>
                        <RankBadge rank={index + 1}>{index + 1}</RankBadge>
                      </TableCell>
                      <TableCell>
                        {applicant.firstName} {applicant.lastName}
                      </TableCell>
                      <TableCell>{applicant.jobTitle}</TableCell>
                      <TableCell>{applicant.yearsOfExperience} years</TableCell>
                      <TableCell>{applicant.location}</TableCell>
                      <TableCell>
                        <MatchScore score={applicant.matchScore}>{applicant.matchScore}%</MatchScore>
                      </TableCell>
                      <TableCell>
                        <ActionButton onClick={() => handleApplicantSelect(applicant)}>
                          View Details
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </Table>
          </>
        )}
        
        {activeTab === 'matched' && (
          <>
            <h2>Best Matches for {selectedJob.title}</h2>
            <p>Candidates ranked by match score</p>
            
            <Table>
              <thead>
                <tr>
                  <TableHeader>Rank</TableHeader>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Position</TableHeader>
                  <TableHeader>Key Strengths</TableHeader>
                  <TableHeader>Match Score</TableHeader>
                  <TableHeader>Action</TableHeader>
                </tr>
              </thead>
              <tbody>
                {matchedApplicants.map((applicant, index) => {
                  const { strengths } = generateStrengthsAndGaps(selectedJob, applicant);
                  
                  return (
                    <TableRow 
                      key={applicant.id}
                      isTopCandidate={index < 3}
                    >
                      <TableCell>
                        <RankBadge rank={index + 1}>{index + 1}</RankBadge>
                      </TableCell>
                      <TableCell>
                        {applicant.firstName} {applicant.lastName}
                      </TableCell>
                      <TableCell>{applicant.jobTitle}</TableCell>
                      <TableCell>
                        {strengths.slice(0, 2).map((strength, i) => (
                          <div key={i}>{strength}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        <MatchScore score={applicant.matchScore || 0}>
                          {applicant.matchScore}%
                        </MatchScore>
                      </TableCell>
                      <TableCell>
                        <ActionButton onClick={() => handleApplicantSelect(applicant)}>
                          View Details
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
        
        {activeTab === 'details' && selectedApplicant && (
          <>
            <h2>Applicant Details</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>{selectedApplicant.firstName} {selectedApplicant.lastName}</h3>
              <ActionButton onClick={() => setActiveTab('matched')}>
                ← Back to List
              </ActionButton>
            </div>
            
            <DetailCard>
              <DetailSection>
                <h4>Basic Information</h4>
                <p><strong>Email:</strong> {selectedApplicant.email}</p>
                <p><strong>Phone:</strong> {selectedApplicant.phone}</p>
                <p><strong>Location:</strong> {selectedApplicant.location}</p>
                <p><strong>Current Position:</strong> {selectedApplicant.jobTitle}</p>
                <p><strong>Experience:</strong> {selectedApplicant.yearsOfExperience} years</p>
                <p><strong>Desired Salary:</strong> ${selectedApplicant.minSalary.toLocaleString()}</p>
              </DetailSection>
              
              <DetailSection>
                <h4>Match Assessment</h4>
                <p>
                  <strong>Match Score:</strong> 
                  <MatchScore score={calculateMatchScore(selectedJob, selectedApplicant)}>
                    {calculateMatchScore(selectedJob, selectedApplicant)}%
                  </MatchScore>
                </p>
                
                <ScoreMeter>
                  <ScoreFill score={calculateMatchScore(selectedJob, selectedApplicant)} />
                </ScoreMeter>
                
                <MatchInsight>
                  {calculateMatchScore(selectedJob, selectedApplicant) >= 80 ? 
                    "This candidate is an excellent match for the position." :
                    calculateMatchScore(selectedJob, selectedApplicant) >= 60 ?
                    "This candidate is a good match but may need some additional training." :
                    "This candidate may not be the best fit for this specific position."
                  }
                </MatchInsight>
                
                {/* Add the detailed score breakdown */}
                <MatchScoreBreakdown 
                  job={selectedJob} 
                  candidate={selectedApplicant} 
                  scores={calculateDetailedScores(selectedJob, selectedApplicant)}
                />
                
                <div>
                  <h5>Strengths:</h5>
                  <ul>
                    {generateStrengthsAndGaps(selectedJob, selectedApplicant).strengths.map((strength, i) => (
                      <ListItem key={i}>{strength}</ListItem>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5>Areas for Consideration:</h5>
                  <ul>
                    {generateStrengthsAndGaps(selectedJob, selectedApplicant).gaps.map((gap, i) => (
                      <ListItem key={i}>{gap}</ListItem>
                    ))}
                  </ul>
                </div>
              </DetailSection>
            </DetailCard>
            
            <DetailCard>
              <DetailSection>
                <h4>Skills</h4>
                <ul>
                  {selectedApplicant.skills.map((skill: string, i: number) => (
                    <ListItem key={i}>{skill}</ListItem>
                  ))}
                </ul>
              </DetailSection>
              
              <DetailSection>
                <h4>Education</h4>
                {selectedApplicant.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '1rem' }}>
                    <p><strong>{edu.degree}</strong></p>
                    <p>{edu.institution}, {edu.graduationYear}</p>
                  </div>
                ))}
              </DetailSection>
              
              <DetailSection>
                <h4>Work Experience</h4>
                {selectedApplicant.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '1rem' }}>
                    <p><strong>{exp.title}</strong></p>
                    <p>{exp.company}, {exp.startDate} - {exp.endDate}</p>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </DetailSection>
            </DetailCard>
          </>
        )}
      </Card>
    </ApplicantsContainer>
  );
};

export default ApplicantsScreen;