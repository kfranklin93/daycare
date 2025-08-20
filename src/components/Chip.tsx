import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type ChipProps = {
  label: string;
  onPress?: () => void;
  selected?: boolean;
  variant?: 'default' | 'outline' | 'filled';
};

export default function Chip({
  label,
  onPress,
  selected = false,
  variant = 'default',
}: ChipProps) {
  const baseStyles = "rounded-full px-4 py-2 m-1";
  
  const variantStyles = {
    default: selected ? "bg-blue-100" : "bg-gray-100",
    outline: selected ? "bg-blue-100 border border-blue-500" : "border border-gray-300",
    filled: selected ? "bg-blue-500" : "bg-gray-200",
  };

  const textStyles = {
    default: selected ? "text-blue-700" : "text-gray-700",
    outline: selected ? "text-blue-700" : "text-gray-700",
    filled: selected ? "text-white" : "text-gray-700",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
      `}
    >
      <Text className={`
        text-sm font-medium
        ${textStyles[variant]}
      `}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}