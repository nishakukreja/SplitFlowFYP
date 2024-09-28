import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card, Avatar} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {allowedAddresses, formatUnderscoredString} from '../IPConfig';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
// import BottomTabs from '../navigation/BottomTabs';
const bellIconName = 'bell';

import {setAllCategories} from '../redux/slices/CategoriesSlice';
import {getAuthToken, getUserData} from '../redux/slices/UserSlice';
import {getAllSubTasks, joinSubTask} from '../services/api';
import Modal from 'react-native-modal';

const ProgressBar = ({
  progress,
  tasksCompleted,
  title,
  subTasks,
  groupTask,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('TaskDetailScreen', {groupTask});
  };

  console.log('this is the grouptask data', groupTask);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          backgroundColor: '#756AB6',
          borderRadius: 18,
          overflow: 'hidden',
          width: 333,
          height: 180,
          position: 'relative',
          marginBottom: 399,
        }}>
        <Text
          style={{
            marginLeft: 151,
            fontFamily: 'serif',
            position: 'absolute',
            fontWeight: 'bold',
            marginTop: 22,
            fontSize: 22,
          }}>
          {title}
        </Text>

        <ProgressCircle
          progress={progress}
          progressColor="#AC87C5"
          strokeWidth={10}
          style={{
            width: 107.5,
            height: 110,
            position: 'absolute',
            marginLeft: 39,
            top: 30,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: 12,
            fontFamily: 'serif',
            position: 'absolute',
            left: 160,
            top: 80,
          }}>
          {Math.round(progress)}%
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: 12,
            fontFamily: 'serif',
            position: 'absolute',
            left: 160,
            top: 100,
            fontSize: 12,
          }}>
          Total Subtasks: {subTasks.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const Home = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const userData = useSelector(getUserData);
  const token = useSelector(getAuthToken);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.categories);
  const [particpantModal, setParticipantModal] = useState(false);
  const [subtaskID, setSubTaskID] = useState();

  const [myAllGroupTasks, setMyAllGroupTasks] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await getAllCategories();
  //       await getMyGroupTasks();
  //       await ViewgetAllSubTasks();
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [particpantModal]);

  const fetchData = useCallback(async () => {
    try {
      await getAllCategories();
      await getMyGroupTasks();
      await ViewgetAllSubTasks();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []); // Empty dependency array means this function doesn't rely on external variables

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Fetch data when the screen is focused

      // If you need to clean up something, return a cleanup function
      return () => {
        // Cleanup code if necessary
      };
    }, [particpantModal]), // Dependency array includes particpantModal
  );

  const ViewgetAllSubTasks = async () => {
    try {
      const response = await getAllSubTasks(token);
      setSubtasks(response.data);
      // console.log('', JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Error fetching subtasks:', error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${allowedAddresses.ip}/category/get-all-categories`,
      );
      dispatch(setAllCategories(response.data.data));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getMyGroupTasks = async () => {
    try {
      const response = await axios.get(
        `${allowedAddresses.ip}/group-task/get-my-group-tasks`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      setMyAllGroupTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching group tasks:', error);
    }
  };

  const handleCategoryPress = title => {
    setSelectedCategoryIndex(title === selectedCategoryIndex ? null : title);
  };

  const joinTheSubTaskID = async () => {
    const response = await joinSubTask(token, subtaskID);
    setParticipantModal(false);
    // console.log(response);
  };

  const toggleModal = subtaskID => {
    setSubTaskID(subtaskID);
    setParticipantModal(!particpantModal);
  };
  const filteredSubtasks = subtasks.filter(
    subtask => subtask.status !== 'COMPLETED',
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleModal(item?._id)}>
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
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text
              style={{color: 'black', fontFamily: 'serif', fontWeight: 'bold'}}>
              Hello, {userData?.firstName}
            </Text>

            <View style={styles.iconsContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}>
                <FontAwesome
                  name="bell"
                  size={24}
                  marginLeft={12}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.replace('Profile', {user: userData})}>
                <Image
                  source={require('../assets/images/female.png')}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.subHeader}>
            Let's complete your today's tasks!
          </Text>
        </View>
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
          {myAllGroupTasks.map((groupTask, index) => (
            <View key={index} style={styles.carouselItem}>
              <ProgressBar
                progress={groupTask.progress}
                tasksCompleted={7}
                subTasks={groupTask.subTasks}
                title={groupTask.title}
                groupTask={groupTask}
              />
            </View>
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}>
          <TouchableOpacity
            onPress={() => handleCategoryPress(null)}
            style={[
              styles.categoryChip,
              selectedCategoryIndex === null && styles.selectedCategory,
            ]}>
            <Text>All</Text>
          </TouchableOpacity>
          {categories.map(category => (
            <TouchableOpacity
              key={category._id}
              style={[
                styles.categoryChip,
                category.title === selectedCategoryIndex &&
                  styles.selectedCategory,
              ]}
              onPress={() => handleCategoryPress(category.title)}>
              <Text
                style={[
                  styles.categoryChipText,
                  category.title === selectedCategoryIndex
                    ? {color: '#FFF', fontWeight: 'bold'}
                    : {color: '#000', fontWeight: 'bold'},
                ]}>
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Suggested Tasks</Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('ViewAllScreen', {subtasks})}>
            <Text style={styles.viewAllButtonText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            height: 240,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() => {
              toggleModal(filteredSubtasks[0]?._id);
            }}
            style={{
              backgroundColor: '#F875AA',
              width: '48.5%',
              height: '100%',
            }}>
            <Text style={styles.textColorStyle}>
              Title: {filteredSubtasks[0]?.title}
            </Text>
            <Text style={styles.textColorStyle} numberOfLines={1}>
              description: {filteredSubtasks[0]?.description}
            </Text>
            <Text style={styles.textColorStyle}>
              Status: {formatUnderscoredString(filteredSubtasks[0]?.status)}
            </Text>
            <Text style={styles.textColorStyle}>
              Deadline:{' '}
              {new Date(filteredSubtasks[0]?.deadline).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'white',
              width: '48.5%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => {
                toggleModal(filteredSubtasks[1]?._id);
              }}
              style={{
                backgroundColor: '#FFBB64',
                width: '100%',
                height: '48.5%',
              }}>
              <Text style={styles.textColorStyle}>
                Title: {filteredSubtasks[1]?.title}
              </Text>
              <Text style={styles.textColorStyle} numberOfLines={1}>
                description: {filteredSubtasks[1]?.description}
              </Text>
              <Text style={styles.textColorStyle}>
                Status:{formatUnderscoredString(filteredSubtasks[1]?.status)}
              </Text>
              <Text style={styles.textColorStyle}>
                Deadline:{' '}
                {new Date(filteredSubtasks[1]?.deadline).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleModal(filteredSubtasks[2]?._id);
              }}
              style={{
                backgroundColor: '#82A0D8',
                width: '100%',
                height: '48.5%',
              }}>
              <Text style={styles.textColorStyle}>
                Title: {filteredSubtasks[2]?.title}
              </Text>
              <Text style={styles.textColorStyle} numberOfLines={1}>
                description: {filteredSubtasks[2]?.description}
              </Text>
              <Text style={styles.textColorStyle}>
                Status: {formatUnderscoredString(filteredSubtasks[2]?.status)}
              </Text>

              <Text style={styles.textColorStyle}>
                Deadline:{' '}
                {new Date(filteredSubtasks[2]?.deadline).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <FlatList
          data={filteredSubtasks}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        /> */}

        <TodayTasks />
      </View>

      <Modal
        isVisible={particpantModal}
        onBackdropPress={() => setParticipantModal(false)}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Do you want to become a participant?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={joinTheSubTaskID}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setParticipantModal(false)}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const TodayTasks = () => {
  const navigation = useNavigation();

  const handleViewAllPress = () => {
    navigation.navigate('AllTaskScreen');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, {marginBottom: 20, marginTop: 5}]}>
        <Text style={styles.headerText}>Today Tasks</Text>
        <TouchableOpacity onPress={handleViewAllPress}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.greenBox}>
          <Text style={styles.checkmark}>✓</Text>
          <View style={styles.details}>
            <Text style={{color: 'black', fontFamily: 'serif'}}>
              Photography
            </Text>
            <Text style={{color: 'black', fontFamily: 'serif'}}>Tomorrow</Text>
          </View>
        </View>
        <View style={styles.purpleBox}>
          <Text style={styles.circle}>●</Text>
          <View style={styles.details}>
            <Text style={{color: 'black', fontFamily: 'serif'}}>
              Choreographer
            </Text>
            <Text style={{color: 'black', fontFamily: 'serif'}}>Sep 7</Text>
          </View>
        </View>
        <View style={styles.greyBox}>
          <Text style={styles.circle}>●</Text>
          <View style={styles.details}>
            <Text style={{color: 'black', fontFamily: 'serif'}}>
              Decoration
            </Text>
            <Text style={{color: 'black', fontFamily: 'serif'}}>Sep 8</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  textColorStyle: {
    color: 'black',
    fontFamily: 'serif',
  },
  header: {
    marginBottom: 7,
    color: 'black',
    fontFamily: 'serif',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -19,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  subtitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal',
    // marginTop: 5,
    // fontFamily: 'serif',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // marginTop: 10,
  },
  date: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'serif',
  },

  progress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  progressText: {
    marginLeft: 12,
    fontFamily: 'serif',
    position: 'absolute',
  },
  percentage: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'normal',
  },

  subHeader: {
    marginLeft: -390,
    marginRight: 109,
    fontFamily: 'serif',
    color: 'black',
    marginTop: -6,
    marginBottom: -35,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: 12,
  },
  carouselItem: {
    width: 353,
    marginRight: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -399,
    marginTop: 2,
  },
  newTaskButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 19,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  viewAll: {
    color: '#6146C6',
    fontFamily: 'serif',
    fontWeight: 'bold',
    marginBottom: -4,
  },
  projectContainer: {
    flexDirection: 'row',
  },
  projectBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  leftBox: {
    flex: 1.2, // Adjust the flex to make the left box larger
  },
  rightBoxes: {
    flex: 1,
    marginLeft: 15,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  priority: {
    color: 'red',
  },
  dueDate: {
    marginTop: 8,
    color: '#888',
  },
  status: {
    marginTop: 8,
    color: 'green',
  },
  progress: {
    marginTop: 7,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    padding: 0,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
  checkbox: {
    width: 40,
    height: 40,
    // backgroundColor: '#0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    padding: 1,
  },
  dueDate: {
    color: 'black',
    fontFamily: 'serif',
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 5,
    fontFamily: 'serif',
    color: 'black',
    marginBottom: 12,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  greenBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  purpleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
  },
  greyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    color: '#614C64',
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 10,
  },
  circle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff0',
    marginHorizontal: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 14,
    color: '#000',
    marginHorizontal: 10,
  },
  chatButton: {
    position: 'absolute',
    bottom: -9,
    left: -6,
  },
  categoryContainer: {
    marginTop: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
    paddingVertical: 15,
    borderRadius: 70,
    marginRight: 10,
    backgroundColor: '#E0E0E0',
  },
  categoryChipText: {
    color: 'black',
  },
  selectedCategory: {
    backgroundColor: '#6146C6',
  },
  categoryIcon: {
    marginRight: 2,
    marginLeft: 2,
  },
  categoryLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  // selectedLabel: {
  //   color: '#FFF',
  // },
  viewAllButton: {
    // backgroundColor: '#6146C6',
    padding: 10,
    borderRadius: 5,
    marginTop: -8,
  },
  viewAllButtonText: {
    color: '#6146C6',
    // fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'serif',
  },
  categoryLabel: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  subtasksContainer: {
    flex: 1,
    marginTop: 10,
  },
  subtasksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtaskBox: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
  subtaskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  participant: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    color: 'black',
    fontFamily: 'serif',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 152,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
    fontFamily: 'serif',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
