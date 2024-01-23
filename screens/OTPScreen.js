import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import OTPTextView from "react-native-otp-textinput";
import Custombutton from '../components/Custombutton';
import { Colors } from '../constants/Colors';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const OTPScreen = ({ navigation }) => {
  const [otpCode, setOtpCode] = useState("");

  const handleVerify = () => {
    // Add logic to verify OTP, navigate to ResetPasswordScreen if successful
    // For simplicity, let's assume OTP verification is successful
    navigation.navigate('NewPasswordScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>OTP VERIFICATION</Text>

      <View style={styles.otpInputContainer}>
        <OTPTextView
          handleTextChange={(otpText) => {
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
        onPress={handleVerify}
        type="PRIMARY"
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
    color:'black',
    fontFamily: "serif",
  },
  otpInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});

export default OTPScreen;
