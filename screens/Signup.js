import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert, Text, Dimensions } from 'react-native';
import Custombutton from '../components/Custombutton';
import Custominput from '../components/Custominput'; 
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import imageAboveInput from '../assets/images/signup.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import logoImage from '../assets/images/logo.png';

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();

  const onNextPressed = async (formData) => {
    if (loading) {
      return;
    }

    setLoading(true);

    if (!formData.firstName || formData.firstName.length < 4) {
      Alert.alert('Validation Error', 'First Name must be at least 4 characters long.');
      setLoading(false);
      return;
    }

    if (!formData.contact || !/^\d{11}$/.test(formData.contact)) {
      Alert.alert('Validation Error', 'Contact must be 11 digits long.');
      setLoading(false);
      return;
    }

    try {

      const signUpData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNo: formData.contact,
      };  
      

      console.log("sign up data: ", signUpData);

      navigation.navigate('AccountDetails', {
        personalDetails:signUpData,
      });

    } catch (error) {
      Alert.alert('Oops', error.message);
    }

    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.root} enableOnAndroid={true} extraHeight={100}>
      <Image source={imageAboveInput} style={styles.imageAboveInput} />
      <Image source={logoImage} style={styles.logo} />

      <Text style={styles.title}>Create an Account to manage your tasks</Text>

      <Custominput
        name="firstName"
        placeholder="First Name"
        control={control}
        rules={{
          required: { value: true, message: 'First Name is required' },
          minLength: { value: 4, message: 'First Name must be at least 4 characters long' },
        }}
        iconName="account"
      />

      <Custominput
        name="lastName"
        placeholder="Last Name"
        control={control}
        rules={{
          required: { value: true, message: 'Last Name is required' },
          minLength: { value: 3, message: 'Last Name must be at least 3 characters long' },
        }}
        iconName="account"
      />

      <Custominput
        name="contact"
        placeholder="Contact"
        control={control}
        rules={{
          required: { value: true, message: 'Contact is required' },
          pattern: { value: /^\d{11}$/, message: 'Contact must be 11 digits long' },
        }}
        iconName="phone"
      />

      <Custombutton
        text={loading ? 'Loading...' : 'Next'}
        onPress={handleSubmit(onNextPressed)}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  imageAboveInput: {
    width: Dimensions.get('window').width < 600 ? 359 : 300,
    height: Dimensions.get('window').width < 600 ? 350 : 350,
    resizeMode: 'contain',
    marginTop: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    letterSpacing: -1,
    fontFamily: 'serif',
    color: 'black',
  },
  logo: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },


  inputContainer: {
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomWidth: 4,
    borderColor: 'black',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});

export default Signup;
