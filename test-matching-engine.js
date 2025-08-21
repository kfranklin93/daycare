// test-matching-engine.js

// Import required modules
const { mockJobs } = require('./src/data/mockJobs');
const { mockJobSeekers } = require('./src/data/mockJobSeekers');
const { 
  calculateMatchScore,
  generateStrengthsAndGaps,
  getRecommendationsForJob
} = require('./src/lib/candidateMatchingEngine');

// Test function to run all tests
function runTests() {
  console.log('===== CANDIDATE MATCHING ENGINE TESTS =====\n');
  
  // 1. Test match score calculation
  testMatchScore();
  
  // 2. Test strengths and gaps generation
  testStrengthsAndGaps();
  
  // 3. Test recommendations for a job
  testRecommendations();
}

// Test the match score calculation
function testMatchScore() {
  console.log('--- TEST: Match Score Calculation ---');
  
  // Test with various job and candidate combinations
  mockJobs.slice(0, 3).forEach(job => {
    console.log(`\nJob: ${job.title} at ${job.organizationName}`);
    
    mockJobSeekers.slice(0, 3).forEach(candidate => {
      const score = calculateMatchScore(job, candidate);
      console.log(`Candidate: ${candidate.firstName} ${candidate.lastName} - Match Score: ${score}%`);
    });
  });
  
  console.log('\n--- Match Score Test Complete ---\n');
}

// Test the strengths and gaps analysis
function testStrengthsAndGaps() {
  console.log('--- TEST: Strengths and Gaps Analysis ---');
  
  const job = mockJobs[0];
  const candidate = mockJobSeekers[0];
  
  console.log(`\nAnalyzing match between:`);
  console.log(`Job: ${job.title} at ${job.organizationName}`);
  console.log(`Candidate: ${candidate.firstName} ${candidate.lastName}\n`);
  
  const { strengths, gaps } = generateStrengthsAndGaps(job, candidate);
  
  console.log('Strengths:');
  strengths.forEach(s => console.log(`- ${s}`));
  
  console.log('\nGaps:');
  gaps.forEach(g => console.log(`- ${g}`));
  
  console.log('\n--- Strengths and Gaps Test Complete ---\n');
}

// Test the recommendations for a job
function testRecommendations() {
  console.log('--- TEST: Job Recommendations ---');
  
  mockJobs.slice(0, 2).forEach(job => {
    console.log(`\nRecommendations for: ${job.title} at ${job.organizationName}`);
    
    const recommendations = getRecommendationsForJob(job, 5);
    
    console.log(`Found ${recommendations.length} top candidates:`);
    recommendations.forEach((candidate, index) => {
      console.log(`${index + 1}. ${candidate.firstName} ${candidate.lastName} - ${candidate.matchScore}% match`);
      
      // Show top strengths for each recommendation
      const { strengths } = generateStrengthsAndGaps(job, candidate);
      if (strengths.length > 0) {
        console.log(`   Key strengths: ${strengths.slice(0, 2).join(', ')}`);
      }
    });
  });
  
  console.log('\n--- Recommendations Test Complete ---\n');
}

// Run all tests
runTests();