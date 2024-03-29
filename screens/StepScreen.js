import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const StepScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <ProgressSteps activeStep={0} activeStepIconBorderColor="#6146C6" activeStepIconColor="white">
        <ProgressStep label="Step 1" activeLabelColor='#6146C6' />
        <ProgressStep label="Step 2" activeLabelColor="#6145C6" />
        <ProgressStep label="Step 3" activeLabelColor="#6145C6" />
        <ProgressStep label="Step 4" activeLabelColor="#6145C6" />
      </ProgressSteps> */}

      <View style={styles.optionsContainer}>
        {/* Option 1 */}
        <View style={styles.optionWrapper}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Verify From Email</Text>
            <Text style={styles.exampleText}>e.g. Google Authenticator</Text>
            <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('TwoFactorVerification')}>
              <Text style={styles.buttonText}>SELECT</Text>
            </TouchableOpacity>

            <Text style={styles.moreInfoText}>Click here to know more.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        {/* Option 2 */}
        <View style={styles.optionWrapper}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Verify From Phone</Text>
            <Text style={styles.exampleText}>e.g. Google Authenticator</Text>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.buttonText}>SELECT</Text>
            </TouchableOpacity>
            <Text style={styles.moreInfoText}>Click here to know more.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        {/* Option 3 */}
        <View style={styles.optionWrapper}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Verify From Email and Phone Both</Text>
            <Text style={styles.exampleText}>e.g. Google Authenticator</Text>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.buttonText}>SELECT</Text>
            </TouchableOpacity>
            <Text style={styles.moreInfoText}>Click here to know more.</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* SKIP Button */}
      <TouchableOpacity style={styles.skipButton}>
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
    fontFamily: 'serif',
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
