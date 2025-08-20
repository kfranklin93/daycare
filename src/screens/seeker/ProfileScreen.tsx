import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input, Button } from "../../components/ui";
import FormSection from "../../components/ui/FormSection";
import FormProgress, { FormStep } from "../../components/ui/FormProgress";
import { profileSchema, type ProfileFormData } from "../../lib/validations";
import Chip from "../../components/Chip";
import Avatar from "../../components/Avatar";

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
  const [currentStepId, setCurrentStepId] = useState<StepId>('personal');

  const { control, handleSubmit, watch, formState: { errors, dirtyFields }, setValue, getValues } = useForm<ProfileFormData>({
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
  const selectedSkills = watch("skills", []);
  const selectedCerts = watch("certifications", []);

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
      isCompleted: Boolean(dirtyFields.experienceYears && !errors.experienceYears)
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
      console.log("Profile data:", data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert("Success", "Your profile has been updated successfully!");
      steps[3].isCompleted = true;
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
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

  const toggleSkill = useCallback((skill: string) => {
    const currentSkills = getValues("skills") || [];
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    setValue("skills", newSkills, { shouldDirty: true, shouldValidate: true });
  }, [getValues, setValue]);

  const toggleCert = useCallback((cert: string) => {
    const currentCerts = getValues("certifications") || [];
    const newCerts = currentCerts.includes(cert)
      ? currentCerts.filter(c => c !== cert)
      : [...currentCerts, cert];
    setValue("certifications", newCerts, { shouldDirty: true, shouldValidate: true });
  }, [getValues, setValue]);

  const renderStepContent = (): React.ReactNode => {
    switch (currentStepId) {
      case 'personal':
        return (
          <FormSection title="Personal Information" icon="account" helper="Your basic information visible to employers">
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
          <FormSection title="Experience" icon="briefcase" helper="Tell us about your teaching experience">
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
          <FormSection title="Skills & Certifications" icon="star" helper="Select all that apply to you">
            <Text style={styles.sectionLabel}>Skills</Text>
            <View style={styles.chipContainer}>
              {SKILLS.map(skill => (
                <Chip
                  key={skill}
                  label={skill}
                  selected={selectedSkills.includes(skill)}
                  onPress={() => toggleSkill(skill)}
                />
              ))}
            </View>
            <Text style={styles.sectionLabel}>Certifications</Text>
            <View style={styles.chipContainer}>
              {CERTIFICATIONS.map(cert => (
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
          <FormSection title="Review Your Profile" icon="eye" helper="Review your information before submitting">
            <View style={styles.reviewCard}>
              <Text style={styles.reviewHeader}>Personal Information</Text>
              <Text>Name: {formValues.fullName}</Text>
              <Text>Email: {formValues.email}</Text>
              <Text>Phone: {formValues.phone}</Text>
            </View>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewHeader}>Experience</Text>
              <Text>Years of Experience: {formValues.experienceYears}</Text>
              <Text>Bio: {formValues.bio || 'Not provided'}</Text>
            </View>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewHeader}>Skills & Certifications</Text>
              <Text>Skills: {selectedSkills.join(', ') || 'None selected'}</Text>
              <Text>Certifications: {selectedCerts.join(', ') || 'None selected'}</Text>
            </View>
          </FormSection>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Card padding="lg">
          <View style={styles.header}>
            <Avatar size="lg" initials="JS" />
            <Text style={styles.headerTitle}>Complete Your Profile</Text>
            <Text style={styles.headerSubtitle}>
              {currentStepId === 'review'
                ? 'Review and submit your profile'
                : 'Fill out your profile information'}
            </Text>
          </View>

          <FormProgress
            steps={steps}
            currentStepId={currentStepId}
            onStepPress={(stepId) => setCurrentStepId(stepId as StepId)}
          />

          {renderStepContent()}

          <View style={styles.navigation}>
            {currentStepId !== 'personal' && (
              <View style={{ flex: 1, marginRight: 4 }}>
                <Button
                  title="Back"
                  onPress={handleBack}
                  variant="outline"
                  icon="arrow-left"
                />
              </View>
            )}

            <View style={{ flex: 1, marginLeft: currentStepId !== 'personal' ? 4 : 0 }}>
              {currentStepId === 'review' ? (
                <Button
                  title="Submit Profile"
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                  icon="check"
                />
              ) : (
                <Button
                  title="Continue"
                  onPress={handleNext}
                  icon="arrow-right"
                  iconPosition="right"
                />
              )}
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  contentWrapper: { padding: 16 },
  header: { alignItems: 'center', marginBottom: 32 },
  headerTitle: { fontSize: 20, fontWeight: '600', marginTop: 8 },
  headerSubtitle: { color: '#6B7280', fontSize: 14, marginTop: 4 },
  sectionLabel: { color: '#374151', fontWeight: '500', marginBottom: 8 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  reviewCard: { backgroundColor: '#F3F4F6', borderRadius: 8, padding: 16, marginBottom: 16 },
  reviewHeader: { fontWeight: '600', marginBottom: 4 },
  navigation: { flexDirection: 'row', marginTop: 24 },
});
