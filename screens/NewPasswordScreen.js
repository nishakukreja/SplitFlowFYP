import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Image} from 'react-native'; // Import Image from react-native
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {allowedAddresses} from '../IPConfig';
import axios from 'axios';
const picture = require('../assets/images/picturee.png');

const NewPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const route = useRoute();

  const resetPassword = async data => {
    try {
      const bodyData = {
        updatedPassword: data.updatedPassword,
        updatedConfirmPassword: data.updatedConfirmPassword,
        userId: route.params.userId,
      };

      console.log('body: ', bodyData);
      const apiResponse = await axios
        .post(`${allowedAddresses.ip}/auth/user/reset-password`, bodyData)
        .then(onSuccess => {
          console.log('send otp success: ', onSuccess.data);
          // Alert.alert(
          //   'Yayy',
          //   onSuccess.data.message,
          //   [
          //     {
          //       text: 'OK',
          //       onPress: () => {
          //         navigation.navigate('Login');
          //       },
          //     },
          //   ],
          //   {cancelable: false},
          // );

          navigation.replace('PasswordChange', {
            emailAddress: route.params.emailAddress,
            userId: route.params.userId,
          });
        })
        .catch(onError => {
          console.log('on error otp sending: ', onError.response.data);
          if (onError.response.data.statusCode == 400) {
            console.log('j');
            Alert.alert('Oops', onError.response.data.message);
          } else if (onError.response.data.statusCode == 404) {
            Alert.alert('Oops', onError.response.data.message);
          }
        });
    } catch (error) {
      console.log('error in verifying otp: ', error.response.data);
    }
  };

  const onSubmitPressed = async data => {
    try {
      // For simplicity, let's assume OTP verification is successful
      resetPassword(data);

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
          placeholder="Enter new password"
          name="updatedPassword"
          control={control}
          rules={{
            required: 'New password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <Custominput
          placeholder="Confirm new password"
          name="updatedConfirmPassword"
          control={control}
          secureTextEntry
          rules={{
            required: 'Confirm new password is required',
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
    fontFamily: 'serif',
  },
  text: {
    color: 'gray',
    marginVertical: 20,
    fontFamily: 'serif',
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
