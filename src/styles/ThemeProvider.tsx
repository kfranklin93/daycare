import React from 'react';
import { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import theme from './theme';

// Global styles to apply across the entire application
const GlobalStyle = createGlobalStyle`
  /* Import Inter font from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    height: 100%;
    font-family: ${theme.typography.fontFamily};
    font-size: 16px;
    line-height: 1.5;
    background-color: ${theme.colors.neutral.gray100};
    color: ${theme.colors.neutral.gray900};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #root {
    height: 100%;
  }
  
  /* Typography defaults */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeights.semiBold};
    line-height: 1.2;
    margin-bottom: 0.5em;
    color: ${theme.colors.neutral.black};
  }
  
  h1 {
    font-size: ${theme.typography.sizes['4xl']};
  }
  
  h2 {
    font-size: ${theme.typography.sizes['3xl']};
  }
  
  h3 {
    font-size: ${theme.typography.sizes['2xl']};
  }
  
  h4 {
    font-size: ${theme.typography.sizes.xl};
  }
  
  h5 {
    font-size: ${theme.typography.sizes.lg};
  }
  
  h6 {
    font-size: ${theme.typography.sizes.md};
  }
  
  p {
    margin-bottom: 1em;
  }
  
  a {
    color: ${theme.colors.primary.main};
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primary.light};
    }
  }
  
  button {
    font-family: ${theme.typography.fontFamily};
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.neutral.gray200};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.neutral.gray400};
    border-radius: ${theme.borders.radius.full};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.neutral.gray500};
  }
`;

// ThemeProvider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;