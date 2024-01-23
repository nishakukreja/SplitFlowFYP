import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Custombutton from '../components/Custombutton';
import logoImage from '../assets/images/logo.png';

const Gender = ({ route }) => {
  const {
    accountDetails,
    personalDetails
  } = route.params;
  console.log("route gender: ", route.params);

  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const navigateToAreaOfInterest = () => {

    const genderData = {
      gender:selectedGender,
    }
    console.log("gender data: ", genderData);
    
    if (selectedGender !== '') {
      navigation.navigate('AreaOfInterest', {
        personalDetails,
        accountDetails,
        genderDetails:genderData,
      });
    } else {
      alert('Please select your gender');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logoImage} style={styles.logo} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Select Your Gender</Text>
        <Text style={styles.subHeaderText}>
          Enhance your experience by telling us your gender
        </Text>
      </View>

      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'Male' ? styles.selectedGenderOption : {},
          ]}
          onPress={() => handleGenderSelection('Male')}
        >
          <Image
            source={require('../assets/images/male.png')}
            style={styles.avatarImage}
          />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />

        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'Female' ? styles.selectedGenderOption : {},
          ]}
          onPress={() => handleGenderSelection('Female')}
        >
          <Image
            source={require('../assets/images/female.png')}
            style={styles.avatarImage}
          />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
      </View>

      <Custombutton onPress={navigateToAreaOfInterest} text="Next" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  logo: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    fontFamily: 'serif',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    marginTop: 30,
    fontFamily: 'serif',
  },
  subHeaderTextt: {
    alignItems: 'flex-start',
  },
  selectionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 40,
    marginVertical: 40,
  },
  genderOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 60,
    alignItems: 'center',
  },
  selectedGenderOption: {
    backgroundColor: '#6146C6',
  },
  genderText: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 5,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Gender;
