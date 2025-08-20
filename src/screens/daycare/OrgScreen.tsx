import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input, Button, Avatar } from "../../components/ui";
import FormSection from "../../components/ui/FormSection";
import { organizationSchema, type OrganizationFormData } from "../../lib/validations";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OrgScreen() {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors, isDirty } } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      licenseNumber: "",
      description: "",
    }
  });

  const onSubmit = async (data: OrganizationFormData) => {
    try {
      setLoading(true);
      console.log("Organization data:", data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert(
        "Success",
        "Organization profile updated successfully!",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update organization profile. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Card padding="lg">
          {/* Organization Header */}
          <View className="items-center mb-8">
            <Avatar size="lg" initials="DC" />
            <Text className="text-xl font-semibold mt-2">Organization Profile</Text>
            <Text className="text-gray-600 text-sm mt-1">Manage your daycare center details</Text>
          </View>

          {/* Basic Information */}
          <FormSection 
            title="Basic Information" 
            icon="office-building"
            helper="Your organization's primary information"
          >
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Organization Name"
                  placeholder="Enter organization name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                  startIcon="domain"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  placeholder="Enter organization email"
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
                  placeholder="Enter organization phone"
                  value={value}
                  onChangeText={onChange}
                  error={errors.phone?.message}
                  keyboardType="phone-pad"
                  startIcon="phone"
                />
              )}
            />
          </FormSection>

          {/* Location & License */}
          <FormSection 
            title="Location & License" 
            icon="map-marker"
            helper="Your facility location and licensing information"
          >
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Address"
                  placeholder="Enter organization address"
                  value={value}
                  onChangeText={onChange}
                  error={errors.address?.message}
                  multiline
                  numberOfLines={2}
                  startIcon="map-marker"
                />
              )}
            />

            <Controller
              control={control}
              name="licenseNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="License Number"
                  placeholder="Enter daycare license number"
                  value={value}
                  onChangeText={onChange}
                  error={errors.licenseNumber?.message}
                  startIcon="license"
                />
              )}
            />
          </FormSection>

          {/* Description */}
          <FormSection 
            title="About Your Facility" 
            icon="information"
            helper="Tell potential candidates about your daycare center"
          >
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Description"
                  placeholder="Describe your facility, values, and what makes your daycare center special"
                  value={value}
                  onChangeText={onChange}
                  error={errors.description?.message}
                  multiline
                  numberOfLines={4}
                  optional
                />
              )}
            />
          </FormSection>

          {/* Submit Button */}
          <View className="mt-6">
            <Button
              title="Save Organization Profile"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={!isDirty}
              fullWidth
              icon="content-save"
            />
            {!isDirty && (
              <Text className="text-gray-500 text-sm text-center mt-2">
                Make changes to your profile to save
              </Text>
            )}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}