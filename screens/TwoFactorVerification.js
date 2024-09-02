// TwoFactorVerification.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import Custombutton from '../components/Custombutton'; 
import { Colors } from '../constants/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { allowedAddresses } from '../IPConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/slices/UserSlice';

const TwoFactorVerification = () => {
  const route = useRoute();
  
  const navigation = useNavigation();

  const dispatch = useDispatch();
 
  const {currentUser, userAuthToken} = useSelector((state)=>state.user);

  const [otpCode, setOtpCode] = useState('');


  const [emailAddress, setEmailAddress] = useState(route.params.email);

  const [method, setMethod] = useState(route.params?.method || 'default'); 
  useEffect(() => {
    if (route.params?.method) {
      setMethod(route.params.method);
    }

    sendTwoFAVerificationOtp();

    console.log("cur: ". currentUser?.isTwoFactorEnabled)

    console.log("method: ", method, route.params.email)
  }, [route.params?.method]);

  const navigateToBackupScreen = () => {
    
    verifyTwoFAVerificationOtp();
  };

  const sendTwoFAVerificationOtp = async()=>{
    try {
      const apiResponse = await axios.post(`${allowedAddresses.ip}/user/send-2fa-otp`, {
        emailAddress:currentUser.emailAddress,
      })

      .then(onSuccess=>{
        console.log("on success: ", onSuccess.data);
        Alert.alert("2FA Verification", onSuccess.data.message);
      })
      .catch(onError=>{
        console.log("on error: ", onError.response.data);
      })


    } catch (error) {
      console.log("error in sending otp verification for 2fa: ", error);
    }
  }

  const verifyTwoFAVerificationOtp = async()=>{
    try {
      const apiResponse = await axios.post(`${allowedAddresses.ip}/user/verify-2fa-otp`, {
        emailAddress:currentUser.emailAddress,
        otpCode:otpCode
      })

      .then(onSuccess=>{
        console.log("on success: ", onSuccess.data);
        enableTwoFA();
        Alert.alert("2FA Verification", onSuccess.data.message);
        navigation.navigate('FinishScreen');
      })
      .catch(onError=>{
        console.log("on error: ", onError.response.data);
        if(onError.response.data.statusCode == 401){
          Alert.alert("2FA Verification Error", onError.response.data.message);
        }
        
        if(onError.response.data.statusCode == 400){
          Alert.alert("2FA Verification Error", onError.response.data.message);
        }
      })


    } catch (error) {
      console.log("error in sending otp verification for 2fa: ", error);
    }
  }


  const enableTwoFA = async()=>{
    try {
      const apiResponse = await axios.post(`${allowedAddresses.ip}/user/change-2fa-status`, {
        isTwoFactorEnabled:true,
        recoveryEmailAddress:emailAddress
      }, {
        headers:{
          authorization: `Bearer ${userAuthToken}`
        }
      })

      .then(onSuccess=>{
        console.log("on success: ", onSuccess.data);
        // Alert.alert("2FA Verification", onSuccess.data.message);
        getUserDataAndUpdateRedux();
        navigation.navigate('FinishScreen');
      })
      .catch(onError=>{
        console.log("on error: ", onError.response.data);
      })


    } catch (error) {
      console.log("error in sending otp verification for 2fa: ", error);
    }
  }



const getUserDataAndUpdateRedux = async()=>{
  console.log("currentUser: ". currentUser)
    try {
      const apiResponse = await axios.get(`${allowedAddresses.ip}/user/get-profile/${currentUser.userId}`, {
        headers:{
          authorization: `Bearer ${userAuthToken}`
        }
      })

      .then(onSuccess=>{
        console.log("on success: ", onSuccess.data.data);
        console.log("redux updated before: ", currentUser.isTwoFactorEnabled)

        dispatch(setCurrentUser(apiResponse?.data?.data))
        console.log("redux updated after: ", currentUser.isTwoFactorEnabled)
      })
      .catch(onError=>{
        console.log("on error: ", onError.response.data.statusCode);
        if(onError.response.data.statusCode == 401){
          Alert.alert("2FA Verification Error", onError.response.data.message);
        }
        
        if(onError.response.data.statusCode == 400){
          Alert.alert("2FA Verification Error", onError.response.data.message);
        }
      })


    } catch (error) {
      console.log("error in sending otp verification for 2fa: ", error);
    }
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
