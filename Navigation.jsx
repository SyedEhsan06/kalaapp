// Navigation.jsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import {useNavigationState} from '@react-navigation/native';
import LogOutScreen from './screens/LogoutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} /> */}
      <Tab.Screen name="Logout" component={LogOutScreen} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegistrationScreen} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={HomeStack} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};
export default Navigation;
