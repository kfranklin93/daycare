// src/test-candidate-engine.tsx

import React from 'react';
import { mockJobs } from './data/mockJobs';
import { mockJobSeekers } from './data/mockJobSeekers';
import { calculateMatchScore, generateStrengthsAndGaps, getRecommendationsForJob } from './lib/candidateMatchingEngine';

// Test component to verify candidateMatchingEngine functionality
const TestCandidateEngine: React.FC = () => {
  // Test 1: Calculate match scores for a job and a candidate
  const testMatchScore = () => {
    console.log("===== TESTING MATCH SCORE CALCULATION =====");
    const job = mockJobs[0]; // Get the first job
    const candidate = mockJobSeekers[0]; // Get the first job seeker
    
    console.log(`Job: ${job.title}`);
    console.log(`Candidate: ${candidate.firstName} ${candidate.lastName}`);
    
    const score = calculateMatchScore(job, candidate);
    console.log(`Match Score: ${score}%`);
    console.log("==========================================");
  };
  
  // Test 2: Generate strengths and gaps for a job and a candidate
  const testStrengthsAndGaps = () => {
    console.log("===== TESTING STRENGTHS AND GAPS ANALYSIS =====");
    const job = mockJobs[0]; 
    const candidate = mockJobSeekers[0];
    
    console.log(`Job: ${job.title}`);
    console.log(`Candidate: ${candidate.firstName} ${candidate.lastName}`);
    
    const { strengths, gaps } = generateStrengthsAndGaps(job, candidate);
    
    console.log("Strengths:");
    strengths.forEach(s => console.log(`- ${s}`));
    
    console.log("Gaps:");
    gaps.forEach(g => console.log(`- ${g}`));
    console.log("==============================================");
  };
  
  // Test 3: Get recommendations for a job
  const testRecommendations = () => {
    console.log("===== TESTING JOB RECOMMENDATIONS =====");
    const job = mockJobs[0];
    console.log(`Job: ${job.title}`);
    
    const recommendations = getRecommendationsForJob(job, 3);
    console.log(`Found ${recommendations.length} recommendations:`);
    
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.firstName} ${rec.lastName} - Match: ${rec.matchScore}%`);
    });
    console.log("=====================================");
  };
  
  // Run all tests when component mounts
  React.useEffect(() => {
    testMatchScore();
    testStrengthsAndGaps();
    testRecommendations();
  }, []);
  
  return (
    <div style={{ margin: '20px', fontFamily: 'monospace' }}>
      <h1>Candidate Matching Engine Test</h1>
      <p>Check the console for test results (Press F12 or right-click and select "Inspect")</p>
    </div>
  );
};

export default TestCandidateEngine;