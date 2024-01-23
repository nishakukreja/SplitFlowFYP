// NewPasswordScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';  // Import Image from react-native
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
const picture = require('../assets/images/picturee.png');

const NewPasswordScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSubmitPressed = async (data) => {
    try {
      
        // For simplicity, let's assume OTP verification is successful
        navigation.navigate('PasswordChange');
      
      // navigation.navigate('Login');
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
        <Text style={styles.title}>Reset your password</Text>
        
        {/* Use the imported Image component */}
        <Image source={picture} style={styles.picture} />

        <Custominput
          placeholder="Code"
          name="code"
          control={control}
          rules={{ required: 'Code is required' }}
        />

        <Custominput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <Custombutton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 20,
    fontFamily: "serif",
  },
  text: {
    color: 'gray',
    marginVertical: 20,
    fontFamily: "serif",
  },
  link: {
    color: '#FDB075',
  },
  picture: {
    width: 300,
    height: 300,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});

export default NewPasswordScreen;
