import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Custombutton from '../components/Custombutton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import logoImage from '../assets/images/logo.png';
import axios from 'axios';
import { allowedAddresses } from '../IPConfig';

const UploadPicture = ({ route }) => {
  const navigation = useNavigation();
  const [choosePictureModalVisible, setChoosePictureModalVisible] = useState(false);
  const [thankYouModalVisible, setThankYouModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [apiResponse, setApiResponse] = useState(null); // Define apiResponse state

  const {
    personalDetails,
    accountDetails,
    genderDetails,
    interestDetails
  } = route.params;

  const openCamera = async () => {
    try {
      setLoading(true);
      const response = await launchCamera({
        mediaType: 'photo',
        saveToPhotos: true,
      });

      setLoading(false);

      if (response.didCancel) {
        console.log('User canceled image capture');
      } else if (response.errorMessage) {
        console.log('Image capture Error: ', response.errorMessage);
      } else {
        setSelectedImageUri(response.uri);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const openGallery = async () => {
    try {
      setLoading(true);
      const response = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      setLoading(false);

      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log("image data: ", response.assets[0].base64);
        setSelectedImageBase64(response.assets[0].base64);
        setSelectedImageUri(response.assets[0].uri);
        setIsImageSelected(true);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const showChoosePictureModal = () => {
    setChoosePictureModalVisible(true);
  };

  const showThankYouModal = () => {
    setThankYouModalVisible(true);
  };

  const hideChoosePictureModal = () => {
    setChoosePictureModalVisible(false);
  };

  const hideThankYouModal = () => {
    setThankYouModalVisible(false);
  };

  const registerUser = async () => {
    try {
      const uploadObj = {
        emailAddress: accountDetails.emailAddress,
        password: accountDetails.password,
        firstName: personalDetails.firstName,
        lastName: personalDetails.lastName,
        phoneNo: personalDetails.phoneNo,
        gender: genderDetails.gender,
        interests: interestDetails.preferences,
        isImageSelected: isImageSelected,
        imageBase64: selectedImageBase64,
      }

      console.log("compiled upload obj: ", uploadObj);

      const apiResponse = await axios.post(`${allowedAddresses.ip}/auth/user/sign-up`, uploadObj);
      setApiResponse(apiResponse); // Store api response in state

      if (apiResponse.data.status === 200) {
        console.log("ok aa");
        setThankYouModalVisible(true);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const navigateToHomeTabs = async () => {
    hideThankYouModal();
    if (apiResponse) {
      navigation.navigate('HomeTabs', {
        screen: 'Home',
        params: { user: apiResponse.data.data.user }
      });
    }
  };

  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  const onOKPress = () => {
    if (apiResponse) {
      navigation.navigate('HomeTabs', {
        screen: 'Home',
        params: { user: apiResponse.data.data.user }
      });
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      {selectedImageUri ? (
        <TouchableOpacity onPress={() => { showChoosePictureModal(); }}>
          <Image source={{ uri: selectedImageUri }} style={styles.imagePreview} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.imagePreview} onPress={() => { showChoosePictureModal(); }}>
          <Text style={styles.placeholderText}>Add Photo</Text>
        </TouchableOpacity>
      )}

      <Custombutton
        text={loading ? 'Loading...' : 'Upload'}
        onPress={() => { registerUser(); }}
        style={styles.uploadButton}
      />

      <TouchableOpacity onPress={showThankYouModal} style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip for now</Text>
      </TouchableOpacity>

      <Custombutton
        text={
          <Text>
            <Text>Already have an account?{' '}</Text>
            <Text style={{ fontWeight: 'bold', color: '#6146C6', fontSize: 15, textDecorationLine: 'underline' }}>
              Login
            </Text>
          </Text>
        }
        onPress={onLoginPress}
        type="TERTIARY"
        style={styles.customButton}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={choosePictureModalVisible}
        onRequestClose={hideChoosePictureModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choose an Option</Text>
          <Pressable
            style={styles.modalOption}
            onPress={() => {
              openCamera();
              hideChoosePictureModal();
            }}
          >
            <Text style={styles.optionText}>Take a Photo</Text>
          </Pressable>
          <Pressable
            style={styles.modalOption}
            onPress={() => {
              openGallery();
              hideChoosePictureModal();
            }}
          >
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </Pressable>
          <Pressable style={styles.closeButton} onPress={hideChoosePictureModal}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={thankYouModalVisible}
        onRequestClose={hideThankYouModal}
      >
        <View style={styles.thankYouModalContainer}>
          <Text style={styles.thankYouTitle}>Thank You!</Text>
          <Text style={styles.thankYouText}>You have successfully created your account.</Text>
          <Pressable style={styles.okButton} onPress={onOKPress}>
            <Text style={styles.okButtonText}>OK</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: 'gray',
  },
  logo: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  customButton: {
    marginTop: 20,
  },
  uploadButton: {
    width: '100%',
    backgroundColor: '#6146C6',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  skipButton: {
    marginTop: 20,
  },
  skipButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  modalOption: {
    width: '80%',
    padding: 15,
    backgroundColor: '#6146C6',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  okButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#6146C6',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#6146C6',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  thankYouModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontFamily: "serif",
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  thankYouText: {
    fontSize: 17,
    marginBottom: 20,
    color: 'black',
  },
});

export default UploadPicture;
