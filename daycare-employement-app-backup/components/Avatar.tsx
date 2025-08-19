import React from 'react';
import { View, Image, Text } from 'react-native';

type AvatarProps = {
  source?: { uri: string };
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function Avatar({
  source,
  initials,
  size = 'md',
}: AvatarProps) {
  const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <View className={`
      ${sizeStyles[size]}
      rounded-full
      overflow-hidden
      bg-gray-200
      items-center
      justify-center
    `}>
      {source ? (
        <Image
          source={source}
          className="w-full h-full"
        />
      ) : (
        <Text className={`
          font-medium
          text-gray-600
          ${textSizeStyles[size]}
        `}>
          {initials}
        </Text>
      )}
    </View>
  );
}