import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const tasks = [
  // Your task data
];

const TaskItem = ({task}) => {
  const taskColor = getStatusColor(task.id);

  return (
    <View style={[styles.taskItem, {backgroundColor: taskColor}]}>
      <TouchableOpacity>
        <Icon
          name="ellipsis-vertical"
          size={14}
          color="black"
          marginLeft={293}
        />
      </TouchableOpacity>
      <Text style={styles.taskText}>{task.date}</Text>
      <Text style={styles.taskText}>{task.title}</Text>
      <Text style={styles.taskText}>{task.assignedBy}</Text>
      <Text style={styles.taskText}>{task.category}</Text>
      <Text style={styles.taskText}>{task.status}</Text>
    </View>
  );
};

const getStatusColor = id => {
  const colors = [
    '#82A0D8',
    '#F875AA',
    '#FFBB64',
    '#82A0D8',
    '#F875AA',
    '#FFBB64',
  ]; // Example colors
  return colors[id % colors.length]; // Use modulus operator to loop through colors
};

const ViewAllScreen = ({route}) => {
  const [selectedTab, setSelectedTab] = useState('Current');
  const {subtasks} = route.params;

  const handleTabPress = tabName => {
    setSelectedTab(tabName);
  };

  const filterSubtasksByStatus = status => {
    return subtasks.filter(subtask => subtask.status === selectedTab);
  };

  const filteredSubtasks = filterSubtasksByStatus(subtasks, selectedTab);

  console.log('subtrasks :', JSON.stringify(subtasks, null, 2));

  console.log(selectedTab);
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <Text style={styles.deadline}>
          Deadline: {new Date(item.deadline).toLocaleDateString()}
        </Text>

        {item.participants.length > 0 ? (
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsTitle}>Participants:</Text>
            {item.participants.map(participant => (
              <View key={participant._id} style={styles.participant}>
                <Image
                  source={{uri: participant.profileImage.url}}
                  style={styles.profileImage}
                />
                <Text>
                  {participant.firstName} {participant.lastName}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>No participants</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task List</Text>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'NEW' && styles.selectedTab]}
          onPress={() => handleTabPress('NEW')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'NEW' && styles.selectedTabText,
            ]}>
            NEW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Completed' && styles.selectedTab,
          ]}
          onPress={() => handleTabPress('COMPLETED')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'COMPLETED' && styles.selectedTabText,
            ]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Pending' && styles.selectedTab]}
          onPress={() => handleTabPress('Pending')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Pending' && styles.selectedTabText,
            ]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Cancelled' && styles.selectedTab,
          ]}
          onPress={() => handleTabPress('Cancelled')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Cancelled' && styles.selectedTabText,
            ]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={filteredSubtasks}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()} // Ensure _id is converted to string if needed
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
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
    color: 'black',
    fontFamily: 'serif',
  },
  status: {
    fontSize: 16,
    marginVertical: 4,
    color: 'black',
    fontFamily: 'serif',
  },
  price: {
    fontSize: 16,
    marginVertical: 4,
    color: 'black',
    fontFamily: 'serif',
  },
  deadline: {
    fontSize: 16,
    marginVertical: 4,
    color: 'black',
    fontFamily: 'serif',
  },
  participantsContainer: {
    marginVertical: 8,
    color: 'black',
    fontFamily: 'serif',
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
    fontFamily: 'serif',
  },
  participant: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
    fontFamily: 'serif',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
});

export default ViewAllScreen;
