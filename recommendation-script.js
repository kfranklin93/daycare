// Simple script to generate and display recommendations

import { mockJobs } from './src/data/mockJobs';
import { mockJobSeekers } from './src/data/mockJobSeekers';
import { getRecommendationsForJob } from './src/lib/recommendationEngine';

// Group jobs by organization
const jobsByOrg = mockJobs.reduce((acc, job) => {
  if (!acc[job.organizationName]) {
    acc[job.organizationName] = [];
  }
  acc[job.organizationName].push(job);
  return acc;
}, {});

// Generate recommendations for each organization
let report = "# Job Seeker Recommendations for Daycare Providers\n\n";

Object.entries(jobsByOrg).forEach(([orgName, jobs]) => {
  report += `## ${orgName}\n\n`;
  
  jobs.forEach(job => {
    report += `### ${job.title}\n\n`;
    report += `**Location:** ${job.location}\n`;
    report += `**Salary:** ${job.salary}\n`;
    report += `**Job Type:** ${job.type}\n\n`;
    
    report += "**Key Requirements:**\n";
    job.requirements.forEach(req => {
      report += `- ${req}\n`;
    });
    report += "\n";
    
    const recommendations = getRecommendationsForJob(job);
    
    report += `**Top Candidates:**\n\n`;
    
    recommendations.forEach((candidate, index) => {
      report += `#### ${index + 1}. ${candidate.firstName} ${candidate.lastName} - ${candidate.matchScore}% Match\n\n`;
      report += `**Current Role:** ${candidate.jobTitle}\n`;
      report += `**Location:** ${candidate.location}\n`;
      report += `**Experience:** ${candidate.yearsOfExperience} years\n\n`;
      
      report += "**Education:**\n";
      candidate.education.forEach(edu => {
        report += `- ${edu.degree}, ${edu.institution} (${edu.graduationYear})\n`;
      });
      report += "\n";
      
      report += "**Top Skills:**\n";
      candidate.skills.slice(0, 5).forEach(skill => {
        report += `- ${skill}\n`;
      });
      report += "\n";
      
      report += "**Certifications:**\n";
      candidate.certifications.forEach(cert => {
        report += `- ${cert}\n`;
      });
      report += "\n";
      
      report += `**Bio:** ${candidate.bio}\n\n`;
      
      // Analyze why this is a good match
      report += "**Why This Candidate Matches:**\n";
      
      // Check for title match
      const hasRelevantTitle = candidate.experience.some(exp => 
        job.title.toLowerCase().includes(exp.title.toLowerCase()) ||
        exp.title.toLowerCase().includes(job.title.toLowerCase())
      );
      if (hasRelevantTitle) {
        report += "- Has direct experience in a similar role\n";
      }
      
      // Check for skills match
      const jobKeywords = job.description.toLowerCase() + ' ' + job.requirements.join(' ').toLowerCase();
      const matchingSkills = candidate.skills.filter(skill => 
        jobKeywords.includes(skill.toLowerCase())
      );
      if (matchingSkills.length > 0) {
        report += `- Has relevant skills: ${matchingSkills.join(', ')}\n`;
      }
      
      // Check for certification match
      const certReqs = job.requirements.filter(req => 
        req.toLowerCase().includes('certif') || 
        req.toLowerCase().includes('license')
      );
      if (certReqs.length > 0) {
        const hasCertMatch = candidate.certifications.some(cert => 
          certReqs.some(req => req.toLowerCase().includes(cert.toLowerCase().split(' ')[0]))
        );
        if (hasCertMatch) {
          report += "- Has required certifications\n";
        }
      }
      
      // Check for education match
      const eduReqs = job.requirements.filter(req => 
        req.toLowerCase().includes('degree') || 
        req.toLowerCase().includes('education')
      );
      if (eduReqs.length > 0) {
        const hasEduMatch = candidate.education.some(edu => 
          eduReqs.some(req => req.toLowerCase().includes(edu.degree.toLowerCase().split(' ')[0]))
        );
        if (hasEduMatch) {
          report += "- Education requirements met\n";
        }
      }
      
      // Check for location match
      if (job.location.split(',')[0].trim() === candidate.location.split(',')[0].trim()) {
        report += "- Located in the same city\n";
      }
      
      report += "\n---\n\n";
    });
    
    report += "\n\n";
  });
});

console.log(report);