import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "../../components/ui";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="flex-row gap-4 mb-4">
          <Card className="flex-1 items-center p-4">
            <MaterialCommunityIcons name="briefcase" size={24} color="#3B82F6" />
            <Text className="text-2xl font-bold mt-2">5</Text>
            <Text className="text-gray-600">Active Jobs</Text>
          </Card>

          <Card className="flex-1 items-center p-4">
            <MaterialCommunityIcons name="account-group" size={24} color="#10B981" />
            <Text className="text-2xl font-bold mt-2">12</Text>
            <Text className="text-gray-600">Applicants</Text>
          </Card>
        </View>

        <Card padding="lg" className="mb-4">
          <Text className="text-lg font-semibold mb-2">Recent Activity</Text>
          <Text className="text-gray-600">No recent activity</Text>
        </Card>
      </View>
    </ScrollView>
  );
}