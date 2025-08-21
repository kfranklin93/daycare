// src/components/MatchScoreBreakdown.tsx

import React from 'react';
import styled from 'styled-components';
import { Job } from '../types/data';
import { JobSeekerProfile } from '../data/mockJobSeekers';

// Define weights that match the ones in candidateMatchingEngine.ts
const DEFAULT_WEIGHTS = {
  skills: 0.25,
  experience: 0.20,
  yearsOfExperience: 0.15,
  education: 0.15,
  certifications: 0.10,
  location: 0.05,
  salary: 0.05,
  jobType: 0.05,
};

const BreakdownContainer = styled.div`
  margin-top: 1rem;
`;

const BreakdownRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
`;

const Category = styled.div`
  width: 150px;
  font-weight: 500;
`;

const Value = styled.div`
  width: 80px;
  text-align: center;
`;

const BarContainer = styled.div`
  flex: 1;
  height: 12px;
  background-color: #edf2f7;
  border-radius: 6px;
  overflow: hidden;
  margin: 0 10px;
`;

const Bar = styled.div<{ value: number }>`
  height: 100%;
  width: ${props => props.value * 100}%;
  background-color: ${props => 
    props.value >= 0.8 ? '#68d391' : 
    props.value >= 0.6 ? '#f6e05e' : 
    props.value >= 0.4 ? '#f6ad55' : 
    '#fc8181'
  };
`;

const Weight = styled.div`
  width: 80px;
  text-align: right;
  color: #718096;
  font-size: 0.875rem;
`;

interface MatchScoreBreakdownProps {
  job: Job;
  candidate: JobSeekerProfile;
  scores: {
    skills: number;
    experience: number;
    yearsOfExperience: number;
    education: number;
    certifications: number;
    location: number;
    salary: number;
    jobType: number;
  };
}

const MatchScoreBreakdown: React.FC<MatchScoreBreakdownProps> = ({ job, candidate, scores }) => {
  const categories = [
    { name: 'Skills', key: 'skills' },
    { name: 'Experience', key: 'experience' },
    { name: 'Years Exp.', key: 'yearsOfExperience' },
    { name: 'Education', key: 'education' },
    { name: 'Certifications', key: 'certifications' },
    { name: 'Location', key: 'location' },
    { name: 'Salary', key: 'salary' },
    { name: 'Job Type', key: 'jobType' }
  ];
  
  return (
    <BreakdownContainer>
      <h4>Match Score Breakdown</h4>
      
      {categories.map(category => (
        <BreakdownRow key={category.key}>
          <Category>{category.name}</Category>
          <Value>{Math.round(scores[category.key as keyof typeof scores] * 100)}%</Value>
          <BarContainer>
            <Bar value={scores[category.key as keyof typeof scores]} />
          </BarContainer>
          <Weight>Weight: {DEFAULT_WEIGHTS[category.key as keyof typeof DEFAULT_WEIGHTS] * 100}%</Weight>
        </BreakdownRow>
      ))}
    </BreakdownContainer>
  );
};

export default MatchScoreBreakdown;