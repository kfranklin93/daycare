import React from 'react';
import OrganizationProfile, { Organization } from './components/OrganizationProfile';

const ProfileTest: React.FC = () => {
  // Sample organization data
  const sampleOrganization: Organization = {
    id: '123',
    name: 'Sunshine Daycare Center',
    description: 'A nurturing environment where children can learn, play, and grow. We focus on early childhood development through creative activities, outdoor play, and age-appropriate learning experiences.',
    logo: 'https://placehold.co/400x200?text=Sunshine+Daycare',
    website: 'https://example.com/sunshine-daycare',
    location: '123 Main Street, Anytown, CA 94123',
    phone: '(555) 123-4567',
    email: 'info@sunshinedaycare.example.com',
    licenseNumber: 'DC-12345-XYZ',
    capacity: 45,
    ageRange: '6 months - 5 years'
  };

  // Handler for when the organization profile is saved
  const handleSave = (updatedOrganization: Organization) => {
    console.log('Organization saved:', updatedOrganization);
    // In a real application, you would send this data to your backend
    alert('Organization profile updated successfully!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Daycare Organization Profile</h1>
      <OrganizationProfile 
        organization={sampleOrganization} 
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfileTest;