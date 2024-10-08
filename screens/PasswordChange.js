import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Custombutton from '../components/Custombutton';
import { useNavigation } from '@react-navigation/native';

const PasswordChanged = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    // Navigate to the "Login" screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="check-circle" size={170} color="#fff" />
      <Text style={styles.title}>Password Changed</Text>
      <Text style={styles.subtitle}>
        You've successfully changed your password. Login with your new password.
      </Text>
      <Custombutton text="Login In Now" onPress={handleLoginPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6146C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 10,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'serif',
  },
});

export default PasswordChanged;
