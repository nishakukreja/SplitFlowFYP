import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, StyleSheet, Modal, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(route.params.user);
  const [addedImages, setAddedImages] = useState([]); // State to store added images
  const [removeModalVisible, setRemoveModalVisible] = useState(false);

  const albums = [
    { id: 1, name: 'Party shots', image: require('../assets/images/downloaddd.jpeg'), members: 4 },
    { id: 2, name: 'Photoshoots', image: require('../assets/images/images.jpeg'), members: 8 },
    { id: 3, name: 'Graduations', image: require('../assets/images/na.jpeg'), members: 12 },
    { id: 4, name: 'Nature', image: require('../assets/images/nature.jpeg'), members: 8 },
  ];

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const apiResponse = await axios.get(`192.168.0.116/user/get-profile/${route.params.user.userId}`);
      console.log('send otp success: ', apiResponse.data);
    } catch (error) {
      console.log('error in getting user profile: ', error.response.data);
      if (error.response.data.statusCode === 400) {
        Alert.alert('Oops', error.response.data.message);
      }
    }
  };

  const addImage = () => {
    launchImageLibrary({ mediaType: 'mixed' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets[0].uri) {
        const newImage = { id: addedImages.length + 1, uri: response.assets[0].uri };
        setAddedImages([...addedImages, newImage]); 
      } else {
        console.log('Invalid response from image picker: ', response);
      }
    });
  };

  const removeImage = (id) => {
    setAddedImages(addedImages.filter(image => image.id !== id)); // Remove the image from state
  };

  const openRemoveModal = () => {
    setRemoveModalVisible(true);
  };

  const closeRemoveModal = () => {
    setRemoveModalVisible(false);
  };

  const InspirationGalleryScreen = () => {
    return (
      <View style={styles.inspirationGalleryContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#6146C6' }]} onPress={addImage}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#6146C6' }]} onPress={openRemoveModal}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Inspiration Gallery</Text>
        </View>
        <View style={styles.albumsContainer}>
          {albums.map(album => (
            <View key={album.id} style={styles.album}>
              <Image source={album.image} style={styles.albumImage} />
              <Text style={styles.albumText}>{album.name}</Text>
              <Text style={styles.membersText}>{album.members} members</Text>
            </View>
          ))}
        </View>
        <ScrollView horizontal={true} contentContainerStyle={styles.imageContainer}>
          {/* Render added images */}
          {addedImages.map(image => (
            <TouchableOpacity key={image.id} onPress={() => removeImage(image.id)}>
              <Image source={{ uri: image.uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={removeModalVisible}
          onRequestClose={closeRemoveModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Item to Remove</Text>
              <FlatList
                data={addedImages}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => { removeImage(item.id); closeRemoveModal(); }}>
                    <Image source={{ uri: item.uri }} style={styles.modalImage} />
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeRemoveModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileDetails}>
          <Image source={{ uri: user.profile.url }} style={styles.profileImage} />
          <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
        <View style={styles.taskContainer}>
          <TouchableOpacity style={styles.taskButton}>
            <Text style={styles.taskButtonText}>3 Ongoing Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.taskButton}>
            <Text style={styles.taskButtonText}>8 Completed Task</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <InspirationGalleryScreen />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  profileContainer: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
  profileDetails: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },

  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black',
  },
  profileEmail: {
    fontSize: 16,
    color: 'black',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  taskButton: {
    backgroundColor: '#6146C6',
    borderRadius: 14,
    width: 110,
    marginHorizontal: 5,
    alignItems: 'center',
    padding: 10,
    height: 70,
  },
  taskButtonText: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  inspirationGalleryContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  albumsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  album: {
    width: '48%',
    marginVertical: 8,
  },
  albumImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  albumText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  membersText: {
    fontSize: 14,
    color: '#666',
    fontFamily:'serif',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems:'center',
    // justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft:68,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily:'serif'
  },
  imageContainer: {
    flexDirection: 'row',
    // alignItems: 'space-between', 
    justifyContent: 'space-between',
    padding: 1,
    
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10, // Space between images vertically
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
  closeButton: {
    backgroundColor: '#6146C6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Profile;
