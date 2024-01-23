import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const EditProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [choosePictureModalVisible, setChoosePictureModalVisible] = useState(false);
 
  const [loading, setLoading] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState('');
  const [isImageSelected, setIsImageSelected] = useState(false);

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
        console.log('image data: ', response.assets[0].base64);
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

  const hideChoosePictureModal = () => {
    setChoosePictureModalVisible(false);
  };

  const handleDonePress = () => {
    // Perform any necessary actions before navigating to home
    // For example, you can save the user's profile information
    // and then navigate to the home screen.
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      <Image
        source={require('../assets/images/female.png')}
        style={styles.avatar}
        onPress={showChoosePictureModal}
      />

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <FontAwesomeIcon name="user" style={styles.icon} />
          <TextInput
            placeholder="First Name"
            style={styles.input}
            placeholderTextColor="black"
            fontSize={16}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesomeIcon name="user" style={styles.icon} />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            keyboardType="LastName"
            placeholderTextColor="black"
            fontSize={16}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <FontAwesomeIcon name="envelope" style={styles.icon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="black"
          keyboardType="email-address"
          fontSize={16}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputRow}>
        <FontAwesomeIcon name="venus-mars" style={styles.icon} />
        <TextInput
          placeholder="Gender"
          style={styles.input}
          placeholderTextColor="black"
          fontSize={16}
          value={gender}
          onChangeText={(text) => setGender(text)}
        />
      </View>

      <View style={styles.inputRow}>
        <FontAwesomeIcon name="phone" style={styles.icon} />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          keyboardType="phone-pad"
          placeholderTextColor="black"
          fontSize={16}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6146C6',
  },
  header: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 50,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 10,
    paddingLeft: 10,
    width: '40%',
    padding: 1,
    backgroundColor: '#ffff',
    color: 'white',
  },
  icon: {
    fontSize: 24,
    color: 'white',
    marginRight: -3,
  },
  doneButton: {
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    width: 200,
    height: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    marginLeft: 64,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  modalOption: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 18,
    color: '#007BFF',
  },
  closeButton: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default EditProfile;
