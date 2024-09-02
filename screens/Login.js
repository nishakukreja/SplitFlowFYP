import React, {useState, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import Custombutton from '../components/Custombutton';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import Custominput from '../components/Custominput';
import {allowedAddresses} from '../IPConfig';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserIdContext from '../components/UserIdContext';
import LogoImage from '../assets/images/logo.png';
import GoogleImage from '../assets/images/google.png';
import { setCurrentUser, setCurrentUserAuthToken } from '../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const {setUserId} = useContext(UserIdContext);
  const [loading, setLoading] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onLoginPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const loginData = {
        emailAddress: data.email,
        password: data.password,
        // emailAddress: "nishakukreja500@gmail.com",
        // password: "123456789",
      };

      console.log('login data: ', loginData);

      const apiResponse = await axios.post(
        `${allowedAddresses.ip}/auth/user/login`,
        loginData,
      );
      if (apiResponse.data.status === 200) {
        Alert.alert(apiResponse.data.message);

        console.log('apiResponse.data.message: ', apiResponse.data);

        // Navigate to the Home screen
        // navigation.replace('Home', {
        //   user: apiResponse.data.data.user,
        // });
        dispatch(setCurrentUserAuthToken(apiResponse.data.data.authToken))
        dispatch(setCurrentUser(apiResponse.data.data.user))

        navigation.navigate('HomeTabs',{
          screen:'Home', params:{user: apiResponse.data.data.user}
        })
      } else {
        console.log(apiResponse.data.message);
        Alert.alert(apiResponse.data.message);
      }
    } catch (e) {
      console.log(e.response.data);
      if(e.response.data.statusCode === 401){
        // Alert.alert('Oops', e.response.data.message);

        navigation.navigate("2FAAuthVerification", {
          emailAddress:e.response.data.stack.emailAddress,
          userId:e.response.data.stack.userId,
          isTwoFactorEnabled:e.response.data.stack.isTwoFactorEnabled,

        })
      }
    }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const onSignupPress = () => {
    navigation.navigate('Signup');
  };

  const onGoogleSignInPressed = () => {
    // Add Google Sign-In logic here
  };

  return (
    <View style={styles.root}>
      <Image source={LogoImage} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome back!</Text>

      <Custominput
        control={control}
        name="email"
        placeholder="Email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        iconName="email-multiple-outline"
      />

      <Custominput
        control={control}
        name="password"
        placeholder="Password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password should be a minimum of 8 characters long',
          },
        }}
        iconName="account-lock"
        secureTextEntry={isPasswordSecure}
      />

      <View style={styles.forgotPasswordContainer}>
        <Text
          style={styles.forgotPasswordText}
          onPress={onForgotPasswordPressed}>
          Forgot password?
        </Text>
      </View>

      <Custombutton
        text={loading ? 'Loading...' : 'Login'}
        onPress={handleSubmit(onLoginPressed)}
        style={{marginVertical: 50}}
      />

      <TouchableOpacity onPress={onGoogleSignInPressed}>
        <Image source={GoogleImage} style={styles.icon} />
      </TouchableOpacity>

      <Custombutton
        text={
          <Text>
            <Text>Don't have an account? </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#6146C6',
                fontSize: 15,
                textDecorationLine: 'underline',
              }}>
              Signup
            </Text>
          </Text>
        }
        onPress={onSignupPress}
        type="TERTIARY"
        style={styles.Custombutton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 11,
    marginTop: 0,
    marginVertical: 12,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -39,
    marginBottom: 20,
    color: 'black',
    fontFamily: 'serif',
  },
  Custombutton: {
    marginTop: 150,
    marginVertical: 150,
  },
  logo: {
    width: 370,
    height: 290,
    marginBottom: 0,
  },
  icon: {
    width: 38,
    height: 38.9,
    marginTop: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'black',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default Login;
