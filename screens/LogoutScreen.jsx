import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../redux/slices/userSlice';  // Adjust the import if necessary

const LogOutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Function to handle logout
  const handleLogout = () => {
    // Show confirmation popup
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout canceled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            // Dispatch logout action
            dispatch(logout());
            // Navigate to the Register screen
            navigation.navigate("Register");
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Log Out Screen</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

export default LogOutScreen;
