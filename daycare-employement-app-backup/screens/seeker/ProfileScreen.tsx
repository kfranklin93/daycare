import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input, Button, Avatar, Chip } from "../../components/ui";
import FormSection from "../../components/ui/FormSection";
import FormProgress, { FormStep } from "../../components/ui/FormProgress";
import { profileSchema, type ProfileFormData } from "../../lib/validations";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SKILLS = [
  "Infant Care",
  "Toddler Care",
  "Pre-K Education",
  "Special Needs",
  "First Aid Certified",
  "CPR Certified",
  "Curriculum Planning",
  "Behavioral Management",
];

const CERTIFICATIONS = [
  "CDA",
  "Early Childhood Education",
  "Special Education",
  "First Aid",
  "CPR",
  "State Teaching License",
];

type StepId = 'personal' | 'experience' | 'skills' | 'review';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [currentStepId, setCurrentStepId] = useState<StepId>('personal');

  const { control, handleSubmit, watch, formState: { errors, dirtyFields } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      experienceYears: 0,
      bio: "",
      skills: [],
      certifications: [],
    },
    mode: 'onChange'
  });

  const formValues = watch();

  const steps: FormStep[] = [
    {
      id: 'personal',
      title: 'Personal',
      icon: 'account',
      isCompleted: Boolean(
        dirtyFields.fullName && 
        dirtyFields.email && 
        dirtyFields.phone &&
        !errors.fullName &&
        !errors.email &&
        !errors.phone
      )
    },
    {
      id: 'experience',
      title: 'Experience',
      icon: 'briefcase',
      isCompleted: Boolean(
        dirtyFields.experienceYears &&
        !errors.experienceYears
      )
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: 'star',
      isCompleted: selectedSkills.length > 0 || selectedCerts.length > 0
    },
    {
      id: 'review',
      title: 'Review',
      icon: 'check',
      isCompleted: false
    }
  ];

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      const formData = {
        ...data,
        skills: selectedSkills,
        certifications: selectedCerts,
      };
      console.log("Profile data:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert(
        "Success",
        "Your profile has been updated successfully!",
        [{ text: "OK" }]
      );
      // Mark the review step as completed after successful submission
      steps[3].isCompleted = true;
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update profile. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = useCallback(() => {
    const currentIndex = steps.findIndex(step => step.id === currentStepId);
    if (currentIndex < steps.length - 1) {
      setCurrentStepId(steps[currentIndex + 1].id as StepId);
    }
  }, [currentStepId, steps]);

  const handleBack = useCallback(() => {
    const currentIndex = steps.findIndex(step => step.id === currentStepId);
    if (currentIndex > 0) {
      setCurrentStepId(steps[currentIndex - 1].id as StepId);
    }
  }, [currentStepId, steps]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev =>
      prev.includes(cert)
        ? prev.filter(c => c !== cert)
        : [...prev, cert]
    );
  };

  const renderStepContent = () => {
    switch (currentStepId) {
      case 'personal':
        return (
          <FormSection 
            title="Personal Information" 
            icon="account"
            helper="Your basic information visible to employers"
          >
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.fullName?.message}
                  autoCapitalize="words"
                  startIcon="account"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  startIcon="email"
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Phone"
                  placeholder="Enter your phone number"
                  value={value}
                  onChangeText={onChange}
                  error={errors.phone?.message}
                  keyboardType="phone-pad"
                  startIcon="phone"
                />
              )}
            />
          </FormSection>
        );

      case 'experience':
        return (
          <FormSection 
            title="Experience" 
            icon="briefcase"
            helper="Tell us about your teaching experience"
          >
            <Controller
              control={control}
              name="experienceYears"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Years of Experience"
                  placeholder="Enter years of experience"
                  value={value.toString()}
                  onChangeText={(text) => onChange(parseInt(text) || 0)}
                  error={errors.experienceYears?.message}
                  keyboardType="numeric"
                  startIcon="calendar"
                />
              )}
            />

            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Professional Bio"
                  placeholder="Tell us about your teaching philosophy and experience"
                  value={value}
                  onChangeText={onChange}
                  error={errors.bio?.message}
                  multiline
                  numberOfLines={4}
                  optional
                />
              )}
            />
          </FormSection>
        );

      case 'skills':
        return (
          <FormSection 
            title="Skills & Certifications" 
            icon="star"
            helper="Select all that apply to you"
          >
            <Text className="text-gray-700 font-medium mb-2">Skills</Text>
            <View className="flex-row flex-wrap mb-4">
              {SKILLS.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  selected={selectedSkills.includes(skill)}
                  onPress={() => toggleSkill(skill)}
                />
              ))}
            </View>

            <Text className="text-gray-700 font-medium mb-2">Certifications</Text>
            <View className="flex-row flex-wrap">
              {CERTIFICATIONS.map((cert) => (
                <Chip
                  key={cert}
                  label={cert}
                  selected={selectedCerts.includes(cert)}
                  onPress={() => toggleCert(cert)}
                />
              ))}
            </View>
          </FormSection>
        );

      case 'review':
        return (
          <FormSection 
            title="Review Your Profile" 
            icon="eye"
            helper="Review your information before submitting"
          >
            <View className="bg-gray-50 rounded-lg p-4 mb-4">
              <Text className="font-semibold mb-2">Personal Information</Text>
              <Text>Name: {formValues.fullName}</Text>
              <Text>Email: {formValues.email}</Text>
              <Text>Phone: {formValues.phone}</Text>
            </View>

            <View className="bg-gray-50 rounded-lg p-4 mb-4">
              <Text className="font-semibold mb-2">Experience</Text>
              <Text>Years of Experience: {formValues.experienceYears}</Text>
              <Text>Bio: {formValues.bio || 'Not provided'}</Text>
            </View>

            <View className="bg-gray-50 rounded-lg p-4">
              <Text className="font-semibold mb-2">Skills & Certifications</Text>
              <Text>Skills: {selectedSkills.join(', ') || 'None selected'}</Text>
              <Text>Certifications: {selectedCerts.join(', ') || 'None selected'}</Text>
            </View>
          </FormSection>
        );
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Card padding="lg">
          {/* Profile Header */}
          <View className="items-center mb-8">
            <Avatar size="lg" initials="JS" />
            <Text className="text-xl font-semibold mt-2">Complete Your Profile</Text>
            <Text className="text-gray-600 text-sm mt-1">
              {currentStepId === 'review' 
                ? 'Review and submit your profile'
                : 'Fill out your profile information'}
            </Text>
          </View>

          {/* Progress Tracker */}
          <FormProgress
            steps={steps}
            currentStepId={currentStepId}
            onStepPress={(stepId) => setCurrentStepId(stepId as StepId)}
          />

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <View className="flex-row mt-6 gap-2">
            {currentStepId !== 'personal' && (
              <Button
                title="Back"
                onPress={handleBack}
                variant="outline"
                icon="arrow-left"
                className="flex-1"
              />
            )}
            
            {currentStepId === 'review' ? (
              <Button
                title="Submit Profile"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                icon="check"
                className="flex-1"
              />
            ) : (
              <Button
                title="Continue"
                onPress={handleNext}
                icon="arrow-right"
                iconPosition="right"
                className="flex-1"
              />
            )}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}