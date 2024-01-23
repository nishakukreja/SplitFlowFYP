import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Chip } from 'react-native-paper';
import Custombutton from '../components/Custombutton';
import Icon from 'react-native-vector-icons/FontAwesome';
import logoImage from '../assets/images/logo.png';
import axios from 'axios';
import { allowedAddresses } from '../IPConfig';
const AreaOfInterest = ({ route }) => {
  const {
    accountDetails,
    personalDetails,
    genderDetails
  } = route.params;

  const [interests, setInterests] = useState([]);


  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const { width: screenWidth } = useWindowDimensions();

  const handleDimensionsChange = ({ window: { width } }) => {
    screenWidth(width);
  };

  const getAllInterests = async()=>{
    try {
      console.log("ip: ", allowedAddresses.ip)
      const apiResponse = await axios.get(`${allowedAddresses.ip}/tag/get-all-tags`);
      console.log("api response in area of interests: ", apiResponse.data);
      if(apiResponse.data.status == 200 && apiResponse.data.success){
        setInterests(apiResponse.data.data);
      }
    } catch (error) {
      console.log("error in getting interests: ", error);
    }
  }

  useEffect(() => {
    // Dimensions.addEventListener('change', handleDimensionsChange);

    getAllInterests();

    return () => {
      // Dimensions.removeEventListener('change', handleDimensionsChange);
    };
  }, []);

  const toggleInterest = (interest) => {
    console.log("interest: ", interest);

    const updatedInterests = [...selectedInterests];
    if (updatedInterests.includes(interest._id)) {
      updatedInterests.splice(updatedInterests.indexOf(interest._id), 1);
    } else {
      updatedInterests.push(interest._id);
    }
    setSelectedInterests(updatedInterests);
  };

  const navigateToUploadPicture = () => {

    const interestsData = {
      preferences:selectedInterests,
    }
    console.log("interest data: ", interestsData);

    if (selectedInterests.length >= 0) {
      navigation.navigate('UploadPicture', {
        personalDetails,
        accountDetails,
        genderDetails,
        interestDetails:interestsData,
      
      });
    } else {
      alert('Please select at least one interest');
    }
  };

  // const interests = [
  //   { label: 'Venue Selection', value: 'venueSelection', icon: 'check-circle' },
  //   { label: 'Wedding Planner', value: 'weddingPlanner', icon: 'heart' },
  //   { label: 'Guest List Management', value: 'guestList', icon: 'users' },
  //   { label: 'Budget Management', value: 'budgetManagement', icon: 'dollar' },
  //   { label: 'Floral and Decor Services', value: 'floralDecor', icon: 'tree' },
  //   { label: 'Entertainment and Music', value: 'entertainmentMusic', icon: 'music' },
  //   { label: 'Photography', value: 'photography', icon: 'camera' },
  //   { label: 'Invitation Management', value: 'invitationManagement', icon: 'envelope' },
  //   { label: 'Catering Services', value: 'cateringServices', icon: 'cutlery' },
  //   { label: 'Recording', value: 'Recording', icon: 'microphone' },
  //   { label: 'Videography', value: 'videography', icon: 'video-camera' },
  // ];

  const headerFontSize = screenWidth * 0.06;
  const subheaderFontSize = screenWidth * 0.05;
  const chipTextFontSize = screenWidth * 0.04;
  const chipMargin = screenWidth * 0.02;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logoImage} style={styles.logo} />

      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { fontSize: headerFontSize }]}>
          Discover and follow topics you love
        </Text>
        <Text style={[styles.subHeaderText, { fontSize: subheaderFontSize }]}>Choose Your Interest</Text>
      </View>

      <View style={styles.interestsContainer}>
        {interests.map((interest) => (
          <TouchableOpacity key={interest._id} onPress={() => toggleInterest(interest)}>
            <Chip
              selected={selectedInterests.includes(interest._id)}
              onPress={() => toggleInterest(interest)}
              style={[
                styles.chip,
                selectedInterests.includes(interest._id) ? { backgroundColor: '#6146C6' } : {},
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name={interest.icon}
                  size={18}
                  color={selectedInterests.includes(interest._id) ? 'white' : 'black'}
                  style={{ marginRight: 5 }}
                />
                <Text
                  style={[
                    styles.chipText,
                    selectedInterests.includes(interest._id) ? { color: 'white' } : {},
                    { fontSize: chipTextFontSize, marginLeft: 5, marginRight: chipMargin },
                  ]}
                >
                  {interest.title}
                </Text>
              </View>
            </Chip>
          </TouchableOpacity>
        ))}
      </View>

      <Custombutton onPress={navigateToUploadPicture} text="Next" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  logo: {
    position: 'absolute',
    top: 18,
    left: 18,
    width: '20%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  subHeaderText: {
    color: 'black',
    marginBottom: '2%',
    marginTop: '2%',
    fontFamily: 'serif',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '4%',
  },
  chip: {
    margin: '2%',
  },
  chipText: {
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

export default AreaOfInterest;
