import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button, Input, Card } from '../components/ui';

export default function ComponentShowcase() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">UI Components</Text>

        {/* Buttons Section */}
        <Card className="mb-6">
          <Text className="text-xl font-semibold mb-4">Buttons</Text>
          
          <View className="gap-4">
            {/* Variants */}
            <Button
              title="Solid Button"
              onPress={() => {}}
              icon="check"
            />
            <Button
              title="Outline Button"
              variant="outline"
              onPress={() => {}}
              icon="plus"
            />
            <Button
              title="Ghost Button"
              variant="ghost"
              onPress={() => {}}
              icon="arrow-right"
              iconPosition="right"
            />

            {/* Colors */}
            <Button
              title="Success"
              color="success"
              onPress={() => {}}
            />
            <Button
              title="Danger"
              color="danger"
              onPress={() => {}}
            />
            <Button
              title="Warning"
              color="warning"
              onPress={() => {}}
            />

            {/* States */}
            <Button
              title="Loading"
              loading={true}
              onPress={() => {}}
            />
            <Button
              title="Disabled"
              disabled={true}
              onPress={() => {}}
            />
          </View>
        </Card>

        {/* Inputs Section */}
        <Card className="mb-6">
          <Text className="text-xl font-semibold mb-4">Inputs</Text>
          
          <View className="gap-4">
            <Input
              label="Basic Input"
              placeholder="Type something..."
            />
            
            <Input
              label="With Icons"
              placeholder="Search..."
              startIcon="magnify"
              endIcon="close"
              onEndIconPress={() => {}}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              startIcon="email"
              keyboardType="email-address"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error="This is an error message"
            />

            <Input
              label="Helper Text"
              placeholder="With helper text"
              helperText="This is some helpful text"
            />
          </View>
        </Card>

        {/* Cards Section */}
        <Text className="text-xl font-semibold mb-4">Cards</Text>

        <Card variant="elevated" className="mb-4">
          <Text className="text-lg font-medium">Elevated Card</Text>
          <Text className="text-gray-600 mt-2">
            This card has elevation and shadow.
          </Text>
        </Card>

        <Card variant="outlined" className="mb-4">
          <Text className="text-lg font-medium">Outlined Card</Text>
          <Text className="text-gray-600 mt-2">
            This card has a border.
          </Text>
        </Card>

        <Card 
          variant="filled" 
          onPress={() => alert('Card pressed')}
          className="mb-4"
        >
          <Text className="text-lg font-medium">Interactive Card</Text>
          <Text className="text-gray-600 mt-2">
            This card is pressable.
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}