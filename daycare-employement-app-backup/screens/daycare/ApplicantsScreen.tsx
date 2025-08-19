import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Avatar, Button } from "../../components/ui";

const mockApplicants = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Lead Teacher Position",
    experience: "5 years",
    status: "New"
  },
  {
    id: "2",
    name: "Michael Smith",
    role: "Assistant Teacher Position",
    experience: "3 years",
    status: "Reviewed"
  }
];

export default function ApplicantsScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {mockApplicants.map(applicant => (
          <Card
            key={applicant.id}
            padding="lg"
            className="mb-4"
          >
            <View className="flex-row items-center">
              <Avatar
                size="lg"
                initials={applicant.name.split(' ').map(n => n[0]).join('')}
              />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-semibold">{applicant.name}</Text>
                <Text className="text-gray-600">{applicant.role}</Text>
                <Text className="text-gray-500">{applicant.experience} experience</Text>
              </View>
              <View className="bg-blue-100 px-2 py-1 rounded">
                <Text className="text-blue-700">{applicant.status}</Text>
              </View>
            </View>

            <View className="flex-row justify-end mt-4 gap-2">
              <Button
                title="Review"
                variant="outline"
                size="sm"
                onPress={() => {}}
              />
              <Button
                title="Contact"
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