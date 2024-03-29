import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import Custombutton from '../components/Custombutton'; // Assuming you have a CustomButton component
import { Colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const TwoFactorVerification = () => {
  const [otpCode, setOtpCode] = useState('');
  const navigation = useNavigation();

  const navigateToBackupScreen = () => {
    navigation.navigate('BackupScreen');
  };

  return (
    <View style={styles.container}>
       {/* <ProgressSteps activeStep={1}>
        <ProgressStep label="Step 1" />
        <ProgressStep label="Step 2" />
        <ProgressStep label="Step 3" />
  
      </ProgressSteps> */}
      <Text style={styles.header}>Two Factor Verification</Text>
      <View style={styles.otpInputContainer}>
        <OTPTextView
          handleTextChange={otpText => {
            setOtpCode(otpText);
          }}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={4}
          inputCellLength={1}
          tintColor={Colors.PRIMARY}
          offTintColor={Colors.SECONDARY}
        />
        
      </View>
      <Custombutton
        text="Verify"
        onPress={navigateToBackupScreen}
        bgColor={Colors.PRIMARY}
        fgColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    fontFamily: 'serif',
  },
  otpInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});

export default TwoFactorVerification;
