import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Button,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ProgressCircle} from 'react-native-svg-charts';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import Categories from '../constants/categories';
import {allowedAddresses} from '../IPConfig';
import {useSelector} from 'react-redux';
import {getAuthToken} from '../redux/slices/UserSlice';
import {
  BASE_URL,
  createPaymentIntent,
  getAllSubTasksByGroupTask,
  getAllUserGroupTasks,
  updateSubTaskProgress,
} from '../services/api';
import Modal from 'react-native-modal';
import {FlatList} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {useStripe} from '@stripe/stripe-react-native';

const TaskDetailScreen = () => {
  const token = useSelector(getAuthToken);
  const [error, setError] = useState('');
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const [dataTask, setDataTask] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedChip, setSelectedChip] = useState('ongoing');
  const [filteredItems, setFilteredItems] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedGroupTask, setSelectedGroupTask] = useState();

  const {groupTask} = route.params;

  console.log(
    'this is the goruptaskl from params',
    JSON.stringify(groupTask, null, 2),
  );

  useEffect(() => {
    filterItems(selectedChip);
  }, [selectedChip]);

  const categoryToStatusMap = {
    new: 'NEW',
    'in progress': 'IN_PROGRESS',
    pending: 'PENDING',
    completed: 'COMPLETED',
    delivered: 'DELIVERED',
  };

  const filterItems = categoryName => {
    // Ensure groupTask is an object and has subTasks
    if (!groupTask || !Array.isArray(groupTask.subTasks)) {
      setFilteredItems([]);
      return;
    }

    // Map the selected chip name to the corresponding status
    const status = categoryToStatusMap[categoryName];

    // Filter the subtasks based on the mapped status
    const filtered = groupTask.subTasks.filter(subTask => {
      // If no specific status is set, return true for all
      if (!status || status === 'all') {
        return true;
      }
      // Only show subtasks that match the selected status
      return subTask.status === status;
    });

    setFilteredItems(filtered);
  };

  console.log('filtered item', JSON.stringify(filteredItems, null, 2));

  const [subTasks, setSubTasks] = useState([]);
  const updateProgress = async (id, progress, status) => {
    console.log('Sending request to update progress');
    console.log('Request data:', {progress, status});
    const response = await updateSubTaskProgress(id, progress, status, token); // Call the API function with token
    console.log('Response data:', response);

    if (response && response.success) {
      console.log(
        'this is the updatedTask',
        JSON.stringify(response?.updatedGroupTask?._id, null, 2),
      );
      if (response.success) {
        setModalVisible(false);
        navigation.navigate('Home');
      }

      // if (updatedTask?._id === id) {
      //   setSubTasks(prevSubTasks =>
      //     prevSubTasks.map(subTask =>
      //       subTask._id === id
      //         ? {
      //             ...subTask,
      //             progress: updatedTask.progress,
      //             status: updatedTask.status,
      //           }
      //         : subTask,
      //     ),
      //   );
      //   Alert.alert(
      //     'Success',
      //     response.message || 'Task progress updated successfully.',
      //     [{text: 'OK', onPress: () => navigation.navigate('Home')}], // Navigate to Home screen
      //   );
      // } else {
      //   Alert.alert('Error', 'The returned ID does not match the task ID.');
      // }
    } else {
      console.error(
        'Error fetching items:',
        response.message || 'Unknown error',
      );
      Alert.alert('Error', response.message || 'Failed to update progress.');
    }
  };

  const handleChipPress = chipName => {
    // Directly use the name as defined in categories
    setSelectedChip(chipName);
    filterItems(chipName);
  };

  const handleUpdate = (id, status, progress) => {
    let updatedProgress = progress;

    // Adjust progress based on status
    if (status.toLowerCase() === 'delivered') {
      updatedProgress = 100;
    } else if (status.toLowerCase() === 'completed') {
      updatedProgress = 100;
    } else if (status.toLowerCase() === 'pending') {
      updatedProgress = Math.max(0, Math.min(progress, 50));
    } else if (status.toLowerCase() === 'in_progress') {
      updatedProgress = Math.max(50, Math.min(progress, 89));
    } else if (status.toLowerCase() === 'new') {
      updatedProgress = 0;
    } else {
      console.warn(`Unhandled status: ${status}`);
      updatedProgress = progress;
    }

    setSubTasks(prevSubTasks => {
      // Ensure prevSubTasks is an array
      if (!Array.isArray(prevSubTasks)) {
        console.warn('prevSubTasks is not an array');
        return [];
      }

      return prevSubTasks.map(subTask =>
        subTask?._id === id
          ? {...subTask, status, progress: updatedProgress}
          : subTask,
      );
    });

    updateProgress(id, updatedProgress, status);
  };

  const getUniqueParticipantsCount = subTasks => {
    // Combine participants from all subtasks into a single array
    let allParticipants = [];
    subTasks.forEach(subtask => {
      allParticipants = allParticipants?.concat(subtask.participants);
    });

    // Create a Set to get unique participants based on their _id
    const uniqueParticipants = new Set(
      allParticipants?.map(participant => participant?._id),
    );

    return uniqueParticipants.size;
  };

  const participantCount = selectedGroupTask
    ? getUniqueParticipantsCount(selectedGroupTask?.subTasks)
    : 0;

  const ProgressBar = ({progress, tasksCompleted, teamMembers}) => {
    return (
      <View
        style={{
          backgroundColor: '#756AB6',
          borderRadius: 18,
          overflow: 'hidden',
          width: 333,
          height: 250,
          position: 'relative',
          marginBottom: 399,
        }}>
        <Text
          style={{
            marginLeft: 161,
            fontFamily: 'serif',
            fontWeight: 'bold',
            marginTop: 40,
            fontSize: 22,
            color: 'black',
          }}>
          {groupTask?.title}
        </Text>
        <ProgressCircle
          progress={groupTask?.progress} // This line reflects the updated progress
          progressColor="#AC87C5"
          strokeWidth={20}
          style={{
            width: 107.5,
            height: 110,
            position: 'absolute',
            marginLeft: 39,
            top: 30,
            color: 'black',
          }}
        />
        <View
          style={{
            width: 107.5,
            height: 110,
            backgroundColor: '#AC87C5',
            borderRadius: 50,
            position: 'absolute',
            marginLeft: 39,
            top: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontFamily: 'serif',
              fontSize: 18,
              color: 'black',
            }}>
            {Math.round(groupTask?.progress)}%
          </Text>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: 12,
            fontFamily: 'serif',
            position: 'absolute',
            left: 150,
            top: 100,
            color: 'black',
            fontSize: 15,
          }}>
          Total sub tasks: {groupTask?.subTasks?.length}
        </Text>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            color: 'black',
            marginLeft: 121,
            fontWeight: 'bold',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 26,
              flexWrap: 'wrap',
              color: 'black',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                fontWeight: 'bold',
                fontFamily: 'serif',
              }}>
              Number Of Participants : {participantCount}
            </Text>
            {participantCount === 0 ? (
              <></>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate('UserScreen', {groupTask})}>
                <Text style={{backgroundColor: 'white'}}>
                  Get Participant Details
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const categories = [
    {name: 'New', icon: 'star', color: 'black'},
    {name: 'In Progress', icon: 'hourglass', color: 'black'},
    {name: 'Pending', icon: 'hourglass', color: 'black'},
    {name: 'Completed', icon: 'check-circle', color: 'black'},
    {name: 'Delivered', icon: 'truck', color: 'black'},
  ];

  const handlePayment = async amount => {
    try {
      // Make an API call to your backend to create a PaymentIntent
      const response = await createPaymentIntent(token, amount);
      console.log(response);

      const {clientSecret, ephemeralKey, customer} = response.data;

      // Initialize the payment sheet
      const {error} = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        customerEphemeralKeySecret: ephemeralKey,
        customerId: customer,
        merchantDisplayName: 'Your Merchant Name',
      });

      if (!error) {
        // Present the payment sheet to the customer
        const {error: presentError} = await presentPaymentSheet();

        if (presentError) {
          Alert.alert('Payment failed', presentError.message);
        } else {
          Alert.alert('Payment successful', 'Your payment was successful!');
        }
      } else {
        Alert.alert('Payment sheet initialization failed', error.message);
      }
    } catch (err) {
      console.error('Error in payment processing:', err);
      Alert.alert('Payment error', 'An error occurred during payment.');
    }
  };

  const getSubTaskByID = (id, item) => {
    if (Array.isArray(item)) {
      setSubTasks(item);
    } else if (item) {
      setSubTasks([item]); // Wrap item in an array if it's not an array
    } else {
      console.warn('Item is undefined or null');
      setSubTasks([]);
    }
    setModalVisible(true);
  };

  const statusHierarchy = [
    'NEW',
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'DELIVERED',
  ];

  const getHigherStatusOptions = currentStatus => {
    const currentIndex = statusHierarchy.indexOf(currentStatus.toUpperCase());
    if (currentIndex === -1) {
      return []; // Return an empty array if the current status is invalid
    }
    return statusHierarchy.slice(currentIndex + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );
          setCarouselIndex(newIndex);
        }}>
        <View style={styles.carouselItem}>
          <Text>Progress tracking</Text>
          <ProgressBar
            progress={0.7}
            tasksCompleted={5}
            teamMembers={[
              {avatar: require('../assets/images/female.png')},
              {avatar: require('../assets/images/malee.png')},
              {avatar: require('../assets/images/maleee.png')},
              {avatar: require('../assets/images/femaleee.png')},
            ]}
          />
        </View>
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}>
        <TouchableOpacity
          key={'dssd'}
          style={[styles.categoryChip]}
          onPress={() => {
            navigation.navigate('NewSubTask', {
              groupTask: groupTask,
            });
          }}>
          <Icon
            name={'plus'}
            size={15}
            color={'black'}
            style={styles.categoryIcon}
          />
          <Text style={{color: 'black'}}>Create Sub Task</Text>
        </TouchableOpacity>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              selectedChip === category.name.toLowerCase() && {
                backgroundColor: '#6146C6',
              },
            ]}
            onPress={() => handleChipPress(category.name.toLowerCase())}>
            <Icon
              name={category.icon}
              size={15}
              color={
                selectedChip === category.name.toLowerCase()
                  ? '#FFFFFF'
                  : category.color
              }
              style={styles.categoryIcon}
            />
            <Text
              style={{
                color:
                  selectedChip === category.name.toLowerCase()
                    ? '#FFFFFF'
                    : category.color,
              }}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Render filtered items */}
      <ScrollView style={styles.taskListContainer}>
        {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
          filteredItems?.map((item, index) => (
            <View key={index} style={styles.taskItemContainer}>
              <TouchableOpacity onPress={() => getSubTaskByID(item._id, item)}>
                <Text style={styles.taskTitle}>{item?.title}</Text>
                <Text style={styles.taskProgress}>
                  Progress: {Math.round(item?.progress)}%
                </Text>
              </TouchableOpacity>
              {item.status === 'COMPLETED' && (
                <TouchableOpacity onPress={() => handlePayment(item.price)}>
                  <Text style={{ color:'black',fontFamily:'serif'}}>Pay</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <View style={styles.noTaskContainer}>
            <Image
              source={require('../assets/images/task.png')} // Ensure the path is correct
              style={styles.noTaskImage}
            />
            <Text style={styles.noTaskText}>No tasks available</Text>
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 300,
                padding: 20,
                height: 320,
                marginTop: 70,
                backgroundColor: 'white',
                borderRadius: 15,
                borderWidth: 1.5,
                borderColor: '#E0E0E0',

                color: 'black',
              }}>
              <Text
                style={{
                  fontSize: 28,
                  marginBottom: 10,
                  color: 'black',
                  fontWeight: 'bold',
                  alignItems: 'center',
                  marginLeft: 55,
                  marginTop: 12,
                }}>
                Sub-Tasks
              </Text>

              {error ? (
                <Text style={{color: 'red'}}>{error}</Text>
              ) : (
                <View>
                  {Array.isArray(subTasks) ? (
                    subTasks.map(task => (
                      <View key={task._id}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 10,
                            color: 'black',
                          }}>
                          {task.title}
                        </Text>
                        {/* Centered subtask status */}
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: 'gray',
                            marginBottom: 20,
                          }}>
                          Status: {task.status}
                        </Text>

                        {/* Update Status section with margin */}
                        <Text
                          style={{
                            fontFamily: 'serif',
                            color: 'black',
                            marginBottom: 10,
                            textAlign: 'center',
                          }}>
                          Update Status
                        </Text>
                        <View style={{marginBottom: 0}}>
                          {getHigherStatusOptions(task.status).map(status => (
                            <Pressable
                              key={status}
                              onPress={() =>
                                handleUpdate(task._id, status, task.progress)
                              }
                              style={[
                                styles.statusOptionButton,
                                {marginVertical: 5},
                              ]}>
                              <Text style={{color:'black'}}>
                                {status}
                              </Text>
                            </Pressable>
                          ))}
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text style={{fontFamily: 'serif', textAlign: 'center'}}>
                      No subtasks available
                    </Text>
                  )}
                </View>
              )}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#6146C6',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginTop: 5,
                  fontFamily: 'serif',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    width: 378,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: -370,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    marginBottom: 20,
    height: 50,
  },
  categoryIcon: {
    marginRight: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
  },
  taskItem: {
    padding: 7,
    marginBottom: 2,
    borderRadius: 8,
  },
  taskText: {
    color: 'black',
    fontFamily: 'serif',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    height: 9,
  },
  itemContainer: {
    padding: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: 'black',
  },
  itemDetailsContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Distribute space between item details and Pay button
    alignItems: 'center',
  },
  payButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 20,
    color:'#6146C6',
    marginLeft: 25,
    alignItems: 'center',
    fontFamily: 'serif',
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

  taskListContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 200,
    // backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
  },
  taskItemContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 0,
    elevation: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
    marginBottom: 5,
  },
  taskProgress: {
    fontSize: 15,
    color: 'gray',
    fontFamily: 'serif',
  },
  noTaskText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'serif',
  },
  noTaskContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  noTaskImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
});

export default TaskDetailScreen;
