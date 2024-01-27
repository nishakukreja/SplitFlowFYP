import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import Custombutton from '../components/Custombutton';
import {Colors} from '../constants/Colors';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {allowedAddresses} from '../IPConfig';
import axios from 'axios';

const OTPScreen = () => {
  const [otpCode, setOtpCode] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const verifyOtp = async () => {
    try {
      const bodyData = {
        otpCode: otpCode,
        emailAddress: route.params.emailAddress,
      };
      const apiResponse = await axios
        .post(`${allowedAddresses.ip}/auth/user/verify-otp`, bodyData)
        .then(onSuccess => {
          console.log('send otp success: ', onSuccess.data);
          navigation.replace('NewPasswordScreen', {
            emailAddress: route.params.emailAddress,
            userId: route.params.userId,
          });
        })
        .catch(onError => {
          console.log('on error otp sending: ', onError.response.data.message);
          if (onError.response.data.statusCode == 400) {
            console.log('j');
            Alert.alert('Oops', onError.response.data.message);
          } else if (onError.response.data.statusCode == 401) {
            Alert.alert('Oops', onError.response.data.message);
          }
        });
    } catch (error) {
      console.log('error in verifying otp: ', error.response.data);
    }
  };

  const handleVerify = () => {
    // Add logic to verify OTP, navigate to ResetPasswordScreen if successful
    // For simplicity, let's assume OTP verification is successful
    // navigation.navigate('NewPasswordScreen');
    verifyOtp();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>OTP VERIFICATION</Text>

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

export default OTPScreen;
