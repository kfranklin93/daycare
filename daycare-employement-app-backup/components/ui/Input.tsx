import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextInputProps,
  Platform,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Size, Color, theme } from './types';

interface InputProps extends Omit<TextInputProps, 'placeholderTextColor'> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  endIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onEndIconPress?: () => void;
  size?: Size;
  color?: Color;
  fullWidth?: boolean;
  className?: string;
  optional?: boolean;
}

export default function Input({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  onEndIconPress,
  size = 'md',
  color = 'primary',
  fullWidth = false,
  className = '',
  secureTextEntry,
  optional = false,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  // Size variations
  const sizeClasses = {
    sm: "px-2 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const labelSizes = {
    sm: "text-xs mb-1",
    md: "text-sm mb-1.5",
    lg: "text-base mb-2",
  };

  const getBorderColor = () => {
    if (error) return theme.danger;
    if (isFocused) return theme[color];
    return '#E5E7EB'; // gray-200
  };

  const getBackgroundColor = () => {
    if (error) return '#FEF2F2'; // red-50
    if (isFocused) return '#F0F9FF'; // blue-50
    return '#F9FAFB'; // gray-50
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View className={`mb-4 ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <View className="flex-row items-center justify-between">
          <Text className={`
            font-medium text-gray-700
            ${labelSizes[size]}
          `}>
            {label}
          </Text>
          {optional && (
            <Text className="text-sm text-gray-500">Optional</Text>
          )}
        </View>
      )}

      <View className="relative">
        {startIcon && (
          <View className="absolute left-3 h-full justify-center">
            <MaterialCommunityIcons
              name={startIcon}
              size={iconSizes[size]}
              color={isFocused ? theme[color] : '#6B7280'}
            />
          </View>
        )}

        <TextInput
          {...props}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          className={`
            rounded-lg
            ${sizeClasses[size]}
            ${startIcon ? 'pl-10' : ''}
            ${(endIcon || secureTextEntry) ? 'pr-10' : ''}
            ${fullWidth ? 'w-full' : ''}
          `}
          style={{
            borderWidth: 1,
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          }}
          placeholderTextColor="#9CA3AF"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {(endIcon || secureTextEntry) && (
          <TouchableOpacity
            onPress={secureTextEntry ? () => setIsPasswordVisible(!isPasswordVisible) : onEndIconPress}
            className="absolute right-3 h-full justify-center"
          >
            <MaterialCommunityIcons
              name={secureTextEntry ? (isPasswordVisible ? 'eye-off' : 'eye') : endIcon}
              size={iconSizes[size]}
              color={isFocused ? theme[color] : '#6B7280'}
            />
          </TouchableOpacity>
        )}
      </View>

      {(error || helperText) && (
        <Text className={`
          text-sm mt-1
          ${error ? 'text-red-500' : 'text-gray-500'}
        `}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
}