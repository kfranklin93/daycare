import React from 'react';
import styled from 'styled-components';

interface FormProgressProps {
  steps: string[];
  currentStep: number;
  onChange?: (step: number) => void;
  allowNavigation?: boolean;
}

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const ProgressStep = styled.div<{
  active: boolean;
  completed: boolean;
  clickable: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    width: calc(100% - 2.5rem);
    height: 2px;
    background-color: ${({ completed }) => (completed ? '#4361ee' : '#e2e8f0')};
    right: calc(-50% + 1.25rem);
    top: 0.75rem;
    z-index: 0;
  }
  
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`;

const StepCircle = styled.div<{ active: boolean; completed: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${({ active, completed }) =>
    active ? '#4361ee' : completed ? '#4361ee' : 'white'};
  border: 2px solid ${({ active, completed }) =>
    active || completed ? '#4361ee' : '#e2e8f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
  transition: all 0.2s ease-in-out;
  
  ${({ completed }) =>
    completed &&
    `
    &::after {
      content: '✓';
      font-size: 0.75rem;
      color: white;
    }
  `}
`;

const StepNumber = styled.span<{ active: boolean; completed: boolean }>`
  font-size: 0.75rem;
  color: ${({ active, completed }) => (active || completed ? 'white' : '#4a5568')};
`;

const StepLabel = styled.span<{ active: boolean; completed: boolean }>`
  font-size: 0.875rem;
  color: ${({ active, completed }) =>
    active ? '#4361ee' : completed ? '#4361ee' : '#718096'};
  font-weight: ${({ active, completed }) => (active || completed ? '500' : 'normal')};
`;

const FormProgress = ({
  steps,
  currentStep,
  onChange,
  allowNavigation = false,
}: FormProgressProps) => {
  const handleStepClick = (index: number) => {
    if (allowNavigation && onChange && (index < currentStep || steps[index - 1])) {
      onChange(index);
    }
  };

  return (
    <ProgressContainer>
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;
        const isClickable = allowNavigation && (index < currentStep || isCompleted);

        return (
          <ProgressStep
            key={index}
            active={isActive}
            completed={isCompleted}
            clickable={isClickable}
            onClick={() => handleStepClick(index)}
          >
            <StepCircle active={isActive} completed={isCompleted}>
              {!isCompleted && <StepNumber active={isActive} completed={isCompleted}>{index + 1}</StepNumber>}
            </StepCircle>
            <StepLabel active={isActive} completed={isCompleted}>{step}</StepLabel>
          </ProgressStep>
        );
      })}
    </ProgressContainer>
  );
};

export default FormProgress;