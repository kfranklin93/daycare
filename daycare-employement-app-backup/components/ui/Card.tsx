import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';

type CardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | Size;
  radius?: Size;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Card({
  children,
  onPress,
  variant = 'elevated',
  padding = 'md',
  radius = 'md',
  className = '',
  style,
}: CardProps) {
  // Base styles
  const baseClasses = "overflow-hidden bg-white";
  
  // Border radius variations
  const radiusClasses = {
    sm: "rounded",
    md: "rounded-lg",
    lg: "rounded-xl",
  };

  // Padding variations
  const paddingClasses = {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  // Variant styles
  const variantClasses = {
    elevated: Platform.select({
      ios: "shadow-lg shadow-black/10",
      android: "elevation-2",
    }),
    outlined: "border border-gray-200",
    filled: "bg-gray-50",
  };

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      className={`
        ${baseClasses}
        ${radiusClasses[radius]}
        ${paddingClasses[padding]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={[
        variant === 'elevated' && Platform.OS === 'ios' && {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        style,
      ]}
    >
      {children}
    </Wrapper>
  );
}