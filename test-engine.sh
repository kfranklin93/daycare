#!/bin/bash

# Create a temporary test file
TEMP_FILE=$(mktemp)

# Add necessary imports and test code
cat > $TEMP_FILE << 'EOF'
// Simple test script for candidateMatchingEngine.ts

import { mockJobs } from './src/data/mockJobs';
import { mockJobSeekers } from './src/data/mockJobSeekers';
import { 
  calculateMatchScore,
  generateStrengthsAndGaps,
  getRecommendationsForJob
} from './src/lib/candidateMatchingEngine';

// Test match score calculation
console.log('===== TESTING MATCH SCORE CALCULATION =====');
const job = mockJobs[0]; // Get the first job
const candidate = mockJobSeekers[0]; // Get the first job seeker

console.log(`Job: ${job.title}`);
console.log(`Candidate: ${candidate.firstName} ${candidate.lastName}`);

const score = calculateMatchScore(job, candidate);
console.log(`Match Score: ${score}%`);
console.log('==========================================');

// Test strengths and gaps
console.log("\n===== TESTING STRENGTHS AND GAPS =====");
const { strengths, gaps } = generateStrengthsAndGaps(job, candidate);

console.log('Strengths:');
strengths.forEach(s => console.log(`- ${s}`));

console.log('\nGaps:');
gaps.forEach(g => console.log(`- ${g}`));
console.log('==========================================');

// Test recommendations
console.log("\n===== TESTING RECOMMENDATIONS =====");
const recommendations = getRecommendationsForJob(job, 3);
console.log(`Top candidates for ${job.title}:`);
recommendations.forEach((rec, idx) => {
  console.log(`${idx+1}. ${rec.firstName} ${rec.lastName} - ${rec.matchScore}% match`);
});
console.log('==========================================');
EOF

# Use npx to run the typescript file
echo "Running TypeScript test..."
npx ts-node --skipProject $TEMP_FILE

# Cleanup
rm $TEMP_FILE