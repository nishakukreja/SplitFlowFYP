import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import Custominput from '../components/Custominput';
import Custombutton from '../components/Custombutton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import logoImage from '../assets/images/logo.png';

const AccountDetails = ({ route }) => {
  const { personalDetails } = route.params;

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const navigation = useNavigation();

  const onNextPressed = (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Password and Confirm Password do not match.');
      setLoading(false);
      return;
    }

    const accountDetailsData = {
      emailAddress:email,
      password:password,
    }

    console.log("account details data: ", accountDetailsData);

    navigation.navigate('Gender', {
      personalDetails:personalDetails,
      accountDetails:accountDetailsData,
    });

    setLoading(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image source={logoImage} style={styles.logo} />

        <Image
          source={require('../assets/images/loginn.png')}
          style={styles.image}
        />

        <Text style={styles.header}>Account Details</Text>
        <Text style={styles.subheading}>Secure Your Inbox, Protect Your Details.</Text>

        <Custominput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          }}
          iconName="email-outline"
        />

        <Custominput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: { value: true, message: 'Password is required' },
            minLength: { value: 8, message: 'Password must be at least 8 characters long' },
          }}
          iconName="lock-outline"
        />

        <Custominput
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          control={control}
          rules={{
            required: { value: true, message: 'Confirm Password is required' },
            validate: (value) => value === getValues('password') || 'Passwords do not match',
          }}
          iconName="lock-outline"
        />

        <Custombutton
          text={loading ? 'Loading...' : 'Next'}
          onPress={handleSubmit(onNextPressed)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 400,
    height: 340,
    resizeMode: 'contain',
    marginBottom: 8,
    marginTop: 12,
    padding: 6,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 0,
    color: 'black',
    fontFamily: 'serif',
    marginTop: 5,
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
    fontFamily: 'serif',
  },
  logo: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
});

export default AccountDetails;
