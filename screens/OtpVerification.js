// TwoFactorVerification.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import Custombutton from '../components/Custombutton'; 
import { Colors } from '../constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { allowedAddresses } from '../IPConfig';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setCurrentUserAuthToken } from '../redux/slices/UserSlice';

const OtpVerification = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();

  const {currentUser, userAuthToken} = useSelector((state)=>state.user);
  const [otpCode, setOtpCode] = useState('');
  const [emailAddress, setEmailAddress] = useState(route.params.emailAddress);
  const [userId, setUserId] = useState(route.params.userId);



  

  useEffect(() => {
    sendTwoFAVerificationOtp();
  }, []);

  

  const sendTwoFAVerificationOtp = async()=>{
    // try { 
      console.log("ema: ", emailAddress, userId);
      const apiResponse = await axios.post(`${allowedAddresses.ip}/user/send-2fa-otp`, {
        emailAddress:emailAddress,
      })

      .then(onSuccess=>{
        console.log("on success: ", onSuccess.data);
        
        Alert.alert("2FA Verification", onSuccess.data.message);
      })
      .catch(onError=>{
        console.log("on error: ", onError.response.data);
      })


    // } catch (error) {
    //   console.log("error in sending otp verification for 2fa: ", error);
    // }
  }

  const verifyTwoFAVerificationOtp = async()=>{
    // try {
      const apiResponse = await axios.post(`${allowedAddresses.ip}/user/verify-2fa-otp`, {
        emailAddress:emailAddress,
        otpCode:otpCode
      })

      .then(onSuccess=>{
        console.log("on success: ", onSuccess.data);
        Alert.alert("2FA Verification", onSuccess.data?.message);
        console.log("onSuccess.data?.data?.authToken: ", onSuccess.data?.data?.user)
        // dispatch(setCurrentUserAuthToken(onSuccess.data?.data?.authToken));
        dispatch(setCurrentUserAuthToken(onSuccess.data?.data?.authToken))
        // dispatch(setCurrentUser(apiResponse.data?.data?.user))

        dispatch(setCurrentUser(onSuccess.data?.data?.user));

        console.log("auth: ", userAuthToken, currentUser);

        

        navigation.navigate('HomeTabs',{
          screen:'Home', params:{user: apiResponse?.data?.data?.user}
        })

        

        // navigation.navigate('FinishScreen');
      })
      .catch(onError=>{
        console.log("kjffj: ", onError);
        console.log("on error: ", onError?.response?.data);
        if(onError?.response?.data?.statusCode == 401){
          
          Alert.alert("2FA Verification Error", onError?.response?.data?.message);
        }
        
        if(onError?.response?.data?.statusCode == 400){
          Alert.alert("2FA Verification Error", onError?.response?.data?.message);
        }
      })


    // } catch (error) {
    //   console.log("error in sending otp verification for 2fa: ", error);
    // }
  }


  return (
    <View style={styles.container}>
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
        onPress={verifyTwoFAVerificationOtp}
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

export default OtpVerification;
