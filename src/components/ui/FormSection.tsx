import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FormSectionProps = {
  title: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  children: React.ReactNode;
  helper?: string;
};

export default function FormSection({ title, icon, children, helper }: FormSectionProps) {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-4">
        {icon && (
          <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color="#3B82F6"
            style={{ marginRight: 8 }}
          />
        )}
        <Text className="text-lg font-semibold text-gray-900">{title}</Text>
      </View>
      {helper && (
        <Text className="text-gray-600 text-sm mb-4">{helper}</Text>
      )}
      {children}
    </View>
  );
}