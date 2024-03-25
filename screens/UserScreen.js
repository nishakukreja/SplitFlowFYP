import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const UserScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* First Row */}
      <View style={styles.rowContainer}>
        {/* First User */}
        <View style={styles.userContainer}>
          {/* User Avatar */}
          <Image source={require('../assets/images/womannn.png')} style={styles.avatar} />
          
          {/* User Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.username}>Nisha</Text>
            <Text style={styles.status}>Active</Text>
          </View>
          
          {/* Message Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
        
        {/* Second User */}
        <View style={styles.userContainer}>
          {/* User Avatar */}
          <Image source={require('../assets/images/femaleee.png')} style={styles.avatar} />
          
          {/* User Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.username}>Ameesha</Text>
            <Text style={styles.status}>Away</Text>
          </View>
          
          {/* Message Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Second Row */}
      <View style={styles.rowContainer}>
        {/* Third User */}
        <View style={styles.userContainer}>
          {/* User Avatar */}
          <Image source={require('../assets/images/malee.png')} style={styles.avatar} />
          
          {/* User Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.username}>Sandesh</Text>
            <Text style={styles.status}>Busy</Text>
          </View>
          
          {/* Message Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
        
        {/* Fourth User */}
        <View style={styles.userContainer}>
          {/* User Avatar */}
          <Image source={require('../assets/images/womann.png')} style={styles.avatar} />
          
          {/* User Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.username}>Mahek</Text>
            <Text style={styles.status}>Offline</Text>
          </View>
          
          {/* Message Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Third Row */}
      <View style={styles.rowContainer}>
        {/* Fifth User */}
        <View style={styles.userContainer}>
          {/* User Avatar */}
          <Image source={require('../assets/images/femalee.png')} style={styles.avatar} />
          
          {/* User Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.username}>Anaya</Text>
            <Text style={styles.status}>Available</Text>
          </View>
          
          {/* Message Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userContainer: {
    alignItems: 'center',
    width: '45%', // Adjust the width to accommodate three users in a row
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
  },
  status: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'serif',
  },
  button: {
    backgroundColor: '#6146C6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
});

export default UserScreen;
