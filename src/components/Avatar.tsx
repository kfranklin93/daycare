import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

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
  const sizeMap = { sm: 32, md: 48, lg: 64 };
  const textSizeMap = { sm: 14, md: 16, lg: 20 };

  const dimension = sizeMap[size] || 48;
  const fontSize = textSizeMap[size] || 16;

  return (
    <View
      style={{
        width: dimension,
        height: dimension,
        borderRadius: dimension / 2,
        backgroundColor: '#E5E7EB', // gray-200
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {source ? (
        <Image
          source={source}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <Text style={{ fontWeight: '500', color: '#4B5563', fontSize }}>
          {initials}
        </Text>
      )}
    </View>
  );
}
