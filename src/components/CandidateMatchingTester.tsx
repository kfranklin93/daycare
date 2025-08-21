// src/components/CandidateMatchingTester.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { mockJobs } from '../data/mockJobs';
import { mockJobSeekers } from '../data/mockJobSeekers';
import { 
  calculateMatchScore, 
  generateStrengthsAndGaps, 
  getRecommendationsForJob 
} from '../lib/candidateMatchingEngine';

// Styled component for the container
const TesterContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

// Styles for the tester
const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: white;
`;

const SectionTitle = styled.h2`
  border-bottom: 2px solid #e1e1e1;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  padding: 15px;
  border-radius: 5px;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 300px;
`;

const MatchScoreCard = styled(Card)<{ score: number }>`
  background: ${props => 
    props.score >= 80 ? '#e7f5e7' : 
    props.score >= 60 ? '#fff8e1' : 
    '#ffebee'
  };
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 3px;
  &:hover {
    background: #f5f5f5;
  }
`;

const ScoreBar = styled.div<{ score: number }>`
  height: 20px;
  width: 100%;
  background: #e1e1e1;
  border-radius: 10px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: ${props => props.score}%;
    background: ${props => 
      props.score >= 80 ? '#4caf50' : 
      props.score >= 60 ? '#ff9800' : 
      '#f44336'
    };
    left: 0;
    top: 0;
  }
`;

const CandidateMatchingTester: React.FC = () => {
  // State for selected job and candidate
  const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
  const [selectedCandidate, setSelectedCandidate] = useState(mockJobSeekers[0]);
  
  // Calculate match score
  const matchScore = calculateMatchScore(selectedJob, selectedCandidate);
  
  // Get strengths and gaps
  const { strengths, gaps } = generateStrengthsAndGaps(selectedJob, selectedCandidate);
  
  // Get recommendations for the job
  const recommendations = getRecommendationsForJob(selectedJob, 5);
  
  return (
    <TesterContainer>
      <h1>Candidate Matching Engine Tester</h1>
      
      <Section>
        <SectionTitle>Select Job and Candidate</SectionTitle>
        <FlexContainer>
          <Card>
            <h3>Select Job</h3>
            <select 
              value={selectedJob.id}
              onChange={(e) => {
                const job = mockJobs.find(j => j.id === e.target.value);
                if (job) setSelectedJob(job);
              }}
            >
              {mockJobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title} at {job.organizationName}
                </option>
              ))}
            </select>
            
            <div style={{ marginTop: '15px' }}>
              <h4>{selectedJob.title}</h4>
              <p><strong>Organization:</strong> {selectedJob.organizationName}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Salary:</strong> {selectedJob.salary}</p>
              <p><strong>Type:</strong> {selectedJob.type || 'Not specified'}</p>
              <p><strong>Requirements:</strong></p>
              <ul>
                {selectedJob.requirements?.map((req, i) => (
                  <li key={i}>{req}</li>
                )) || <li>No specific requirements listed</li>}
              </ul>
            </div>
          </Card>
          
          <Card>
            <h3>Select Candidate</h3>
            <select 
              value={selectedCandidate.id}
              onChange={(e) => {
                const candidate = mockJobSeekers.find(c => c.id === e.target.value);
                if (candidate) setSelectedCandidate(candidate);
              }}
            >
              {mockJobSeekers.map(candidate => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.firstName} {candidate.lastName} - {candidate.jobTitle}
                </option>
              ))}
            </select>
            
            <div style={{ marginTop: '15px' }}>
              <h4>{selectedCandidate.firstName} {selectedCandidate.lastName}</h4>
              <p><strong>Job Title:</strong> {selectedCandidate.jobTitle}</p>
              <p><strong>Location:</strong> {selectedCandidate.location}</p>
              <p><strong>Experience:</strong> {selectedCandidate.yearsOfExperience} years</p>
              <p><strong>Education:</strong> {selectedCandidate.education[0]?.degree}</p>
              <p><strong>Skills:</strong></p>
              <ul>
                {selectedCandidate.skills.slice(0, 5).map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
                {selectedCandidate.skills.length > 5 && <li>+ {selectedCandidate.skills.length - 5} more...</li>}
              </ul>
            </div>
          </Card>
        </FlexContainer>
      </Section>
      
      <Section>
        <SectionTitle>Match Results</SectionTitle>
        <FlexContainer>
          <MatchScoreCard score={matchScore}>
            Match Score: {matchScore}%
            <ScoreBar score={matchScore} />
          </MatchScoreCard>
        </FlexContainer>
        
        <FlexContainer>
          <Card>
            <h3>Strengths</h3>
            {strengths.length > 0 ? (
              <ul>
                {strengths.map((strength, i) => (
                  <ListItem key={i}>{strength}</ListItem>
                ))}
              </ul>
            ) : (
              <p>No particular strengths identified.</p>
            )}
          </Card>
          
          <Card>
            <h3>Gaps</h3>
            {gaps.length > 0 ? (
              <ul>
                {gaps.map((gap, i) => (
                  <ListItem key={i}>{gap}</ListItem>
                ))}
              </ul>
            ) : (
              <p>No significant gaps identified.</p>
            )}
          </Card>
        </FlexContainer>
      </Section>
      
      <Section>
        <SectionTitle>Top Candidates for this Job</SectionTitle>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Rank</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Experience</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Match Score</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((candidate, index) => (
              <tr key={candidate.id} style={{ borderBottom: '1px solid #e1e1e1' }}>
                <td style={{ padding: '10px' }}>{index + 1}</td>
                <td style={{ padding: '10px' }}>{candidate.firstName} {candidate.lastName}</td>
                <td style={{ padding: '10px' }}>{candidate.jobTitle}</td>
                <td style={{ padding: '10px' }}>{candidate.yearsOfExperience} years</td>
                <td style={{ padding: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{candidate.matchScore}%</span>
                    <div style={{ 
                      flex: 1, 
                      height: '10px', 
                      background: '#e1e1e1', 
                      borderRadius: '5px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${candidate.matchScore}%`, 
                        height: '100%', 
                        background: candidate.matchScore >= 80 ? '#4caf50' : candidate.matchScore >= 60 ? '#ff9800' : '#f44336'
                      }} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </TesterContainer>
  );
};

export default CandidateMatchingTester;