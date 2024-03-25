import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const tasks = [
  { id: 1, date: "Sep 21, 2020", title: "Create Project Site Map", assignedBy: "Andrew", category: "Design", status: "In Progress" },
  // Add more tasks as needed
  { id: 2, date: "Sep 21, 2020", title: "Create Project Site Map", assignedBy: "Andrew", category: "Design", status: "In Progress" },
  { id: 3, date: "Sep 21, 2020", title: "Create Project Site Map", assignedBy: "Andrew", category: "Design", status: "In Progress" },
  { id: 4, date: "Sep 21, 2020", title: "Create Project Site Map", assignedBy: "Andrew", category: "Design", status: "In Progress" },
  { id: 5, date: "Sep 21, 2020", title: "Create Project Site Map", assignedBy: "Andrew", category: "Design", status: "In Progress" },
  { id: 6, date: "Sep 21, 2020", title: "Create Project Site Map", assignedBy: "Andrew", category: "Design", status: "In Progress" },
];

const TaskItem = ({ task }) => {
  const taskColor = getStatusColor(task.id);

  return (
    <View style={[styles.taskItem, { backgroundColor: taskColor }]}>
      <TouchableOpacity>
        <Icon name="ellipsis-vertical" size={14} color="black" marginLeft={293} />
      </TouchableOpacity>
      <Text style={styles.taskText}>{task.date}</Text>
      <Text style={styles.taskText}>{task.title}</Text>
      <Text style={styles.taskText}>{task.assignedBy}</Text>
      <Text style={styles.taskText}>{task.category}</Text>
      <Text style={styles.taskText}>{task.status}</Text>
    </View>
  );
};

const getStatusColor = (id) => {
  const colors = ['#82A0D8', '#F875AA', '#FFBB64', '#82A0D8', '#F875AA', '#FFBB64']; // Example colors
  return colors[id % colors.length]; // Use modulus operator to loop through colors
};

const ViewAllScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Current');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task List</Text>
      </View>
      
      {/* Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Current' && styles.selectedTab]}
          onPress={() => handleTabPress('Current')}
        >
          <Text style={[styles.tabText, selectedTab === 'Current' && styles.selectedTabText]}>Current</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Done' && styles.selectedTab]}
          onPress={() => handleTabPress('Done')}
        >
          <Text style={[styles.tabText, selectedTab === 'Done' && styles.selectedTabText]}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Pending' && styles.selectedTab]}
          onPress={() => handleTabPress('Pending')}
        >
          <Text style={[styles.tabText, selectedTab === 'Pending' && styles.selectedTabText]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Cancelled' && styles.selectedTab]}
          onPress={() => handleTabPress('Cancelled')}
        >
          <Text style={[styles.tabText, selectedTab === 'Cancelled' && styles.selectedTabText]}>Cancelled</Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={item => item.id.toString()}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
  },
  taskItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  taskText: {
    color: 'black',
    fontFamily: 'serif',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 50,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 9,
    marginRight: 10,
  },
  selectedTab: {
    backgroundColor: '#6146C6',
  },
  tabText: {
    color: 'black',
    fontFamily: 'serif',
  },
  selectedTabText: {
    color: 'white',
  },
});

export default ViewAllScreen;
