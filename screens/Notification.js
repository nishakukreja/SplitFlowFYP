import React from 'react';
import { FlatList, Text, View, StatusBar, Image, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';

const notifications = [
  {
    id: '1',
    title: 'This is a notification title 1',
    body: 'This is the notification content 1',
    timestamp: new Date(),
    source: require('../assets/images/female.png')
  },
  {
    id: '2',
    title: 'This is a notification title 2',
    body: 'This is the notification content 2',
    timestamp: new Date(),
    source: require('../assets/images/female.png')
  },
  {
    id: '3',
    title: 'This is a notification title 2',
    body: 'This is the notification content 2',
    timestamp: new Date(),
    source: require('../assets/images/femalee.png')
  },

  {
    id: '4',
    title: 'This is a notification title 2',
    body: 'This is the notification content 2',
    timestamp: new Date(),
    source: require('../assets/images/male.png')
  },
  {
    id: '5',
    title: 'This is a notification title 2',
    body: 'This is the notification content 2',
    timestamp: new Date(),
    source: require('../assets/images/malee.png')
  },
  {
    id: '6',
    title: 'This is a notification title 2',
    body: 'This is the notification content 2',
    timestamp: new Date(),
    source: require('../assets/images/femaleee.png')
  },
  {
    id: '7',
    title: 'This is a notification title 2',
    body: 'This is the notification content 2',
    timestamp: new Date(),
    source: require('../assets/images/maleee.png')
  },
  {
    id: '8',
    title: 'This is a notification title 2',
    body: 'This is the notification content 2',
    timestamp: new Date(),
    source: require('../assets/images/womannn.png')
  },
  {
    id: '9',
    title: 'This is a notification title 2',
    body: 'This is the notification content 2',
    timestamp: new Date(),
    source: require('../assets/images/man.png')
  },
];


const Notification = () => {
  const handleTitlePress = (title) => {
    // Do something with the selected title, such as navigating to a details screen
    console.log('Selected Title:', title);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTitlePress(item.title)}>
      <View style={styles.notificationItem}>
        <Image source={item.source} style={styles.avatar} />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationBody}>{item.body}</Text>
          <Text style={styles.timestamp}>{item.timestamp.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6146C6" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <ScrollView style={styles.notificationList}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#6146C6',
    paddingVertical: 35,
    paddingHorizontal: 120,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    alignItems:'center',
  },
  notificationList: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
  },
  notificationBody: {
    fontSize: 16,
    color: 'black',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default Notification;