import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {allowedAddresses} from '../IPConfig';
import axios from 'axios';

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [user, setUser] = useState(route.params.user);

  console.log('user: ', user);

  const getUserProfile = async () => {
    try {
      const apiResponse = await axios
        .get(
          `${allowedAddresses.ip}/user/get-profile/${route.params.user.userId}`,
        )
        .then(onSuccess => {
          console.log('send otp success: ', onSuccess.data);
        })
        .catch(onError => {
          console.log('on error otp sending: ', onError.response.data);
          if (onError.response.data.statusCode == 400) {
            Alert.alert('Oops', onError.response.data.message);
          }
        });
    } catch (error) {
      console.log('error in getting user profile: ', error.response.data);
    }
  };

  const handleOptionPress = screen => {
    if (screen) {
      navigation.navigate(screen, {
        user: user,
      });
    } else {
      // Handle logout or other actions
    }
  };

  // const user = {
  //   name: 'Nisha kukreja',
  //   avatar: require('../assets/images/female.png'),
  //   email: 'nishakukreja@gmail.com',
  // };

  const options = [
    {icon: 'edit', title: 'EditProfile', screen: 'EditProfile'},
    {icon: 'settings', title: 'Setting', screen: 'Settings'},
    {icon: 'notifications-on', title: 'Notification', screen: 'Notification'},
    {icon: 'sign-out', title: 'Logout'},
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center',
            color: 'black',
          }}>
          Profile
        </Text>
      </View>
      <View style={{alignItems: 'center', padding: 20}}>
        <Image
          source={{
            uri: user.profile.url,
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: '#ccc',
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginVertical: 10,
            color: 'black',
          }}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={{fontSize: 16, color: 'black'}}>{user.email}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 2,
        }}>
        <TouchableOpacity
          onPress={() => handleOptionPress('EditProfile')}
          style={{
            backgroundColor: '#6146C6',
            borderRadius: 14,
            width: 110,
            marginRight: 13,
            alignItems: 'center',
            padding: 10,
            height: 70,
          }}>
          <Text style={{color: 'white', marginTop: 10}}>3 Ongoing Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOptionPress('Settings')}
          style={{
            backgroundColor: '#6146C6',
            borderRadius: 14,
            width: 110,
            marginLeft: -1,
            alignItems: 'center',
            padding: 10,
            height: 70,
          }}>
          <Text style={{color: 'white', marginTop: 10}}>8 Completed Task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.options}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => handleOptionPress(option.screen)}>
            {getOptionIcon(option.icon)}
            <Text style={styles.title}>{option.title}</Text>
            <FontAwesomeIcon name="angle-right" style={styles.arrow} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const getOptionIcon = iconName => {
  switch (iconName) {
    case 'edit':
      return <FontAwesomeIcon name={iconName} style={styles.icon} />;
    case 'settings':
      return <IoniconsIcon name={iconName} style={styles.icon} />;
    case 'notifications-on':
      return <MaterialIconsIcon name={iconName} style={styles.icon} />;
    case 'sign-out':
      return <FontAwesomeIcon name={iconName} style={styles.icon} />;
    default:
      return null;
  }
};

const styles = {
  options: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    fontSize: 24,
    color: '#6146C6',
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    flex: 1,
    color: 'black',
    fontFamily: 'serif',
  },
  arrow: {
    fontSize: 18,
    color: 'black',
  },
};

export default Profile;
