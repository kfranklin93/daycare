import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Button } from "../../components/ui";

const mockJobs = [
  { 
    id: "1", 
    title: "Lead Teacher", 
    type: "Full-time",
    status: "Active",
    applicants: 5
  },
  { 
    id: "2", 
    title: "Assistant Teacher", 
    type: "Part-time",
    status: "Active",
    applicants: 3
  },
];

export default function JobsScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Button
          title="Post New Job"
          icon="plus"
          onPress={() => {}}
          fullWidth
          className="mb-4"
        />

        {mockJobs.map(job => (
          <Card
            key={job.id}
            padding="lg"
            className="mb-4"
          >
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="text-lg font-semibold">{job.title}</Text>
                <Text className="text-gray-600">{job.type}</Text>
              </View>
              <View className="bg-green-100 px-2 py-1 rounded">
                <Text className="text-green-700">{job.status}</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center mt-4">
              <Text className="text-gray-600">{job.applicants} applicants</Text>
              <Button
                title="View Details"
                variant="outline"
                size="sm"
                onPress={() => {}}
              />
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}