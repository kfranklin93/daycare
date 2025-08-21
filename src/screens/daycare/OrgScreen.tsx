import React from 'react';
import styled from 'styled-components';

const OrgContainer = styled.div`
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

const OrgScreen = () => {
  return (
    <OrgContainer>
      <Title>Organization Profile</Title>
      <Subtitle>Manage your daycare center information</Subtitle>
      
      {/* Placeholder content - will be implemented later */}
      <p>This screen is under development. Check back soon!</p>
    </OrgContainer>
  );
};

export default OrgScreen;