import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Pressable,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Size, Color, Variant, theme } from './types';

type ButtonProps = {
  onPress: () => void;
  title: string;
  size?: Size;
  color?: Color;
  variant?: Variant;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

export default function Button({
  onPress,
  title,
  size = 'md',
  color = 'primary',
  variant = 'solid',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
}: ButtonProps) {
  // Base styles
  const baseClasses = "rounded-lg items-center justify-center flex-row";
  
  // Size variations
  const sizeClasses = {
    sm: "px-3 py-2 gap-1",
    md: "px-4 py-3 gap-2",
    lg: "px-6 py-4 gap-2",
  };

  // Text size variations
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  // Icon size variations
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  // Variant styles
  const getVariantClasses = (buttonColor: Color) => ({
    solid: `bg-${buttonColor}-500`,
    outline: `border border-${buttonColor}-500`,
    ghost: ``,
  });

  // Text color based on variant
  const getTextColorClasses = (buttonColor: Color) => ({
    solid: "text-white",
    outline: `text-${buttonColor}-500`,
    ghost: `text-${buttonColor}-500`,
  });

  const buttonColor = theme[color];
  const textColor = variant === 'solid' ? 'white' : buttonColor;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variant === 'outline' ? 'border border-[' + buttonColor + ']' : ''}
        ${variant === 'solid' ? 'bg-[' + buttonColor + ']' : ''}
        ${disabled ? 'opacity-50' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={({ pressed }) => [
        pressed && { opacity: 0.8 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <MaterialCommunityIcons
              name={icon}
              size={iconSizes[size]}
              color={textColor}
            />
          )}
          <Text
            className={`
              font-semibold
              ${textSizeClasses[size]}
            `}
            style={{ color: textColor }}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <MaterialCommunityIcons
              name={icon}
              size={iconSizes[size]}
              color={textColor}
            />
          )}
        </>
      )}
    </Pressable>
  );
}