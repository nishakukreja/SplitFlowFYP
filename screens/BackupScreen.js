import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const BackupScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (text) => {
    setEmail(text);
    // Perform email validation
    setIsValidEmail(validateEmail(text));
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (isValidEmail) {
      // Navigate to FinishScreen
      navigation.navigate('FinishScreen');
    } else {
      // Show an error message if email is not valid
      Alert.alert('Error', 'Please enter a valid email address.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/email.png')} style={styles.image} />
      <Text style={styles.label}>Enter your backup email</Text>
      <TextInput
        style={[styles.input, !isValidEmail && styles.invalidInput]}
        placeholder="johndoe@example.com"
        placeholderTextColor="black"
        onChangeText={handleEmailChange}
        onBlur={() => setIsValidEmail(validateEmail(email))}
      />
      {!isValidEmail && <Text style={styles.errorText}>Please enter a valid email address.</Text>}
      <Text style={styles.info}>An email will be sent to you. You can confirm it later.</Text>
      <Button
        title="NEXT"
        onPress={handleSubmit}
        color="#6146C6"
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginBottom: 20,
    color: 'black',
    fontFamily: 'serif',
    fontSize: 29,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 20,
    color: 'black',
    fontFamily: 'serif',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    marginBottom: 10,
    color: 'red',
    fontFamily: 'serif',
  },
  info: {
    marginBottom: 20,
    color: 'black',
    fontFamily: 'serif',
  },
  button: {
    width: '100%', // Set width to 100% to expand to full width
    height: 50, // Set height as desired
  },
  image: {
    width: 330,
    height: 350,
    marginBottom: 80,
  },
});

export default BackupScreen;
