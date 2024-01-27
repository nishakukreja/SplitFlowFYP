// EmailVerificationScreen.js
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/core';

import VerificationImage from '../assets/images/mobile.png';
import axios from 'axios';
import {allowedAddresses} from '../IPConfig';

const CheckEmail = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

  const route = useRoute();

  const sendOtp = async () => {
    try {
      const bodyData = {
        userId: route.params.userId,
        emailAddress: route.params.emailAddress,
      };
      const apiResponse = await axios
        .post(`${allowedAddresses.ip}/auth/user/send-otp-email`, bodyData)
        .then(onSuccess => {
          console.log('send otp success: ', onSuccess.data);
          navigation.replace('SendAndVerifyOTP', {
            emailAddress: route.params.emailAddress,
            userId: route.params.userId,
          });
        })
        .catch(onError => {
          console.log('on error otp sending: ', onError.response.data);
          if (onError.response.data.statusCode == 400) {
            Alert.alert('Oops', onError.response.data.message);
          }
        });
    } catch (error) {
      console.log('error in sending otp: ', error.response.data);
    }
  };

  const onGetOTPPressed = async data => {
    try {
      // Implement your custom logic for handling email verification
      // For example, you can send a request to your server API
      // navigation.navigate('SendAndVerifyOTP');
      sendOtp();
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={VerificationImage} style={styles.image} />

        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.subtitle}>
          We've sent a verification code to your email.
        </Text>

        <Custombutton text="GetOTP" onPress={handleSubmit(onGetOTPPressed)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 29,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  image: {
    width: 350,
    height: 400,
    resizeMode: 'contain',
    marginBottom: -2,
  },
  text: {
    color: 'black',
    marginVertical: 30,
  },
  link: {
    color: 'black',
  },
});

export default CheckEmail;
