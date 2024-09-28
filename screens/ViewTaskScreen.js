import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {getAuthToken, getUserData} from '../redux/slices/UserSlice';
import {getAllSubTasks, getAllUserGroupTasks} from '../services/api';

const formatDate = isoString => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(isoString).toLocaleDateString(undefined, options);
};

const ProjectList = () => {
  const [groupTask, setSelectedGroupTask] = useState([]);
  // const [filteredSubtasks, setFilteredSubtasks] = useState([]);
  const userData = useSelector(getUserData);
  const token = useSelector(getAuthToken);

  const myID = userData._id;

  const getdata = async () => {
    try {
      const response = await getAllUserGroupTasks(token);
      // console.log(JSON.stringify(response, null, 2));
      setSelectedGroupTask(response?.data); // Set the data to state
    } catch (error) {
      console.error('Error fetching group tasks:', error);
    }
  };

  const getSubTasksData = async () => {
    try {
      const response = await getAllSubTasks(token);

      if (response.success) {
        // Ensure participants and subtasks exist using optional chaining
        const participants = response.data?.participants || [];
        const subtasks = response || [];

        console.log(
          'This is the substasks',
          JSON.stringify(subtasks.data, null, 2),
        );

        // Filter subtasks where the user is a participant
        const userSubtasks = subtasks.filter(subtask =>
          subtask.participants?.some(participant => participant._id === myID),
        );

        // Update state
        // setFilteredSubtasks(userSubtasks);
      } else {
        console.error(
          'Failed to fetch subtasks:',
          response.message || 'Unknown error',
        );
      }
    } catch (error) {
      console.error('Error fetching subtasks:', error.message || error);
    }
  };
  // Example function to filter subtasks
  const filterSubtasksByParticipant = (subtasks, userId) => {
    // Ensure subtasks is an array and userId is defined
    if (!Array.isArray(subtasks) || !userId) {
      console.error('Invalid subtasks or userId');
      return [];
    }
    return subtasks.filter(subtask => subtask.participants.includes(myID));
  };

  // Example usage
  const currentUserId = 'user123'; // Replace with your actual user ID
  const subtasks = [
    {id: 1, participants: ['user123', 'user456']},
    {id: 2, participants: ['user789']},
    {id: 3, participants: ['user123']},
  ];

  const filteredSubtasks = filterSubtasksByParticipant(subtasks, currentUserId);

  console.log(filteredSubtasks);

  useEffect(() => {
    getSubTasksData();
  }, []);

  useEffect(() => {
    getdata();
  }, []);

  // Filter tasks for "Created Task" (non-completed tasks)
  const createdTasks = groupTask.filter(task => task.status !== 'Completed');

  const renderItem = ({item}) => (
    <View style={styles.projectCard}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>
          Created At: {formatDate(item.createdAt)}
        </Text>
        <Text style={styles.dateText}>
          Deadline: {formatDate(item.deadline)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={createdTasks}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

const CompletedList = () => {
  const [groupTask, setSelectedGroupTask] = useState([]);
  const token = useSelector(getAuthToken);

  const getdata = async () => {
    try {
      const response = await getAllUserGroupTasks(token);
      // console.log(JSON.stringify(response, null, 2));
      setSelectedGroupTask(response?.data); // Set the data to state
    } catch (error) {
      console.error('Error fetching group tasks:', error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  // Filter tasks for "Performed Task" (completed tasks)
  const completedTasks = groupTask.filter(task => task.status === 'Completed');

  const renderItem = ({item}) => (
    <View style={styles.projectCard}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>
          Created At: {formatDate(item.createdAt)}
        </Text>
        <Text style={styles.dateText}>
          Deadline: {formatDate(item.deadline)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTasks}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

const renderScene = SceneMap({
  first: ProjectList,
  second: CompletedList,
});

export default function ViewTaskScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Created Task'},
    {key: 'second', title: 'Performed Task'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: 'white'}}
          style={{backgroundColor: 'white'}}
          activeColor="purple"
          inactiveColor="black"
        />
      )}
    />
  );
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  projectCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  dateRow: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  dateText: {
    color: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  greenBox: {
    backgroundColor: '#d0f0c0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  purpleBox: {
    backgroundColor: '#e0aaff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greyBox: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 24,
    marginRight: 10,
  },
  circle: {
    fontSize: 24,
    marginRight: 10,
  },
  details: {
    flexDirection: 'column',
  },
});
