import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;