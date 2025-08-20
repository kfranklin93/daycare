import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Input, Card } from "../components/ui";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AuthScreen({ navigation }) {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="flex-1 p-4 pt-12">
        <View className="items-center mb-8">
          <View className="bg-blue-100 p-4 rounded-full mb-4">
            <MaterialCommunityIcons name="baby-face" size={48} color="#3B82F6" />
          </View>
          <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
          <Text className="text-gray-600 mt-2">Sign in to continue</Text>
        </View>

        <Card padding="lg">
          <Input
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            startIcon="email"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            startIcon="lock"
          />

          <View className="mt-6">
            <Button
              title="Sign In"
              onPress={() => navigation.navigate("RoleSelect")}
              fullWidth
            />
          </View>

          <View className="mt-4">
            <Button
              title="Continue with Magic Link"
              variant="outline"
              onPress={() => {}}
              fullWidth
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}