import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudentProvider } from './src/context/StudentContext';
import StudentListScreen from './src/screens/StudentListScreen';
import AddEditScreen from './src/screens/AddEditScreen';
import AnalyticsScreen from './src/screens/AnalyticScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('Storage cleared');
      } catch (e) {
        console.log('Storage clear error:', e);
      }
    };
    clearStorage();
  }, []);
  return (
    <StudentProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true
          }}
        >
          <Tab.Screen
            name="Students"
            component={StudentListScreen}
          />
          <Tab.Screen
            name="Add/Edit"
            component={AddEditScreen}
          />
          <Tab.Screen
            name="Analytics"
            component={AnalyticsScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StudentProvider>
  );
}