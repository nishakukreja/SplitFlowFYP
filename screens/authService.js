import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null) {
      return token;
    } else {
      // Handle the case where the token does not exist
      throw new Error('No auth token found');
    }
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    throw error; // You can choose to throw the error or handle it differently
  }
};
