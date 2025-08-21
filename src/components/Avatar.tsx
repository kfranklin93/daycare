import React from 'react';
import styled from 'styled-components';

type AvatarProps = {
  src?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
};

const AvatarContainer = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: #E5E7EB;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InitialsText = styled.span<{ fontSize: number }>`
  font-weight: 500;
  color: #4B5563;
  font-size: ${props => props.fontSize}px;
`;

export default function Avatar({
  src,
  initials,
  size = 'md',
}: AvatarProps) {
  const sizeMap = { sm: 32, md: 48, lg: 64 };
  const textSizeMap = { sm: 14, md: 16, lg: 20 };

  const dimension = sizeMap[size] || 48;
  const fontSize = textSizeMap[size] || 16;

  return (
    <AvatarContainer size={dimension}>
      {src ? (
        <AvatarImage src={src} alt="Avatar" />
      ) : (
        <InitialsText fontSize={fontSize}>
          {initials}
        </InitialsText>
      )}
    </AvatarContainer>
  );
}