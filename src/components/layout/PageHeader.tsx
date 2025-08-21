import React from 'react';
import styled from 'styled-components';

// Types
type PageHeaderProps = {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
};

// Styled components
const PageHeaderContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.md};
  }
`;

const HeaderLeft = styled.div``;

const HeaderRight = styled.div``;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.sizes['3xl']};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.neutral.black};
  margin-bottom: ${props => props.theme.spacing.xs};
  
  /* Add a subtle gradient touch to titles */
  background: linear-gradient(45deg, ${props => props.theme.colors.neutral.black} 70%, ${props => props.theme.colors.primary.main} 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.sizes.lg};
  color: ${props => props.theme.colors.neutral.gray600};
  margin: 0;
`;

// PageHeader component
const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  rightContent 
}) => {
  return (
    <PageHeaderContainer>
      <HeaderLeft>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </HeaderLeft>
      
      {rightContent && (
        <HeaderRight>
          {rightContent}
        </HeaderRight>
      )}
    </PageHeaderContainer>
  );
};

export default PageHeader;