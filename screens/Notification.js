import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon

// Sample data for the notifications
const notifications = [
  {
    id: '1',
    title: 'Two new tasks were added',
    icon: 'calendar',
    date: '2024-02-04',
  },
  {
    id: '2',
    title: 'Task deadline increased',
    icon: 'envelope',
    date: '2024-03-01',
  },
  {
    id: '3',
    title: 'Completed your task',
    icon: 'group',
    date: '2024-03-10',
  },
];

const Notification = () => {
  // State for the notifications
  const [notificationList, setNotificationList] = useState(notifications);

  // Function to render each notification item
  const renderItem = ({ item }) => {
    // Convert the date string to a JavaScript Date object
    const dateObject = new Date(item.date);

    // Format the date as a string in the desired format
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <View style={styles.notificationItem}>
        {/* Use Icon component instead of Image */}
        <Icon name={item.icon} size={40} style={styles.notificationIcon} />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationDate}>{formattedDate}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notificationList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationIcon: {
    fontSize: 25,  
    marginRight: 10,
    color: '#6146C6', 
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDate: {
    fontSize: 14,
    color: '#888',
  },
});

export default Notification;
