import React from 'react';
import styled from 'styled-components';

// Types
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  fullWidth?: boolean;
  rows?: number;
}

// Styled components
const TextAreaContainer = styled.div<{ fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TextAreaLabel = styled.label<{ error?: boolean }>`
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.error ? props.theme.colors.error.main : props.theme.colors.neutral.gray800};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StyledTextArea = styled.textarea<{ error?: boolean }>`
  width: 100%;
  min-height: 80px;
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.sizes.md};
  color: ${props => props.theme.colors.neutral.gray900};
  background-color: ${props => props.theme.colors.neutral.white};
  border: 1px solid ${props => props.error ? props.theme.colors.error.main : props.theme.colors.neutral.gray300};
  border-radius: ${props => props.theme.borders.radius.md};
  padding: ${props => props.theme.spacing.md};
  outline: none;
  resize: vertical;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    border-color: ${props => props.error ? props.theme.colors.error.main : props.theme.colors.primary.light};
  }
  
  &:focus {
    border-color: ${props => props.error ? props.theme.colors.error.main : props.theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${props => props.error 
      ? `${props.theme.colors.error.main}33` 
      : `${props.theme.colors.primary.main}33`};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.neutral.gray100};
    border-color: ${props => props.theme.colors.neutral.gray300};
    color: ${props => props.theme.colors.neutral.gray500};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.neutral.gray500};
  }
`;

const HelperText = styled.span<{ error?: boolean }>`
  font-size: ${props => props.theme.typography.sizes.xs};
  color: ${props => props.error ? props.theme.colors.error.main : props.theme.colors.neutral.gray600};
  margin-top: ${props => props.theme.spacing.xs};
`;

// TextArea component
const TextArea: React.FC<TextAreaProps> = ({
  label,
  helperText,
  error = false,
  errorText,
  fullWidth = false,
  rows = 4,
  className,
  ...props
}) => {
  return (
    <TextAreaContainer fullWidth={fullWidth} className={className}>
      {label && <TextAreaLabel error={error}>{label}</TextAreaLabel>}
      
      <StyledTextArea
        error={error}
        rows={rows}
        {...props}
      />
      
      {(helperText || (error && errorText)) && (
        <HelperText error={error}>
          {error ? errorText : helperText}
        </HelperText>
      )}
    </TextAreaContainer>
  );
};

export default TextArea;