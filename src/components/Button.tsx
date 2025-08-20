import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

export default function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = "rounded-lg flex-row items-center justify-center";
  
  const variantStyles = {
    primary: "bg-blue-500",
    secondary: "bg-gray-500",
    outline: "border border-blue-500",
  };

  const sizeStyles = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  const textStyles = {
    primary: "text-white font-semibold",
    secondary: "text-white font-semibold",
    outline: "text-blue-500 font-semibold",
  };

  const textSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50' : ''}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#3B82F6' : 'white'} />
      ) : (
        <Text className={`
          ${textStyles[variant]}
          ${textSizeStyles[size]}
        `}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}