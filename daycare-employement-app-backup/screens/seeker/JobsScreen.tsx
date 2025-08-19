import React from "react";
import { View, Text } from "react-native";

const mockJobs = [
  { id: "1", title: "Infant Teacher", location: "Atlanta, GA" },
  { id: "2", title: "Pre-K Assistant", location: "Decatur, GA" },
];

export default function JobsScreen() {
  return (
    <View className="flex-1 p-4">
      {mockJobs.map(job => (
        <View key={job.id} className="p-4 mb-4 border border-gray-200 rounded-lg">
          <Text className="text-lg font-semibold">{job.title}</Text>
          <Text className="text-gray-600">{job.location}</Text>
        </View>
      ))}
    </View>
  );
}