import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from 'styled-components';
import ThemeProvider from './styles/ThemeProvider';
import './App.css';

// Auth Screens
import AuthScreen from './screens/AuthScreen';
import RoleSelectScreen from './screens/daycare/RoleSelectScreen';

// Daycare Screens
import DashboardScreen from './screens/daycare/DashboardScreen';
import DaycareJobsScreen from './screens/daycare/JobsScreen';
import ApplicantsScreen from './screens/daycare/ApplicantsScreen';
import OrgScreen from './screens/daycare/OrgScreen';

// Seeker Screens
import SeekerJobsScreen from './screens/seeker/JobsScreen';
import ApplicationsScreen from './screens/seeker/ApplicationsScreen';
import ProfileScreen from './screens/seeker/ProfileScreen';

// Development Screens
import ComponentShowcase from './screens/ComponentShowcase';
import TestCandidateEngine from './test-candidate-engine';
import CandidateMatchingTester from './components/CandidateMatchingTester';
import ProfileTest from './ProfileTest';
import ATSDemo from './components/ATSDemo';
import ATSDemoScreen from './screens/ats/ATSDemoScreen';

// Create a client for React Query
const queryClient = new QueryClient();

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.neutral.gray100};
`;

const MainContent = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  background-color: ${props => props.theme.colors.neutral.black};
  color: ${props => props.theme.colors.neutral.gray300};
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.neutral.gray800};
`;

function App() {
  // Mock authentication state - in a real app, this would come from your auth provider
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'daycare' | 'seeker' | null>(null);

  // Mock login function
  const handleLogin = (email: string, password: string) => {
    // In a real app, you would validate credentials against your backend
    // For demo purposes, automatically log in with any credentials
    console.log("Login attempted with:", email, password);
    setIsAuthenticated(true);
    return true;
  };

  // Mock logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Mock role selection
  const handleRoleSelect = (role: 'daycare' | 'seeker') => {
    setUserRole(role);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <AppContainer>
            <MainContent>
              <Routes>
              {/* Auth Routes */}
              <Route 
                path="/auth" 
                element={isAuthenticated ? <Navigate to="/role-select" /> : <AuthScreen onLogin={handleLogin} />} 
              />
              
              <Route 
                path="/role-select" 
                element={
                  !isAuthenticated ? <Navigate to="/auth" /> : 
                  userRole ? <Navigate to={userRole === 'daycare' ? '/daycare/dashboard' : '/seeker/jobs'} /> : 
                  <RoleSelectScreen onRoleSelect={handleRoleSelect} />
                } 
              />

              {/* Daycare Routes */}
              <Route 
                path="/daycare/dashboard" 
                element={
                  !isAuthenticated || userRole !== 'daycare' ? 
                  <Navigate to="/auth" /> : 
                  <DashboardScreen onLogout={handleLogout} />
                } 
              />
              <Route 
                path="/daycare/jobs" 
                element={
                  !isAuthenticated || userRole !== 'daycare' ? 
                  <Navigate to="/auth" /> : 
                  <DaycareJobsScreen />
                } 
              />
              <Route 
                path="/daycare/applicants" 
                element={
                  !isAuthenticated || userRole !== 'daycare' ? 
                  <Navigate to="/auth" /> : 
                  <ApplicantsScreen />
                } 
              />
              <Route 
                path="/daycare/organization" 
                element={
                  !isAuthenticated || userRole !== 'daycare' ? 
                  <Navigate to="/auth" /> : 
                  <OrgScreen />
                } 
              />

              {/* Job Seeker Routes */}
              <Route 
                path="/seeker/jobs" 
                element={
                  !isAuthenticated || userRole !== 'seeker' ? 
                  <Navigate to="/auth" /> : 
                  <SeekerJobsScreen />
                } 
              />
              <Route 
                path="/seeker/applications" 
                element={
                  !isAuthenticated || userRole !== 'seeker' ? 
                  <Navigate to="/auth" /> : 
                  <ApplicationsScreen />
                } 
              />
              
              {/* Profile Routes */}
              <Route path="/seeker/profile">
                <Route 
                  index
                  element={
                    !isAuthenticated || userRole !== 'seeker' ? 
                    <Navigate to="/auth" /> : 
                    <Navigate to="/seeker/profile/personal" replace />
                  } 
                />
                <Route 
                  path="personal" 
                  element={
                    !isAuthenticated || userRole !== 'seeker' ? 
                    <Navigate to="/auth" /> : 
                    <ProfileScreen initialSection="personal" />
                  } 
                />
                <Route 
                  path="experience" 
                  element={
                    !isAuthenticated || userRole !== 'seeker' ? 
                    <Navigate to="/auth" /> : 
                    <ProfileScreen initialSection="experience" />
                  } 
                />
                <Route 
                  path="education" 
                  element={
                    !isAuthenticated || userRole !== 'seeker' ? 
                    <Navigate to="/auth" /> : 
                    <ProfileScreen initialSection="education" />
                  } 
                />
                <Route 
                  path="skills" 
                  element={
                    !isAuthenticated || userRole !== 'seeker' ? 
                    <Navigate to="/auth" /> : 
                    <ProfileScreen initialSection="skills" />
                  } 
                />
              </Route>

              {/* Development Routes */}
              <Route path="/components" element={<ComponentShowcase />} />
              <Route path="/test-engine" element={<TestCandidateEngine />} />
              <Route path="/match-tester" element={<CandidateMatchingTester />} />
              <Route path="/profile-test" element={<ProfileTest />} />
              
              {/* ATS Demo - Accessible without authentication */}
              <Route path="/ats-demo" element={<ATSDemoScreen />} />

              {/* Default Routes */}
              <Route path="/" element={<Navigate to={isAuthenticated ? (userRole === 'daycare' ? '/daycare/dashboard' : '/seeker/jobs') : '/auth'} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MainContent>
          <Footer>
            <p>&copy; {new Date().getFullYear()} JobBoard. All rights reserved.</p>
          </Footer>
        </AppContainer>
      </Router>
    </ThemeProvider>
  </QueryClientProvider>
  );
}

export default App;