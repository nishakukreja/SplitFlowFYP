import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TwoFactorAuthentication = () => {
  const navigation = useNavigation();

  const handleEnable2FA = () => {
    // Navigate to StepScreen when ENABLE 2FA button is pressed
    navigation.navigate('StepScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enable Two-Factor Authentication (2FA) to add an extra layer of protection.</Text>
      <Image source={require('../assets/images/tfa.png')} style={styles.image} />
      
      <Text style={styles.warning}>If you don't know what it is, click here.</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleEnable2FA}>
  <Text style={styles.buttonText}>ENABLE2FA</Text>
</TouchableOpacity>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>SKIP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  securityText: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 120,
    color: 'black',
    fontFamily: 'serif',
  },
  orangeText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#6146C6',
    fontFamily: 'serif',
  },
  image: {
    width: 390,
    height: 370,
    marginBottom: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    fontFamily: 'serif',
  },
  warning: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
    fontFamily: 'serif',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#6146C6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#6146C6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TwoFactorAuthentication;
