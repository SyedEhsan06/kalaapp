import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import { addArtist } from '../redux/slices/artistSlice';

const locationsData = [
  { label: 'Pune', value: 'Pune' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Delhi', value: 'Delhi' },
  { label: 'Kolkata', value: 'Kolkata' },
  { label: 'Hyderabad', value: 'Hyderabad' },
];

const Arts = [
  { label: 'Painting', value: 'Painting' },
  { label: 'Dancing', value: 'Dancing' },
  { label: 'Singing', value: 'Singing' },
  { label: 'Poetry', value: 'Poetry' },
];

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleRegister = () => {
    setEmailError('');
    setPasswordError('');

    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!userType) {
      Alert.alert('Choose Role', 'Please select if you are a User or an Artist.');
      return;
    }

    // Validate Email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      return;
    }

    // Validate Password
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long, with at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    // Dispatch login
    dispatch(login({ name, email, currentLocation, password, userType }));

    if (userType === 'Artist') {
      dispatch(
        addArtist({
          id: Date.now().toString(),
          category,
          locations,
          currentLocation,
          email,
          name,
          rating,
        })
      );
      navigation.navigate('Home');
    } else {
      navigation.navigate('Home'); // Navigate to Home for users
    }
  };

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Name Input */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />

        {/* Email Input */}
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={[styles.input, emailError && styles.errorInput]}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, passwordError && styles.errorInput]}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'User' && styles.activeButton]}
            onPress={() => setUserType('User')}
          >
            <Text style={[styles.userTypeText, userType === 'User' && styles.activeText]}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'Artist' && styles.activeButton]}
            onPress={() => setUserType('Artist')}
          >
            <Text style={[styles.userTypeText, userType === 'Artist' && styles.activeText]}>Artist</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.label}>Current Location</Text>
        <View style={styles.locationSelector}>
          {locationsData.map((locationOption) => (
            <TouchableOpacity
              key={locationOption.value}
              style={[
                styles.locationButton,
                currentLocation === locationOption.value && styles.activeLocationButton,
              ]}
              onPress={() => setCurrentLocation(locationOption.value)}
            >
              <Text style={styles.locationText}>{locationOption.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {userType === 'Artist' && (
          <>
            {/* Preferred Locations Selection */}
            <Text style={styles.label}>Preferred Locations</Text>
            <View style={styles.locationSelector}>
              {locationsData.map((locationOption) => (
                <TouchableOpacity
                  key={locationOption.value}
                  style={[
                    styles.locationButton,
                    locations.includes(locationOption.value) && styles.activeLocationButton,
                  ]}
                  onPress={() => toggleSelection(locationOption.value, locations, setLocations)}
                >
                  <Text style={styles.locationText}>{locationOption.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* category Selection */}
            <Text style={styles.label}>Category</Text>
            <View style={styles.locationSelector}>
              {Arts.map((Art) => (
                <TouchableOpacity
                  key={Art.value}
                  style={[
                    styles.locationButton,
                    category.includes(Art.value) && styles.activeLocationButton,
                  ]}
                  onPress={() => setCategory(Art.value)}
                >
                  <Text style={styles.locationText}>{Art.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Rating Selection */}
            <Text style={styles.label}>Rating</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((rate) => (
                <TouchableOpacity
                  key={rate}
                  style={[
                    styles.ratingButton,
                    rating === rate && styles.activeRatingButton,
                  ]}
                  onPress={() => setRating(rate)}
                >
                  <Text style={styles.ratingText}>{rate}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Register Button */}
        <Button
          title="Register"
          disabled={!name || !email || !password || !userType || !currentLocation}
          onPress={handleRegister}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    color: '#333',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: '#f00',
  },
  errorText: {
    color: '#f00',
    fontSize: 14,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  userTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  userTypeText: {
    color: '#333',
    fontSize: 18,
  },
  activeText: {
    color: '#fff',
  },
  locationSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  locationButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
    margin: 5,
    borderRadius: 8,
  },
  activeLocationButton: {
    backgroundColor: '#007BFF',
  },
  locationText: {
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ratingButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    marginRight: 10,
    bottom: 10,
    color: '#333',
  },
  activeRatingButton: {
    backgroundColor: '#FFD700',
  },
});

export default RegistrationScreen;
