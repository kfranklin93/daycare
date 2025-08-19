import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardScreen from "../screens/daycare/DashboardScreen";
import JobsScreen from "../screens/daycare/JobsScreen";
import ApplicantsScreen from "../screens/daycare/ApplicantsScreen";
import OrgScreen from "../screens/daycare/OrgScreen";

const Tab = createBottomTabNavigator();

export default function DaycareTabs() {
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
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Jobs" 
        component={JobsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Applicants" 
        component={ApplicantsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Organization" 
        component={OrgScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="office-building" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}