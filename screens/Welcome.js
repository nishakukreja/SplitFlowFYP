import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/Custombutton';

const Welcome = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  const handleSignup = () => {
    navigation.navigate('Signup'); // Navigate to the Signup screen
  };

  return (
    <View style={styles.container}>
      {/* Logo at the top-left corner */}
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

      <Image
        source={require('../assets/images/welcome.jpg')}
        style={styles.image}
      />

      <Text style={[styles.descriptionText, { color: 'black', fontWeight: 'bold' }]}>
        Welcome to go tasks
      </Text>

      <Text style={styles.additionalText}>
        This app is designed to help you better manage your tasks and sub-tasks.
      </Text>

      <CustomButton onPress={handleLogin} text="Login" type="PRIMARY" style={styles.Custombutton} />
      <CustomButton onPress={handleSignup} text="Signup" type="SECONDARY" style={styles.Custombutton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 10,
    left: 10,
    resizeMode: 'contain',
  },
  image: {
    width: 400,
    height: 350,
    resizeMode: 'contain',
    marginTop: -10, 
  },
  descriptionText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: "serif",
    marginBottom: 5, 
  },
  additionalText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontFamily: "serif",
  },
  Custombutton: {
    marginTop: 30, 
  },
});
export default Welcome;