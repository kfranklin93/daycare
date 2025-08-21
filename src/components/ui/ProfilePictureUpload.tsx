import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Button from './Button';

interface ProfilePictureUploadProps {
  initialImage?: string;
  onImageChange: (file: File | null, imageUrl: string) => void;
  size?: 'small' | 'medium' | 'large';
}

const UploadContainer = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const AvatarContainer = styled.div<{ size: string }>`
  position: relative;
  width: ${({ size }) => {
    switch (size) {
      case 'small': return '80px';
      case 'large': return '160px';
      default: return '120px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small': return '80px';
      case 'large': return '160px';
      default: return '120px';
    }
  }};
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  
  &:hover .overlay {
    opacity: 1;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  color: white;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.5rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProfilePictureUpload = ({ 
  initialImage = 'https://placehold.co/400?text=Upload+Photo', 
  onImageChange,
  size = 'medium'
}: ProfilePictureUploadProps) => {
  const [image, setImage] = useState(initialImage);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
      
      // Call the parent component's callback with the new image
      onImageChange(selectedFile, imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(initialImage);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageChange(null, initialImage);
  };

  return (
    <UploadContainer size={size}>
      <AvatarContainer size={size} onClick={handleImageClick}>
        <Avatar src={image} alt="Profile" />
        <Overlay className="overlay">Click to change photo</Overlay>
      </AvatarContainer>
      
      <HiddenInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <ButtonsContainer>
        <Button variant="outline" size="small" onClick={handleImageClick}>
          Change Photo
        </Button>
        {image !== initialImage && (
          <Button variant="text" size="small" onClick={handleRemoveImage}>
            Remove
          </Button>
        )}
      </ButtonsContainer>
    </UploadContainer>
  );
};

export default ProfilePictureUpload;