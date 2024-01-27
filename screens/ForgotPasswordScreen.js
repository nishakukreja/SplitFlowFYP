// ForgotPasswordScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';

import ResetPasswordImage from '../assets/images/forgottt.png';
import axios from 'axios';
import {allowedAddresses} from '../IPConfig';

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

  const checkUserEmail = async data => {
    try {
      const bodyData = {
        emailAddress: data.email,
      };

      console.log('body data: ', bodyData);

      const apiResponse = await axios
        .post(`${allowedAddresses.ip}/auth/user/check-user-email`, bodyData)
        .then(onSuccess => {
          console.log('on success: ', onSuccess.data);
          navigation.replace('CheckEmail', {
            userId: onSuccess.data.data._id,
            emailAddress: onSuccess.data.data.emailAddress,
          });
        })
        .catch(onError => {
          console.log('on error catch user email: ', onError.response.data);
          if (onError.response.data.statusCode == 400) {
            Alert.alert('Oops', onError.response.data.message);
          } else if (onError.response.data.statusCode == 404) {
            Alert.alert('Oops', onError.response.data.message);
          } else {
            console.log('else me');
          }
        });
    } catch (error) {
      console.log('error in checking user email: ', error);
    }
  };

  const onSendPressed = async data => {
    try {
      checkUserEmail(data);
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

        <Custominput name="email" control={control} placeholder="Email" />

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
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    marginTop: 1,
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
    fontFamily: 'serif',
  },
  link: {
    color: 'black',
  },
});

export default ForgotPasswordScreen;
