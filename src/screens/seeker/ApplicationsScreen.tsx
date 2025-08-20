import React from "react";
import { View, Text } from "react-native";

export default function ApplicationsScreen() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-semibold">My Applications</Text>
      <Text className="text-gray-600">No applications yet</Text>
    </View>
  );
}