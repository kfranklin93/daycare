import React from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  onClick: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

// Styled component
const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  fullWidth: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borders.radius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semiBold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  
  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'primary':
        return css`
          background-color: ${({ theme }) => theme.colors.primary.main};
          color: ${({ theme }) => theme.colors.primary.contrastText};
          border: none;

          &:hover:not(:disabled) {
            background-color: ${({ theme }) => theme.colors.primary.light};
          }
        `;
      case 'secondary':
        return css`
          background-color: ${({ theme }) => theme.colors.secondary.main};
          color: ${({ theme }) => theme.colors.secondary.contrastText};
          border: none;

          &:hover:not(:disabled) {
            background-color: ${({ theme }) => theme.colors.secondary.light};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${({ theme }) => theme.colors.primary.main};
          border: 2px solid ${({ theme }) => theme.colors.primary.main};

          &:hover:not(:disabled) {
            background-color: ${({ theme }) => theme.colors.primary.main};
            color: ${({ theme }) => theme.colors.primary.contrastText};
          }
        `;
      default:
        return '';
    }
  }}
  
  /* Size styles */
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
          font-size: ${({ theme }) => theme.typography.sizes.sm};
        `;
      case 'md':
        return css`
          padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
          font-size: ${({ theme }) => theme.typography.sizes.md};
        `;
      case 'lg':
        return css`
          padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
          font-size: ${({ theme }) => theme.typography.sizes.lg};
        `;
      default:
        return '';
    }
  }}
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
  
  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

// Loading spinner component
const Spinner = styled.div`
  border: 2px solid ${({ theme }) => `${theme.colors.primary.contrastText}50`};
  border-top: 2px solid ${({ theme }) => theme.colors.primary.contrastText};
  border-radius: ${({ theme }) => theme.borders.radius.full};
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.sm};
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  ${props => props.className === 'outline' && css`
    border: 2px solid ${({ theme }) => `${theme.colors.primary.main}30`};
    border-top: 2px solid ${({ theme }) => theme.colors.primary.main};
  `}
`;

export default function Button({
  onClick,
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
    >
      {loading && <Spinner className={variant} />}
      {title}
    </StyledButton>
  );
}