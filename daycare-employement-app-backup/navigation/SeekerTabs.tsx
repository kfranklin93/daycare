import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import JobsScreen from "../screens/seeker/JobsScreen";
import ApplicationsScreen from "../screens/seeker/ApplicationsScreen";
import ProfileScreen from "../screens/seeker/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function SeekerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: 'white',
        },
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
      }}
    >
      <Tab.Screen 
        name="Jobs" 
        component={JobsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase-search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Applications" 
        component={ApplicationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-multiple" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}