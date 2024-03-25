import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const TeamMemberInterface = () => {
  return (
    <View style={styles.container}>
      {/* Team Member Avatars */}
      <View style={styles.avatarContainer}>
        <Image source={require('../assets/images/male.png')} style={styles.avatar} />
        <Image source={require('../assets/images/female.png')} style={styles.avatar} />
        <Image source={require('../assets/images/female.png')} style={styles.avatar} />
        <Image source={require('../assets/images/male.png')} style={styles.avatar} />
      </View>
      
      {/* Add Member Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonIcon}>+</Text>
      </TouchableOpacity>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
 

});

export default TeamMemberInterface;
