import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "../components/ui";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RoleSelectScreen({ navigation }) {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4 pt-12">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-gray-900">Choose Your Role</Text>
          <Text className="text-gray-600 text-center mt-2">Select how you'd like to use the app</Text>
        </View>

        <Card
          variant="elevated"
          padding="lg"
          onPress={() => navigation.replace("SeekerTabs")}
          className="mb-4"
        >
          <View className="flex-row items-center">
            <View className="bg-blue-100 p-4 rounded-full mr-4">
              <MaterialCommunityIcons name="account-search" size={32} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-semibold text-gray-900">Job Seeker</Text>
              <Text className="text-gray-600 mt-1">Find daycare jobs near you</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#6B7280" />
          </View>
        </Card>

        <Card
          variant="elevated"
          padding="lg"
          onPress={() => navigation.replace("DaycareTabs")}
        >
          <View className="flex-row items-center">
            <View className="bg-green-100 p-4 rounded-full mr-4">
              <MaterialCommunityIcons name="office-building" size={32} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-semibold text-gray-900">Daycare Provider</Text>
              <Text className="text-gray-600 mt-1">Post jobs and find staff</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#6B7280" />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}