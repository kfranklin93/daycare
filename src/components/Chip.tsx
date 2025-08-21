import React from 'react';
import styled, { css } from 'styled-components';

type ChipProps = {
  label: string;
  onClick?: () => void;
  selected?: boolean;
  variant?: 'default' | 'outline' | 'filled';
};

const ChipContainer = styled.button<{
  selected: boolean;
  variant: 'default' | 'outline' | 'filled';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borders.radius.full};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  margin: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;
  
  ${props => {
    // Variant and selection styles
    if (props.variant === 'default') {
      return props.selected
        ? css`
            background-color: ${({ theme }) => theme.colors.primary.light};
            color: ${({ theme }) => theme.colors.primary.dark};
          `
        : css`
            background-color: ${({ theme }) => theme.colors.neutral.gray100};
            color: ${({ theme }) => theme.colors.neutral.gray700};
          `;
    } else if (props.variant === 'outline') {
      return props.selected
        ? css`
            background-color: ${({ theme }) => theme.colors.primary.light};
            border: 2px solid ${({ theme }) => theme.colors.primary.main};
            color: ${({ theme }) => theme.colors.primary.dark};
          `
        : css`
            background-color: transparent;
            border: 2px solid ${({ theme }) => theme.colors.neutral.gray300};
            color: ${({ theme }) => theme.colors.neutral.gray700};
          `;
    } else if (props.variant === 'filled') {
      return props.selected
        ? css`
            background-color: ${({ theme }) => theme.colors.primary.main};
            color: ${({ theme }) => theme.colors.primary.contrastText};
          `
        : css`
            background-color: ${({ theme }) => theme.colors.neutral.gray200};
            color: ${({ theme }) => theme.colors.neutral.gray700};
          `;
    }
  }}
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.outline};
  }
`;

export default function Chip({
  label,
  onClick,
  selected = false,
  variant = 'default',
}: ChipProps) {
  return (
    <ChipContainer
      onClick={onClick}
      selected={selected}
      variant={variant}
      type="button"
    >
      {label}
    </ChipContainer>
  );
}