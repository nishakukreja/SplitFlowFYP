// EmailVerificationScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';

import VerificationImage from '../assets/images/mobile.png';

const CheckEmail = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onGetOTPPressed = async (data) => {
    try {
      // Implement your custom logic for handling email verification
      // For example, you can send a request to your server API
      navigation.navigate('SendAndVerifyOTP');
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
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    fontFamily: "serif",
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
