import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';

const StripeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pay Online</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {/* Add your navigation or action here */}}>
          <Image 
            source={require('../assets/images/hbl.png')} 
            style={styles.cardLogo} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => {/* Add your navigation or action here */}}>
          <Image 
            source={require('../assets/images/easy.png')} 
            style={styles.cardLogo} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => {/* Add your navigation or action here */}}>
          <Image 
            source={require('../assets/images/jazz.jpg')} 
            style={styles.cardLogo} 
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6146C6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'serif',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  card: {
    marginBottom: 20,
    alignItems: 'center',
  },
  cardLogo: {
    width: 300,  // Adjust the width to fit your design
    height: 150, // Adjust the height to fit your design
    resizeMode: 'contain', // Ensure the image scales properly within its container
  },
});

export default StripeScreen;
