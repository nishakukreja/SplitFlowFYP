import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const StepScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { enabled2FA } = route.params;
  const [verificationMethod, setVerificationMethod] = useState('');

  const handleSelectMethod = (method) => {
    setVerificationMethod(method);
    navigation.navigate('BackupScreen', { method });
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <View style={styles.optionWrapper}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Verify From Email</Text>
            {/* <Text style={styles.exampleText}>e.g. Google Authenticator</Text> */}
            <TouchableOpacity 
              style={styles.selectButton} 
              onPress={() => handleSelectMethod('email')}
            >
              <Text style={styles.buttonText}>SELECT</Text>
            </TouchableOpacity>
            <Text style={styles.moreInfoText}>Click here to know more.</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.skipButtonText}>SKIP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionWrapper: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 20,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
  },
  exampleText: {
    color: 'black',
    fontFamily: 'serif',
  },
  selectButton: {
    backgroundColor: '#6146C6',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: 90,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  moreInfoText: {
    color: 'blue',
    marginTop: 5,
  },
  skipButton: {
    backgroundColor: '#6146C6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  skipButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default StepScreen;
