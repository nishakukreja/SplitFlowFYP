import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Modal, Pressable, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const EditProfile = () => {
  const [name, setName] = useState('nisha kukreja');
  const [email, setEmail] = useState('nishakukreja500@gmail.com');
  const [phone, setPhone] = useState('03127030692');
  const [gender, setGender] = useState('female');
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [choosePictureModalVisible, setChoosePictureModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const handleSave = () => {
    // save the profile changes to some backend service
  };

  const openGallery = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log("image data: ", response.assets[0].base64);
        setProfileImage(response.uri);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openCamera = async () => {
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        saveToPhotos: true,
      });

      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        setProfileImage(response.uri);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showChoosePictureModal = () => {
    setChoosePictureModalVisible(true);
  };

  const hideChoosePictureModal = () => {
    setChoosePictureModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require('../assets/images/female.png')}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>User Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.picker}
          selectedValue={gender}
          onValueChange={setGender}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        <Button
          title="Save"
          onPress={handleSave}
          color="#6146C6"
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Choose an option:</Text>
          <View style={styles.modalOptions}>
            <Button title="Choose from Gallery" onPress={openGallery} color="#6146C6" />
            <Button title="Take a Photo" onPress={openCamera} color="#6146C6" />
            <Button title="Close" onPress={() => setModalVisible(false)} color="#6146C6" />
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#fff',
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
  },
  form: {
    flex: 2,
    padding: 20,
    color: 'black',
    fontFamily: 'serif',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
    fontFamily: 'serif',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: 'black',
    fontFamily: 'serif',
  },
  picker: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'serif',
  },
  button: {
    fontSize: 18,
    marginVertical: 20,
    color: '#6146C5',
    fontFamily: 'serif',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 9,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'serif',
  },
  modalOptions: {
    width: '100%',
    marginBottom: 17,
    color: '#6146C6'
  },
});

export default EditProfile;
