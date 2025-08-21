import React, { useState } from 'react';
import styles from './OrganizationProfile.module.css';

// Organization interface as provided
export interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  location: string;
  phone?: string;
  email: string;
  licenseNumber?: string;
  capacity?: number;
  ageRange?: string;
}

interface OrganizationProfileProps {
  organization: Organization;
  // Optional callback for when organization is updated
  onSave?: (updatedOrganization: Organization) => void;
}

/**
 * OrganizationProfile component
 * 
 * Displays organization information in view mode by default.
 * Can be switched to edit mode to modify the organization details.
 */
const OrganizationProfile: React.FC<OrganizationProfileProps> = ({ 
  organization,
  onSave
}) => {
  // State to track if we're in edit mode
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State to hold the form data, initialized with the organization prop
  const [formData, setFormData] = useState<Organization>(organization);

  // Handler for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for capacity field which should be a number
    if (name === 'capacity') {
      setFormData({
        ...formData,
        [name]: value === '' ? undefined : parseInt(value, 10)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Toggle between view and edit modes
  const toggleEditMode = () => {
    // If we're currently editing and toggling off, reset form data
    if (isEditing) {
      setFormData(organization);
    }
    setIsEditing(!isEditing);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the updated organization data
    console.log('Updated organization:', formData);
    
    // Call the onSave callback if provided
    if (onSave) {
      onSave(formData);
    }
    
    // Exit edit mode
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Organization Profile</h2>
        <button 
          className={`${styles.button} ${isEditing ? styles.saveButton : styles.editButton}`}
          onClick={isEditing ? handleSubmit : toggleEditMode}
        >
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
      </div>

      {/* Display the form - fields will be editable or read-only based on isEditing state */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Organization Name</label>
          {isEditing ? (
            <input
              id="name"
              name="name"
              type="text"
              className={styles.input}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          ) : (
            <div className={styles.field}>{organization.name}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          {isEditing ? (
            <textarea
              id="description"
              name="description"
              className={styles.textarea}
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          ) : (
            <div className={styles.field}>{organization.description}</div>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.label}>Location</label>
            {isEditing ? (
              <input
                id="location"
                name="location"
                type="text"
                className={styles.input}
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            ) : (
              <div className={styles.field}>{organization.location}</div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>Phone</label>
            {isEditing ? (
              <input
                id="phone"
                name="phone"
                type="tel"
                className={styles.input}
                value={formData.phone || ''}
                onChange={handleInputChange}
              />
            ) : (
              <div className={styles.field}>{organization.phone || 'Not provided'}</div>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            {isEditing ? (
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            ) : (
              <div className={styles.field}>{organization.email}</div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="website" className={styles.label}>Website</label>
            {isEditing ? (
              <input
                id="website"
                name="website"
                type="url"
                className={styles.input}
                value={formData.website || ''}
                onChange={handleInputChange}
                placeholder="https://example.com"
              />
            ) : (
              <div className={styles.field}>
                {organization.website ? (
                  <a href={organization.website} target="_blank" rel="noopener noreferrer">
                    {organization.website}
                  </a>
                ) : (
                  'Not provided'
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="licenseNumber" className={styles.label}>License Number</label>
            {isEditing ? (
              <input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                className={styles.input}
                value={formData.licenseNumber || ''}
                onChange={handleInputChange}
              />
            ) : (
              <div className={styles.field}>{organization.licenseNumber || 'Not provided'}</div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="capacity" className={styles.label}>Capacity</label>
            {isEditing ? (
              <input
                id="capacity"
                name="capacity"
                type="number"
                className={styles.input}
                value={formData.capacity || ''}
                onChange={handleInputChange}
                min="0"
              />
            ) : (
              <div className={styles.field}>{organization.capacity || 'Not specified'}</div>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ageRange" className={styles.label}>Age Range</label>
          {isEditing ? (
            <input
              id="ageRange"
              name="ageRange"
              type="text"
              className={styles.input}
              value={formData.ageRange || ''}
              onChange={handleInputChange}
              placeholder="e.g., 6 months - 5 years"
            />
          ) : (
            <div className={styles.field}>{organization.ageRange || 'Not specified'}</div>
          )}
        </div>
        
        {/* Logo URL input field - Only visible in edit mode */}
        {isEditing && (
          <div className={styles.formGroup}>
            <label htmlFor="logo" className={styles.label}>Logo URL</label>
            <input
              id="logo"
              name="logo"
              type="url"
              className={styles.input}
              value={formData.logo || ''}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
            />
            <small className={styles.helpText}>Enter a URL for your organization's logo image</small>
          </div>
        )}

        {/* Only show the Save button in the form for mobile layouts */}
        {isEditing && (
          <div className={styles.mobileButtonContainer}>
            <button type="submit" className={`${styles.button} ${styles.saveButton} ${styles.mobileButton}`}>
              Save Changes
            </button>
            <button 
              type="button" 
              className={`${styles.button} ${styles.cancelButton} ${styles.mobileButton}`}
              onClick={toggleEditMode}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
      
      {/* Logo display area */}
      {organization.logo && !isEditing && (
        <div className={styles.logoContainer}>
          <img src={organization.logo} alt={`${organization.name} logo`} className={styles.logo} />
        </div>
      )}
    </div>
  );
};

export default OrganizationProfile;