// ForgotPasswordScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';

import ResetPasswordImage from '../assets/images/forgottt.png';

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSendPressed = async (data) => {
    try {
      navigation.navigate('CheckEmail');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={ResetPasswordImage} style={styles.image} />

        <Text style={styles.title}>Forgot your password?</Text>
        <Text style={[styles.title, styles.subtitle]}>
          No worries. Let's get you back in.
        </Text>

        <Custominput
          name="email"
          control={control}
          placeholder="Email"
        />

        <Custombutton text="Send" onPress={handleSubmit(onSendPressed)} />

        <Custombutton
          text="Back to Login"
          onPress={onLoginPress}
          type="TERTIARY"
        />
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
    marginTop: 1,
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 14, 
    color: 'black', 
    marginTop: 1,
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
    fontFamily: "serif",
  },
  link: {
    color: 'black',
  },
});

export default ForgotPasswordScreen;
