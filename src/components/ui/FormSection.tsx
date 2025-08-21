import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const SectionContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
`;

const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const SectionDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormSection = ({ title, description, children, className }: FormSectionProps) => {
  return (
    <SectionContainer className={className}>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        {description && <SectionDescription>{description}</SectionDescription>}
      </SectionHeader>
      <ContentContainer>{children}</ContentContainer>
    </SectionContainer>
  );
};

export default FormSection;