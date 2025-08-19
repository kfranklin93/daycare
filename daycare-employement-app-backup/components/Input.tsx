import React from 'react';
import { View, TextInput, Text } from 'react-native';

type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: InputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-700 mb-2 font-medium">{label}</Text>
      )}
      <TextInput
        className={`
          bg-gray-50 
          rounded-lg 
          px-4 
          py-3 
          text-gray-900
          ${error ? 'border border-red-500' : 'border border-gray-200'}
        `}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}