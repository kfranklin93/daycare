import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type FormStep = {
  id: string;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  isCompleted: boolean;
  isOptional?: boolean;
};

type FormProgressProps = {
  steps: FormStep[];
  currentStepId: string;
  onStepPress?: (stepId: string) => void;
};

export default function FormProgress({ 
  steps, 
  currentStepId, 
  onStepPress 
}: FormProgressProps) {
  const getStepStatus = (step: FormStep, index: number) => {
    const currentIndex = steps.findIndex(s => s.id === currentStepId);
    
    if (step.isCompleted) return 'completed';
    if (step.id === currentStepId) return 'current';
    if (index < currentIndex) return 'incomplete';
    return 'upcoming';
  };

  return (
    <View className="mb-6">
      {/* Progress Bar */}
      <View className="h-2 bg-gray-200 rounded-full mb-6">
        <View 
          className="h-2 bg-blue-500 rounded-full"
          style={{ 
            width: `${(steps.filter(step => step.isCompleted).length / steps.length) * 100}%` 
          }}
        />
      </View>

      {/* Step Indicators */}
      <View className="flex-row justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step, index);
          const isClickable = step.isCompleted || status === 'incomplete';

          return (
            <Pressable
              key={step.id}
              onPress={() => isClickable && onStepPress?.(step.id)}
              className={`
                items-center 
                ${index === steps.length - 1 ? 'flex-1' : 'flex-1 border-r border-gray-200'}
              `}
              disabled={!isClickable}
            >
              <View className={`
                w-10 h-10 rounded-full items-center justify-center mb-2
                ${status === 'completed' ? 'bg-green-100' : ''}
                ${status === 'current' ? 'bg-blue-100' : ''}
                ${status === 'incomplete' ? 'bg-red-100' : ''}
                ${status === 'upcoming' ? 'bg-gray-100' : ''}
              `}>
                <MaterialCommunityIcons
                  name={status === 'completed' ? 'check-circle' : step.icon}
                  size={24}
                  color={
                    status === 'completed' ? '#10B981' :
                    status === 'current' ? '#3B82F6' :
                    status === 'incomplete' ? '#EF4444' :
                    '#6B7280'
                  }
                />
              </View>
              <Text className={`
                text-sm font-medium text-center
                ${status === 'current' ? 'text-blue-600' : 'text-gray-600'}
              `}>
                {step.title}
              </Text>
              {step.isOptional && (
                <Text className="text-xs text-gray-500">Optional</Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}