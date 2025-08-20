import React from 'react';
import { View, TouchableOpacity } from 'react-native';

type CardProps = {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

export default function Card({
  children,
  onPress,
  variant = 'elevated',
  padding = 'md',
}: CardProps) {
  const baseStyles = "rounded-lg overflow-hidden";
  
  const variantStyles = {
    elevated: "bg-white shadow-md",
    outlined: "border border-gray-200 bg-white",
    flat: "bg-gray-50",
  };

  const paddingStyles = {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
      `}
    >
      {children}
    </Wrapper>
  );
}